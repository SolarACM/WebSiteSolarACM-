"use client";
import { useState, useEffect } from "react";
import { Sun, Users, Network, Shield, Award, Star, CheckCircle, ArrowRight, ArrowLeft, MessageCircle, X, Handshake, FileCheck, BadgeCheck, Target } from "lucide-react";
import Link from "next/link";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", darkCard: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
  glass: "rgba(255,255,255,0.7)",
  purple: "#7c3aed", purpleLight: "#9333ea", purplePale: "#f3e8ff",
};

const tx = {
  th: {
    back: "← กลับหน้าหลัก",
    badge: "เครือข่ายผู้รับเหมา EPC",
    heroTitle: "เครือข่ายผู้รับเหมาที่ผ่านการคัดสรรแล้ว",
    heroDesc: "เข้าถึงเครือข่ายผู้รับเหมาที่ผ่านการคัดเกรดมาตรฐาน โดยที่คุณไม่ต้องเสียเวลาหาและตรวจสอบประวัติเอง เราจัดการให้ทั้งหมด",
    btnSubmit: "ส่งข้อมูลโครงการ",
    btnCalc: "คำนวณจุดคุ้มทุน",
    criteriaTitle: "เกณฑ์การคัดเลือกผู้รับเหมา",
    criteriaDesc: "ทุกผู้รับเหมาต้องผ่านเกณฑ์เหล่านี้ก่อนเข้าร่วมเครือข่ายของเรา",
    benefitsTitle: "ประโยชน์ที่คุณได้รับ",
    benefitsDesc: "ความสะดวก ความมั่นใจ และความคุ้มค่าในที่เดียว",
    whyTitle: "ทำไมต้องใช้เครือข่ายของเรา",
    whyDesc: "เครือข่ายที่ใหญ่ที่สุดและเชื่อถือได้มากที่สุดในไทย",
    processTitle: "ขั้นตอนการทำงาน",
    processDesc: "4 ขั้นตอนง่ายๆ สู่ผู้รับเหมาที่เหมาะสมที่สุด",
    ctaTitle: "พร้อมเริ่มโครงการแล้วหรือยัง?",
    ctaDesc: "ส่งข้อมูลโครงการวันนี้ และรับใบเสนอราคาจากผู้รับเหมาที่ผ่านการคัดสรร",
    criteria: [
      { title: "ใบอนุญาต", desc: "ใบอนุญาตช่างไฟฟ้าและ EPC License ที่ถูกต้องและยังไม่หมดอายุ" },
      { title: "ผลงาน", desc: "มีผลงานการติดตั้งโซลาร์เซลล์ที่ผ่านมาอย่างน้อย 20+ โครงการ" },
      { title: "ประกันภัย", desc: "ประกันภัยความรับผิดและประกันงานที่ครอบคลุมและเพียงพอ" },
      { title: "รีวิว", desc: "คะแนนรีวิวจากลูกค้าจริงที่ไม่ต่ำกว่า 4.0 ดาว" },
    ],
    benefits: [
      { title: "ผ่านการตรวจสอบแล้ว", desc: "ผู้รับเหมาทุกรายผ่านการคัดเกรดเข้มงวด ตรวจสอบผลงาน ใบอนุญาต และประสบการณ์ครบถ้วน" },
      { title: "ราคาแข่งขันได้", desc: "รับใบเสนอราคาจากผู้รับเหมาหลายราย เปรียบเทียบและเลือกราคาที่เหมาะสมที่สุด" },
      { title: "มาตรฐานสูง", desc: "ผู้รับเหมาทุกรายต้องปฏิบัติตามมาตรฐานการติดตั้งและความปลอดภัยที่เรากำหนดไว้" },
      { title: "บริหารจัดการโครงการ", desc: "เราเป็นตัวกลางดูแลโครงการ ตรวจสอบคุณภาพงาน และรับประกันผลลัพธ์ให้คุณ" },
    ],
    why: [
      { title: "เครือข่ายกว้างขวาง", desc: "เครือข่ายผู้รับเหมาที่ครอบคลุมทั่วประเทศไทย พร้อมให้บริการในทุกพื้นที่" },
      { title: "ตรวจสอบย้อนกลับได้", desc: "ข้อมูลผู้รับเหมาโปร่งใส สามารถตรวจสอบใบอนุญาต ผลงาน และรีวิวจากลูกค้าจริง" },
      { title: "การันตีคุณภาพ", desc: "รับประกันคุณภาพการติดตั้งและงานบริการหลังการขายจากทุกผู้รับเหมาในเครือข่าย" },
      { title: "จับคู่ที่เหมาะสม", desc: "ใช้ระบบจับคู่อัจฉริยะเพื่อหาผู้รับเหมาที่เหมาะสมกับโครงการและงบประมาณของคุณ" },
    ],
    process: [
      { title: "ส่งข้อมูลโครงการ", desc: "กรอกข้อมูลโครงการของคุณ ขนาดงาน งบประมาณ และความต้องการพิเศษอื่นๆ" },
      { title: "รับใบเสนอราคา", desc: "รับใบเสนอราคาจากผู้รับเหมาที่ผ่านการคัดสรร 3-5 ราย พร้อมรายละเอียดครบถ้วน" },
      { title: "เปรียบเทียบและเลือก", desc: "เปรียบเทียบราคา ผลงาน และรีวิว จากนั้นเลือกผู้รับเหมาที่ตรงใจที่สุด" },
      { title: "ติดตามโครงการ", desc: "เราติดตามและดูแลโครงการตั้งแต่เริ่มต้นจนเสร็จสมบูรณ์ รับประกันคุณภาพ" },
    ],
  },
  en: {
    back: "← Back to Home",
    badge: "EPC Contractor Network",
    heroTitle: "Curated Network of Trusted Contractors",
    heroDesc: "Access our pre-vetted network of certified solar installers without the hassle of finding and vetting contractors yourself — we handle it all.",
    btnSubmit: "Submit Project",
    btnCalc: "Calculate My ROI",
    criteriaTitle: "Contractor Selection Criteria",
    criteriaDesc: "Every contractor must meet these standards before joining our network",
    benefitsTitle: "Benefits for You",
    benefitsDesc: "Convenience, confidence, and value all in one place",
    whyTitle: "Why Use Our Network",
    whyDesc: "Thailand's largest and most trusted contractor network",
    processTitle: "How It Works",
    processDesc: "4 simple steps to finding your perfect contractor",
    ctaTitle: "Ready to Start Your Project?",
    ctaDesc: "Submit your project today and receive quotes from our vetted contractors",
    criteria: [
      { title: "Licensing", desc: "Valid electrical contractor and EPC licenses that are current and non-expired" },
      { title: "Portfolio", desc: "Minimum 20+ completed solar installations with documented project history" },
      { title: "Insurance", desc: "Adequate liability and workmanship insurance coverage for all projects" },
      { title: "Reviews", desc: "Minimum 4.0-star customer ratings from verified real clients" },
    ],
    benefits: [
      { title: "Pre-Vetted Contractors", desc: "Every contractor rigorously screened for portfolio quality, licensing, and proven experience." },
      { title: "Competitive Pricing", desc: "Receive multiple quotes from qualified contractors and choose the best value for your budget." },
      { title: "High Standards", desc: "All contractors must comply with strict installation standards and safety protocols we define." },
      { title: "Project Management", desc: "We oversee the project, quality check every stage, and guarantee the final outcomes." },
    ],
    why: [
      { title: "Extensive Network", desc: "Nationwide contractor network covering all regions of Thailand for complete service availability." },
      { title: "Full Transparency", desc: "Transparent contractor information with verifiable licensing, portfolios, and real customer reviews." },
      { title: "Quality Guarantee", desc: "Quality guarantee on installation and after-sales service from all network contractors." },
      { title: "Perfect Matching", desc: "Smart matching system to find the ideal contractor for your specific project and budget." },
    ],
    process: [
      { title: "Submit Project", desc: "Fill in your project details including scope, budget, and any special requirements you have." },
      { title: "Receive Quotes", desc: "Get detailed quotations from 3-5 pre-screened contractors tailored to your project." },
      { title: "Compare & Choose", desc: "Compare pricing, portfolios, and reviews, then select the contractor that best fits." },
      { title: "Project Tracking", desc: "We monitor and oversee the project from start to completion, ensuring quality standards." },
    ],
  },
};

const CONTACT = { phone: "0953095196", line: "Monarrattana" };
const criteriaIcons = [Award, Star, Shield, CheckCircle];
const benefitIcons = [Shield, Target, Star, Handshake];
const whyIcons = [Network, BadgeCheck, FileCheck, Target];

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

export default function EPCPage() {
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
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.purple}10 0%, transparent 60%), ${C.dark}`, padding: "120px 2rem 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.purplePale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}><ArrowLeft size={16} /> {t.back}</Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.purplePale, border: `1px solid ${C.purple}30`, borderRadius: 20, padding: "6px 14px", color: C.purple, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
            <Users size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, color: C.text, marginBottom: 20, maxWidth: 700 }}>{t.heroTitle}</h1>
          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>{t.heroDesc}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/quote" style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`, color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 32px ${C.purple}44` }}>{t.btnSubmit} <ArrowRight size={18} /></Link>
            <Link href="/#calculator" style={{ display: "flex", alignItems: "center", gap: 8, background: C.glass, backdropFilter: "blur(12px)", border: `1px solid ${C.border}`, color: C.text, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>{t.btnCalc}</Link>
          </div>
        </div>
      </section>

      {/* CRITERIA */}
      <section style={{ padding: "80px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: C.text, marginBottom: 12 }}>{t.criteriaTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 16 }}>{t.criteriaDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
            {t.criteria.map((c, i) => { const Icon = criteriaIcons[i]; return (
              <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.purplePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Icon size={24} color={C.purple} /></div>
                <h3 style={{ color: C.text, fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ padding: "100px 2rem", background: C.dark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.purple, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Benefits</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.benefitsTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.benefitsDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.benefits.map((b, i) => { const Icon = benefitIcons[i]; return (
              <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.purple}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: C.purplePale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon size={26} color={C.purple} /></div>
                <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{b.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ padding: "100px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.purple, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.whyTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.whyDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.why.map((w, i) => { const Icon = whyIcons[i]; return (
              <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, textAlign: "center", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.purple}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.purplePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}><Icon size={28} color={C.purple} /></div>
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
            <div style={{ color: C.purple, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.processTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.processDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {t.process.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: 28, left: 28, width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 24, fontWeight: 700, zIndex: 1, boxShadow: `0 8px 24px ${C.purple}44` }}>{i + 1}</div>
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
      <section style={{ padding: "100px 2rem", background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "white", marginBottom: 20 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginBottom: 40, lineHeight: 1.8 }}>{t.ctaDesc}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: C.purple, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>{t.btnSubmit} <ArrowRight size={18} /></Link>
            <a href={`https://line.me/ti/p/~${CONTACT.line}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}><MessageCircle size={18} /> LINE Chat</a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <FloatingSupport lang={lang} />
    </div>
  );
}
