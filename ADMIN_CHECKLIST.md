# Admin Setup Checklist

Use this checklist to ensure your Decap CMS is properly configured and ready to use.

## ✅ Pre-Setup Verification

- [x] Website is hosted on GitHub Pages
- [x] Repository is `psuigsa/psuigsa.github.io`
- [x] GitHub Actions workflow exists (`.github/workflows/deploy.yml`)
- [x] Admin panel files created (`public/admin/`)
- [x] Content structure created (`content/` folder)
- [ ] You have admin access to the GitHub repository

## 🔐 Authentication Setup (Choose ONE)

### Option A: Netlify Identity (Recommended)

- [ ] Created Netlify account at https://app.netlify.com
- [ ] Connected GitHub repository to Netlify
- [ ] Configured build settings:
  - [ ] Build command: `npm run build:client`
  - [ ] Publish directory: `dist/spa`
- [ ] Enabled Netlify Identity (Settings → Identity)
- [ ] Created GitHub OAuth App:
  - [ ] Name: `PSUIGSA CMS`
  - [ ] Homepage URL: `https://psuigsa.github.io`
  - [ ] Callback URL: `https://api.netlify.com/auth/done`
- [ ] Added GitHub OAuth credentials to Netlify
- [ ] Tested login at `https://psuigsa.github.io/admin/`

### Option B: GitHub Direct Auth

- [ ] Verified `backend` config in `public/admin/config.yml`:
  ```yaml
  backend:
    name: github
    repo: psuigsa/psuigsa.github.io
    branch: main
  ```
- [ ] Added team members as GitHub collaborators
- [ ] Granted "Write" access to collaborators
- [ ] Tested login at `https://psuigsa.github.io/admin/`

## 🧪 Testing

### Initial Test
- [ ] Can access `https://psuigsa.github.io/admin/`
- [ ] Login page loads without errors
- [ ] Can log in successfully
- [ ] Admin dashboard loads
- [ ] Can see "Events", "Board", "Resources", "Site Settings" sections

### Create Test Event
- [ ] Click "Events" → "New Event"
- [ ] Fill in all required fields
- [ ] Upload a test image
- [ ] Click "Publish"
- [ ] See success message
- [ ] Check GitHub repository for new commit
- [ ] Verify file created in `content/events/`

### Verify Deployment
- [ ] Wait 2-3 minutes after publishing
- [ ] Check GitHub Actions tab for successful build
- [ ] Visit main website to verify changes
- [ ] Test event appears correctly

### Edit Test Event
- [ ] Open the test event
- [ ] Make a change
- [ ] Click "Publish"
- [ ] Verify change appears on website

### Delete Test Event
- [ ] Open the test event
- [ ] Click "Delete entry"
- [ ] Confirm deletion
- [ ] Verify removed from website

## 👥 Team Setup

### Add Team Members

For Netlify Identity:
- [ ] Go to Netlify → Identity → Invite users
- [ ] Enter team member email addresses
- [ ] Team members receive invitation emails
- [ ] Team members can set passwords
- [ ] Test each team member can log in

For GitHub Direct:
- [ ] Go to GitHub repo → Settings → Collaborators
- [ ] Add each team member's GitHub username
- [ ] Grant "Write" access
- [ ] Team members accept invitation
- [ ] Test each team member can log in

### Document Access
- [ ] Share `QUICK_START_CMS.md` with team
- [ ] Share admin panel URL: `https://psuigsa.github.io/admin/`
- [ ] Provide login instructions
- [ ] Schedule training session (optional)

## 📝 Content Migration

### Events
- [ ] List all current events to migrate
- [ ] Create each event through admin panel
- [ ] Upload event images
- [ ] Verify all details are correct
- [ ] Update `content/manifest.ts` with event filenames

### Board Members
- [ ] List current board members
- [ ] Create profile for each member
- [ ] Upload photos
- [ ] Set correct display order
- [ ] Mark inactive members as "Active: false"

### Resources
- [ ] List existing resources/guides
- [ ] Create resource entries
- [ ] Upload associated files
- [ ] Organize by category
- [ ] Test file downloads

### Site Settings
- [ ] Update homepage settings
- [ ] Add all contact information
- [ ] Update about page content
- [ ] Verify all links work

## 🎨 Customization

### Admin Panel Branding (Optional)
- [ ] Add custom logo to admin panel
- [ ] Update admin panel colors
- [ ] Add custom preview templates

### Content Collections
- [ ] Review content types (Events, Board, Resources)
- [ ] Add additional fields if needed
- [ ] Remove unused fields
- [ ] Update field descriptions/hints

## 📋 Ongoing Maintenance

### Weekly
- [ ] Check for new events to add
- [ ] Update upcoming events
- [ ] Remove past events

### Monthly
- [ ] Review and update resources
- [ ] Check for broken links
- [ ] Clean up unused images

### Quarterly
- [ ] Archive old events
- [ ] Update board members
- [ ] Review content structure

### Annually
- [ ] Audit all content
- [ ] Update contact information
- [ ] Review team access
- [ ] Clean up large files

## 🐛 Troubleshooting Checklist

If something doesn't work:

### Can't Access Admin Panel
- [ ] Check URL is exactly: `https://psuigsa.github.io/admin/`
- [ ] Clear browser cache
- [ ] Try incognito/private browsing
- [ ] Check GitHub Pages is enabled in repo settings

### Can't Log In
- [ ] Verify authentication is set up (Netlify or GitHub)
- [ ] Check you're using correct login method
- [ ] Verify you have repository access (GitHub)
- [ ] Check invitation was accepted (Netlify)
- [ ] Try different browser

### Changes Not Appearing
- [ ] Wait 2-3 minutes for GitHub Actions
- [ ] Check GitHub Actions tab for errors
- [ ] Hard refresh page (Ctrl+Shift+R)
- [ ] Check content file was created in repo
- [ ] Verify GitHub Pages is still enabled

### Can't Upload Images
- [ ] Check file size (keep under 1MB)
- [ ] Verify image format (JPG, PNG, GIF)
- [ ] Check repository write access
- [ ] Try using external image URL instead

### Config Errors
- [ ] Validate YAML syntax in `config.yml`
- [ ] Check repository name is correct
- [ ] Verify branch name is "main"
- [ ] Review Decap CMS docs for field types

## 📞 Support Resources

- **Documentation**: 
  - `DECAP_CMS_SETUP.md` - Full setup guide
  - `QUICK_START_CMS.md` - Quick reference
  - `VISUAL_GUIDE.md` - Visual workflows
- **Decap CMS Docs**: https://decapcms.org/docs/
- **GitHub Issues**: https://github.com/decaporg/decap-cms/issues
- **Team Contact**: psu.igsa@gmail.com

## 🎉 Launch Checklist

Before announcing CMS to team:

- [ ] All setup steps completed
- [ ] Authentication working
- [ ] At least one test event created
- [ ] Test event visible on website
- [ ] Team members added and tested
- [ ] Documentation shared with team
- [ ] Training session scheduled (if needed)
- [ ] Contact person designated for support

## 📊 Success Metrics

After 1 month, check:
- [ ] How many team members are using CMS?
- [ ] How many events have been created?
- [ ] Are deployments working smoothly?
- [ ] Any common issues to address?
- [ ] Need additional training?

---

## ✅ Final Verification

Once everything is checked:

```
✅ Authentication configured and tested
✅ Admin panel accessible
✅ Team members can log in
✅ Content can be created/edited/deleted
✅ Changes deploy automatically
✅ Documentation shared
✅ Team trained

🎉 CMS is ready to use!
```

**Date Completed**: _______________
**Completed By**: _______________
**Authentication Method Used**: [ ] Netlify  [ ] GitHub Direct

---

**Questions?** See `DECAP_CMS_SETUP.md` or contact the web team.
