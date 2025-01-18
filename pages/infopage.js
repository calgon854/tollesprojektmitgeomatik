import { useState, useEffect } from "react";
import { VegaLite } from "react-vega";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// const BACKEND_BASE_URL = "http://localhost:8000/api/zurich";
const BACKEND_BASE_URL =
  "https://nextjs-fastapi-starter-kappa-one.vercel.app/api/py";

const InfoPage = () => {
  const [timeframe, setTimeframe] = useState("day");
  const [tempData, setTempData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [airQualityData, setAirQualityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for timeframe: ${timeframe}`);
        const response = await fetch(
          `${BACKEND_BASE_URL}/combined-data?timeframe=${timeframe}`
        );
        if (!response.ok) throw new Error("Failed to fetch data from backend");

        const data = await response.json();
        console.log("Fetched Data:", data);

        setTempData(data.tempData || []);
        setPressureData(data.pressureData || []);
        setAirQualityData(data.airQualityData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTempData([]);
        setPressureData([]);
        setAirQualityData([]);
      }
    };

    fetchData();
  }, [timeframe]);

  const createGraphSpec = (description, data, yTitle, color) => ({
    description,
    width: 600,
    height: 300,
    mark: "line",
    encoding: {
      x: { field: "timestamp", type: "temporal", title: "Time" },
      y: { field: "value", type: "quantitative", title: yTitle },
      color: { value: color },
    },
    data: { values: data },
  });

  return (
    <div>
      <Box marginBottom={3} textAlign="center">
        <Typography variant="h6">Select Timeframe</Typography>
        <ToggleButtonGroup
          color="primary"
          value={timeframe}
          exclusive
          onChange={(e, newTimeframe) => {
            if (newTimeframe) setTimeframe(newTimeframe);
          }}
        >
          <ToggleButton value="hour">Last Hour</ToggleButton>
          <ToggleButton value="day">Last Day</ToggleButton>
          <ToggleButton value="week">Last Week</ToggleButton>
          <ToggleButton value="month">Last Month</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box display="flex" justifyContent="space-around" marginBottom={4}>
        <VegaLite
          spec={{
            description: "Temperature Over Time",
            width: 600,
            height: 300,
            mark: "line",
            encoding: {
              x: { field: "timestamp", type: "temporal", title: "Time" },
              y: {
                field: "value",
                type: "quantitative",
                title: "Temperature (°C)",
              },
              color: {
                value: "#FF5733",
                legend: { title: "Parameter" },
              },
            },
            data: { values: tempData },
          }}
        />
        <VegaLite
          spec={{
            description: "Pressure Over Time",
            width: 600,
            height: 300,
            mark: "line",
            encoding: {
              x: { field: "timestamp", type: "temporal", title: "Time" },
              y: {
                field: "value",
                type: "quantitative",
                title: "Pressure Index",
              },
              color: {
                field: "parameter",
                type: "nominal",
                legend: { title: "Parameter" },
              },
            },
            data: { values: pressureData },
          }}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginBottom={4}>
        <VegaLite
          spec={{
            description: "Air Quality Levels Over Time",
            width: 600,
            height: 300,
            mark: "line",
            encoding: {
              x: { field: "timestamp", type: "temporal", title: "Time" },
              y: {
                field: "value",
                type: "quantitative",
                title: "Air Quality Index",
              },
              color: {
                field: "parameter",
                type: "nominal",
                legend: { title: "Parameter" },
              },
            },
            data: { values: airQualityData },
          }}
        />
      </Box>
    </div>
  );
};

export default InfoPage;
