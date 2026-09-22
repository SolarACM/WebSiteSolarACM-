<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Solar ACM Systems - Project Context

## Stack
- Next.js 16 (App Router) + React 19
- Deploy: Vercel (auto-deploy ตาม git push)
- GitHub: WebSiteSolarACM-

## Design Tokens
- Green: #0D281F, #123328, #174634, #236344, #2F7D50
- Orange accent: #E86824 / pale #FFF0E7
- Background: #FFFEFA (paper), #F7F6F0 (cream), #FFFFFF (cards)
- Text: #16251F / muted #627169
- Fonts: Anuphan (Thai/body) + Sora (display/Latin) via next/font
- Shared corporate UI is in `app/globals.css` and `app/_components/site-shell.js`

## โครงสร้างหน้า
- / — homepage
- /residential, /industrial, /bess, /epc — 4 หน้าบริการ
- /portfolio — หน้าผลงาน (Grid + Filter + Lightbox)
- /products — Kolchar GF-Series และ FIRESAVE จากเอกสารผลิตภัณฑ์ที่ได้รับ
- /about — บทบาทและหลักการทำงานของ Solar ACM
- /contact — ช่องทางติดต่อและข้อมูลที่ใช้เริ่มประเมิน
- /quote — Lead capture form (มี file upload บิลค่าไฟ)
- /quote/thank-you — หน้าขอบคุณ
- /sitemap.xml + /robots.txt (auto จาก sitemap.js)

## Phase ที่เสร็จแล้ว
- Phase 1: SEO + Analytics + Sitemap
- Phase 2: Lead form → Google Sheets (Apps Script Web App)
- Phase 2.5: File upload บิลค่าไฟ → Google Drive
- Mobile responsive (viewport meta + media queries)
- Phase 3: หน้าผลงาน /portfolio — Grid การ์ด + Filter 5 ประเภท + Lightbox รายละเอียด
  - ข้อมูลผลงานอยู่ที่ app/portfolio/data.js (แก้ไข/เพิ่มผลงานง่าย)
  - รูปภาพวางไว้ที่ public/portfolio/project-XX.jpg
  - Section "ผลงานของเรา" เพิ่มใน Homepage
  - ลิงก์ "ผลงาน" เพิ่มใน Nav
- Phase 4: Corporate redesign + verified product information
  - Shared header/footer, bilingual desktop/mobile navigation
  - Kolchar และ FIRESAVE ใช้รูปและข้อมูลที่สกัดจาก PDF ที่ผู้ใช้ส่งให้
  - ไม่เผยแพร่ราคาสินค้า และไม่อ้างสถานะตัวแทน/ผู้ผลิต/บทบาท EPC หากไม่มีเอกสารยืนยัน
  - Portfolio แสดงเฉพาะข้อมูลโครงการเชิงข้อเท็จจริงที่มีอยู่; ชื่อ EPC และบทบาท Solar ACM รอการยืนยัน
  - Git tag `backup-before-redesign` คือจุดย้อนกลับก่อน redesign

## Integration
- Google Sheet ID: 1o5QcJN4orz1VjAa9tBQVAoVRlvH4oj4nLjJvrWeRbSM
  - แท็บ "Leads" 8 คอลัมน์: วันที่, ชื่อ, เบอร์โทร, ค่าไฟ/เดือน, ประเภทบริการ, ระบบไฟ, หมายเหตุ, บิลค่าไฟ
- Apps Script: ดูที่ apps-script/Code.gs
- Drive folder: "Solar ACM - Bill Uploads" (auto-create)
- Vercel env var: NEXT_PUBLIC_QUOTE_SHEET_URL (Apps Script Web App URL)

## ติดต่อ
- Phone: 095-309-5196
- LINE: Monarrattana
- Email: mon-attention@hotmail.com

## Convention
- หน้าที่มี language state ใช้ `"use client"`; ใช้ shared classes ใน `app/globals.css` เป็นหลัก
- หน้า solution ใช้ `app/_components/solution-page.js`
- Header, footer และ floating LINE ใช้ `app/_components/site-shell.js`
- ปุ่ม "ขอใบเสนอราคา" ทุกที่ → /quote
- ปุ่ม LINE Chat ใช้ `FloatingLine` เป็น secondary contact
- หลีกเลี่ยง claims เรื่อง savings, payback, certification, project totals และ response time หากไม่มีหลักฐาน
