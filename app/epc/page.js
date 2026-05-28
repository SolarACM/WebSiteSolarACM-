"use client";
import { useState, useEffect } from "react";
import { Sun, Users, Network, Shield, Award, CheckCircle, ArrowRight, ArrowLeft, MessageCircle, X, Handshake, BadgeCheck, MapPin } from "lucide-react";
import Link from "next/link";
import { QuickStats, UnderstandSection, FAQAccordion, RelatedProjects } from "../_components/edu";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", darkCard: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
  glass: "rgba(255,255,255,0.7)",
};

const tx = {
  th: {
    back: "กลับหน้าหลัก",
    badge: "เครือข่ายผู้รับเหมา EPC",
    heroTitle: "เครือข่ายผู้รับเหมาที่ผ่านการคัดสรรแล้ว",
    heroDesc: "เข้าถึงเครือข่ายผู้รับเหมาที่ผ่านการคัดเกรดมาตรฐาน โดยที่คุณไม่ต้องเสียเวลาหาและตรวจสอบประวัติเอง เราจัดการให้ทั้งหมด",
    btnSubmit: "ส่งข้อมูลโครงการ",
    btnCalc: "คำนวณจุดคุ้มทุน",
    quickStats: [
      { icon: Users, value: "50+ ราย", label: "ผู้รับเหมาในเครือข่าย" },
      { icon: BadgeCheck, value: "100%", label: "ผ่านการตรวจสอบ" },
      { icon: MapPin, value: "ทั่วไทย", label: "ให้บริการทุกภูมิภาค" },
    ],
    benefitsTitle: "ประโยชน์ที่คุณได้รับ",
    benefitsDesc: "ความสะดวก ความมั่นใจ และความคุ้มค่าในที่เดียว",
    understandTag: "ทำความเข้าใจก่อนตัดสินใจ",
    understandTitle: "รู้จักเครือข่าย EPC ของเราอย่างรอบด้าน",
    understandDesc: "เข้าใจวิธีคัดเลือกผู้รับเหมา การตรวจสอบคุณภาพ และเครือข่ายทั่วประเทศ ก่อนเริ่มโครงการ",
    understand: [
      {
        title: "ทีมผู้รับเหมาคัดสรรอย่างไร",
        body: "ผู้รับเหมาทุกรายในเครือข่ายต้องผ่านการคัดกรองเข้มงวด ทั้งใบอนุญาตช่างไฟฟ้าและ EPC License ผลงานติดตั้งที่ผ่านมา ประกันภัยงาน และคะแนนรีวิวจากลูกค้าจริง คุณจึงมั่นใจได้ในทุกโครงการ",
        img: "/images/epc/epc-1.jpg",
        alt: "ทีมผู้รับเหมาติดตั้งโซลาร์มืออาชีพ",
        points: ["ตรวจสอบใบอนุญาตและ EPC License", "ประเมินผลงานอย่างน้อย 20+ โครงการ", "คะแนนรีวิวจากลูกค้าจริงไม่ต่ำกว่า 4.0 ดาว"],
      },
      {
        title: "ตรวจสอบคุณภาพงานอย่างไร",
        body: "เราทำหน้าที่เป็นตัวกลางควบคุมคุณภาพตลอดโครงการ ตั้งแต่ตรวจสอบแบบ การติดตั้ง ไปจนถึงการทดสอบระบบ พร้อมมาตรฐานความปลอดภัยที่กำหนดไว้ เพื่อรับประกันผลลัพธ์ที่ได้มาตรฐานทุกครั้ง",
        img: "/images/epc/epc-2.jpg",
        alt: "การตรวจสอบคุณภาพงานติดตั้งโซลาร์",
        points: ["ตรวจสอบคุณภาพทุกขั้นตอนการติดตั้ง", "ทดสอบระบบก่อนส่งมอบงาน", "รับประกันงานและบริการหลังการขาย"],
      },
      {
        title: "เครือข่ายครอบคลุมทั่วประเทศ",
        body: "ด้วยเครือข่ายผู้รับเหมากว่า 50 รายที่กระจายอยู่ทั่วทุกภูมิภาคของไทย เราสามารถจับคู่ผู้รับเหมาที่อยู่ใกล้พื้นที่โครงการของคุณ ลดต้นทุนการเดินทางและให้บริการได้รวดเร็วยิ่งขึ้น",
        img: "/images/epc/epc-3.jpg",
        alt: "เครือข่ายผู้รับเหมาโซลาร์ทั่วประเทศ",
        points: ["ครอบคลุมทุกภูมิภาคทั่วไทย", "จับคู่ผู้รับเหมาที่อยู่ใกล้โครงการ", "ลดต้นทุนและเวลาในการดำเนินงาน"],
      },
    ],
    faqTag: "คำถามที่พบบ่อย",
    faqTitle: "ข้อสงสัยเกี่ยวกับเครือข่าย EPC",
    faqDesc: "รวมคำถามที่เจ้าของโครงการถามบ่อยที่สุด",
    faq: [
      { q: "คัดเลือกผู้รับเหมาอย่างไร?", a: "เราคัดกรองผู้รับเหมาทุกรายด้วยเกณฑ์ 4 ด้าน ได้แก่ ใบอนุญาตที่ถูกต้อง ผลงานติดตั้งอย่างน้อย 20+ โครงการ ประกันภัยงานที่ครอบคลุม และคะแนนรีวิวจากลูกค้าจริงไม่ต่ำกว่า 4.0 ดาว ก่อนเข้าร่วมเครือข่าย" },
      { q: "ราคาต่างจากการจ้างผู้รับเหมาตรงไหม?", a: "โดยทั่วไปราคาแข่งขันได้หรือดีกว่า เพราะคุณได้รับใบเสนอราคาจากผู้รับเหมาหลายรายมาเปรียบเทียบ และเราช่วยตรวจสอบความสมเหตุสมผลของราคาให้ โดยไม่มีค่าใช้จ่ายเพิ่มเติมจากการใช้บริการจับคู่" },
      { q: "มีการรับประกันงานไหม?", a: "มี ผู้รับเหมาทุกรายในเครือข่ายต้องมีประกันภัยงานและรับประกันการติดตั้ง เราในฐานะตัวกลางยังช่วยติดตามและรับประกันผลลัพธ์ของโครงการให้ด้วย" },
      { q: "ถ้ามีปัญหาหลังติดตั้งทำอย่างไร?", a: "ติดต่อเราได้โดยตรง เราทำหน้าที่เป็นตัวกลางประสานงานกับผู้รับเหมาเพื่อแก้ไขปัญหาให้ตามเงื่อนไขการรับประกัน คุณไม่ต้องตามงานเองและมั่นใจได้ว่าจะได้รับการดูแล" },
    ],
    projTag: "ผลงานจริง",
    projTitle: "โครงการที่ดำเนินการผ่านเครือข่าย",
    projDesc: "ตัวอย่างโครงการที่ติดตั้งโดยผู้รับเหมาในเครือข่ายของเรา",
    projView: "ดูผลงานทั้งหมด",
    ctaTitle: "พร้อมเริ่มโครงการแล้วหรือยัง?",
    ctaDesc: "ส่งข้อมูลโครงการวันนี้ และรับใบเสนอราคาจากผู้รับเหมาที่ผ่านการคัดสรร",
    benefits: [
      { title: "ผ่านการตรวจสอบแล้ว", desc: "ผู้รับเหมาทุกรายผ่านการคัดเกรดเข้มงวด ตรวจสอบผลงาน ใบอนุญาต และประสบการณ์ครบถ้วน" },
      { title: "ราคาแข่งขันได้", desc: "รับใบเสนอราคาจากผู้รับเหมาหลายราย เปรียบเทียบและเลือกราคาที่เหมาะสมที่สุด" },
      { title: "มาตรฐานสูง", desc: "ผู้รับเหมาทุกรายต้องปฏิบัติตามมาตรฐานการติดตั้งและความปลอดภัยที่เรากำหนดไว้" },
      { title: "บริหารจัดการโครงการ", desc: "เราเป็นตัวกลางดูแลโครงการ ตรวจสอบคุณภาพงาน และรับประกันผลลัพธ์ให้คุณ" },
    ],
  },
  en: {
    back: "Back to Home",
    badge: "EPC Contractor Network",
    heroTitle: "Curated Network of Trusted Contractors",
    heroDesc: "Access our pre-vetted network of certified solar installers without the hassle of finding and vetting contractors yourself — we handle it all.",
    btnSubmit: "Submit Project",
    btnCalc: "Calculate My ROI",
    quickStats: [
      { icon: Users, value: "50+", label: "Network contractors" },
      { icon: BadgeCheck, value: "100%", label: "Pre-vetted & verified" },
      { icon: MapPin, value: "Nationwide", label: "Coverage across Thailand" },
    ],
    benefitsTitle: "Benefits for You",
    benefitsDesc: "Convenience, confidence, and value all in one place",
    understandTag: "Understand Before You Decide",
    understandTitle: "Get to Know Our EPC Network",
    understandDesc: "Understand how contractors are selected, how quality is verified, and our nationwide coverage before starting your project.",
    understand: [
      {
        title: "How Contractors Are Selected",
        body: "Every contractor in our network passes rigorous screening — valid electrical and EPC licenses, a track record of past installations, workmanship insurance, and verified customer review scores. You can trust every project.",
        img: "/images/epc/epc-1.jpg",
        alt: "Professional solar installation contractor team",
        points: ["Verified licenses and EPC certification", "At least 20+ completed installations", "Minimum 4.0-star verified customer reviews"],
      },
      {
        title: "How Quality Is Verified",
        body: "We act as the quality-control intermediary throughout the project — from reviewing designs and installation to system testing — applying defined safety standards to guarantee standard-compliant results every time.",
        img: "/images/epc/epc-2.jpg",
        alt: "Solar installation quality inspection",
        points: ["Quality checks at every installation stage", "System testing before handover", "Workmanship warranty and after-sales service"],
      },
      {
        title: "Nationwide Network Coverage",
        body: "With over 50 contractors spread across every region of Thailand, we can match a contractor close to your project site — reducing travel costs and enabling faster service.",
        img: "/images/epc/epc-3.jpg",
        alt: "Nationwide solar contractor network",
        points: ["Coverage across all regions of Thailand", "Match contractors near your project", "Lower costs and faster execution"],
      },
    ],
    faqTag: "Frequently Asked Questions",
    faqTitle: "EPC Network Questions",
    faqDesc: "The most common questions from project owners",
    faq: [
      { q: "How are contractors selected?", a: "We screen every contractor against four criteria: valid licensing, at least 20+ completed installations, adequate workmanship insurance, and verified customer review scores of 4.0 stars or higher before joining the network." },
      { q: "How does pricing compare to hiring directly?", a: "Pricing is typically competitive or better, because you receive multiple quotes to compare, and we help verify their reasonableness — with no extra charge for using the matching service." },
      { q: "Is there a workmanship warranty?", a: "Yes. Every network contractor must carry workmanship insurance and warranty their installation. As the intermediary, we also track and guarantee project outcomes for you." },
      { q: "What if there's a problem after installation?", a: "Contact us directly. We coordinate with the contractor to resolve issues under warranty terms, so you don't have to chase the work yourself and can be confident you'll be taken care of." },
    ],
    projTag: "Real Projects",
    projTitle: "Projects Delivered Through Our Network",
    projDesc: "Examples of projects installed by contractors in our network",
    projView: "View All Projects",
    ctaTitle: "Ready to Start Your Project?",
    ctaDesc: "Submit your project today and receive quotes from our vetted contractors",
    benefits: [
      { title: "Pre-Vetted Contractors", desc: "Every contractor rigorously screened for portfolio quality, licensing, and proven experience." },
      { title: "Competitive Pricing", desc: "Receive multiple quotes from qualified contractors and choose the best value for your budget." },
      { title: "High Standards", desc: "All contractors must comply with strict installation standards and safety protocols we define." },
      { title: "Project Management", desc: "We oversee the project, quality check every stage, and guarantee the final outcomes." },
    ],
  },
};

const CONTACT = { phone: "0953095196", line: "Monarrattana" };

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
      background: scrolled ? "rgba(15,28,20,0.97)" : "rgba(15,28,20,0.88)",
      backdropFilter: "blur(20px)", borderBottom: `1px solid rgba(255,255,255,0.08)`,
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.15)" : "none",
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
          <Link href="/quote"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, color: "white", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            {lang === "th" ? "ขอใบเสนอราคา" : "Get Free Quote"}
          </Link>
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

function Footer({ lang }) {
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
            { title: "Company", links: [{ label: "About Us", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: "Certifications", href: "/" }, { label: "Careers", href: "/" }] },
            { title: "Legal", links: [{ label: "Privacy Policy", href: "/" }, { label: "Terms of Service", href: "/" }, { label: "Warranty Policy", href: "/" }, { label: "PDPA Compliance", href: "/" }] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: C.text, fontWeight: 600, marginBottom: 16, fontSize: 14 }}>{title}</div>
              {links.map(l => (
                <Link key={l.label} href={l.href} style={{ display: "block", color: C.textMuted, fontSize: 13, marginBottom: 10, textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ color: C.textMuted, fontSize: 13 }}>© 2025 Solar ACM Systems Corporation. All rights reserved.</div>
          <div style={{ color: C.textMuted, fontSize: 12, opacity: 0.7 }}>ภาพประกอบบางส่วน: Wikimedia Commons / Flickr (CC)</div>
        </div>
      </div>
    </footer>
  );
}

const benefitIcons = [BadgeCheck, Handshake, Shield, Network];

export default function EpcPage() {
  const [lang, setLang] = useState("th");
  const t = tx[lang];

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0F4F1; }
        ::-webkit-scrollbar-thumb { background: #2D7D46; border-radius: 3px; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .cards-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <NavBar lang={lang} setLang={setLang} />

      {/* ── HERO + QUICK STATS ── */}
      <section style={{
        display: "flex", alignItems: "center",
        background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.orange}10 0%, transparent 60%), ${C.dark}`,
        padding: "120px 2rem 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.orangePale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}>
            <ArrowLeft size={16} /> {t.back}
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.orange}15`, border: `1px solid ${C.orange}30`, borderRadius: 20, padding: "6px 14px", color: C.orange, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
            <Network size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, color: C.text, marginBottom: 20, maxWidth: 720 }}>
            {t.heroTitle}
          </h1>
          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 600, marginBottom: 36 }}>{t.heroDesc}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/quote"
              style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 32px ${C.orange}44` }}>
              {t.btnSubmit} <ArrowRight size={18} />
            </Link>
            <Link href="/#calculator"
              style={{ display: "flex", alignItems: "center", gap: 8, background: C.glass, backdropFilter: "blur(12px)", border: `1px solid ${C.border}`, color: C.text, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
              {t.btnCalc}
            </Link>
          </div>
          <QuickStats stats={t.quickStats} accent={C.orange} />
        </div>
      </section>

      {/* ── UNDERSTANDING ── */}
      <UnderstandSection tag={t.understandTag} title={t.understandTitle} desc={t.understandDesc} blocks={t.understand} accent={C.orange} />

      {/* ── BENEFITS ── */}
      <section style={{ padding: "100px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.orangeLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Benefits</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.benefitsTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.benefitsDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, transition: "border-color 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.orange}60`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: `${C.orange}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon size={26} color={C.orange} />
                  </div>
                  <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{b.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQAccordion tag={t.faqTag} title={t.faqTitle} desc={t.faqDesc} items={t.faq} accent={C.orange} />

      {/* ── RELATED PROJECTS ── */}
      <RelatedProjects tag={t.projTag} title={t.projTitle} desc={t.projDesc}
        images={["/portfolio/project-01.jpg", "/portfolio/project-02.jpg", "/portfolio/project-03.jpg"]}
        viewAllLabel={t.projView} accent={C.orange} />

      {/* ── CTA ── */}
      <section style={{ padding: "100px 2rem", background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "white", marginBottom: 20 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginBottom: 40, lineHeight: 1.8 }}>{t.ctaDesc}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: C.orange, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              {t.btnSubmit} <ArrowRight size={18} />
            </Link>
            <a href={`https://line.me/ti/p/~${CONTACT.line}`} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.3)" }}>
              <MessageCircle size={18} /> LINE Chat
            </a>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <FloatingSupport lang={lang} />
    </div>
  );
}
