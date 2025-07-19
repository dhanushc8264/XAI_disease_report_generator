import requests
import os
from dotenv import load_dotenv
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def generate_heart_report(top_contributors, probability, label):
    prompt = f"""
You are a medical assistant AI. Based on the following factors and a predicted probability of {probability*100:.2f}% for {label}, generate a clear, human-friendly explanation. Also give guidelines for what the person can do next.

Top contributing factors:
{top_contributors}
    """

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": "You are a helpful health assistant."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(GROQ_API_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

def generate_diabetes_report(top_contributors, probability, label):
    prompt = f"""
You are a medical assistant AI. Based on the following factors and a predicted probability of {probability*100:.2f}% for {label} (diabetes), generate a clear, human-friendly explanation. Also suggest next steps for lifestyle, checkups, and treatment if needed.

Top contributing factors:
{top_contributors}
    """

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": "You are a helpful health assistant."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(GROQ_API_URL, headers=headers, json=payload)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

