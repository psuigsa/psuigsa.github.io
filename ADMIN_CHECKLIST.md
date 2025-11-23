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

### Add Team Members

This will be done by the owner(Nishant Mishra) of the netlify project (`https://app.netlify.com/projects/psuigsa/`)
For Netlify Identity:
- [ ] Go to Netlify → Identity → Invite users
- [ ] Enter team member email addresses
- [ ] Team members receive invitation emails
- [ ] Team members can set passwords
- [ ] Test each team member can log in

Once the members' mail is added, the members have to navigate to the admin panel https://psuigsa.netlify.app/admin/ and continue with github.


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




User's will publish the website there and it will be deployed automatically via GitHub Actions. This can take upto 10 minutes. 

