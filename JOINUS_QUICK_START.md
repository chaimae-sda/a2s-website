# JoinUs Form - Quick Setup Guide

## What Was Done

✅ Created Google Apps Script code (`GOOGLE_APPS_SCRIPT.js`)
✅ Updated JoinUs form to actually submit data
✅ Project builds without errors

## Next Steps (You Need to Do These)

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. Name it: `A2S Form Submissions`
4. Copy the Spreadsheet ID from URL

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create new project
3. Copy code from `GOOGLE_APPS_SCRIPT.js` file in your project root
4. Replace `'YOUR_SPREADSHEET_ID'` with your Sheet ID (from step 1)
5. Save the project

### 3. Deploy as Web App
1. Click **Deploy** button
2. Select **New deployment**
3. Type: **Web app**
4. Execute as: Your Google account
5. Who has access: **Anyone**
6. Click Deploy
7. **Copy the deployment URL** (looks like `https://script.google.com/macros/s/[ID]/userwithlogin`)

### 4. Update Your Website
1. Open `src/pages/JoinUs.jsx`
2. Find this line at the top:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/userwithlogin';
   ```
3. Replace `YOUR_DEPLOYMENT_ID` with your actual deployment ID from step 3

### 5. Test It
1. Run `npm run dev` locally
2. Go to `/join-us` page
3. Fill out the form and submit
4. Check your Google Sheet - data should appear!

## How It Works

```
User fills form → Submits → Your website → Google Apps Script → Google Sheet
                                             (stores data)
```

## Current Status

- **Contact Form**: Already working with existing Google Apps Script
- **JoinUs Form**: Ready to use with new Google Apps Script (just needs deployment URL)

---

**Questions?** Check `SETUP_GUIDE.md` for detailed instructions.
