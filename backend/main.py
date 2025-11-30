from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
# We import the specific class to avoid errors
from youtube_transcript_api import YouTubeTranscriptApi
from pypdf import PdfReader
import io
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CONFIGURATION ---
# PASTE YOUR KEY HERE (Make sure to keep the quotes!)
GEMINI_API_KEY = "PASTE_YOUR_KEY_HERE"

client = OpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

class TextRequest(BaseModel):
    text: str

class YoutubeRequest(BaseModel):
    url: str

# --- HELPER FUNCTIONS ---
def get_youtube_transcript(video_url):
    try:
        # Logic to handle different YouTube URL formats
        if "v=" in video_url:
            video_id = video_url.split("v=")[1].split("&")[0]
        elif "youtu.be/" in video_url:
            video_id = video_url.split("youtu.be/")[1].split("?")[0]
        else:
            video_id = video_url.split("/")[-1]

        # Call the library
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Combine the text parts
        full_text = " ".join([i['text'] for i in transcript])
        return full_text
    except Exception as e:
        print(f"YouTube Error Details: {e}")
        raise Exception(f"Could not get transcript. Error: {str(e)}")

def summarize_with_ai(text):
    if not text:
        return "Error: No text provided to summarize."
        
    response = client.chat.completions.create(
        model="gemini-2.5-flash", 
        messages=[
            {"role": "system", "content": "You are an expert study assistant. Summarize the following content into clear, concise bullet points. Focus on the key learning outcomes."},
            {"role": "user", "content": text}
        ]
    )
    return response.choices[0].message.content

# --- ENDPOINTS ---

@app.post("/summarize_text")
async def summarize_text_endpoint(request: TextRequest):
    try:
        summary = summarize_with_ai(request.text)
        return {"summary": summary}
    except Exception as e:
        print(f"Text Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize_youtube")
async def summarize_youtube_endpoint(request: YoutubeRequest):
    try:
        print(f"Processing YouTube URL: {request.url}") # Debug print
        text = get_youtube_transcript(request.url)
        summary = summarize_with_ai(text)
        return {"summary": summary}
    except Exception as e:
        print(f"YouTube Endpoint Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize_pdf")
async def summarize_pdf_endpoint(file: UploadFile = File(...)):
    try:
        # Read PDF file
        contents = await file.read()
        pdf_file = io.BytesIO(contents)
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        
        print(f"PDF Read Success. Text length: {len(text)}") # Debug print
        
        # Limit text to safe size (Gemini 2.5 is huge, but let's be safe with 100k chars)
        summary = summarize_with_ai(text[:100000]) 
        return {"summary": summary}
    except Exception as e:
        print(f"PDF Endpoint Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)