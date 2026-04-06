# IGSA AI Chatbot - Google Gemini Integration

This chatbot backend connects your IGSA website to Google's Gemini AI using Cloudflare Quick Tunnel for secure external access.

This backend now uses the `google-genai` Python SDK and the `gemini-2.5-flash` model.

## Architecture

```
GitHub Pages (psuigsa.github.io)
    ↓ fetch() call
Cloudflare Tunnel (https://xxx.trycloudflare.com)
    ↓ proxy to
Linux Server (localhost:8000)
    ↓ API call
Google Gemini AI
```

## Setup Instructions

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (starts with `AIza...`)

### 2. Set Up the Backend Server

#### Install Python 3.8+

```bash
# Check Python version
python3 --version  # Should be 3.8 or higher
```

#### Create Virtual Environment

```bash
cd chatbot-server

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Linux/Mac
# or
venv\Scripts\activate  # On Windows
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

The current dependency is `google-genai`, which provides `from google import genai`.

#### Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
nano .env  # or use your preferred editor
```

Update `.env`:
```env
GEMINI_API_KEY=AIza...your_actual_key_here
```

#### Test the Server Locally

```bash
# Make sure virtual environment is activated
python main.py
```

Visit http://127.0.0.1:8000 in your browser. You should see:
```json
{"status": "running", "service": "IGSA AI Chatbot", ...}
```

Test the health endpoint:
```bash
curl http://127.0.0.1:8000/health
```

Test the chat endpoint:
```bash
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is IGSA?","conversation_history":[]}'
```

### 3. Set Up Cloudflare Quick Tunnel

#### Install Cloudflared

```bash
# On Linux (Debian/Ubuntu)
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# On Linux (other distros)
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared

# On macOS
brew install cloudflare/cloudflare/cloudflared

# On Windows
# Download from: https://github.com/cloudflare/cloudflared/releases
```

#### Start the Tunnel

Open a **new terminal** (keep the Python server running in the first terminal):

```bash
cloudflared tunnel --url http://localhost:8000
```

You'll see output like:
```
2024-04-06 | INF | +--------------------------------------------------------------------------------------------+
2024-04-06 | INF | |  Your quick Tunnel has been created! Visit it at:                                         |
2024-04-06 | INF | |  https://random-word-1234.trycloudflare.com                                                |
2024-04-06 | INF | +--------------------------------------------------------------------------------------------+
```

**Copy the `https://xxx.trycloudflare.com` URL** - you'll need it for the frontend!

### 4. Update Frontend Configuration

#### Option A: Using Environment Variable (Recommended)

Create `.env.local` in the root of your project:

```bash
# At /home/nishant/github/psuigsa.github.io/
echo "VITE_CHATBOT_API_URL=https://your-tunnel-name.trycloudflare.com" > .env.local
```

Replace `your-tunnel-name.trycloudflare.com` with your actual Cloudflare tunnel URL.

#### Option B: Direct Update

Edit `client/pages/Forum.tsx` and change line ~50:

```typescript
const CHATBOT_API_URL = "https://your-tunnel-name.trycloudflare.com";
```

#### Add .env.local to .gitignore

Make sure `.env.local` is in your `.gitignore`:

```bash
# Add this line to .gitignore if not already present
echo ".env.local" >> .gitignore
```

### 5. Test the Full Integration

#### Start the Development Server

```bash
# In the project root
npm run dev
```

If you changed `.env.local`, stop and restart Vite so the new `VITE_CHATBOT_API_URL` is loaded.

#### Test the Chat

1. Open http://localhost:5173 (or your dev server URL)
2. Navigate to the Forum page
3. Click "Chat with AI Assistant"
4. Type a message like "Tell me about upcoming events"
5. You should get an AI-generated response!

### 6. Deploy to GitHub Pages

#### Important Limitation

GitHub Pages only hosts the frontend. It does not run the FastAPI chatbot backend.

That means production requires a separate backend process that stays online and is reachable over HTTPS.

#### Update Production URL

Before deploying, update `.env.local` or `Forum.tsx` with a public backend URL.

If you use a Cloudflare Quick Tunnel, note that the URL changes whenever the tunnel restarts. Each time that happens, you must update the frontend configuration and redeploy.

#### Build and Deploy

```bash
# Build the frontend
npm run build

# Deploy to GitHub Pages
git add .
git commit -m "Add Gemini AI chatbot integration"
git push origin main
```

## Running in Production

### Keep Services Running

#### Using Screen (Recommended)

```bash
# Start a screen session for the Python server
screen -S chatbot
cd chatbot-server
source venv/bin/activate
python main.py

# Detach: Press Ctrl+A then D

# Start another screen for Cloudflare tunnel
screen -S tunnel
cloudflared tunnel --url http://localhost:8000

# Detach: Press Ctrl+A then D

# List screens
screen -ls

# Reattach to a screen
screen -r chatbot  # or tunnel
```

#### Using systemd (Linux)

Create `/etc/systemd/system/igsa-chatbot.service`:

```ini
[Unit]
Description=IGSA AI Chatbot Service
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/home/youruser/github/psuigsa.github.io/chatbot-server
Environment="GEMINI_API_KEY=your_api_key_here"
ExecStart=/home/youruser/github/psuigsa.github.io/chatbot-server/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Create `/etc/systemd/system/cloudflare-tunnel.service`:

```ini
[Unit]
Description=Cloudflare Quick Tunnel
After=network.target igsa-chatbot.service

[Service]
Type=simple
User=youruser
ExecStart=/usr/local/bin/cloudflared tunnel --url http://localhost:8000
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable igsa-chatbot cloudflare-tunnel
sudo systemctl start igsa-chatbot cloudflare-tunnel
sudo systemctl status igsa-chatbot cloudflare-tunnel
```

## Monitoring and Troubleshooting

### Check Server Logs

```bash
# If using screen
screen -r chatbot

# If using systemd
sudo journalctl -u igsa-chatbot -f
```

### Check Tunnel Status

```bash
# If using screen
screen -r tunnel

# If using systemd
sudo journalctl -u cloudflare-tunnel -f
```

### Test the API Directly

```bash
# Test health endpoint
curl https://your-tunnel.trycloudflare.com/health

# Test chat endpoint
curl -X POST https://your-tunnel.trycloudflare.com/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "conversation_history": []}'
```

### Common Issues

#### "GEMINI_API_KEY not set"
- Make sure `.env` file exists in `chatbot-server/` directory
- Check that the file contains `GEMINI_API_KEY=AIza...`
- If using systemd, set the environment variable in the service file

#### "Connection refused" in frontend
- Verify the Python server is running on port 8000
- Check that Cloudflare tunnel is active
- Ensure CORS is properly configured (already done in `main.py`)
- Verify the `VITE_CHATBOT_API_URL` is correct

#### "Empty response from Gemini"
- Check your API key is valid
- Verify you have quota remaining in Google AI Studio
- Check the server logs for detailed error messages

#### The API key works in a standalone script but not in the backend
- Make sure the backend is using the same SDK/model path as your test
- The current backend uses `google-genai` and `gemini-2.5-flash`
- Restart the backend after changing code or installing dependencies

#### Cloudflare tunnel keeps changing URL
- This is normal for Quick Tunnels (free version)
- For a persistent URL, consider [Cloudflare Tunnel with a custom domain](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- Or run a script to auto-update the frontend when the URL changes

## Security Notes

1. **Never commit** your `.env` file or API keys to Git
2. The `.gitignore` already excludes:
   - `chatbot-server/.env`
   - `.env.local`
3. API calls are rate-limited by Google (see [Gemini API limits](https://ai.google.dev/gemini-api/docs/rate-limits))
4. Consider adding authentication to your backend in production

## Cost and Limits

- **Google Gemini API**: Check current limits in Google AI Studio or Gemini API docs
- **Cloudflare Quick Tunnel**: Free (but URL changes on restart)
- **Linux Server**: Your own server (no additional cost)

## Upgrading to Permanent Tunnel

For a production setup with a persistent URL:

1. [Sign up for Cloudflare](https://dash.cloudflare.com/sign-up)
2. [Set up a named tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/)
3. Configure a subdomain (e.g., `chat.psuigsa.com`)
4. Update `VITE_CHATBOT_API_URL` once

This is the recommended approach if the frontend is deployed on GitHub Pages.

## Support

For issues or questions:
- Check Google AI Studio docs: https://ai.google.dev/
- Cloudflare Tunnel docs: https://developers.cloudflare.com/cloudflare-one/
- FastAPI docs: https://fastapi.tiangolo.com/

## License

Part of the IGSA website project.
