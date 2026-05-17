# Phase 2 — Lead Capture Form: คู่มือ Deploy

## ภาพรวม

Phase 2 เพิ่มหน้า `/quote` (ฟอร์มขอใบเสนอราคา) และ `/quote/thank-you` ลงในเว็บ Solar ACM
ข้อมูลที่ลูกค้ากรอกจะส่งเข้า Google Sheet โดยตรงผ่าน Google Apps Script Web App

```
ผู้ใช้กรอกฟอร์ม  →  POST  →  Apps Script Web App  →  appendRow ลง Google Sheet
```

## ไฟล์ที่สร้างใหม่

| ไฟล์ | หน้าที่ |
|------|---------|
| `app/quote/page.js` | หน้าฟอร์ม (client component) |
| `app/quote/layout.js` | SEO metadata ของหน้า /quote |
| `app/quote/thank-you/page.js` | หน้าขอบคุณหลังส่งฟอร์ม |
| `app/quote/thank-you/layout.js` | metadata (noindex) |
| `apps-script/Code.gs` | Apps Script Web App code |

## ขั้นตอน Setup (ทำครั้งเดียว)

### 1. Deploy Google Apps Script (5 นาที)

1. เปิด Sheet ของคุณ: <https://docs.google.com/spreadsheets/d/1o5QcJN4orz1VjAa9tBQVAoVRlvH4oj4nLjJvrWeRbSM/edit>
2. ที่เมนูบน เลือก **Extensions → Apps Script**
3. ในหน้าต่าง editor ลบ code ตัวอย่างทั้งหมด
4. เปิดไฟล์ `apps-script/Code.gs` ของโปรเจกต์นี้ คัดลอกทั้งหมดไปวาง
5. กดไอคอน **Save** (รูปดิสก์) แล้วตั้งชื่อโปรเจกต์ เช่น "Solar ACM Leads"
6. กดปุ่ม **Deploy → New deployment** (ขวาบน)
7. กดรูปฟันเฟือง ⚙️ ข้าง "Select type" → เลือก **Web app**
8. กรอกค่า:
   - **Description:** `Solar ACM Lead Form v1`
   - **Execute as:** `Me (your@gmail.com)`
   - **Who has access:** `Anyone` ⚠️ **สำคัญมาก!**
9. กด **Deploy**
10. หน้าต่างขออนุญาตจะเด้งขึ้น — กด **Authorize access** → เลือก Google account → กด **Advanced → Go to [Project] (unsafe)** → **Allow**
11. คัดลอก **Web app URL** ที่ได้ ตัวอย่าง:
    ```
    https://script.google.com/macros/s/AKfycby...long-string.../exec
    ```

### 2. ทดสอบ Endpoint ก่อนเสียบเว็บ

เปิด URL ที่ copy มาในเบราว์เซอร์ ควรเห็น:
```json
{"ok":true,"message":"Solar ACM Lead Capture endpoint is alive","timestamp":"..."}
```

ถ้าเห็นแบบนี้แสดงว่า deploy สำเร็จ ✅

### 3. เพิ่ม Environment Variable บน Vercel

1. ไปที่ <https://vercel.com> → เลือกโปรเจกต์ **WebSiteSolarACM-**
2. **Settings → Environment Variables**
3. เพิ่มตัวแปรใหม่:
   - **Name:** `NEXT_PUBLIC_QUOTE_SHEET_URL`
   - **Value:** Web app URL ที่ copy มาจากขั้นตอนที่ 1
   - **Environment:** เลือกทั้ง Production, Preview, Development
4. กด **Save**

### 4. Deploy เว็บ

```bash
cd C:\Users\ChaiyapornD\solar-acm
git add app/quote apps-script
git commit -m "Phase 2: Add lead capture form at /quote with Google Sheets integration"
git push
```

Vercel จะ auto-deploy ตามปกติ หลังจาก deploy เสร็จเข้าไปที่ `https://your-domain/quote` ลองกรอกฟอร์มเพื่อทดสอบ

### 5. ตรวจสอบว่าข้อมูลเข้า Sheet จริง

1. กรอกฟอร์มทดสอบ
2. กดส่ง → ควรเด้งไปหน้า `/quote/thank-you`
3. กลับมาที่ Google Sheet — ควรเห็นแท็บใหม่ชื่อ **Leads** พร้อมแถวข้อมูลทดสอบ

## หาก Update Apps Script ในอนาคต

ถ้าแก้ code ใน Apps Script ต้อง **Deploy ใหม่** ทุกครั้ง:
- กด **Deploy → Manage deployments** → กดรูปดินสอข้าง deployment เดิม → เลือก **Version: New version** → **Deploy**
- URL จะเป็นตัวเดิม ไม่ต้องเปลี่ยน env var

## Troubleshooting

| ปัญหา | สาเหตุ / แก้ไข |
|------|----------------|
| ส่งฟอร์มแล้วไม่มีข้อมูลเข้า Sheet | เช็คว่า "Who has access" = **Anyone** (ไม่ใช่ "Only myself") |
| Console เห็น CORS error | ปกติฟอร์มใช้ `mode: "no-cors"` ไม่ควรเจอ — ถ้าเจอ คงเปลี่ยน URL ผิด |
| หน้า /quote/thank-you เปิดไม่ได้ | เช็คว่าไฟล์ `app/quote/thank-you/page.js` ถูก commit แล้ว |
| ข้อมูลเข้า Sheet แต่ไม่มี header | ลบทั้ง sheet "Leads" ออก แล้วส่งฟอร์มใหม่ — script จะสร้าง header อัตโนมัติ |
| เปลี่ยน Web App URL แล้วเว็บไม่ทำงาน | อย่าลืม **Redeploy ใน Vercel** เพื่อให้ env var ใหม่มีผล |

## เพิ่ม Email Notification (Optional)

ถ้าต้องการให้ส่งอีเมลแจ้งทุกครั้งที่มี lead ใหม่ เพิ่มบรรทัดนี้ในฟังก์ชัน `doPost` ใน `Code.gs` ก่อน `return jsonResponse({ ok: true })`:

```javascript
MailApp.sendEmail({
  to: "mon-attention@hotmail.com",
  subject: "🌞 Solar ACM — มี Lead ใหม่: " + data.name,
  body: "ชื่อ: " + data.name +
        "\nเบอร์โทร: " + data.phone +
        "\nค่าไฟ: " + data.bill +
        "\nบริการ: " + data.service +
        "\nระบบไฟ: " + data.phase +
        "\nหมายเหตุ: " + (data.note || "-")
});
```

แล้ว Deploy ใหม่ (Manage deployments → New version)
