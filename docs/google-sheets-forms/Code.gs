/** @OnlyCurrentDoc  (limits the script to THIS spreadsheet only; keep this line first) */

/**
 * APTCODER website forms → Google Sheet + email notifications.
 *
 * Paste this whole file into the sheet's Apps Script editor (Extensions → Apps Script),
 * replacing everything there. Then use the "Website Forms" menu in the sheet:
 *   1. "Set up tabs"        – creates one tab per form and the Settings tab (safe to run again).
 *   2. Fill in the Settings tab (team emails, reply-to address).
 *   3. "Send test email"    – checks that emails arrive.
 * Then the account that should send the emails deploys it: Deploy → New deployment → Web app,
 * Execute as: Me, Who has access: Anyone. The web app URL it shows goes into the website.
 *
 * Every submission:
 *   - is added as a new row in its form's tab (with date/time),
 *   - emails the team addresses listed in Settings for that form,
 *   - emails the visitor a short confirmation (in Hindi if they used the site in Hindi), when
 *     confirmations are switched on in Settings. Free Class requests always include an email
 *     address (the website requires it, and so does this script); the other forms ask for one too.
 * The website shows "received" only when this script answers { ok: true }, i.e. after the row
 * was saved. A failed email never loses the row.
 */

/** The forms on the website: tab name, columns (label + field name sent by the website). */
const FORMS = {
  free_class: {
    tab: "Free Class",
    title: "Free class request",
    titleHi: "मुफ़्त क्लास का अनुरोध",
    nameField: "parentName",
    // A request without these is refused (the website requires them too), so every request can
    // be followed up and every parent gets the confirmation email.
    required: ["studentName", "grade", "parentName", "mobile", "email"],
    columns: [
      ["Student's Name", "studentName"],
      ["Class/Grade", "grade"],
      ["Parent/Guardian Name", "parentName"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["City", "city"],
      ["Interested In", "interest"],
      ["Class Language", "language"],
      ["Preferred Time", "preferredTime"],
      ["Message", "message"],
    ],
    thanks:
      "Thank you for requesting a free APTCODER class for {studentName}. Our team will contact you on {mobile} to schedule it.",
    thanksHi:
      "{studentName} के लिए APTCODER की मुफ़्त क्लास का अनुरोध करने के लिए धन्यवाद। हमारी टीम क्लास तय करने के लिए आपसे {mobile} पर संपर्क करेगी।",
  },
  kcc: {
    tab: "KCC",
    title: "KCC registration",
    titleHi: "KCC पंजीकरण",
    nameField: "parentName",
    columns: [
      ["Student's Full Name", "studentName"],
      ["Parent/Guardian Name", "parentName"],
      ["Class/Grade", "grade"],
      ["School", "school"],
      ["Mobile", "mobile"],
      ["Email", "email"],
      ["City", "city"],
    ],
    thanks:
      "Thank you for registering {studentName} for the Kids Coding Community (KCC). Our team will get in touch with you shortly.",
    thanksHi:
      "किड्स कोडिंग कम्युनिटी (KCC) के लिए {studentName} का पंजीकरण करने के लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।",
  },
  contact: {
    tab: "Contact",
    title: "Contact message",
    titleHi: "संपर्क संदेश",
    nameField: "fullName",
    columns: [
      ["Full Name", "fullName"],
      ["Email", "email"],
      ["Phone", "phone"],
      ["I am a", "role"],
      ["Regarding", "topic"],
      ["Message", "message"],
    ],
    thanks: "Thank you for contacting APTCODER. We have received your message and will reply soon.",
    thanksHi: "APTCODER से संपर्क करने के लिए धन्यवाद। हमें आपका संदेश मिल गया है और हम जल्द जवाब देंगे।",
  },
  school_kit: {
    tab: "School Kit",
    title: "School Sales Kit request",
    titleHi: "स्कूल सेल्स किट का अनुरोध",
    nameField: "fullName",
    columns: [
      ["Full Name", "fullName"],
      ["Work Email", "email"],
      ["School / Institution", "school"],
      ["Role", "role"],
    ],
    thanks:
      "Thank you for your interest in APTCODER for {school}. Our team will send you the school information and get in touch.",
    thanksHi:
      "{school} के लिए APTCODER में रुचि दिखाने के लिए धन्यवाद। हमारी टीम आपको स्कूल की जानकारी भेजेगी और संपर्क करेगी।",
  },
  recorded_class: {
    tab: "Recorded Class",
    title: "Free recorded class lead",
    titleHi: "मुफ़्त रिकॉर्डेड क्लास",
    nameField: "parentName",
    columns: [
      ["Parent/Guardian Name", "parentName"],
      ["Email", "email"],
      ["Child's Grade", "grade"],
      ["Previous Experience", "experience"],
      ["Interests", "interest"],
    ],
    thanks: "Thank you for your interest in APTCODER. Our team will be in touch with a suitable class for your child.",
    thanksHi: "APTCODER में रुचि के लिए धन्यवाद। हमारी टीम आपके बच्चे के लिए उपयुक्त क्लास के साथ संपर्क करेगी।",
  },
};

/** Columns added to every tab, after the form's own columns. */
const EXTRA_COLUMNS = ["Site Language", "Page", "Team Email", "Confirmation Email"];

const SETTINGS_TAB = "Settings";
const SETTINGS = [
  ["Setting", "Value", "Notes"],
  ["Sender name", "APTCODER", "Name shown on all emails."],
  ["Reply-to address", "hello@aptcoder.com", "Where customers' replies to confirmation emails go."],
  ["Send customer confirmations", "Yes", "Yes or No."],
  ["Team emails: Free Class", "", "Comma-separated addresses. Empty = no team email."],
  ["Team emails: KCC", "", ""],
  ["Team emails: Contact", "", ""],
  ["Team emails: School Kit", "", ""],
  ["Team emails: Recorded Class", "", ""],
];

// ── Website endpoint ──────────────────────────────────────────────────────────────────────────

/** Opening the web app URL in a browser shows this, which confirms the deployment works. */
function doGet() {
  return json({ ok: true, service: "APTCODER website forms" });
}

/** The website posts { form, data, lang, page } as JSON (sent as text/plain). */
function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json({ ok: false, reason: "invalid" });
  }
  const form = FORMS[body.form];
  const data = body.data && typeof body.data === "object" ? body.data : null;
  if (!form || !data) return json({ ok: false, reason: "invalid" });

  // Spam trap: the website's hidden "website" field is only ever filled by bots.
  if (clean(data.website)) return json({ ok: true });

  const lang = body.lang === "hi" ? "hi" : "en";
  const values = form.columns.map(([, key]) => clean(data[key]).slice(0, 2000));
  const page = clean(body.page).slice(0, 300);
  if (!values.some(Boolean)) return json({ ok: false, reason: "invalid" });
  const required = form.required || [];
  if (required.some((key) => !clean(data[key]))) return json({ ok: false, reason: "invalid" });
  if (required.includes("email") && !isEmail(clean(data.email))) {
    return json({ ok: false, reason: "invalid" });
  }

  // 1. Save the row (the part that must succeed).
  let sheet, row;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    sheet = ensureTab(form);
    sheet.appendRow([
      new Date(),
      ...values.map(forSheet),
      lang === "hi" ? "Hindi" : "English",
      forSheet(page),
      "",
      "",
    ]);
    row = sheet.getLastRow();
  } catch (err) {
    console.error("Could not save submission: " + err);
    return json({ ok: false, reason: "failed" });
  } finally {
    lock.releaseLock();
  }

  // 2. Emails (a failure here is recorded on the row, never loses the submission).
  const settings = readSettings();
  const fields = {};
  form.columns.forEach(([, key], i) => (fields[key] = values[i]));
  const statusCol = 1 + form.columns.length + EXTRA_COLUMNS.indexOf("Team Email") + 1;

  sheet.getRange(row, statusCol).setValue(sendTeamEmail(form, fields, lang, page, sheet, row, settings));
  sheet.getRange(row, statusCol + 1).setValue(sendConfirmation(form, fields, lang, settings));

  return json({ ok: true });
}

// ── Emails ────────────────────────────────────────────────────────────────────────────────────

function sendTeamEmail(form, fields, lang, page, sheet, row, settings) {
  const to = settings["Team emails: " + form.tab];
  if (!to) return "Not set";
  try {
    const name = fields[form.nameField] || "Website visitor";
    const rowsHtml = form.columns
      .filter(([, key]) => fields[key])
      .map(([label, key]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b7280">${esc(label)}</td><td style="padding:4px 0"><b>${esc(fields[key])}</b></td></tr>`)
      .join("");
    const link = `${SpreadsheetApp.getActiveSpreadsheet().getUrl()}#gid=${sheet.getSheetId()}&range=A${row}`;
    MailApp.sendEmail({
      to,
      subject: `New ${form.title}: ${name}`,
      name: settings["Sender name"] || "APTCODER",
      ...(isEmail(fields.email) ? { replyTo: fields.email } : {}),
      htmlBody:
        `<p>A new <b>${esc(form.title)}</b> came in from the website${lang === "hi" ? " (Hindi)" : ""}.</p>` +
        `<table style="font-family:Arial,sans-serif;font-size:14px">${rowsHtml}</table>` +
        (page ? `<p style="color:#6b7280;font-size:12px">Page: ${esc(page)}</p>` : "") +
        `<p><a href="${link}">Open in the sheet</a></p>`,
    });
    return "Sent";
  } catch (err) {
    console.error("Team email failed: " + err);
    return "Failed: " + String(err).slice(0, 100);
  }
}

function sendConfirmation(form, fields, lang, settings) {
  if (String(settings["Send customer confirmations"] || "").toLowerCase() !== "yes") return "Off";
  if (!isEmail(fields.email)) return "No email given";
  try {
    const hi = lang === "hi";
    const name = fields[form.nameField] || "";
    const greeting = hi ? (name ? `नमस्ते ${name},` : "नमस्ते,") : name ? `Hi ${name},` : "Hello,";
    const message = fill(hi ? form.thanksHi : form.thanks, fields);
    const signOff = hi ? "धन्यवाद,<br>टीम APTCODER" : "Warm regards,<br>Team APTCODER";
    const replyTo = settings["Reply-to address"];
    MailApp.sendEmail({
      to: fields.email,
      subject: hi ? `हमें आपका ${form.titleHi} मिल गया है` : `We've received your ${form.title.toLowerCase()}`,
      name: settings["Sender name"] || "APTCODER",
      ...(isEmail(replyTo) ? { replyTo } : {}),
      htmlBody:
        `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111827">` +
        `<p>${esc(greeting)}</p><p>${esc(message)}</p><p>${signOff}</p></div>`,
    });
    return "Sent";
  } catch (err) {
    console.error("Confirmation email failed: " + err);
    return "Failed: " + String(err).slice(0, 100);
  }
}

// ── Sheet setup (menu) ───────────────────────────────────────────────────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Website Forms")
    .addItem("Set up tabs", "setUpTabs")
    .addItem("Send test email", "sendTestEmail")
    .addToUi();
}

/** Creates the Settings tab and one tab per form, with headers. Safe to run more than once. */
function setUpTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let settings = ss.getSheetByName(SETTINGS_TAB);
  if (!settings) {
    settings = ss.insertSheet(SETTINGS_TAB, 0);
    settings.getRange(1, 1, SETTINGS.length, 3).setValues(SETTINGS);
    settings.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#FFE8E0");
    settings.setColumnWidth(1, 240).setColumnWidth(2, 360).setColumnWidth(3, 380);
    settings.setFrozenRows(1);
  }
  Object.keys(FORMS).forEach((key) => ensureTab(FORMS[key]));
  // Remove the empty default "Sheet1" if it is still there.
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);
  SpreadsheetApp.getUi().alert("Tabs are ready. Now fill in the Settings tab.");
}

/** Sends a sample team email to the Free Class team addresses, to check delivery. */
function sendTestEmail() {
  const settings = readSettings();
  const to = settings["Team emails: Free Class"];
  if (!to) {
    SpreadsheetApp.getUi().alert('Add an address next to "Team emails: Free Class" in Settings first.');
    return;
  }
  MailApp.sendEmail({
    to,
    subject: "APTCODER website forms: test email",
    name: settings["Sender name"] || "APTCODER",
    htmlBody: "<p>This is a test. Website form notifications will arrive like this.</p>",
  });
  SpreadsheetApp.getUi().alert("Test email sent to: " + to);
}

function ensureTab(form) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(form.tab);
  if (!sheet) {
    sheet = ss.insertSheet(form.tab);
    const headers = ["Submitted At", ...form.columns.map(([label]) => label), ...EXTRA_COLUMNS];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#FFE8E0");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("dd mmm yyyy, hh:mm");
  }
  return sheet;
}

function readSettings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTINGS_TAB);
  const result = {};
  if (!sheet) return result;
  sheet
    .getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 2)
    .getValues()
    .forEach(([key, value]) => {
      if (key) result[String(key).trim()] = String(value).trim();
    });
  return result;
}

// ── Helpers ───────────────────────────────────────────────────────────────────────────────────

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

/** Text from the website, trimmed. */
function clean(value) {
  return value === undefined || value === null ? "" : String(value).trim();
}

/** Stored as plain text: a leading = + - @ (e.g. "+91…") is never treated as a formula. */
function forSheet(text) {
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function esc(value) {
  return String(value).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function fill(template, fields) {
  return template.replace(/\{(\w+)\}/g, (_, key) => fields[key] || "");
}
