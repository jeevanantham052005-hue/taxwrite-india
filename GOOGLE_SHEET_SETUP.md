# TaxWrite New Leads - Google Sheet Setup (No PHP)
**Your Sheet:** https://docs.google.com/spreadsheets/d/1peFMaxnRVB5bAAF1yr0SUfVSp_E8YOu7OdIhx3uD0Yg/edit?gid=0#gid=0
**Sheet ID:** 1peFMaxnRVB5bAAF1yr0SUfVSp_E8YOu7OdIhx3uD0Yg
**Desired Title:** taxwrite new leads


Your form will save all client data to an Excel sheet titled **"taxwrite new leads"** and also send email to **official@taxwrite.org** - 100% without PHP.

## Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new Blank spreadsheet
3. Rename it to: **taxwrite new leads** (exact title)
4. In first row, add these headers (copy paste):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | Mobile Number | Email | Business Type | Service Required | Message | Page URL | IP |

The Apps Script will auto-create headers if missing, but create manually for clarity.

5. Note the Sheet ID from URL:
   `https://docs.google.com/spreadsheets/d/THIS_IS_SHEET_ID/edit`

## Step 2: Add Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code
3. Paste the code from `apps-script/Code.gs` (included in this zip)
4. **IMPORTANT:** At top of code, replace:
   ```js
   const SHEET_NAME = "taxwrite new leads";
   const EMAIL_TO = "official@taxwrite.org";
   ```
   (Already set correctly)

5. Click **Save** (💾 icon)

## Step 3: Deploy as Web App

1. In Apps Script, click **Deploy → New deployment**
2. Click ⚙️ → Select **Web app**
3. Settings:
   - Description: `TaxWrite Leads`
   - Execute as: **Me** (your Gmail)
   - Who has access: **Anyone** (important for form to work without login)
4. Click **Deploy**
5. Google will ask for authorization → Click **Authorize access** → Choose your Gmail → **Allow**
6. Copy the **Web app URL** – looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 4: Connect to Website

1. Open `js/script.js`
2. Find line:
   ```js
   const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your copied Web app URL
4. Save and re-upload site

## Step 5: Test

1. Go to your live `contact.html`
2. Fill form and submit
3. Check Google Sheet **taxwrite new leads** – new row should appear in 2-3 seconds
4. Check email `official@taxwrite.org` – you will get email notification

## How it Works (No PHP)

```
User fills form → JS fetch() → Google Apps Script Web App → 
1. Saves to Sheet "taxwrite new leads" 
2. Sends email to official@taxwrite.org
```

- **No server needed** – Google handles everything
- **Free forever** – Google Sheets + Apps Script free quota is huge
- **Excel download:** In Google Sheet → File → Download → Microsoft Excel (.xlsx)
- **Secure:** Honeypot field _honey blocks bots, validation in JS + Apps Script

## Troubleshooting

- **Form not saving?** Check Web app URL is correct and deployed as "Anyone"
- **No email?** Check spam folder in official@taxwrite.org, and check Apps Script → Executions logs
- **CORS error?** Make sure you deployed new version after code changes (Deploy → Manage deployments → Edit → New version)

## Current Fallback

If Google Sheet URL not set, form still works via FormSubmit → email to official@taxwrite.org. Once you add Google URL, it will save to BOTH Sheet and Email.

Need help? Share your Web app URL and I can test it.
