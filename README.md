# psuigsa.github.io
Website for IGSA

The website can be accessed at [https://psuigsa.github.io/](https://psuigsa.github.io/)

## 🎯 Content Management System (CMS)

This website now includes a user-friendly admin panel for managing content without coding!

### 📝 For Content Editors
- **Admin Panel**: [https://psuigsa.github.io/admin/](https://psuigsa.github.io/admin/)
- **Quick Start Guide**: See [QUICK_START_CMS.md](QUICK_START_CMS.md)
- Edit events, board members, resources, and site settings through a simple interface

### 🔧 For Administrators
- **Setup Guide**: See [ADMIN_CHECKLIST.md](ADMIN_CHECKLIST.md)
- **Full Documentation**: See [DECAP_CMS_SETUP.md](DECAP_CMS_SETUP.md)
- Complete setup instructions and troubleshooting

### 📚 All CMS Documentation
See [README_CMS.md](README_CMS.md) for a complete guide to all CMS documentation and resources.

## 🤖 AI Chatbot Assistant

The website features an intelligent AI assistant powered by Google Gemini to help students with questions about IGSA, events, housing, and student life.

### 🚀 Quick Start
See [chatbot-server/QUICKSTART.md](chatbot-server/QUICKSTART.md) - Get it running in 5 minutes!

### 📖 Full Documentation
See [chatbot-server/README.md](chatbot-server/README.md) for complete setup and deployment guide.

### 🏗️ Architecture
- **Frontend**: Embedded chat widget on Forum page
- **Backend**: Python FastAPI server with Google Gemini API
- **Model path**: `google-genai` SDK using `gemini-2.5-flash`
- **Deployment**: GitHub Pages hosts only the frontend; the chatbot backend must run separately and be exposed over HTTPS
- **API Key**: Stored as environment variable on your Linux server

### ✨ Features
- Real-time responses using Google's Gemini AI
- Context-aware conversations
- Topics: Events, housing, visa, jobs, health, transport, food
- Fallback responses when API is unavailable
- Mobile-friendly chat interface

https://global.psu.edu/landing/living-us
