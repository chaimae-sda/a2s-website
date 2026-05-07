# Google Apps Script Setup Guide

## Step 1: Create a Google Sheet to Store Form Data

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create" to make a new spreadsheet
3. Name it something like "A2S Form Submissions"
4. **Copy the Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_ID]/edit
   ```

## Step 2: Create the Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "Create new project"
3. Delete the default code and paste the code from `GOOGLE_APPS_SCRIPT.js`
4. Replace `'YOUR_SPREADSHEET_ID'` with your actual Spreadsheet ID
5. **Save** the project (give it a name like "A2S Form Handler")

## Step 3: Deploy as Web App

1. Click the **"Deploy"** button (top-right)
2. Click **"New deployment"**
3. Select **type: "Web app"**
4. Set "Execute as" to your Google account
5. Set "Who has access" to **"Anyone"** (important!)
6. Click **"Deploy"**
7. A popup will appear with your deployment ID
8. Click "Copy" on the URL - it looks like:
   ```
   https://script.google.com/macros/s/[DEPLOYMENT_ID]/userwithlogin
   ```

## Step 4: Update Your JoinUs Form

Replace the URL in `src/pages/JoinUs.jsx` with your new deployment URL.

The form will now submit data to your Google Sheet!

## Important Notes

- **Permissions**: First deployment may ask for permissions - authorize the script
- **Data Storage**: All submissions are stored in the Google Sheet you created
- **Multiple Deployments**: If you redeploy, you'll get a new URL
- **Testing**: Run the `testFormSubmission()` function in Apps Script editor to verify it works

## Verification

1. Submit a test form from your website
2. Go to your Google Sheet
3. You should see the data appear in the corresponding sheet (Contact Submissions or JoinUs Submissions)
