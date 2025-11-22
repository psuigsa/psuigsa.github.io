# Decap CMS Setup Guide for PSUIGSA Website

This guide will help you set up and use the Decap CMS admin panel for managing content on the PSUIGSA website.

## 🎯 What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a Git-based content management system that allows non-technical users to edit website content through a user-friendly admin interface. All changes are saved as commits to your GitHub repository, providing:

- ✅ **Version Control**: Every change is tracked via Git
- ✅ **No Database Needed**: Content is stored as files in your repository
- ✅ **Secure**: Only authorized GitHub users can make changes
- ✅ **Easy to Use**: User-friendly interface for editing content

## 📋 Prerequisites

Before you begin, ensure you have:
1. Admin access to the `psuigsa/psuigsa.github.io` GitHub repository
2. The repository deployed on GitHub Pages (already done)
3. A GitHub account with write access to the repository

## 🚀 Setup Steps

### Step 1: Enable GitHub OAuth (One-time setup by admin)

Since your site is hosted on GitHub Pages, you'll need to set up authentication using **Netlify's OAuth service** (free and works with GitHub Pages):

#### Option A: Deploy to Netlify (Recommended - Easiest)

1. **Create a Netlify account** (free): https://app.netlify.com/signup
2. **Import your GitHub repository**:
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select `psuigsa/psuigsa.github.io`
   - Build settings should auto-detect (or use these):
     - Build command: `npm run build:client`
     - Publish directory: `dist/spa`
3. **Enable Decap CMS OAuth**:
   - Go to Site Settings → Identity → Enable Identity
   - Go to Site Settings → Identity → External Providers
   - Click "Add provider" → GitHub
   - Follow the instructions to create a GitHub OAuth App:
     - Go to https://github.com/organizations/psuigsa/settings/applications
     - Click "New OAuth App"
     - Application name: `PSUIGSA CMS`
     - Homepage URL: `https://psuigsa.github.io` (or your Netlify URL)
     - Authorization callback URL: `https://api.netlify.com/auth/done`
     - Copy the Client ID and Client Secret to Netlify
   
4. **Update the config**: The `public/admin/config.yml` is already configured for Netlify!

Your admin panel will be available at: `https://psuigsa.github.io/admin/`

#### Option B: Use GitHub Backend Directly (No additional service needed)

If you don't want to use Netlify, you can use GitHub authentication directly:

1. **Update `public/admin/config.yml`**:
   ```yaml
   backend:
     name: github
     repo: psuigsa/psuigsa.github.io
     branch: main
   ```

2. Users will authenticate directly with GitHub (they'll need repository access)
3. Access the admin at: `https://psuigsa.github.io/admin/`

**Note**: With this option, only GitHub users with write access can log in.

### Step 2: Access the Admin Panel

Once setup is complete:

1. Navigate to: **https://psuigsa.github.io/admin/**
2. Click "Login with GitHub" (or "Login with Netlify Identity" if using Netlify)
3. Authorize the application
4. You're in! 🎉

## 📝 Using the Admin Panel

### Managing Events

1. **View Events**: Click "Events" in the sidebar
2. **Create New Event**:
   - Click "New Event"
   - Fill in all required fields:
     - Event Name, Description, Date, Location
     - Time, Organizer, Contact Email
     - Event Type (Social, Cultural, Academic, etc.)
     - Details (full description)
     - Highlights (list of key points)
   - Upload images or use image URLs
   - Click "Publish" to make it live
3. **Edit Event**: Click on any event to edit
4. **Delete Event**: Open an event and click "Delete entry"

### Managing Board Members

1. Click "Board Members" in the sidebar
2. **Add New Member**:
   - Click "New Board Member"
   - Fill in: Name, Position, Email, Photo, Bio
   - Set "Order" (lower numbers appear first)
   - Set "Active" to true/false to show/hide
3. **Edit/Delete**: Same as events

### Managing Resources

1. Click "Resources" in the sidebar
2. Add guides, documents, and helpful information
3. Organize by category (Pre-Arrival, Post-Arrival, etc.)
4. Upload files directly through the interface

### Site Settings

Update homepage content, contact information, and about page text:
1. Click "Site Settings" → Choose what to edit
2. Make changes and click "Publish"

## 🔐 Security & Permissions

### Who Can Access?

**Option A (Netlify Identity)**:
- Only users invited through Netlify Identity dashboard
- Admin must manually invite users via email

**Option B (GitHub Backend)**:
- Only GitHub users with write access to the repository
- Manage access through GitHub repository settings

### Adding New Editors

**For Netlify Identity**:
1. Go to Netlify dashboard → Identity
2. Click "Invite users"
3. Enter email addresses
4. They'll receive an invitation email

**For GitHub Backend**:
1. Go to https://github.com/psuigsa/psuigsa.github.io/settings/access
2. Click "Add people"
3. Grant them "Write" access

## 🛠️ Technical Details

### File Structure

```
content/
├── events/              # Event markdown files
│   ├── campus-tour.md
│   └── diwali-mela.md
├── board/              # Board member files
└── settings/           # Site configuration
    ├── homepage.json
    ├── contact.json
    └── about.json

public/
├── admin/
│   ├── index.html     # Admin panel
│   └── config.yml     # CMS configuration
└── images/
    └── uploads/        # Uploaded images
```

### How It Works

1. **Editor makes changes** → Decap CMS creates/updates files in `content/` folder
2. **Changes are committed** → Pushed to GitHub repository
3. **GitHub Actions** → Automatically rebuilds and deploys the site
4. **Content appears live** → Usually within 1-2 minutes

### Content Format

Events are stored as Markdown files with YAML frontmatter:

```yaml
---
name: "Event Name"
description: "Short description"
date: "November 2, 2024"
location: "HUB Lawn"
type: "Cultural"
published: true
highlights:
  - "Point 1"
  - "Point 2"
---
```

## 🚨 Troubleshooting

### "Login Failed" or "Cannot Access"
- Check that you're added as a collaborator (GitHub) or invited user (Netlify)
- Clear browser cache and try again
- Ensure you're logging in with the correct GitHub account

### "Config Error"
- Check that `public/admin/config.yml` is properly formatted
- Ensure the repository name is correct: `psuigsa/psuigsa.github.io`

### Changes Not Showing Up
- Wait 1-2 minutes for GitHub Pages to rebuild
- Check GitHub Actions tab to see if build succeeded
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Images Not Uploading
- Ensure you have write access to the repository
- Check that the `public/images/uploads` folder exists
- Try using external image URLs (e.g., from Unsplash) instead

## 📞 Getting Help

If you encounter issues:
1. Check the [Decap CMS documentation](https://decapcms.org/docs/)
2. Review the GitHub repository's Actions tab for build errors
3. Contact the web team at: psu.igsa@gmail.com

## 🎓 Best Practices

1. **Use descriptive commit messages**: When saving, write what you changed
2. **Preview before publishing**: Use the preview pane to check your changes
3. **Optimize images**: Keep images under 1MB for faster loading
4. **Regular updates**: Keep event information current
5. **Backup important content**: Content is in Git, but you can also export
6. **Test on mobile**: Check how content looks on different devices
7. **Coordinate with team**: Let others know when making major changes

## 📅 Maintenance

### Regular Tasks
- Update upcoming events monthly
- Remove past events quarterly
- Update board members annually
- Review and update resources as needed

### Annual Tasks
- Review and clean up old images in `public/images/uploads/`
- Archive past year's events
- Update contact information
- Review and update all guides and resources

---

**Last Updated**: November 2024
**Maintained by**: IGSA Web Team
