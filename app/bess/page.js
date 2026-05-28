"use client";
import { useState, useEffect } from "react";
import { Sun, Battery, Clock, TrendingUp, Shield, Award, CheckCircle, ArrowRight, ArrowLeft, Zap, MessageCircle, X, Moon, Power, TrendingDown, BatteryCharging } from "lucide-react";
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
    badge: "ระบบกักเก็บพลังงาน",
    heroTitle: "เก็บพลังงานไว้ใช้เมื่อคุณต้องการ",
    heroDesc: "เก็บไฟฟ้าส่วนเกินไว้ด้วยระบบแบตเตอรี่อัจฉริยะ เพื่อความอิสระในการใช้พลังงานตลอด 24 ชั่วโมง ทั้งในบ้านและธุรกิจ",
    btnQuote: "ขอรับใบเสนอราคาฟรี",
    btnCalc: "คำนวณจุดคุ้มทุน",
    quickStats: [
      { icon: Clock, value: "24 ชม.", label: "ใช้ไฟต่อเนื่อง" },
      { icon: TrendingDown, value: "80%", label: "ลดค่าไฟสูงสุด" },
      { icon: Battery, value: "LFP", label: "แบตเตอรี่ปลอดภัยสูง" },
    ],
    benefitsTitle: "ประโยชน์ของแบตเตอรี่",
    benefitsDesc: "ความอิสระและความมั่นคงทางพลังงานที่สมบูรณ์แบบ",
    understandTag: "ทำความเข้าใจก่อนตัดสินใจ",
    understandTitle: "รู้จักระบบกักเก็บพลังงานอย่างรอบด้าน",
    understandDesc: "เข้าใจหลักการเก็บไฟ การใช้พลังงานกลางคืน และระบบสำรองไฟ ก่อนตัดสินใจติดตั้ง",
    understand: [
      {
        title: "ระบบกักเก็บพลังงานทำงานอย่างไร",
        body: "ระบบ BESS เก็บไฟฟ้าส่วนเกินที่ผลิตได้จากโซลาร์ในตอนกลางวันไว้ในแบตเตอรี่ แทนที่จะปล่อยไหลกลับเข้ากริด อินเวอร์เตอร์ไฮบริดจะบริหารพลังงานระหว่างโซลาร์ แบตเตอรี่ และกริดโดยอัตโนมัติ เพื่อให้คุ้มค่าที่สุด",
        img: "/images/bess/bess-1.jpg",
        alt: "ระบบกักเก็บพลังงานด้วยแบตเตอรี่",
        points: ["เก็บไฟส่วนเกินจากโซลาร์ในตอนกลางวัน", "อินเวอร์เตอร์ไฮบริดจัดการพลังงานอัตโนมัติ", "ใช้พลังงานที่เก็บไว้ได้คุ้มค่าที่สุด"],
      },
      {
        title: "ใช้ไฟกลางคืนจากแบตเตอรี่อย่างไร",
        body: "เมื่อพระอาทิตย์ตก ระบบจะดึงพลังงานที่เก็บไว้ในแบตเตอรี่มาใช้กับเครื่องใช้ไฟฟ้าในบ้านหรือธุรกิจ ทำให้ลดการซื้อไฟจากกริดในช่วงกลางคืนหรือช่วง On-Peak ที่ราคาแพงได้อย่างมีนัยสำคัญ",
        img: "/images/bess/bess-2.jpg",
        alt: "การใช้พลังงานแบตเตอรี่ในเวลากลางคืน",
        points: ["ใช้ไฟที่เก็บไว้ต่อเนื่องในตอนกลางคืน", "ลดการซื้อไฟราคาแพงช่วง On-Peak", "ประหยัดค่าไฟได้สูงสุดถึง 80%"],
      },
      {
        title: "ระบบสำรองไฟ (Backup Power) ทำงานอย่างไร",
        body: "เมื่อไฟฟ้าจากการไฟฟ้าดับ ระบบ BESS จะสลับมาจ่ายไฟจากแบตเตอรี่โดยอัตโนมัติภายในเสี้ยววินาที ทำให้เครื่องใช้ไฟฟ้าสำคัญทำงานต่อเนื่องไม่สะดุด เหมาะกับบ้านและธุรกิจที่ต้องการไฟตลอดเวลา",
        img: "/images/bess/bess-3.jpg",
        alt: "ระบบแบตเตอรี่สำรองไฟติดผนัง",
        points: ["สลับจ่ายไฟอัตโนมัติเมื่อไฟดับ", "ปกป้องอุปกรณ์สำคัญไม่ให้สะดุด", "เหมาะกับธุรกิจที่ต้องการไฟต่อเนื่อง"],
      },
    ],
    faqTag: "คำถามที่พบบ่อย",
    faqTitle: "ข้อสงสัยเกี่ยวกับระบบแบตเตอรี่",
    faqDesc: "รวมคำถามที่ลูกค้าถามบ่อยเกี่ยวกับ BESS",
    faq: [
      { q: "แบตเตอรี่ LFP แตกต่างจากแบตเตอรี่ทั่วไปอย่างไร?", a: "LFP (Lithium Iron Phosphate) มีความปลอดภัยสูงกว่าลิเธียมทั่วไปมาก ทนความร้อนได้ดี ไม่ลุกติดไฟง่าย มีอายุการใช้งานยาวนานกว่า และรองรับรอบการชาร์จได้มากกว่า จึงเหมาะกับการใช้งานในบ้านและธุรกิจ" },
      { q: "แบตเตอรี่อยู่ได้กี่ปี?", a: "แบตเตอรี่ LFP คุณภาพดีมีอายุการใช้งานประมาณ 10-15 ปี หรือคิดเป็น 6,000 รอบการชาร์จขึ้นไป โดยทั่วไปมีการรับประกันความจุคงเหลือไม่ต่ำกว่า 70% ที่ 10 ปี" },
      { q: "ชาร์จเต็มใช้เวลานานแค่ไหน?", a: "ขึ้นอยู่กับขนาดแบตเตอรี่และกำลังผลิตของโซลาร์ โดยทั่วไประบบบ้านชาร์จเต็มได้ภายในช่วงแดดดีเพียงไม่กี่ชั่วโมง ระบบจะบริหารการชาร์จให้เหมาะสมโดยอัตโนมัติ" },
      { q: "ระบบแบตเตอรี่ปลอดภัยไหม?", a: "ปลอดภัยสูง แบตเตอรี่ LFP มีระบบ BMS (Battery Management System) ควบคุมอุณหภูมิ แรงดัน และกระแสตลอดเวลา พร้อมมาตรฐานความปลอดภัยระดับสากล ติดตั้งโดยทีมที่ได้รับการรับรอง" },
      { q: "ขยายความจุระบบเพิ่มได้ไหม?", a: "ได้ ระบบออกแบบแบบโมดูลาร์ สามารถเริ่มต้นด้วยความจุที่เหมาะสมแล้วเพิ่มแบตเตอรี่ภายหลังเมื่อความต้องการเพิ่มขึ้น โดยไม่ต้องเปลี่ยนระบบทั้งหมด" },
    ],
    projTag: "ผลงานจริง",
    projTitle: "โครงการพลังงานที่เราติดตั้ง",
    projDesc: "ตัวอย่างโครงการระบบพลังงานภายใต้เครือข่ายของเรา",
    projView: "ดูผลงานทั้งหมด",
    ctaTitle: "พร้อมเป็นอิสระทางพลังงานแล้วหรือยัง?",
    ctaDesc: "ติดต่อเราเพื่อรับคำปรึกษาเกี่ยวกับระบบแบตเตอรี่ที่เหมาะกับคุณ",
    benefits: [
      { title: "ใช้ไฟได้ตลอด 24 ชั่วโมง", desc: "เก็บพลังงานส่วนเกินในตอนกลางวันไว้ใช้ในตอนกลางคืน ไม่ขาดไฟแม้มีเมฆครึ้มหรือไฟดับ" },
      { title: "ประหยัดค่าไฟมากขึ้น", desc: "ลดค่าไฟได้ถึง 80% โดยใช้พลังงานที่เก็บไว้แทนการซื้อไฟจากการไฟฟ้าในราคาแพง" },
      { title: "แบ็คอัพไฟฉุกเฉิน", desc: "พลังงานสำรองอัตโนมัติเมื่อไฟฟ้าดับ เหมาะสำหรับธุรกิจและบ้านที่ต้องการไฟตลอดเวลา" },
      { title: "จัดการพีคดีมานด์", desc: "ลดค่า Demand Charge โดยใช้พลังงานจากแบตเตอรี่ในช่วงที่มีการใช้ไฟฟ้าสูงสุดของธุรกิจ" },
    ],
  },
  en: {
    back: "Back to Home",
    badge: "Battery Energy Storage System",
    heroTitle: "Store Energy, Use Anytime You Want",
    heroDesc: "Store excess solar energy with smart battery systems for 24/7 energy independence — perfect for both homes and businesses.",
    btnQuote: "Get a Free Quote",
    btnCalc: "Calculate My ROI",
    quickStats: [
      { icon: Clock, value: "24 hrs", label: "Continuous power" },
      { icon: TrendingDown, value: "80%", label: "Max bill reduction" },
      { icon: Battery, value: "LFP", label: "High-safety battery" },
    ],
    benefitsTitle: "Battery Benefits",
    benefitsDesc: "Complete energy independence and security",
    understandTag: "Understand Before You Decide",
    understandTitle: "Get to Know Energy Storage",
    understandDesc: "Understand how energy is stored, how nighttime power works, and how backup power functions before you install.",
    understand: [
      {
        title: "How Energy Storage Works",
        body: "A BESS stores excess solar energy generated during the day in batteries instead of exporting it to the grid. A hybrid inverter automatically manages power between solar, battery, and grid for maximum value.",
        img: "/images/bess/bess-1.jpg",
        alt: "Battery energy storage system",
        points: ["Stores surplus daytime solar energy", "Hybrid inverter manages power automatically", "Uses stored energy for maximum value"],
      },
      {
        title: "How You Use Stored Power at Night",
        body: "When the sun sets, the system draws stored battery energy to power your home or business appliances, significantly reducing grid purchases during nighttime or expensive On-Peak periods.",
        img: "/images/bess/bess-2.jpg",
        alt: "Using battery power at night",
        points: ["Continuous power from storage at night", "Avoids expensive On-Peak grid power", "Up to 80% savings on electricity"],
      },
      {
        title: "How Backup Power Works",
        body: "When the grid goes down, the BESS automatically switches to battery power within a fraction of a second, keeping critical appliances running without interruption — ideal for homes and businesses needing constant power.",
        img: "/images/bess/bess-3.jpg",
        alt: "Wall-mounted backup battery system",
        points: ["Automatic switchover during outages", "Protects critical equipment from interruption", "Ideal for businesses needing continuous power"],
      },
    ],
    faqTag: "Frequently Asked Questions",
    faqTitle: "Battery System Questions",
    faqDesc: "Common questions customers ask about BESS",
    faq: [
      { q: "How is LFP different from regular batteries?", a: "LFP (Lithium Iron Phosphate) is far safer than standard lithium — it handles heat well, resists fire, lasts longer, and supports more charge cycles, making it ideal for home and business use." },
      { q: "How long does a battery last?", a: "Quality LFP batteries last around 10-15 years, or 6,000+ charge cycles. They typically come with a warranty guaranteeing at least 70% remaining capacity at 10 years." },
      { q: "How long does a full charge take?", a: "It depends on battery size and solar output. A typical home system fully charges within a few hours of good sunlight, and the system manages charging optimally and automatically." },
      { q: "Is the battery system safe?", a: "Very safe. LFP batteries include a BMS (Battery Management System) continuously controlling temperature, voltage, and current, with international safety standards and certified installation." },
      { q: "Can I expand the capacity later?", a: "Yes. The modular design lets you start with the right capacity and add batteries later as needs grow, without replacing the whole system." },
    ],
    projTag: "Real Projects",
    projTitle: "Energy Projects We've Installed",
    projDesc: "Examples of energy system projects delivered through our network",
    projView: "View All Projects",
    ctaTitle: "Ready for Energy Independence?",
    ctaDesc: "Contact us for consultation on the right battery system for you",
    benefits: [
      { title: "24/7 Power Availability", desc: "Store excess daytime solar energy for nighttime use, ensuring uninterrupted power supply always." },
      { title: "Maximize Savings", desc: "Save up to 80% on electricity by using stored energy instead of buying expensive grid power." },
      { title: "Emergency Backup", desc: "Automatic backup power during outages — ideal for businesses and homes requiring constant power." },
      { title: "Peak Demand Management", desc: "Reduce demand charges by discharging batteries during peak electricity usage hours." },
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

const benefitIcons = [Clock, TrendingDown, Power, BatteryCharging];

export default function BessPage() {
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
        background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.green}12 0%, transparent 60%), ${C.dark}`,
        padding: "120px 2rem 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.greenPale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}>
            <ArrowLeft size={16} /> {t.back}
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.green}15`, border: `1px solid ${C.green}30`, borderRadius: 20, padding: "6px 14px", color: C.green, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
            <Battery size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, color: C.text, marginBottom: 20, maxWidth: 700 }}>
            {t.heroTitle}
          </h1>
          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>{t.heroDesc}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/quote"
              style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 32px ${C.green}44` }}>
              {t.btnQuote} <ArrowRight size={18} />
            </Link>
            <Link href="/#calculator"
              style={{ display: "flex", alignItems: "center", gap: 8, background: C.glass, backdropFilter: "blur(12px)", border: `1px solid ${C.border}`, color: C.text, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
              {t.btnCalc}
            </Link>
          </div>
          <QuickStats stats={t.quickStats} accent={C.green} />
        </div>
      </section>

      {/* ── UNDERSTANDING ── */}
      <UnderstandSection tag={t.understandTag} title={t.understandTitle} desc={t.understandDesc} blocks={t.understand} accent={C.green} />

      {/* ── BENEFITS ── */}
      <section style={{ padding: "100px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Benefits</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.benefitsTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.benefitsDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, transition: "border-color 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.green}60`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: `${C.green}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <Icon size={26} color={C.green} />
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
      <FAQAccordion tag={t.faqTag} title={t.faqTitle} desc={t.faqDesc} items={t.faq} accent={C.green} />

      {/* ── RELATED PROJECTS ── */}
      <RelatedProjects tag={t.projTag} title={t.projTitle} desc={t.projDesc}
        images={["/portfolio/project-07.jpg", "/portfolio/project-08.jpg", "/portfolio/project-09.jpg"]}
        viewAllLabel={t.projView} accent={C.green} />

      {/* ── CTA ── */}
      <section style={{ padding: "100px 2rem", background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "white", marginBottom: 20 }}>{t.ctaTitle}</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginBottom: 40, lineHeight: 1.8 }}>{t.ctaDesc}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote"
              style={{ display: "flex", alignItems: "center", gap: 8, background: "white", color: C.green, padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
              {t.btnQuote} <ArrowRight size={18} />
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
