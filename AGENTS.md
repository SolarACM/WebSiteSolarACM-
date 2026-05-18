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
- Green primary: #2D7D46 / light #4CAF72 / pale #E8F5EE
- Orange accent: #E8630A / light #FF8C3A / pale #FFF0E6
- Background: #F9FCF9 (dark), #FFFFFF (cards), #F0F4F1 (midDark)
- Text: #14241B / muted #5C6B61
- Fonts: 'DM Sans' (body) + 'Playfair Display' (headings)

## โครงสร้างหน้า
- / — homepage
- /residential, /industrial, /bess, /epc — 4 หน้าบริการ
- /portfolio — หน้าผลงาน (Grid + Filter + Lightbox)
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
- ทุกหน้าใช้ "use client" + inline styles
- ปุ่ม "ขอใบเสนอราคา" ทุกที่ → /quote
- ปุ่ม LINE Chat ใน FloatingSupport widget เก็บไว้เป็น secondary contact