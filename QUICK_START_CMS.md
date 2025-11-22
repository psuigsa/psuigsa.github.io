# Quick Start - Decap CMS Admin Panel

## 🚀 For Content Editors

### Accessing the Admin Panel

1. Go to: **https://psuigsa.github.io/admin/**
2. Click "Login with GitHub"
3. Authorize the application
4. Start editing!

### Quick Actions

**Add a New Event:**
1. Click "Events" → "New Event"
2. Fill in the form
3. Click "Publish"

**Edit Event:**
1. Click "Events"
2. Click on the event you want to edit
3. Make changes
4. Click "Publish"

**Unpublish Event:**
1. Open the event
2. Toggle "Published" to OFF
3. Click "Publish"

---

## 🔧 For Administrators (First Time Setup)

### Prerequisites
- Admin access to GitHub repository
- Repository already deployed on GitHub Pages ✅

### Choose Your Authentication Method

#### Option 1: Netlify (Recommended - Most User-Friendly)
**Best for**: Teams with non-technical users

1. **Deploy to Netlify** (free):
   - Go to https://app.netlify.com
   - Import GitHub repository: `psuigsa/psuigsa.github.io`
   - Build command: `npm run build:client`
   - Publish directory: `dist/spa`

2. **Setup GitHub OAuth**:
   - In Netlify: Settings → Identity → Enable Identity
   - Settings → Identity → External Providers → Add GitHub
   - Create GitHub OAuth App at: https://github.com/organizations/psuigsa/settings/applications
     - Name: `PSUIGSA CMS`
     - Homepage: `https://psuigsa.github.io`
     - Callback: `https://api.netlify.com/auth/done`
   - Copy Client ID & Secret to Netlify

3. **Invite Users**:
   - Netlify → Identity → Invite users
   - Enter email addresses

4. **Done!** Admin panel: `https://psuigsa.github.io/admin/`

#### Option 2: GitHub Direct Auth (Simpler Setup)
**Best for**: Small teams where everyone has GitHub access

1. **Update config** (already done ✅):
   ```yaml
   backend:
     name: github
     repo: psuigsa/psuigsa.github.io
   ```

2. **Add collaborators** on GitHub:
   - Go to: https://github.com/psuigsa/psuigsa.github.io/settings/access
   - Add people with "Write" access

3. **Done!** Admin panel: `https://psuigsa.github.io/admin/`

---

## 📋 What's Already Set Up

✅ Admin panel at `/admin/`
✅ CMS configuration (`public/admin/config.yml`)
✅ Content structure (`content/` folder)
✅ Sample events (Campus Tour, Diwali Mela)
✅ Settings for homepage, contact, about page

## ⚠️ What You Need to Do

1. **Choose authentication method** (see above)
2. **Set up authentication** (follow steps for your chosen method)
3. **Test login** at `https://psuigsa.github.io/admin/`
4. **Invite team members** to access the admin panel

---

## 🔐 Current Setup

**Configuration File**: `public/admin/config.yml`
**Content Types**:
- Events
- Board Members  
- Resources
- Site Settings

**Content Location**: `content/` folder
**Uploaded Images**: `public/images/uploads/`

---

## 📞 Need Help?

**Full Documentation**: See `DECAP_CMS_SETUP.md`
**Decap CMS Docs**: https://decapcms.org/docs/
**Contact**: psu.igsa@gmail.com

---

**Status**: ⚙️ Setup Required - Choose authentication method
**Last Updated**: November 2024
