"use client";
import { useState, useEffect } from "react";
import { Sun, Battery, Clock, TrendingUp, Shield, Award, CheckCircle, ArrowRight, ArrowLeft, Zap, MessageCircle, X, Moon, Gauge, Power } from "lucide-react";
import Link from "next/link";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", darkCard: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
  glass: "rgba(255,255,255,0.7)",
  blue: "#2563eb", blueLight: "#3b82f6", bluePale: "#eff6ff",
};

const tx = {
  th: {
    back: "← กลับหน้าหลัก",
    badge: "ระบบกักเก็บพลังงาน",
    heroTitle: "เก็บพลังงานไว้ใช้เมื่อคุณต้องการ",
    heroDesc: "เก็บไฟฟ้าส่วนเกินไว้ด้วยระบบแบตเตอรี่อัจฉริยะ เพื่อความอิสระในการใช้พลังงานตลอด 24 ชั่วโมง ทั้งในบ้านและธุรกิจ",
    btnQuote: "ขอรับใบเสนอราคาฟรี",
    btnCalc: "คำนวณจุดคุ้มทุน",
    appTitle: "การใช้งาน",
    benefitsTitle: "ประโยชน์ของแบตเตอรี่",
    benefitsDesc: "ความอิสระและความมั่นคงทางพลังงานที่สมบูรณ์แบบ",
    whyTitle: "ทำไมต้องเลือกเรา",
    whyDesc: "เทคโนโลยีแบตเตอรี่ที่ทันสมัยและปลอดภัยที่สุด",
    processTitle: "กระบวนการทำงาน",
    processDesc: "4 ขั้นตอนสู่ระบบกักเก็บพลังงานที่สมบูรณ์แบบ",
    ctaTitle: "พร้อมเป็นอิสระทางพลังงานแล้วหรือยัง?",
    ctaDesc: "ติดต่อเราเพื่อรับคำปรึกษาเกี่ยวกับระบบแบตเตอรี่ที่เหมาะกับคุณ",
    apps: [
      { title: "Solar + Storage", desc: "เพิ่มประสิทธิภาพโซลาร์เซลล์ โดยเก็บพลังงานส่วนเกินไว้ใช้เองแทนส่งขายกลับกริด" },
      { title: "Off-Grid Living", desc: "อยู่อาศัยในพื้นที่ห่างไกลที่ไม่มีไฟฟ้าเข้าถึง ด้วยระบบพลังงานที่สมบูรณ์แบบ" },
      { title: "Peak Shaving", desc: "ลดค่า Demand Charge สำหรับธุรกิจ โดยใช้พลังงานจากแบตเตอรี่ในช่วงพีคไทม์" },
    ],
    benefits: [
      { title: "ใช้ไฟได้ตลอด 24 ชั่วโมง", desc: "เก็บพลังงานส่วนเกินในตอนกลางวันไว้ใช้ในตอนกลางคืน ไม่ขาดไฟแม้มีเมฆครึ้มหรือไฟดับ" },
      { title: "ประหยัดค่าไฟมากขึ้น", desc: "ลดค่าไฟได้ถึง 80% โดยใช้พลังงานที่เก็บไว้แทนการซื้อไฟจากการไฟฟ้าในราคาแพง" },
      { title: "แบ็คอัพไฟฉุกเฉิน", desc: "พลังงานสำรองอัตโนมัติเมื่อไฟฟ้าดับ เหมาะสำหรับธุรกิจและบ้านที่ต้องการไฟตลอดเวลา" },
      { title: "จัดการพีคดีมานด์", desc: "ลดค่า Demand Charge โดยใช้พลังงานจากแบตเตอรี่ในช่วงที่มีการใช้ไฟฟ้าสูงสุดของธุรกิจ" },
    ],
    why: [
      { title: "แบตเตอรี่ระดับพรีเมียม", desc: "แบตเตอรี่ LFP (Lithium Iron Phosphate) จาก BYD และ Deye ที่มีอายุยาวและปลอดภัยสูง" },
      { title: "ระบบไฮบริดอัจฉริยะ", desc: "อินเวอร์เตอร์ไฮบริดที่จัดการพลังงานจากโซลาร์ แบตเตอรี่ และกริดอัตโนมัติทั้งหมด" },
      { title: "ขยายระบบได้", desc: "ออกแบบแบบโมดูลาร์ เพิ่มความจุแบตเตอรี่ได้ตามต้องการ เริ่มต้นเล็กและขยายภายหลัง" },
      { title: "ติดตามผลแบบเรียลไทม์", desc: "แอปมือถือติดตามสถานะแบตเตอรี่ การชาร์จ-ดิสชาร์จ และการใช้พลังงานแบบเรียลไทม์" },
    ],
    process: [
      { title: "วิเคราะห์การใช้ไฟ", desc: "วิเคราะห์รูปแบบการใช้ไฟฟ้าตลอดทั้งวัน เพื่อออกแบบขนาดแบตเตอรี่ที่เหมาะสมที่สุด" },
      { title: "ออกแบบระบบครบวงจร", desc: "ออกแบบระบบไฮบริดที่รวมโซลาร์เซลล์ แบตเตอรี่ และอินเวอร์เตอร์เข้าด้วยกันอย่างลงตัว" },
      { title: "ติดตั้งและตั้งค่า", desc: "ติดตั้งแบตเตอรี่และระบบไฮบริด ตั้งค่าโหมดการทำงานตามความต้องการของลูกค้าแต่ละราย" },
      { title: "เทรนนิ่งและดูแล", desc: "อบรมการใช้งานระบบ การติดตามผล และให้บริการบำรุงรักษาอย่างต่อเนื่องตลอดอายุการใช้งาน" },
    ],
  },
  en: {
    back: "← Back to Home",
    badge: "Battery Energy Storage System",
    heroTitle: "Store Energy, Use Anytime You Want",
    heroDesc: "Store excess solar energy with smart battery systems for 24/7 energy independence — perfect for both homes and businesses.",
    btnQuote: "Get a Free Quote",
    btnCalc: "Calculate My ROI",
    appTitle: "Applications",
    benefitsTitle: "Battery Benefits",
    benefitsDesc: "Complete energy independence and security",
    whyTitle: "Why Choose Us",
    whyDesc: "Cutting-edge and safest battery technology",
    processTitle: "Our Process",
    processDesc: "4 steps to complete battery storage solution",
    ctaTitle: "Ready for Energy Independence?",
    ctaDesc: "Contact us for consultation on the right battery system for you",
    apps: [
      { title: "Solar + Storage", desc: "Maximize solar efficiency by storing excess energy for self-consumption instead of exporting to the grid." },
      { title: "Off-Grid Living", desc: "Live completely off-grid in remote locations with fully self-sufficient energy systems." },
      { title: "Peak Shaving", desc: "Reduce commercial demand charges by discharging batteries during peak electricity pricing periods." },
    ],
    benefits: [
      { title: "24/7 Power Availability", desc: "Store excess daytime solar energy for nighttime use, ensuring uninterrupted power supply always." },
      { title: "Maximize Savings", desc: "Save up to 80% on electricity by using stored energy instead of buying expensive grid power." },
      { title: "Emergency Backup", desc: "Automatic backup power during outages — ideal for businesses and homes requiring constant power." },
      { title: "Peak Demand Management", desc: "Reduce demand charges by discharging batteries during peak electricity usage hours." },
    ],
    why: [
      { title: "Premium Battery Systems", desc: "Premium LFP batteries from BYD and Deye with long lifespan and highest safety standards." },
      { title: "Smart Hybrid System", desc: "Intelligent hybrid inverter that seamlessly manages solar, battery, and grid power automatically." },
      { title: "Scalable Capacity", desc: "Modular design allows easy capacity expansion — start small and scale up as your needs grow." },
      { title: "Real-Time Monitoring", desc: "Mobile app for monitoring battery status, charge/discharge cycles, and energy usage in real-time." },
    ],
    process: [
      { title: "Energy Assessment", desc: "Analyze daily energy consumption patterns to determine optimal battery capacity for your needs." },
      { title: "Complete System Design", desc: "Design integrated hybrid system combining solar panels, battery storage, and smart inverters." },
      { title: "Installation & Setup", desc: "Install battery system and hybrid inverter, configure operating modes based on your preferences." },
      { title: "Training & Support", desc: "User training on system operation and monitoring, plus ongoing maintenance and support services." },
    ],
  },
};

const CONTACT = { phone: "0953095196", line: "Monarrattana" };
const appIcons = [Sun, Moon, Gauge];
const benefitIcons = [Clock, TrendingUp, Shield, Power];
const whyIcons = [Award, Zap, Battery, CheckCircle];

function NavBar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(15,28,20,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${C.border}` : "none", transition: "all 0.4s ease", padding: "0 2rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img src="/Logo SolarACM.png" alt="Solar ACM Logo" style={{ height: 45, width: "auto", objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: "white" }}>Solar ACM</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Systems Corporation</span>
          </div>
        </Link>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["residential", lang === "th" ? "บ้านพักอาศัย" : "Residential"], ["industrial", lang === "th" ? "ธุรกิจ" : "Industrial"], ["bess", "BESS"], ["epc", "EPC Network"]].map(([href, label]) => (
            <Link key={href} href={`/${href}`} style={{ color: "white", fontSize: 14, fontWeight: 500, textDecoration: "none", opacity: 0.85 }}>{label}</Link>
          ))}
          <button onClick={() => setLang(lang === "th" ? "en" : "th")} style={{ padding: "6px 12px", borderRadius: 15, border: `1px solid ${C.orange}`, color: C.orange, fontWeight: "bold", cursor: "pointer", fontSize: 12, background: "transparent" }}>{lang === "th" ? "EN" : "TH"}</button>
          <Link href="/quote" style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, color: "white", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{lang === "th" ? "ขอใบเสนอราคา" : "Get Free Quote"}</Link>
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
          {[{ label: "LINE Chat", color: "#06C755", href: `https://line.me/ti/p/~${CONTACT.line}` }, { label: "WhatsApp", color: "#25D366", href: `https://line.me/ti/p/~Monarrattana` }, { label: lang === "th" ? "โทรหาเรา" : "Call Us", color: C.orangeLight, href: `tel:${CONTACT.phone}` }].map(({ label, color, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, marginBottom: 8, background: `${color}15`, border: `1px solid ${color}30`, color, fontSize: 14, fontWeight: 500, textDecoration: "none" }}><MessageCircle size={16} /> {label}</a>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, border: "none", cursor: "pointer", boxShadow: `0 8px 32px ${C.green}66`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
      </button>
    </div>
  );
}

function Footer({ lang }) {
  return (
    <footer style={{ background: C.darkCard, borderTop: `1px solid ${C.border}`, padding: "48px 2rem 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Sun size={18} color="white" /></div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: C.text }}>Solar ACM Systems</div>
            </div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>Thailand's leading solar consultancy and vendor aggregator. Making clean energy accessible, affordable, and simple.</p>
          </div>
          {[
            { title: "Solutions", links: [{ label: "Residential", href: "/residential" }, { label: "Industrial", href: "/industrial" }, { label: "Energy Storage", href: "/bess" }, { label: "EPC Network", href: "/epc" }] },
            { title: "Company", links: [{ label: "About Us", href: "/" }, { label: "Our Process", href: "/" }, { label: "Certifications", href: "/" }, { label: "Careers", href: "/" }] },
            { title: "Legal", links: [{ label: "Privacy Policy", href: "/" }, { label: "Terms of Service", href: "/" }, { label: "Warranty Policy", href: "/" }, { label: "PDPA Compliance", href: "/" }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: C.text, fontWeight: 600, marginBottom: 16, fontSize: 14 }}>{title}</div>
              {links.map(l => <Link key={l.label} href={l.href} style={{ display: "block", color: C.textMuted, fontSize: 13, marginBottom: 10, textDecoration: "none" }} onMouseEnter={e => e.currentTarget.style.color = C.greenLight} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>{l.label}</Link>)}
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

export default function BESSPage() {
  const [lang, setLang] = useState("th");
  const t = tx[lang];

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #F0F4F1; } ::-webkit-scrollbar-thumb { background: #2D7D46; border-radius: 3px; }
        @media (max-width: 768px) { .cards-grid { grid-template-columns: 1fr !important; } .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
      <NavBar lang={lang} setLang={setLang} />

      {/* HERO */}
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.blue}10 0%, transparent 60%), ${C.dark}`, padding: "120px 2rem 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.bluePale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}><ArrowLeft size={16} /> {t.back}</Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.bluePale, border: `1px solid ${C.blue}30`, borderRadius: 20, padding: "6px 14px", color: C.blue, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
            <Battery size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, color: C.text, marginBottom: 20, maxWidth: 700 }}>{t.heroTitle}</h1>
          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>{t.heroDesc}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/quote" style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.blue}, ${C.blueLight})`, color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 32px ${C.blue}44` }}>{t.btnQuote} <ArrowRight size={18} /></Link>
            <Link href="/#calculator" style={{ display: "flex", alignItems: "center", gap: 8, background: C.glass, backdropFilter: "blur(12px)", border: `1px solid ${C.border}`, color: C.text, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>{t.btnCalc}</Link>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section style={{ padding: "80px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: C.text, textAlign: "center", marginBottom: 48 }}>{t.appTitle}</h2>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.apps.map((a, i) => { const Icon = appIcons[i]; return (
              <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.bluePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Icon size={28} color={C.blue} /></div>
                <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{a.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ padding: "100px 2rem", background: C.dark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.blue, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Benefits</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.benefitsTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.benefitsDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.benefits.map((b, i) => { const Icon = benefitIcons[i]; return (
              <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.blue}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: C.bluePale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon size={26} color={C.blue} /></div>
                <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{b.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: "100px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.blue, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.whyTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.whyDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.why.map((w, i) => { const Icon = whyIcons[i]; return (
              <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, textAlign: "center", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.blue}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.bluePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Icon size={28} color={C.blue} /></div>
                <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{w.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "100px 2rem", background: C.dark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.blue, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.processTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.processDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {t.process.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: 28, left: 28, width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.blueLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 24, fontWeight: 700, zIndex: 1, boxShadow: `0 8px 24px ${C.blue}44` }}>{i + 1}</div>
                <div style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "92px 28px 28px" }}>
                  <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 2rem", background: `linear-gradient(135deg, ${C.blue}, ${C.blueLight})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "white", marginBottom: 20 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginBottom: 40, lineHeight: 1.8 }}>{t.ctaDesc}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: C.blue, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>{t.btnQuote} <ArrowRight size={18} /></Link>
            <a href={`https://line.me/ti/p/~${CONTACT.line}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}><MessageCircle size={18} /> LINE Chat</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <FloatingSupport lang={lang} />
    </div>
  );
}
