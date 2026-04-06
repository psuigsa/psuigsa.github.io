#!/bin/bash
# Quick start script for IGSA Chatbot Server

echo "🤖 Starting IGSA AI Chatbot Server..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Check if dependencies are installed
if [ ! -f "venv/bin/uvicorn" ]; then
    echo "📥 Installing dependencies..."
    pip install -r requirements.txt
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create .env file with your GEMINI_API_KEY"
    echo ""
    echo "Example:"
    echo "  cp .env.example .env"
    echo "  nano .env  # Add your API key"
    exit 1
fi

# Start the server
echo "🚀 Starting FastAPI server on http://127.0.0.1:8000"
echo "📖 API docs available at http://127.0.0.1:8000/docs"
echo ""
echo "Press Ctrl+C to stop"
echo ""

python main.py
