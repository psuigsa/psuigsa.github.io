# Setup Complete! ✅

The chatbot backend is now configured and ready to use.

## What Was Fixed

### Python 3.13 Compatibility Issue
The original `requirements.txt` had older package versions that weren't compatible with Python 3.13:
- **pydantic 2.5.3** → upgraded to **2.9.0** (has pydantic-core with Python 3.13 support)
- **fastapi 0.109.0** → upgraded to **0.115.0**
- **uvicorn 0.27.0** → upgraded to **0.32.0**
- **google-generativeai 0.3.2** → upgraded to **0.8.0**

### Missing .env File Loading
Added `load_dotenv()` to `main.py` to automatically load environment variables from the `.env` file.

## Next Steps

### 1. Get Your Real Gemini API Key (2 minutes)

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key" 
4. Copy the key (starts with `AIza...`)

### 2. Update Your `.env` File (30 seconds)

```bash
cd chatbot-server
nano .env
```

Replace `test_key_placeholder` with your actual API key:
```bash
GEMINI_API_KEY=AIza...your_real_key_here
```

Save and exit (Ctrl+X, then Y, then Enter).

### 3. Start the Server (1 minute)

```bash
./start.sh
```

You should see:
```
🚀 Starting FastAPI server on http://127.0.0.1:8000
```

Test it:
```bash
curl http://127.0.0.1:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "gemini_configured": true,
  "timestamp": "2026-04-06T..."
}
```

### 4. Set Up Cloudflare Tunnel (2 minutes)

Open a **new terminal** (keep the server running):

```bash
# Download cloudflared (if not already installed)
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared

# Start the tunnel
cloudflared tunnel --url http://localhost:8000
```

Look for output like:
```
+--------------------------------------------------------------------------------------------+
|  Your quick Tunnel has been created! Visit it at:                                         |
|  https://random-word-1234.trycloudflare.com                                                |
+--------------------------------------------------------------------------------------------+
```

**Copy this URL** - you'll need it for the frontend!

### 5. Configure Frontend (1 minute)

Back in the project root:

```bash
cd ..
echo "VITE_CHATBOT_API_URL=https://your-tunnel-url.trycloudflare.com" > .env.local
```

Replace `your-tunnel-url.trycloudflare.com` with the URL from step 4!

### 6. Test Everything! (1 minute)

```bash
npm run dev
```

1. Open http://localhost:5173
2. Go to Forum page
3. Click "Chat with AI Assistant" 
4. Type: "Tell me about IGSA events"
5. Get AI response! 🎉

## Keep Services Running

### Using Screen (Recommended for Testing)

```bash
# Start server in screen
screen -S chatbot
cd chatbot-server
./start.sh
# Press Ctrl+A then D to detach

# Start tunnel in another screen  
screen -S tunnel
cloudflared tunnel --url http://localhost:8000
# Press Ctrl+A then D to detach

# View running screens
screen -ls

# Reattach to a screen
screen -r chatbot  # or tunnel

# Kill a screen
screen -X -S chatbot quit
```

### Using systemd (For Production)

See [chatbot-server/README.md](README.md#running-in-production) for systemd configuration.

## Troubleshooting

### "Empty response from Gemini"
- Invalid API key → Get a new one from https://makersuite.google.com/app/apikey
- Check `.env` file has correct key (no quotes needed)

### "GEMINI_API_KEY not set"
```bash
cat chatbot-server/.env
# Should show: GEMINI_API_KEY=AIza...
```

### Frontend gets "Connection refused"
```bash
# 1. Check backend is running
curl http://127.0.0.1:8000/health

# 2. Check tunnel is active (look for the URL in terminal)

# 3. Verify .env.local has correct tunnel URL
cat .env.local
```

## Architecture Summary

```
User in Browser
     ↓
GitHub Pages (psuigsa.github.io)
     ↓ fetch()
Cloudflare Tunnel (https://xxx.trycloudflare.com)
     ↓ proxy
Your Linux Server (localhost:8000)
     ↓ API call
Google Gemini AI
     ↓ response
[flows back through the same path]
```

## Security Notes

✅ API key stored only on your server (in `.env`)  
✅ Never committed to Git (`.gitignore` includes `.env`)  
✅ CORS configured to allow your GitHub Pages domain  
✅ Cloudflare tunnel provides HTTPS automatically  

## Cost

- **Google Gemini API**: FREE tier (60 requests/minute)
- **Cloudflare Quick Tunnel**: FREE (URL changes on restart)
- **Your Server**: You already have it!

Total cost: **$0** 💰

## What's Working

✅ Python dependencies installed (Python 3.13 compatible)  
✅ `.env` file loading  
✅ FastAPI server configured  
✅ CORS enabled  
✅ Frontend updated to call backend API  
✅ Error fallbacks in place  

## What You Need to Do

🔲 Get real Gemini API key  
🔲 Update `.env` with your key  
🔲 Start the server  
🔲 Start Cloudflare tunnel  
🔲 Update `.env.local` with tunnel URL  
🔲 Test the chat!  

---

**Estimated total time**: ~7 minutes

**Questions?** Check the full docs:
- [QUICKSTART.md](QUICKSTART.md) - Step-by-step guide
- [README.md](README.md) - Complete documentation
