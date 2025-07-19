# main.py

from fastapi import FastAPI
from routers import diabetes, heart  # Import your routers
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI()

client_url = os.getenv("CLIENT_URL")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[client_url],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your routers
app.include_router(diabetes.router, prefix="/api")
app.include_router(heart.router, prefix="/api")
