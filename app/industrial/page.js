"use client";
import { useState, useEffect } from "react";
import { Sun, Building2, TrendingUp, Shield, Award, Users, CheckCircle, ArrowRight, ArrowLeft, Zap, MessageCircle, X, Factory, BarChart3, TrendingDown, Clock, Activity } from "lucide-react";
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
    badge: "สำหรับธุรกิจและอุตสาหกรรม",
    heroTitle: "โซลาร์ขนาดใหญ่เพื่อธุรกิจที่ยั่งยืน",
    heroDesc: "ระบบโซลาร์สำหรับโรงงานและอาคารพาณิชย์ ด้วยอุปกรณ์เกรดอุตสาหกรรม พร้อมการรับประกันประสิทธิภาพและบริการหลังการขายในระยะยาว",
    btnQuote: "ขอรับใบเสนอราคาฟรี",
    btnCalc: "คำนวณจุดคุ้มทุน",
    quickStats: [
      { icon: TrendingDown, value: "40-60%", label: "ลดต้นทุนพลังงาน" },
      { icon: Clock, value: "3-5 ปี", label: "ระยะเวลาคืนทุน" },
      { icon: Activity, value: "24/7", label: "ติดตามระบบเรียลไทม์" },
    ],
    benefitsTitle: "ประโยชน์สำหรับธุรกิจ",
    benefitsDesc: "เพิ่มความสามารถในการแข่งขันและความยั่งยืนให้กับธุรกิจของคุณ",
    understandTag: "ทำความเข้าใจก่อนตัดสินใจ",
    understandTitle: "รู้จักโซลาร์เชิงพาณิชย์อย่างรอบด้าน",
    understandDesc: "เข้าใจการทำงานของระบบขนาดใหญ่ การคำนวณ ROI และการติดตามผล ก่อนวางแผนลงทุน",
    understand: [
      {
        title: "ระบบโซลาร์สำหรับโรงงานทำงานอย่างไร",
        body: "ระบบโซลาร์รูฟท็อปกำลังสูงติดตั้งบนหลังคาโรงงานหรืออาคาร ผลิตไฟฟ้าป้อนเข้าสู่การใช้งานภายในโดยตรงในช่วงกลางวัน ซึ่งเป็นช่วงที่โรงงานส่วนใหญ่ใช้ไฟสูงสุด ช่วยลดการดึงไฟจากระบบในอัตรา On-Peak ที่แพงที่สุด",
        img: "/images/industrial/ind-1.jpg",
        alt: "ระบบโซลาร์รูฟท็อปบนหลังคาโรงงานอุตสาหกรรม",
        points: ["ผลิตไฟตรงกับช่วงพีคการใช้งานกลางวัน", "ลดค่าไฟในอัตรา On-Peak ที่สูงที่สุด", "รองรับโหลดการผลิตต่อเนื่องได้จริง"],
      },
      {
        title: "ROI สำหรับธุรกิจคำนวณอย่างไร",
        body: "ROI ของโครงการเชิงพาณิชย์คำนวณจากเงินลงทุนเทียบกับค่าไฟที่ประหยัดได้ต่อปี โดยทั่วไปธุรกิจที่ใช้ไฟกลางวันสูงจะคืนทุนภายใน 3-5 ปี และยังได้รับสิทธิประโยชน์ทางภาษีจากการลงทุนพลังงานสะอาดเพิ่มเติม",
        img: "/images/industrial/ind-2.jpg",
        alt: "การวิเคราะห์ผลตอบแทนการลงทุนระบบโซลาร์ธุรกิจ",
        points: ["คืนทุนเฉลี่ย 3-5 ปีสำหรับธุรกิจใช้ไฟกลางวัน", "ล็อคต้นทุนพลังงานระยะยาว 25 ปีขึ้นไป", "รับสิทธิลดหย่อนภาษีตามนโยบายรัฐ"],
      },
      {
        title: "ติดตามและควบคุมระบบอย่างไร",
        body: "ระบบมาพร้อมแพลตฟอร์มติดตามผลแบบเรียลไทม์ แสดงกำลังผลิต ค่าไฟที่ประหยัด และสถานะอุปกรณ์ตลอด 24 ชั่วโมง พร้อมการแจ้งเตือนอัตโนมัติเมื่อประสิทธิภาพต่ำกว่าเกณฑ์ เพื่อการบำรุงรักษาเชิงป้องกัน",
        img: "/images/industrial/ind-3.jpg",
        alt: "แดชบอร์ดติดตามระบบโซลาร์เชิงพาณิชย์",
        points: ["มอนิเตอร์กำลังผลิตและการประหยัดแบบเรียลไทม์", "แจ้งเตือนอัตโนมัติเมื่อระบบผิดปกติ", "รายงานผลย้อนหลังเพื่อวางแผนพลังงาน"],
      },
    ],
    faqTag: "คำถามที่พบบ่อย",
    faqTitle: "ข้อสงสัยเกี่ยวกับโซลาร์ธุรกิจ",
    faqDesc: "รวมคำถามที่เจ้าของโรงงานและธุรกิจถามบ่อยที่สุด",
    faq: [
      { q: "ขนาดระบบที่เหมาะกับโรงงานคืออะไร?", a: "ขนาดระบบขึ้นอยู่กับปริมาณการใช้ไฟ พื้นที่หลังคา และรูปแบบการผลิต โดยทั่วไปอยู่ที่ 100 kWp ถึงหลาย MWp วิศวกรจะวิเคราะห์โหลดจริงของคุณเพื่อออกแบบขนาดที่ให้ผลตอบแทนสูงสุด" },
      { q: "ติดตั้งโดยไม่หยุดการผลิตได้ไหม?", a: "ได้ การติดตั้งบนหลังคาส่วนใหญ่ไม่กระทบสายการผลิต เราวางแผนงานเป็นเฟส และทำงานเชื่อมต่อระบบในช่วงที่กระทบน้อยที่สุด เพื่อให้โรงงานเดินเครื่องได้ตามปกติ" },
      { q: "ROI คำนวณอย่างไร?", a: "ROI คำนวณจากเงินลงทุนหารด้วยค่าไฟที่ประหยัดได้ต่อปี รวมสิทธิประโยชน์ทางภาษี เราจัดทำแบบจำลองทางการเงินโดยละเอียด แสดงกระแสเงินสด จุดคุ้มทุน และผลตอบแทนสะสมตลอดอายุโครงการ" },
      { q: "ต้องมีวิศวกรประจำดูแลไหม?", a: "ไม่จำเป็น ระบบทำงานอัตโนมัติและมีแพลตฟอร์มติดตามผลทางไกล ทีมของเราดูแลการบำรุงรักษาเชิงป้องกันและซ่อมบำรุงให้ตามสัญญาบริการ" },
      { q: "ระบบ monitoring ทำงานอย่างไร?", a: "ระบบมอนิเตอร์เก็บข้อมูลกำลังผลิต พลังงานสะสม และสถานะอินเวอร์เตอร์แบบเรียลไทม์ ส่งขึ้นคลาวด์ให้ดูผ่านเว็บหรือแอป พร้อมแจ้งเตือนทันทีหากตรวจพบความผิดปกติ" },
    ],
    projTag: "ผลงานจริง",
    projTitle: "โครงการอุตสาหกรรมที่เราติดตั้ง",
    projDesc: "ตัวอย่างโครงการโซลาร์รูฟท็อปสำหรับโรงงานภายใต้เครือข่ายของเรา",
    projView: "ดูผลงานทั้งหมด",
    ctaTitle: "พร้อมลดต้นทุนธุรกิจแล้วหรือยัง?",
    ctaDesc: "ติดต่อทีมผู้เชี่ยวชาญเพื่อรับคำปรึกษาและใบเสนอราคาสำหรับโครงการของคุณ",
    benefits: [
      { title: "ลดต้นทุนไฟฟ้า 40-60%", desc: "ลดค่าไฟฟ้าสำหรับโรงงานและอาคารพาณิชย์อย่างมีนัยสำคัญ พร้อมคืนทุนเร็วภายใน 3-5 ปี" },
      { title: "เพิ่มกำไรต่อหน่วย", desc: "ลดต้นทุนการผลิตทำให้สามารถแข่งขันได้ดีขึ้น และเพิ่มอัตรากำไรสุทธิได้อย่างชัดเจน" },
      { title: "ป้องกันราคาไฟขึ้น", desc: "ล็อคต้นทุนพลังงานในระยะยาว ไม่ได้รับผลกระทบจากการปรับขึ้นค่าไฟฟ้าในอนาคต" },
      { title: "สิทธิประโยชน์ทางภาษี", desc: "รับสิทธิลดหย่อนภาษีและโบนัสจากการลงทุนพลังงานสะอาดตามนโยบายภาครัฐไทย" },
    ],
  },
  en: {
    back: "Back to Home",
    badge: "Business & Industrial Solar",
    heroTitle: "Large-Scale Solar for Sustainable Business",
    heroDesc: "Industrial solar systems for factories and commercial buildings with industrial-grade components, performance guarantees, and long-term service.",
    btnQuote: "Get a Free Quote",
    btnCalc: "Calculate My ROI",
    quickStats: [
      { icon: TrendingDown, value: "40-60%", label: "Lower energy costs" },
      { icon: Clock, value: "3-5 yrs", label: "Payback period" },
      { icon: Activity, value: "24/7", label: "Real-time monitoring" },
    ],
    benefitsTitle: "Business Benefits",
    benefitsDesc: "Enhance competitiveness and sustainability for your business",
    understandTag: "Understand Before You Decide",
    understandTitle: "Get to Know Commercial Solar",
    understandDesc: "Understand how large-scale systems work, how ROI is calculated, and how monitoring works before planning your investment.",
    understand: [
      {
        title: "How Factory Solar Systems Work",
        body: "High-capacity rooftop solar is installed on factory or building roofs, feeding power directly into on-site consumption during daytime — exactly when most factories use the most electricity, cutting the costliest On-Peak grid draw.",
        img: "/images/industrial/ind-1.jpg",
        alt: "Rooftop solar system on an industrial factory roof",
        points: ["Generates power during peak daytime usage", "Reduces the most expensive On-Peak charges", "Supports continuous production loads"],
      },
      {
        title: "How Business ROI Is Calculated",
        body: "Commercial ROI is calculated from the investment versus annual electricity savings. Businesses with high daytime usage typically break even within 3-5 years, plus additional tax incentives for clean energy investment.",
        img: "/images/industrial/ind-2.jpg",
        alt: "Return on investment analysis for business solar",
        points: ["3-5 year payback for daytime-heavy businesses", "Locks in energy costs for 25+ years", "Qualifies for government tax incentives"],
      },
      {
        title: "How Monitoring and Control Work",
        body: "The system comes with a real-time monitoring platform showing generation, savings, and equipment status 24/7, with automatic alerts when performance drops below threshold — enabling preventive maintenance.",
        img: "/images/industrial/ind-3.jpg",
        alt: "Commercial solar monitoring dashboard",
        points: ["Real-time generation and savings monitoring", "Automatic alerts on system anomalies", "Historical reports for energy planning"],
      },
    ],
    faqTag: "Frequently Asked Questions",
    faqTitle: "Commercial Solar Questions",
    faqDesc: "The most common questions from factory and business owners",
    faq: [
      { q: "What system size suits my factory?", a: "System size depends on your electricity consumption, roof area, and production pattern — typically from 100 kWp to several MWp. Our engineers analyze your real load to design the size with the highest return." },
      { q: "Can it be installed without stopping production?", a: "Yes. Most rooftop installations don't affect production lines. We plan work in phases and schedule grid connection during low-impact windows so your factory keeps running normally." },
      { q: "How is ROI calculated?", a: "ROI is calculated from investment divided by annual electricity savings, including tax incentives. We provide a detailed financial model showing cash flow, break-even point, and cumulative returns over the project life." },
      { q: "Do I need a dedicated engineer on site?", a: "Not necessary. The system runs automatically with a remote monitoring platform. Our team handles preventive maintenance and repairs under the service agreement." },
      { q: "How does the monitoring system work?", a: "The monitoring system captures generation, cumulative energy, and inverter status in real time, sending it to the cloud for web or app viewing, with instant alerts if anomalies are detected." },
    ],
    projTag: "Real Projects",
    projTitle: "Industrial Projects We've Installed",
    projDesc: "Examples of factory rooftop solar projects delivered through our network",
    projView: "View All Projects",
    ctaTitle: "Ready to Cut Business Costs?",
    ctaDesc: "Contact our expert team for consultation and quotation for your project",
    benefits: [
      { title: "Cut Energy Costs by 40-60%", desc: "Significantly reduce operational electricity costs with fast ROI of 3-5 years for commercial operations." },
      { title: "Boost Profit Margins", desc: "Lower production costs lead to better competitiveness and improved net profit margins." },
      { title: "Hedge Against Price Hikes", desc: "Lock in energy costs long-term and shield operations from future electricity tariff increases." },
      { title: "Tax Incentives", desc: "Qualify for government tax incentives and depreciation benefits for clean energy investments in Thailand." },
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

const benefitIcons = [TrendingDown, TrendingUp, Shield, Award];

export default function IndustrialPage() {
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
            <Factory size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, color: C.text, marginBottom: 20, maxWidth: 720 }}>
            {t.heroTitle}
          </h1>
          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 600, marginBottom: 36 }}>{t.heroDesc}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/quote"
              style={{ display: "flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none", boxShadow: `0 8px 32px ${C.orange}44` }}>
              {t.btnQuote} <ArrowRight size={18} />
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
