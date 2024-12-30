from fastapi import FastAPI, Request
#import pyproj   #test


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")
 
@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.get("/api/list")
def test2():
    return {"liste": ["Apfel", "Birne", "Banane", "Orange", "Ananas"]}

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

# muss im basisordner nach next.config sein 
@app.get("/api/py/test")
def hello_fast_api():
    return {"message": "test"}