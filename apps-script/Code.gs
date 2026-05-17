/**
 * Solar ACM — Lead Capture Web App
 * วาง code นี้ใน Google Apps Script ที่ผูกกับ Google Sheet ของลีด
 *
 * วิธี deploy:
 *   1. เปิด Sheet: https://docs.google.com/spreadsheets/d/1o5QcJN4orz1VjAa9tBQVAoVRlvH4oj4nLjJvrWeRbSM/edit
 *   2. Extensions → Apps Script
 *   3. ลบ code เดิมแล้ววาง file นี้ทั้งหมด
 *   4. กด Save (icon ดิสก์)
 *   5. กด Deploy → New deployment
 *      - Select type: Web app
 *      - Description: "Solar ACM Lead Form v1"
 *      - Execute as: Me
 *      - Who has access: Anyone   ← สำคัญ! ต้องเป็น "Anyone"
 *   6. กด Deploy → Authorize access → ยอมรับสิทธิ์
 *   7. Copy Web app URL ที่ได้ ไปใส่เป็น env var ใน Vercel ชื่อ
 *      NEXT_PUBLIC_QUOTE_SHEET_URL
 */

// ─── CONFIG ──────────────────────────────────────────────
// ถ้าใช้ Sheet ที่ผูกไว้กับ Script (binding) จะใช้ค่านี้ก็พอ:
var SHEET_NAME = "Leads";  // ชื่อแท็บใน Sheet (จะสร้างให้อัตโนมัติถ้ายังไม่มี)

// ถ้าต้องการระบุ Sheet ID แยก (กรณี Apps Script เป็น standalone):
// var SPREADSHEET_ID = "1o5QcJN4orz1VjAa9tBQVAoVRlvH4oj4nLjJvrWeRbSM";

// ─── COLUMN HEADERS ──────────────────────────────────────
var HEADERS = [
  "วันที่",
  "ชื่อ",
  "เบอร์โทร",
  "ค่าไฟ/เดือน",
  "ประเภทบริการ",
  "ระบบไฟ",
  "หมายเหตุ"
];

/**
 * รับข้อมูล POST จากฟอร์ม /quote
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Validate ที่ฝั่ง server เพื่อกัน spam
    if (!data.name || !data.phone) {
      return jsonResponse({ ok: false, error: "Missing required fields" });
    }

    var sheet = getOrCreateSheet();

    // แปลงวันที่จาก ISO เป็น Date object เพื่อให้ Sheet จัด format ได้
    var date = data.date ? new Date(data.date) : new Date();

    sheet.appendRow([
      date,
      String(data.name).slice(0, 200),
      String(data.phone).slice(0, 30),
      Number(data.bill) || 0,
      String(data.service || "").slice(0, 100),
      String(data.phase || "").slice(0, 30),
      String(data.note || "").slice(0, 1000)
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/**
 * รองรับ GET เพื่อให้ test ใน browser ได้
 */
function doGet() {
  return jsonResponse({
    ok: true,
    message: "Solar ACM Lead Capture endpoint is alive",
    timestamp: new Date().toISOString()
  });
}

/**
 * Helper: ดึง sheet ที่ใช้ ถ้าไม่มีก็สร้าง พร้อมใส่ header แถวแรก
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // ถ้าใช้ standalone script ให้เปลี่ยนเป็น:
  // var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // ตรวจสอบและใส่ header ถ้ายังไม่มี
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#2D7D46");
    headerRange.setFontColor("white");
    sheet.setFrozenRows(1);

    // ตั้งความกว้างคอลัมน์
    sheet.setColumnWidth(1, 160);  // วันที่
    sheet.setColumnWidth(2, 180);  // ชื่อ
    sheet.setColumnWidth(3, 130);  // เบอร์โทร
    sheet.setColumnWidth(4, 120);  // ค่าไฟ
    sheet.setColumnWidth(5, 180);  // ประเภทบริการ
    sheet.setColumnWidth(6, 100);  // ระบบไฟ
    sheet.setColumnWidth(7, 300);  // หมายเหตุ
  }

  return sheet;
}

/**
 * Helper: ส่ง JSON response กลับ
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function — กดรันใน Apps Script editor เพื่อทดสอบ
 */
function testAppendRow() {
  var fakePost = {
    postData: {
      contents: JSON.stringify({
        date: new Date().toISOString(),
        name: "ทดสอบ ระบบ",
        phone: "0812345678",
        bill: 3500,
        service: "บ้านพักอาศัย",
        phase: "1 เฟส",
        note: "ทดสอบจาก Apps Script editor"
      })
    }
  };
  var result = doPost(fakePost);
  Logger.log(result.getContent());
}
