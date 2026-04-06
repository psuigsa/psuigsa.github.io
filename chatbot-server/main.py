#!/usr/bin/env python3
"""
IGSA AI Chatbot Backend Server
Runs on localhost:8000 and connects to Google's Gemini API
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from datetime import datetime

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="IGSA AI Chatbot")

# Configure CORS to allow GitHub Pages frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://psuigsa.github.io",
        "http://localhost:5173",  # For local dev
        "http://localhost:8080",
        "http://localhost:3000",
        "*"  # Allow all origins through Cloudflare tunnel
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY environment variable not set")

# Configure Gemini
client = genai.Client(api_key=GEMINI_API_KEY)

# System prompt with IGSA context
SYSTEM_PROMPT = """You are the IGSA AI Assistant for Penn State's Indian Graduate Student Association (IGSA).

Your role is to help Indian graduate students at Penn State with:
- Information about IGSA events (Jashn, Diwali, cultural celebrations)
- Housing guidance (Beaver Hill, apartments near campus, roommate searches)
- Pre-arrival preparation (visa, I-20, documents)
- Post-arrival tasks (SSN, bank accounts, health insurance)
- Living in State College (grocery stores, restaurants, transportation via CATA buses)
- Academic resources (TA/RA positions, CPT/OPT work authorization)
- Getting involved with IGSA (committees, volunteering, board positions)

Key facts:
- IGSA hosts monthly social events and quarterly academic workshops
- Popular housing: Beaver Hill graduate housing, Vairo Village, private apartments
- State College has CATA bus system for public transport
- Penn State requires health insurance for all students
- International students should consult International Student Services for visa/work guidance

Be friendly, concise, and helpful. If you don't know specific details, guide users to check the IGSA website resources (Pre-Arrival, Post-Arrival, Living in State College guides) or attend an IGSA event to connect with other students.

Current date: {current_date}
"""

class ChatRequest(BaseModel):
    message: str
    conversation_history: list = []

class ChatResponse(BaseModel):
    response: str
    timestamp: str

@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "IGSA AI Chatbot",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint that processes user messages using Gemini AI
    """
    try:
        # Build conversation context
        current_date = datetime.now().strftime("%B %d, %Y")
        system_context = SYSTEM_PROMPT.format(current_date=current_date)
        
        # Format conversation history for Gemini
        conversation_text = system_context + "\n\n"
        
        # Add previous messages if available (last 5 for context)
        if request.conversation_history:
            recent_history = request.conversation_history[-5:]
            for msg in recent_history:
                role = "User" if msg.get("sender") == "user" else "Assistant"
                conversation_text += f"{role}: {msg.get('text', '')}\n"
        
        # Add current message
        conversation_text += f"User: {request.message}\nAssistant:"
        
        # Generate response using the same SDK/model path as the verified local script
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=conversation_text,
        )
        
        if not response or not response.text:
            raise HTTPException(status_code=500, detail="Empty response from Gemini")
        
        return ChatResponse(
            response=response.text,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        error_message = str(e)
        print(f"Error generating response: {error_message}")

        if "quota exceeded" in error_message.lower() or "429" in error_message:
            return ChatResponse(
                response=(
                    "The AI service is reachable, but this Gemini API key has no remaining quota right now. "
                    "Please check Google AI Studio billing and quota settings, or wait for the quota window to reset."
                ),
                timestamp=datetime.now().isoformat()
            )

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {error_message}"
        )

@app.get("/health")
def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "gemini_configured": bool(GEMINI_API_KEY),
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )
