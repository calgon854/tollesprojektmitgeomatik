from fastapi import FastAPI, HTTPException, Query
import httpx
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
from typing import List, Dict
from dateutil.parser import parse as parse_date

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CKAN_BASE_URL = "https://data.stadt-zuerich.ch/api/3/action"
RESOURCE_AIR_ID = "bb3f50e9-4e7f-4501-b46a-fb348786df04"
RESOURCE_METEO_ID = "1534397a-d71c-47c4-805e-8ee9a373c886" 

TIMEFRAME_MAPPING = {
    "hour": timedelta(hours=1),
    "day": timedelta(days=1),
    "week": timedelta(weeks=1),
    "month": timedelta(days=30),
}

@app.get("/api/py/combined-data")
async def fetch_combined_data(timeframe: str = Query("day", enum=["hour", "day", "week", "month"])):

    cutoff_time = datetime.now() - TIMEFRAME_MAPPING[timeframe]
    query_url = f"{CKAN_BASE_URL}/datastore_search"

    async with httpx.AsyncClient() as client:
        try:

            air_params = {"resource_id": RESOURCE_AIR_ID, "limit": 99999999}
            air_response = await client.get(query_url, params=air_params)
            air_response.raise_for_status()
            air_data = air_response.json().get("result", {}).get("records", [])

            meteo_params = {"resource_id": RESOURCE_METEO_ID, "limit": 99999999}
            meteo_response = await client.get(query_url, params=meteo_params)
            meteo_response.raise_for_status()
            meteo_data = meteo_response.json().get("result", {}).get("records", [])

            air_quality_data = filter_records(air_data, cutoff_time)
            meteorological_data = filter_records(meteo_data, cutoff_time)
            
            pressure_data = []
            temp_data = []

            for val in meteorological_data:
                if 'parameter' in val and val['parameter'] == 'p':
                    pressure_data.append(val)
                elif 'parameter' in val and val['parameter'] == 'T':
                    temp_data.append(val)
            
            combined_data = {
                "airQualityData": air_quality_data,
                "tempData": temp_data,
                "pressureData": pressure_data,
            }

            return combined_data

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

def filter_records(records: List[Dict], cutoff_time: datetime) -> List[Dict]:

    filtered_records = []
    for record in records:
        try:
            record_time = parse_date(record["Datum"].split("+")[0])

            if record_time >= cutoff_time:
                filtered_records.append({
                    "timestamp": record["Datum"],
                    "parameter": record.get("Parameter"),
                    "value": float(record["Wert"]),
                    "location": record.get("Standort"),
                })
        except (KeyError, ValueError):
            continue

    return filtered_records