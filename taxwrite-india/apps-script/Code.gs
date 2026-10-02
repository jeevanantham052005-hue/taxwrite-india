/**
 * TaxWrite India - New Leads to Google Sheet "taxwrite new leads"
 * No PHP needed - saves form data to Sheet + emails to official@taxwrite.org
 * Deploy as Web App with access: Anyone
 */

const SHEET_NAME = "taxwrite new leads"; // Your sheet: https://docs.google.com/spreadsheets/d/1peFMaxnRVB5bAAF1yr0SUfVSp_E8YOu7OdIhx3uD0Yg/edit
const EMAIL_TO = "official@taxwrite.org";
const EMAIL_CC = ""; // add second email if needed, e.g. "backup@gmail.com"

function doPost(e) {
  try {
    // Get active spreadsheet (the one containing this script)
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if not exists
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Full Name", "Mobile Number", "Email", "Business Type", "Service Required", "Message", "Page URL", "IP Address", "User Agent"]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#0D2740").setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Full Name", "Mobile Number", "Email", "Business Type", "Service Required", "Message", "Page URL", "IP Address", "User Agent"]);
    }

    // Parse incoming data (FormData from JS)
    const data = e.parameter;
    
    // Honeypot check - if _honey filled, it's a bot
    if (data._honey && data._honey.trim() !== "") {
      return ContentService.createTextOutput(JSON.stringify({result: "success", message: "Bot detected"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const timestamp = new Date();
    const fullName = (data.name || "").toString().trim();
    const mobile = (data.phone || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const businessType = (data.businessType || "").toString().trim();
    const service = (data.service || "").toString().trim();
    const message = (data.message || "").toString().trim();
    const pageUrl = (data.page_url || data.pageUrl || "").toString().trim();
    const ip = (e.parameters && e.parameters.ip) ? e.parameters.ip : "";
    
    // Basic validation
    if (!fullName || !mobile || !service) {
      return ContentService.createTextOutput(JSON.stringify({result: "error", message: "Missing required fields"}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append to sheet
    sheet.appendRow([
      timestamp,
      fullName,
      mobile,
      email,
      businessType,
      service,
      message,
      pageUrl,
      ip,
      data.userAgent || ""
    ]);

    // Auto-resize columns for readability
    try {
      sheet.autoResizeColumns(1, 10);
    } catch(err) {}

    // Send email notification to official@taxwrite.org
    try {
      const subject = `New Lead: ${fullName} - ${service} | TaxWrite India`;
      const body = `
New consultation request received from TaxWrite India website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${fullName}
Mobile: +91 ${mobile} (Call: tel:+91${mobile}, WhatsApp: https://wa.me/91${mobile})
Email: ${email || "Not provided"}
Business Type: ${businessType || "Not specified"}
Service Required: ${service}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
META
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Time: ${timestamp.toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}
Page: ${pageUrl}
Sheet: ${SHEET_NAME}

Quick Actions:
- Call: tel:+91${mobile}
- WhatsApp: https://wa.me/91${mobile}
- Email: mailto:${email}

This lead is saved in Google Sheet "${SHEET_NAME}".
      `.trim();

      MailApp.sendEmail({
        to: EMAIL_TO,
        cc: EMAIL_CC,
        subject: subject,
        body: body
      });
    } catch(emailErr) {
      console.error("Email failed:", emailErr);
      // Don't fail the whole request if email fails, sheet is saved
    }

    // Return success JSON
    return ContentService.createTextOutput(JSON.stringify({result: "success", message: "Lead saved"}))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });

  } catch(err) {
    console.error("doPost error:", err);
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET for testing
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({result: "success", message: "TaxWrite Leads API is running. Use POST to submit leads.", sheet: SHEET_NAME, email: EMAIL_TO}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Allow CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}
