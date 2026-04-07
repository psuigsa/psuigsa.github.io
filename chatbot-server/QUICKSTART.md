# IGSA AI Chatbot Quick Start

This guide explains the simplest production setup:
- the website frontend stays on GitHub Pages
- the chatbot backend runs on a separate Linux server
- the Linux server exposes the chatbot over HTTPS

The backend uses the `google-genai` Python SDK and the `gemini-2.5-flash` model.

## Before You Start

You need:
- a Linux machine that will stay online
- Python 3.8+
- a Gemini API key
- `cloudflared`
- access to the website GitHub repository

## What Goes Where

On the Linux server:
- the `chatbot-server/` folder
- the Python virtual environment
- the secret Gemini API key
- the running FastAPI chatbot process
- the running Cloudflare tunnel

On the website machine or repo checkout:
- the frontend code
- the public chatbot URL used by the frontend build

Never commit:
- `chatbot-server/.env`
- `.env.local`
- any real API key

## Step 1. Prepare the Linux Server

Run on the Linux machine that will host the chatbot:

```bash
git clone https://github.com/psuigsa/psuigsa.github.io.git
cd psuigsa.github.io/chatbot-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Step 2. Create the Secret Backend Env File

Still on the Linux server, create `chatbot-server/.env`:

```bash
cd /path/to/psuigsa.github.io/chatbot-server
echo 'GEMINI_API_KEY=YOUR_REAL_GEMINI_KEY' > .env
```

Example:

```env
GEMINI_API_KEY=AIza...
```

This file stays only on the Linux server. Do not push it to GitHub.

## Step 3. Start the Backend

On the Linux server:

```bash
cd /path/to/psuigsa.github.io/chatbot-server
source venv/bin/activate
python main.py
```

Check that it works:

```bash
curl http://127.0.0.1:8000/health
curl -X POST http://127.0.0.1:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is IGSA?","conversation_history":[]}'
```

## Step 4. Expose the Backend Publicly

On the same Linux server, open a second terminal and run:

```bash
cloudflared tunnel --url http://127.0.0.1:8000
```

Cloudflare will print a public URL like:

```text
https://your-chatbot-name.trycloudflare.com
```

That is the URL your GitHub Pages frontend must call.

### If You Are Using a Named Cloudflare Tunnel

For a named tunnel, Cloudflare usually does not print a public URL in the terminal.

Instead, you must add a public hostname route in the Cloudflare dashboard:

1. Log in to Cloudflare
2. Open the account that owns your domain
3. Go to `Networking` -> `Tunnels`
4. Click your tunnel
5. Open `Routes`
6. Click `Add route`
7. Choose `Published application`
8. Under `Hostname`, enter the subdomain you want, for example `chat`
9. Choose your domain, for example `riderop.com`
10. Under `Service`, enter:

```text
http://127.0.0.1:8000
```

11. Save the route

Example result:

```text
https://chat.riderop.com
```

After saving the route, test it:

```bash
curl https://chat.riderop.com/health
curl -X POST https://chat.riderop.com/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is IGSA?","conversation_history":[]}'
```

## Step 5. Set the Frontend Env File

On the machine where you build and push the website:

```bash
cd /path/to/psuigsa.github.io
echo 'VITE_CHATBOT_API_URL=https://your-chatbot-name.trycloudflare.com' > .env.local
```

This file is for the frontend build only.

Important:
- `chatbot-server/.env` contains the secret Gemini key on the Linux server
- `.env.local` contains the public chatbot URL for the frontend build

## Step 6. Build the Frontend

In the website project root:

```bash
npm install
npm run build
```

This bakes `VITE_CHATBOT_API_URL` into the frontend bundle.

If Vite was already running locally, restart it after changing `.env.local`.

## Step 7. Push the Website to GitHub

Commit and push only source code and docs.

Do not commit:
- `chatbot-server/.env`
- `.env.local`
- any API key

Typical flow:

```bash
git add .
git commit -m "Update chatbot deployment configuration"
git push origin main
```

If your GitHub Pages setup uses a deploy command, run that after the build.

## Step 8. Verify Production

After GitHub Pages updates, test the public chatbot URL:

```bash
curl https://your-chatbot-name.trycloudflare.com/health
curl -X POST https://your-chatbot-name.trycloudflare.com/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What is IGSA?","conversation_history":[]}'
```

Then open the live GitHub Pages site and test the chatbot in the browser.

## Important Limitation

GitHub Pages hosts only the frontend. It does not run the chatbot backend.

That means production always requires:
- a running backend process somewhere
- a public HTTPS URL for that backend

## Important Warning About Quick Tunnels

If you use `trycloudflare.com`, the public URL changes whenever the tunnel restarts.

When that happens, you must:
1. get the new tunnel URL from the Linux server
2. update `.env.local` in the website project
3. rebuild the frontend
4. push or redeploy GitHub Pages

For a stable long-term setup, use:
- a named Cloudflare Tunnel with a fixed hostname
- or another stable backend host such as a VPS, Render, Railway, or Fly.io

## Keeping It Running

For a real deployment, run the backend and tunnel under `screen` or `systemd` so they survive terminal disconnects.

See [README.md](README.md) for the fuller reference documentation.

## After Deployment

After the website is deployed, the Linux server must keep both of these running:

### 1. The chatbot backend

```bash
cd /path/to/psuigsa.github.io/chatbot-server
source venv/bin/activate
python main.py
```

### 2. The Cloudflare tunnel

If you are using a named tunnel:

```bash
cloudflared tunnel run --token YOUR_TUNNEL_TOKEN
```

If you are using a quick tunnel:

```bash
cloudflared tunnel --url http://127.0.0.1:8000
```

If either process stops, the deployed website will no longer be able to use the chatbot.

Recommended:
- use `screen` for a simple setup
- use `systemd` for a long-term setup

Quick health check:

```bash
curl https://your-public-chatbot-hostname/health
```
