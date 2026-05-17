# Phase 2 — Lead Capture Form: คู่มือ Deploy

## ภาพรวม

Phase 2 เพิ่มหน้า `/quote` (ฟอร์มขอใบเสนอราคา) และ `/quote/thank-you` ลงในเว็บ Solar ACM
ข้อมูลที่ลูกค้ากรอก + ภาพบิลค่าไฟ (ถ้ามี) จะถูกส่งเข้า Google Sheet + Google Drive โดยตรงผ่าน Google Apps Script Web App

```
ผู้ใช้กรอกฟอร์ม + แนบรูปบิล
        │
        ▼
   POST (JSON + base64 image)
        │
        ▼
  Apps Script Web App
        ├──► อัปโหลดรูปเข้า Drive folder "Solar ACM - Bill Uploads"
        └──► appendRow ลง Sheet "Leads" (พร้อม URL รูปในคอลัมน์ H)
```

## ไฟล์ที่ต้อง commit (Phase 2)

| ไฟล์ | หน้าที่ |
|------|---------|
| `app/page.js` | แก้ปุ่ม Get Free Quote ที่ nav + ปุ่มที่ Calculator step 4 → /quote |
| `app/residential/page.js` | แก้ปุ่ม "ขอใบเสนอราคา" 3 จุด → /quote |
| `app/industrial/page.js` | แก้ปุ่ม "ขอใบเสนอราคา" 3 จุด → /quote |
| `app/bess/page.js` | แก้ปุ่ม "ขอใบเสนอราคา" 3 จุด → /quote |
| `app/epc/page.js` | แก้ปุ่ม CTA 3 จุด → /quote |
| `app/quote/page.js` | หน้าฟอร์ม (รวม upload บิลค่าไฟ + base64) |
| `app/quote/layout.js` | SEO metadata ของ /quote |
| `app/quote/thank-you/page.js` | หน้าขอบคุณ |
| `app/quote/thank-you/layout.js` | metadata (noindex) |
| `app/sitemap.js` | sitemap รวม /quote |
| `apps-script/Code.gs` | Apps Script v2 (Drive upload + คอลัมน์บิลค่าไฟ) |

## ขั้นตอน Setup ครั้งแรก (Setup จากศูนย์ — 10 นาที)

### 1. Deploy Google Apps Script

1. เปิด Sheet ของคุณ: <https://docs.google.com/spreadsheets/d/1o5QcJN4orz1VjAa9tBQVAoVRlvH4oj4nLjJvrWeRbSM/edit>
2. เมนูบน → **Extensions → Apps Script**
3. ลบ code ตัวอย่างทั้งหมด แล้ว copy เนื้อหาจาก `apps-script/Code.gs` มาวาง
4. กด **Save** (ดิสก์) แล้วตั้งชื่อโปรเจกต์ เช่น `Solar ACM Leads`
5. กด **Deploy → New deployment** (ขวาบน)
6. คลิกฟันเฟือง ⚙️ ข้าง "Select type" → เลือก **Web app**
7. กรอกค่า:
   - **Description:** `Solar ACM Lead Form v2`
   - **Execute as:** `Me (your@gmail.com)`
   - **Who has access:** `Anyone` ⚠️ **สำคัญมาก!**
8. กด **Deploy**
9. หน้าต่างขออนุญาตจะเด้งขึ้น → **Authorize access** → เลือก Google account → **Advanced → Go to [Project] (unsafe)** → **Allow**
   - ครั้งนี้ระบบจะขอสิทธิ์ Drive เพิ่ม เพราะมีการอัปโหลดไฟล์
10. คัดลอก **Web app URL** ที่ได้ ตัวอย่าง:
    ```
    https://script.google.com/macros/s/AKfycby...long-string.../exec
    ```

### 2. ทดสอบ Endpoint ก่อนเสียบเว็บ

เปิด URL ที่ copy มาในเบราว์เซอร์ ควรเห็น:
```json
{"ok":true,"message":"Solar ACM Lead Capture endpoint is alive (v2 with bill upload)","timestamp":"..."}
```

ถ้าเห็นแบบนี้แสดงว่า deploy สำเร็จ ✅

### 3. ทดสอบ Drive Upload (Optional แต่แนะนำ)

ก่อน deploy เว็บ ลองทดสอบจาก Apps Script editor ก่อน:
1. ในหน้า Apps Script ที่ open อยู่ เลือกฟังก์ชัน `testAppendRowWithFile` จาก dropdown
2. กด **Run** ▶️
3. หลังรันเสร็จ:
   - เปิด Google Drive → ควรเห็นโฟลเดอร์ใหม่ **"Solar ACM - Bill Uploads"** มีไฟล์รูป 1 รูปอยู่ข้างใน
   - กลับมาที่ Sheet → แท็บ "Leads" → ควรมีแถวข้อมูลทดสอบพร้อม URL ในคอลัมน์ "บิลค่าไฟ"

### 4. เพิ่ม Environment Variable บน Vercel

1. ไปที่ <https://vercel.com> → เลือกโปรเจกต์ **WebSiteSolarACM-**
2. **Settings → Environment Variables**
3. เพิ่มตัวแปรใหม่:
   - **Name:** `NEXT_PUBLIC_QUOTE_SHEET_URL`
   - **Value:** Web app URL ที่ copy มา
   - **Environment:** เลือกทั้ง Production, Preview, Development
4. กด **Save**

### 5. Commit & Push ไป GitHub

```bash
cd C:\Users\ChaiyapornD\solar-acm
git add app apps-script
git commit -m "Phase 2 v2: Lead form with bill image upload + redirect all CTAs to /quote"
git push
```

Vercel จะ auto-deploy หลังจาก push (1-2 นาที)

### 6. ทดสอบ End-to-End

หลัง deploy เสร็จ:
1. เข้า `https://your-domain/quote` (หรือกดปุ่ม "Get Free Quote" จากหน้าใดก็ได้)
2. กรอกข้อมูล + แนบรูปบิลค่าไฟ (ไฟล์ JPG/PNG, max 5MB)
3. กดส่ง → ควรเด้งไป `/quote/thank-you`
4. กลับมาที่ Google Sheet → ควรเห็นแถวใหม่ในแท็บ "Leads" พร้อม URL ในคอลัมน์ H
5. คลิก URL → ควรเปิดรูปบิลที่อัปโหลดได้

## อัปเดต Apps Script เวอร์ชันใหม่ (Migrate v1 → v2)

ถ้าคุณเคย deploy v1 ไว้แล้ว วิธีอัปเกรดเป็น v2:

1. เปิด Apps Script editor → แทนที่ code ทั้งหมดด้วย `apps-script/Code.gs` ใหม่
2. **Save**
3. **Deploy → Manage deployments** → กดดินสอข้าง deployment เดิม
4. เลือก **Version: New version** → ใส่ description เช่น `v2 - add bill upload`
5. กด **Deploy**
6. ระบบจะขอ permission Drive เพิ่ม → **Authorize access** → Allow

⚠️ **สำคัญ:** ต้อง deploy ผ่าน "Manage deployments" ไม่ใช่ "New deployment" เพื่อให้ **URL เดิม** ยังใช้ได้ (ไม่ต้องเปลี่ยน env var ใน Vercel)

หลัง deploy v2 แล้ว ครั้งแรกที่มีลูกค้าส่งฟอร์ม:
- ถ้า Sheet เดิมยังไม่มีคอลัมน์ "บิลค่าไฟ" → script จะเติม header ในคอลัมน์ H ให้อัตโนมัติ
- โฟลเดอร์ "Solar ACM - Bill Uploads" จะถูกสร้างใน Drive ของคุณ

## Troubleshooting

| ปัญหา | สาเหตุ / แก้ไข |
|------|----------------|
| ส่งฟอร์มแล้วไม่มีข้อมูลเข้า Sheet | เช็คว่า "Who has access" = **Anyone** (ไม่ใช่ "Only myself") |
| ข้อมูลเข้าแต่ URL บิลว่าง | ลูกค้าไม่ได้แนบรูป (เป็น optional) — ปกติครับ |
| คอลัมน์ "บิลค่าไฟ" แสดง "อัปโหลดล้มเหลว: ..." | Drive permission ยังไม่ได้ให้สิทธิ์ — Redeploy แล้ว Authorize ใหม่ |
| Console เห็น CORS error | ปกติฟอร์มใช้ `mode: "no-cors"` ไม่ควรเจอ — ถ้าเจอ คงเปลี่ยน URL ผิด |
| รูปอัปโหลดแล้วเปิดดูไม่ได้ (403) | sharing permission ไม่ถูก — script ตั้ง `ANYONE_WITH_LINK` ให้อัตโนมัติ ลองรัน `testAppendRowWithFile` แล้วเปิด URL ทดสอบ |
| ส่งฟอร์มแล้ว timeout / fail (ไฟล์ใหญ่) | จำกัด max 5MB แล้ว — ถ้ายังเจอ คือเน็ตช้า ลูกค้าควรลองใหม่ |
| เปลี่ยน Web App URL แล้วเว็บไม่ทำงาน | อย่าลืม **Redeploy ใน Vercel** เพื่อให้ env var ใหม่มีผล |

## เพิ่ม Email Notification (Optional)

ถ้าต้องการให้ส่งอีเมลแจ้งทุกครั้งที่มี lead ใหม่ เพิ่มบรรทัดนี้ใน `Code.gs` ตรงท้ายฟังก์ชัน `doPost` ก่อน `return jsonResponse(...)`:

```javascript
try {
  MailApp.sendEmail({
    to: "mon-attention@hotmail.com",
    subject: "🌞 Solar ACM — มี Lead ใหม่: " + data.name,
    body: "ชื่อ: " + data.name +
          "\nเบอร์โทร: " + data.phone +
          "\nค่าไฟ: " + (Number(data.bill) || 0) +
          "\nบริการ: " + data.service +
          "\nระบบไฟ: " + data.phase +
          "\nหมายเหตุ: " + (data.note || "-") +
          "\nบิลค่าไฟ: " + (billUrl || "-")
  });
} catch (mailErr) {
  Logger.log("Mail send failed: " + mailErr);
}
```

แล้ว Deploy ใหม่ (Manage deployments → New version)
