/**
 * Solar ACM — Lead Capture Web App (v2 — with bill image upload)
 * วาง code นี้ใน Google Apps Script ที่ผูกกับ Google Sheet ของลีด
 *
 * วิธี deploy:
 *   1. เปิด Sheet: https://docs.google.com/spreadsheets/d/1o5QcJN4orz1VjAa9tBQVAoVRlvH4oj4nLjJvrWeRbSM/edit
 *   2. Extensions → Apps Script
 *   3. ลบ code เดิมแล้ววาง file นี้ทั้งหมด
 *   4. กด Save (icon ดิสก์)
 *   5. กด Deploy → Manage deployments → กดดินสอข้าง deployment เดิม
 *      → Version: "New version" → กด Deploy
 *      (URL เดิมไม่เปลี่ยน ไม่ต้องอัปเดต env var ใน Vercel)
 *   6. ครั้งแรกระบบจะขอ permission เพิ่ม (เพราะใช้ Drive แล้ว) → Authorize access
 *
 * สิ่งที่ script นี้ทำ:
 *   1. รับ JSON จากฟอร์ม /quote
 *   2. ถ้ามีไฟล์ภาพบิล → อัปโหลดเข้า Drive folder "Solar ACM - Bill Uploads"
 *      (สร้างให้อัตโนมัติถ้ายังไม่มี) → ตั้ง sharing แบบ anyone with link
 *   3. append แถวลง Sheet พร้อม URL ของรูปบิล (คอลัมน์ H)
 */

// ─── CONFIG ──────────────────────────────────────────────
var SHEET_NAME = "Leads";
var DRIVE_FOLDER_NAME = "Solar ACM - Bill Uploads";

// ─── COLUMN HEADERS ──────────────────────────────────────
var HEADERS = [
  "วันที่",
  "ชื่อ",
  "เบอร์โทร",
  "ค่าไฟ/เดือน",
  "ประเภทบริการ",
  "ระบบไฟ",
  "หมายเหตุ",
  "บิลค่าไฟ"
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
    ensureBillColumnHeader(sheet); // อัปเกรด sheet เก่าให้มีคอลัมน์ "บิลค่าไฟ"

    var date = data.date ? new Date(data.date) : new Date();

    // อัปโหลดไฟล์บิลถ้ามี
    var billUrl = "";
    if (data.file && data.file.data) {
      try {
        billUrl = uploadBillToDrive(data.file, data.name, date);
      } catch (uploadErr) {
        // ถ้าอัปโหลดล้มเหลว ยังต้องบันทึก lead ลง sheet
        Logger.log("File upload failed: " + uploadErr);
        billUrl = "อัปโหลดล้มเหลว: " + String(uploadErr).slice(0, 200);
      }
    }

    sheet.appendRow([
      date,
      String(data.name).slice(0, 200),
      String(data.phone).slice(0, 30),
      Number(data.bill) || 0,
      String(data.service || "").slice(0, 100),
      String(data.phase || "").slice(0, 30),
      String(data.note || "").slice(0, 1000),
      billUrl
    ]);

    return jsonResponse({ ok: true, billUrl: billUrl });
  } catch (err) {
    Logger.log("doPost error: " + err);
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/**
 * GET endpoint — เพื่อให้ test ใน browser ได้
 */
function doGet() {
  return jsonResponse({
    ok: true,
    message: "Solar ACM Lead Capture endpoint is alive (v2 with bill upload)",
    timestamp: new Date().toISOString()
  });
}

/**
 * Helper: ดึง sheet ที่ใช้ ถ้าไม่มีก็สร้าง พร้อมใส่ header แถวแรก
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

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
    sheet.setColumnWidth(8, 280);  // บิลค่าไฟ
  }

  return sheet;
}

/**
 * Helper: ถ้า sheet เก่าไม่มีคอลัมน์ "บิลค่าไฟ" ให้เพิ่มในแถวแรก
 * ใช้สำหรับ upgrade จาก v1 → v2
 */
function ensureBillColumnHeader(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < HEADERS.length) {
    // เติม header ที่ขาด
    for (var i = lastCol; i < HEADERS.length; i++) {
      var col = i + 1;
      var cell = sheet.getRange(1, col);
      cell.setValue(HEADERS[i]);
      cell.setFontWeight("bold");
      cell.setBackground("#2D7D46");
      cell.setFontColor("white");
    }
    sheet.setColumnWidth(8, 280);
  }
}

/**
 * Helper: get or create Drive folder
 */
function getOrCreateFolder() {
  var folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

/**
 * Helper: upload ภาพบิลจาก base64 → Drive → คืนค่า URL
 */
function uploadBillToDrive(fileObj, customerName, date) {
  // fileObj: { name, type, size, data (base64) }
  var bytes = Utilities.base64Decode(fileObj.data);
  var mime = fileObj.type || "image/jpeg";

  // สร้างชื่อไฟล์: YYYYMMDD-HHMMSS_ชื่อลูกค้า_originalname.ext
  var stamp = Utilities.formatDate(date, "Asia/Bangkok", "yyyyMMdd-HHmmss");
  var cleanName = String(customerName || "ลูกค้า")
    .replace(/[\/\\\?\%\*\:\|\"\<\>]/g, "")
    .slice(0, 50);
  var originalName = String(fileObj.name || "bill.jpg")
    .replace(/[\/\\\?\%\*\:\|\"\<\>]/g, "")
    .slice(0, 80);

  var filename = stamp + "_" + cleanName + "_" + originalName;

  var blob = Utilities.newBlob(bytes, mime, filename);
  var folder = getOrCreateFolder();
  var file = folder.createFile(blob);

  // ตั้ง sharing: anyone with link can view
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return file.getUrl();
}

/**
 * Helper: ส่ง JSON response กลับ
 */
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ─────────────────────────────────────────────────────────
 *  TEST FUNCTIONS — กดรันใน Apps Script editor เพื่อทดสอบ
 * ───────────────────────────────────────────────────────── */

/**
 * ทดสอบ append แถวโดยไม่มีไฟล์
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
        note: "ทดสอบจาก Apps Script editor (ไม่มีไฟล์)"
      })
    }
  };
  var result = doPost(fakePost);
  Logger.log(result.getContent());
}

/**
 * ทดสอบ append แถวพร้อมไฟล์ภาพ (รูปสีแดงขนาด 1x1 px)
 */
function testAppendRowWithFile() {
  // PNG ขนาด 1x1 pixel สีแดง (base64)
  var redPixelPng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

  var fakePost = {
    postData: {
      contents: JSON.stringify({
        date: new Date().toISOString(),
        name: "ทดสอบ พร้อมรูป",
        phone: "0898765432",
        bill: 5500,
        service: "ธุรกิจ/อุตสาหกรรม",
        phase: "3 เฟส",
        note: "ทดสอบส่งไฟล์ภาพ 1x1 px",
        file: {
          name: "test-bill.png",
          type: "image/png",
          size: 70,
          data: redPixelPng
        }
      })
    }
  };
  var result = doPost(fakePost);
  Logger.log(result.getContent());
}

/**
 * ทดสอบ Drive folder ว่าสร้างได้ไหม
 */
function testCreateFolder() {
  var folder = getOrCreateFolder();
  Logger.log("Folder URL: " + folder.getUrl());
  Logger.log("Folder ID: " + folder.getId());
}
