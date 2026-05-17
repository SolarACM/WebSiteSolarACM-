"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sun, Home, Building2, Battery, Globe, MessageCircle, X, ArrowLeft,
  CheckCircle, Shield, Award, Zap, AlertCircle, Loader2, Send,
  Upload, Trash2, FileImage
} from "lucide-react";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", darkCard: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
  glass: "rgba(255,255,255,0.7)",
};

const CONTACT = { phone: "0953095196", line: "Monarrattana" };

// ⚠️ แทนที่ URL ด้านล่างด้วย Apps Script Web App URL ของคุณ
// (วิธี deploy ดูในไฟล์ apps-script/SETUP.md)
const SHEET_ENDPOINT =
  process.env.NEXT_PUBLIC_QUOTE_SHEET_URL ||
  "https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_URL/exec";

// ─── FILE UPLOAD CONFIG ──────────────────────────────────
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_MIME = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];
const ACCEPT_ATTR = "image/jpeg,image/png,image/webp,image/heic,image/heif";

const tx = {
  th: {
    back: "← กลับหน้าหลัก",
    badge: "ขอใบเสนอราคา",
    heroTitle: "รับใบเสนอราคาฟรี ภายใน 24 ชั่วโมง",
    heroDesc:
      "กรอกข้อมูลเบื้องต้น ทีมที่ปรึกษาของเราจะวิเคราะห์ความเหมาะสมและส่งใบเสนอราคาที่ละเอียดให้คุณ พร้อมคำแนะนำที่คุ้มค่าที่สุด",
    formTitle: "ข้อมูลสำหรับใบเสนอราคา",
    formDesc: "ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับ ไม่เปิดเผยต่อบุคคลที่สาม",
    labelName: "ชื่อ-นามสกุล",
    placeName: "เช่น สมชาย ใจดี",
    labelPhone: "เบอร์โทรศัพท์",
    placePhone: "เช่น 0812345678",
    labelBill: "ค่าไฟเฉลี่ยต่อเดือน (บาท)",
    placeBill: "เช่น 3500",
    labelService: "ประเภทบริการที่สนใจ",
    labelPhase: "ระบบไฟ",
    phaseSingle: "1 เฟส (บ้านพักทั่วไป)",
    phaseThree: "3 เฟส (ธุรกิจ/อุตสาหกรรม)",
    labelNote: "หมายเหตุเพิ่มเติม (ไม่บังคับ)",
    placeNote: "เช่น พื้นที่หลังคา ทิศที่ตั้ง หรือคำถามอื่นๆ ที่คุณอยากให้เราดูแลค่ะ",
    labelBillImage: "แนบรูปภาพบิลค่าไฟ (ไม่บังคับ)",
    billImageHint: "ช่วยให้เราคำนวณระบบที่เหมาะสมได้แม่นยำยิ่งขึ้น • รองรับ JPG, PNG, WebP, HEIC • สูงสุด 5 MB",
    billImageCTA: "เลือกไฟล์รูปภาพ",
    billImageDrag: "หรือลากไฟล์มาวางตรงนี้",
    billImageChange: "เปลี่ยนรูป",
    billImageRemove: "ลบ",
    submit: "ส่งคำขอใบเสนอราคา",
    submitting: "กำลังส่งข้อมูล...",
    benefits: [
      { icon: Zap, title: "ตอบกลับเร็ว", desc: "ติดต่อกลับภายใน 2 ชั่วโมงในเวลาทำการ" },
      { icon: Shield, title: "ข้อมูลปลอดภัย", desc: "เก็บเป็นความลับ ไม่ส่งต่อบุคคลที่สาม" },
      { icon: Award, title: "ปรึกษาฟรี", desc: "ไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัด" },
    ],
    services: [
      { id: "residential", label: "บ้านพักอาศัย", icon: Home, color: "#2D7D46" },
      { id: "industrial", label: "ธุรกิจ/อุตสาหกรรม", icon: Building2, color: "#E8630A" },
      { id: "bess", label: "ระบบกักเก็บพลังงาน (BESS)", icon: Battery, color: "#4CAF72" },
      { id: "epc", label: "เครือข่ายผู้รับเหมา EPC", icon: Globe, color: "#FF8C3A" },
    ],
    errors: {
      name: "กรุณากรอกชื่อ-นามสกุล",
      phoneRequired: "กรุณากรอกเบอร์โทรศัพท์",
      phoneInvalid: "เบอร์โทรไม่ถูกต้อง (ต้องเป็นตัวเลข 9-10 หลัก)",
      billRequired: "กรุณากรอกค่าไฟเฉลี่ยต่อเดือน",
      billInvalid: "ค่าไฟต้องเป็นตัวเลขมากกว่า 0",
      service: "กรุณาเลือกประเภทบริการ",
      phase: "กรุณาเลือกระบบไฟ",
      fileType: "ไฟล์ต้องเป็นรูปภาพ (JPG, PNG, WebP, HEIC)",
      fileSize: "ไฟล์ใหญ่เกินไป — สูงสุด 5 MB",
      network: "เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง หรือติดต่อเราทาง LINE",
    },
  },
  en: {
    back: "← Back to Home",
    badge: "Request Quote",
    heroTitle: "Get a Free Quote within 24 Hours",
    heroDesc:
      "Share a few details and our consultants will analyze your site and send you a detailed quotation with the most cost-effective recommendation.",
    formTitle: "Quotation Details",
    formDesc: "Your data is kept strictly confidential and never shared with third parties.",
    labelName: "Full Name",
    placeName: "e.g. John Doe",
    labelPhone: "Phone Number",
    placePhone: "e.g. 0812345678",
    labelBill: "Average Monthly Electric Bill (THB)",
    placeBill: "e.g. 3500",
    labelService: "Service Interested In",
    labelPhase: "Electrical Phase",
    phaseSingle: "Single-Phase (Residential)",
    phaseThree: "Three-Phase (Commercial/Industrial)",
    labelNote: "Additional Notes (Optional)",
    placeNote: "e.g. roof area, orientation, or any specific questions",
    labelBillImage: "Attach Electric Bill Photo (Optional)",
    billImageHint: "Helps us size your system more accurately • JPG, PNG, WebP, HEIC • Max 5 MB",
    billImageCTA: "Choose an image",
    billImageDrag: "or drag and drop here",
    billImageChange: "Change",
    billImageRemove: "Remove",
    submit: "Request My Free Quote",
    submitting: "Sending...",
    benefits: [
      { icon: Zap, title: "Quick Response", desc: "We reply within 2 hours during business hours" },
      { icon: Shield, title: "Data Protected", desc: "Confidential — never shared with third parties" },
      { icon: Award, title: "Free Consultation", desc: "No cost, no obligation, expert advice" },
    ],
    services: [
      { id: "residential", label: "Residential", icon: Home, color: "#2D7D46" },
      { id: "industrial", label: "Industrial / Commercial", icon: Building2, color: "#E8630A" },
      { id: "bess", label: "Energy Storage (BESS)", icon: Battery, color: "#4CAF72" },
      { id: "epc", label: "EPC Network", icon: Globe, color: "#FF8C3A" },
    ],
    errors: {
      name: "Please enter your full name",
      phoneRequired: "Please enter your phone number",
      phoneInvalid: "Invalid phone number (must be 9-10 digits)",
      billRequired: "Please enter your monthly electric bill",
      billInvalid: "Bill must be a number greater than 0",
      service: "Please select a service",
      phase: "Please select an electrical phase",
      fileType: "File must be an image (JPG, PNG, WebP, HEIC)",
      fileSize: "File too large — max 5 MB",
      network: "Failed to send. Please try again or contact us on LINE.",
    },
  },
};

function NavBar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,28,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s ease", padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img src="/Logo SolarACM.png" alt="Solar ACM Logo" style={{ height: 45, width: "auto", objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: "white" }}>Solar ACM</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Systems Corporation</span>
          </div>
        </Link>
        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["residential", lang === "th" ? "บ้านพักอาศัย" : "Residential"],
            ["industrial", lang === "th" ? "ธุรกิจ" : "Industrial"],
            ["bess", "BESS"],
            ["epc", "EPC Network"]
          ].map(([href, label]) => (
            <Link key={href} href={`/${href}`} style={{ color: "white", fontSize: 14, fontWeight: 500, textDecoration: "none", opacity: 0.85 }}>{label}</Link>
          ))}
          <button onClick={() => setLang(lang === "th" ? "en" : "th")}
            style={{ padding: "6px 12px", borderRadius: 15, border: `1px solid ${C.orange}`, color: C.orange, fontWeight: "bold", cursor: "pointer", fontSize: 12, background: "transparent" }}>
            {lang === "th" ? "EN" : "TH"}
          </button>
        </div>
      </div>
    </nav>
  );
}

function FloatingSupport({ lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 200 }}>
      {open && (
        <div style={{ position: "absolute", bottom: 70, right: 0, background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, width: 220, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
          <div style={{ color: C.text, fontWeight: 600, marginBottom: 16, fontSize: 14 }}>{lang === "th" ? "ติดต่อเรา" : "Contact Us"}</div>
          {[
            { label: "LINE Chat", color: "#06C755", href: `https://line.me/ti/p/~${CONTACT.line}` },
            { label: "WhatsApp", color: "#25D366", href: `https://line.me/ti/p/~Monarrattana` },
            { label: lang === "th" ? "โทรหาเรา" : "Call Us", color: C.orangeLight, href: `tel:${CONTACT.phone}` },
          ].map(({ label, color, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, marginBottom: 8, background: `${color}15`, border: `1px solid ${color}30`, color, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              <MessageCircle size={16} /> {label}
            </a>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)}
        style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, border: "none", cursor: "pointer", boxShadow: `0 8px 32px ${C.green}66`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.darkCard, borderTop: `1px solid ${C.border}`, padding: "48px 2rem 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sun size={18} color="white" />
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: C.text }}>Solar ACM Systems</div>
            </div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              Thailand's leading solar consultancy and vendor aggregator. Making clean energy accessible, affordable, and simple.
            </p>
          </div>
          {[
            { title: "Solutions", links: [{ label: "Residential", href: "/residential" }, { label: "Industrial", href: "/industrial" }, { label: "Energy Storage", href: "/bess" }, { label: "EPC Network", href: "/epc" }] },
            { title: "Company", links: [{ label: "About Us", href: "/" }, { label: "Get Quote", href: "/quote" }, { label: "Certifications", href: "/" }, { label: "Careers", href: "/" }] },
            { title: "Legal", links: [{ label: "Privacy Policy", href: "/" }, { label: "Terms of Service", href: "/" }, { label: "Warranty Policy", href: "/" }, { label: "PDPA Compliance", href: "/" }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: C.text, fontWeight: 600, marginBottom: 16, fontSize: 14 }}>{title}</div>
              {links.map(l => (
                <Link key={l.label} href={l.href} style={{ display: "block", color: C.textMuted, fontSize: 13, marginBottom: 10, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.greenLight}
                  onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: C.textMuted, fontSize: 13 }}>© 2025 Solar ACM Systems Corporation. All rights reserved.</div>
          <div style={{ color: C.textMuted, fontSize: 13 }}>Registered in Thailand · TAT License · EGAT Certified</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── INPUT COMPONENTS ─────────────────────────────────────── */
function Field({ label, required, error, hint, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label style={{ display: "block", color: C.text, fontSize: 14, fontWeight: 500, marginBottom: hint ? 4 : 8 }}>
        {label} {required && <span style={{ color: C.orange }}>*</span>}
      </label>
      {hint && (
        <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 10, lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
      {children}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, color: C.orange, fontSize: 12 }}>
          <AlertCircle size={13} /> {error}
        </div>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%",
  background: C.midDark,
  border: `1px solid ${hasError ? C.orange : C.border}`,
  borderRadius: 10,
  padding: "12px 16px",
  color: C.text,
  fontSize: 15,
  fontFamily: "'DM Sans', system-ui, sans-serif",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, box-shadow 0.2s",
});

/* ─── HELPERS ──────────────────────────────────────────────── */
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      // dataUrl = "data:image/jpeg;base64,XXXX..."
      const comma = dataUrl.indexOf(",");
      resolve(comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatBytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / (1024 * 1024)).toFixed(2) + " MB";
}

/* ─── MAIN PAGE ────────────────────────────────────────────── */
export default function QuotePage() {
  const router = useRouter();
  const [lang, setLang] = useState("th");
  const t = tx[lang];
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bill: "",
    service: "",
    phase: "",
    note: "",
  });
  const [billFile, setBillFile] = useState(null);
  const [billPreview, setBillPreview] = useState(""); // data URL for thumbnail
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function handleFileSelect(file) {
    if (!file) return;

    // Validate type
    const isImage =
      ACCEPTED_MIME.includes(file.type) ||
      /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name);
    if (!isImage) {
      setErrors((e) => ({ ...e, billFile: t.errors.fileType }));
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, billFile: t.errors.fileSize }));
      return;
    }

    // Clear error and set file + preview
    setErrors((e) => ({ ...e, billFile: undefined }));
    setBillFile(file);
    const reader = new FileReader();
    reader.onload = () => setBillPreview(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  function clearFile() {
    setBillFile(null);
    setBillPreview("");
    setErrors((e) => ({ ...e, billFile: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = t.errors.name;

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (!phoneDigits) e.phone = t.errors.phoneRequired;
    else if (phoneDigits.length < 9 || phoneDigits.length > 10)
      e.phone = t.errors.phoneInvalid;

    const billNum = Number(form.bill);
    if (!form.bill) e.bill = t.errors.billRequired;
    else if (isNaN(billNum) || billNum <= 0) e.bill = t.errors.billInvalid;

    if (!form.service) e.service = t.errors.service;
    if (!form.phase) e.phase = t.errors.phase;

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        date: new Date().toISOString(),
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, ""),
        bill: Number(form.bill),
        service: t.services.find((s) => s.id === form.service)?.label || form.service,
        phase: form.phase === "single" ? "1 เฟส" : "3 เฟส",
        note: form.note.trim(),
        file: null,
      };

      // ถ้ามีไฟล์ ให้แปลงเป็น base64 แล้วใส่ใน payload
      if (billFile) {
        const base64 = await readFileAsBase64(billFile);
        payload.file = {
          name: billFile.name,
          type: billFile.type || "image/jpeg",
          size: billFile.size,
          data: base64,
        };
      }

      // ใช้ text/plain เพื่อหลีกเลี่ยง CORS preflight ของ Apps Script
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      // ด้วย mode: "no-cors" เราจะอ่าน response ไม่ได้ ถือว่าสำเร็จถ้าไม่ throw
      router.push("/quote/thank-you");
    } catch (err) {
      console.error("Submit failed:", err);
      setSubmitError(t.errors.network);
      setSubmitting(false);
    }
  }

  function onDragOver(ev) {
    ev.preventDefault();
    setIsDragging(true);
  }
  function onDragLeave(ev) {
    ev.preventDefault();
    setIsDragging(false);
  }
  function onDrop(ev) {
    ev.preventDefault();
    setIsDragging(false);
    const file = ev.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input:focus, textarea:focus, select:focus {
          border-color: ${C.green} !important;
          box-shadow: 0 0 0 3px rgba(45,125,70,0.15);
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.midDark}; }
        ::-webkit-scrollbar-thumb { background: ${C.green}; border-radius: 3px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .service-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <NavBar lang={lang} setLang={setLang} />

      {/* ── HERO ── */}
      <section style={{
        minHeight: "40vh", display: "flex", alignItems: "center",
        background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.green}12 0%, transparent 60%), ${C.dark}`,
        padding: "120px 2rem 60px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.orangePale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}>
            <ArrowLeft size={16} /> {t.back}
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.orange}15`, border: `1px solid ${C.orange}30`, borderRadius: 20, padding: "6px 14px", color: C.orangeLight, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
            <Send size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.25, color: C.text, marginBottom: 16, maxWidth: 720 }}>
            {t.heroTitle}
          </h1>
          <p style={{ color: C.textMuted, fontSize: 17, lineHeight: 1.7, maxWidth: 620 }}>{t.heroDesc}</p>
        </div>
      </section>

      {/* ── BENEFITS STRIP ── */}
      <section style={{ padding: "0 2rem", marginBottom: 60 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {t.benefits.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} style={{
                background: C.darkCard, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: 20, display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={20} color={C.green} />
                </div>
                <div>
                  <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>
                  <div style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ padding: "0 2rem 100px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{
            background: C.darkCard,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: "40px 40px 32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.04)",
          }}>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: C.text, marginBottom: 8 }}>
                {t.formTitle}
              </h2>
              <p style={{ color: C.textMuted, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                <Shield size={14} color={C.green} /> {t.formDesc}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <Field label={t.labelName} required error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder={t.placeName}
                    autoComplete="name"
                    style={inputStyle(errors.name)}
                  />
                </Field>

                <Field label={t.labelPhone} required error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder={t.placePhone}
                    autoComplete="tel"
                    inputMode="tel"
                    style={inputStyle(errors.phone)}
                  />
                </Field>
              </div>

              <Field label={t.labelBill} required error={errors.bill}>
                <input
                  type="number"
                  value={form.bill}
                  onChange={(e) => update("bill", e.target.value)}
                  placeholder={t.placeBill}
                  inputMode="numeric"
                  min="0"
                  style={inputStyle(errors.bill)}
                />
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  {[1500, 3000, 6000, 15000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => update("bill", String(v))}
                      style={{
                        background: form.bill === String(v) ? `${C.green}20` : "transparent",
                        border: `1px solid ${form.bill === String(v) ? C.green : C.border}`,
                        borderRadius: 6,
                        padding: "5px 12px",
                        color: form.bill === String(v) ? C.green : C.textMuted,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      ฿{v.toLocaleString()}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={t.labelService} required error={errors.service}>
                <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {t.services.map(({ id, label, icon: Icon, color }) => {
                    const active = form.service === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => update("service", id)}
                        style={{
                          border: `2px solid ${active ? color : C.border}`,
                          background: active ? `${color}10` : C.darkCard,
                          borderRadius: 12,
                          padding: "16px 10px",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 8,
                          transition: "all 0.2s",
                          fontFamily: "inherit",
                        }}
                      >
                        <Icon size={22} color={color} />
                        <span style={{ color: C.text, fontSize: 12, fontWeight: active ? 600 : 500, textAlign: "center", lineHeight: 1.3 }}>
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label={t.labelPhase} required error={errors.phase}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { id: "single", label: t.phaseSingle },
                    { id: "three", label: t.phaseThree },
                  ].map(({ id, label }) => {
                    const active = form.phase === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => update("phase", id)}
                        style={{
                          border: `2px solid ${active ? C.green : C.border}`,
                          background: active ? `${C.green}10` : C.darkCard,
                          borderRadius: 12,
                          padding: "14px 16px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          textAlign: "left",
                          fontFamily: "inherit",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          border: `2px solid ${active ? C.green : C.textMuted}`,
                          background: active ? C.green : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                          {active && <CheckCircle size={12} color="white" />}
                        </div>
                        <span style={{ color: C.text, fontSize: 14, fontWeight: active ? 600 : 400 }}>{label}</span>
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label={t.labelNote}>
                <textarea
                  value={form.note}
                  onChange={(e) => update("note", e.target.value)}
                  placeholder={t.placeNote}
                  rows={4}
                  style={{ ...inputStyle(false), resize: "vertical", minHeight: 100 }}
                />
              </Field>

              {/* ── BILL IMAGE UPLOAD ─────────────────────────── */}
              <Field
                label={t.labelBillImage}
                hint={t.billImageHint}
                error={errors.billFile}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPT_ATTR}
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  style={{ display: "none" }}
                />

                {!billFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    style={{
                      border: `2px dashed ${isDragging ? C.green : (errors.billFile ? C.orange : C.border)}`,
                      background: isDragging ? `${C.green}08` : C.midDark,
                      borderRadius: 12,
                      padding: "28px 20px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.green; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = isDragging ? C.green : (errors.billFile ? C.orange : C.border); }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%",
                      background: `${C.green}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 12px",
                    }}>
                      <Upload size={22} color={C.green} />
                    </div>
                    <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                      {t.billImageCTA}
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 12 }}>
                      {t.billImageDrag}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    border: `1px solid ${C.border}`,
                    background: C.midDark,
                    borderRadius: 12,
                    padding: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}>
                    {billPreview ? (
                      <img
                        src={billPreview}
                        alt="bill preview"
                        style={{
                          width: 64, height: 64, objectFit: "cover",
                          borderRadius: 8, border: `1px solid ${C.border}`,
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <div style={{
                        width: 64, height: 64, borderRadius: 8,
                        background: C.greenPale,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <FileImage size={26} color={C.green} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        color: C.text, fontWeight: 600, fontSize: 14,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        marginBottom: 4,
                      }}>
                        {billFile.name}
                      </div>
                      <div style={{ color: C.textMuted, fontSize: 12 }}>
                        {formatBytes(billFile.size)}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          background: "transparent",
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          padding: "6px 12px",
                          fontSize: 12,
                          color: C.text,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}
                      >
                        {t.billImageChange}
                      </button>
                      <button
                        type="button"
                        onClick={clearFile}
                        style={{
                          background: "transparent",
                          border: `1px solid ${C.orange}40`,
                          borderRadius: 8,
                          padding: "6px 10px",
                          fontSize: 12,
                          color: C.orange,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontFamily: "inherit",
                        }}
                      >
                        <Trash2 size={12} /> {t.billImageRemove}
                      </button>
                    </div>
                  </div>
                )}
              </Field>

              {submitError && (
                <div style={{
                  background: `${C.orange}10`, border: `1px solid ${C.orange}40`,
                  borderRadius: 10, padding: "12px 16px", marginBottom: 16,
                  color: C.orange, fontSize: 14, display: "flex", alignItems: "center", gap: 8,
                }}>
                  <AlertCircle size={16} /> {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  background: submitting
                    ? C.textMuted
                    : `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  padding: "16px 24px",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                  boxShadow: submitting ? "none" : `0 8px 32px ${C.orange}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  marginTop: 8,
                  fontFamily: "inherit",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <Send size={18} /> {t.submit}
                  </>
                )}
              </button>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport lang={lang} />
    </div>
  );
}
