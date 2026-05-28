"use client";
import { useState, useEffect } from "react";
import { Sun, Home, DollarSign, Leaf, Shield, Award, Users, CheckCircle, ArrowRight, ArrowLeft, Zap, MessageCircle, X, TrendingDown, Clock, ShieldCheck } from "lucide-react";
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
    badge: "สำหรับบ้านพักอาศัย",
    heroTitle: "เปลี่ยนหลังคาบ้านให้เป็นโรงไฟฟ้าส่วนตัว",
    heroDesc: "เราคัดสรรผู้ติดตั้งมืออาชีพและแผงเกรดพรีเมียมที่เหมาะกับบ้านคุณที่สุด พร้อมดูแลทุกขั้นตอนจนโครงการเสร็จสมบูรณ์",
    btnQuote: "ขอรับใบเสนอราคาฟรี",
    btnCalc: "คำนวณจุดคุ้มทุน",
    quickStats: [
      { icon: TrendingDown, value: "70%", label: "ลดค่าไฟต่อเดือน" },
      { icon: Clock, value: "4-6 ปี", label: "ระยะเวลาคืนทุน" },
      { icon: ShieldCheck, value: "30 ปี", label: "รับประกันแผง" },
    ],
    benefitsTitle: "ประโยชน์ที่คุณจะได้รับ",
    benefitsDesc: "โซลาร์เซลล์บ้านให้ผลตอบแทนที่คุ้มค่าทั้งเชิงเศรษฐกิจและสิ่งแวดล้อม",
    understandTag: "ทำความเข้าใจก่อนตัดสินใจ",
    understandTitle: "รู้จักโซลาร์บ้านอย่างรอบด้าน",
    understandDesc: "เข้าใจหลักการทำงาน ความคุ้มค่า และขั้นตอนการติดตั้ง ก่อนตัดสินใจลงทุน",
    understand: [
      {
        title: "โซลาร์บ้านทำงานอย่างไร",
        body: "แผงโซลาร์เซลล์เปลี่ยนแสงอาทิตย์เป็นกระแสไฟฟ้า DC แล้วอินเวอร์เตอร์แปลงเป็นไฟ AC ที่ใช้ในบ้านได้ทันที ระบบ On-Grid จะจ่ายไฟให้เครื่องใช้ไฟฟ้าในบ้านก่อน หากผลิตเหลือจึงไหลกลับเข้าระบบการไฟฟ้า",
        img: "/images/residential/res-1.jpg",
        alt: "แผงโซลาร์เซลล์บนหลังคาบ้าน",
        points: ["แผงผลิตไฟฟ้าจากแสงแดดในเวลากลางวัน", "อินเวอร์เตอร์แปลงไฟให้ใช้กับเครื่องใช้ไฟฟ้าทั่วไป", "ลดการดึงไฟจากการไฟฟ้าโดยตรง"],
      },
      {
        title: "ประหยัดเงินได้จริงแค่ไหน",
        body: "บ้านที่ใช้ไฟกลางวันเป็นหลักสามารถลดค่าไฟได้เฉลี่ย 50-70% ต่อเดือน ด้วยระยะเวลาคืนทุน 4-6 ปี เมื่อระบบคืนทุนแล้ว ส่วนที่ประหยัดได้ตลอดอายุการใช้งานที่เหลืออีกกว่า 20 ปีถือเป็นกำไรสุทธิ",
        img: "/images/residential/res-2.jpg",
        alt: "ระบบโซลาร์ช่วยประหยัดค่าไฟบ้าน",
        points: ["ลดค่าไฟทันทีตั้งแต่เดือนแรกที่เปิดใช้งาน", "คืนทุนเฉลี่ย 4-6 ปี จากนั้นเป็นกำไรสุทธิ", "ค่าไฟที่ปรับขึ้นทุกปี ยิ่งทำให้คุ้มค่ามากขึ้น"],
      },
      {
        title: "กระบวนการติดตั้งเป็นอย่างไร",
        body: "เริ่มจากวิศวกรสำรวจหน้างานและตรวจสอบโครงสร้างหลังคาฟรี ออกแบบระบบเฉพาะบ้านคุณ จากนั้นช่างมืออาชีพติดตั้งด้วยมาตรฐานความปลอดภัยสูงสุด โดยใช้เวลาเพียง 2-3 วันก็พร้อมใช้งาน",
        img: "/images/residential/res-3.jpg",
        alt: "ทีมช่างติดตั้งแผงโซลาร์บนหลังคา",
        points: ["สำรวจและประเมินศักยภาพหลังคาฟรี", "ออกแบบระบบให้เหมาะกับการใช้ไฟจริง", "ติดตั้งเสร็จภายใน 2-3 วัน"],
      },
    ],
    faqTag: "คำถามที่พบบ่อย",
    faqTitle: "ข้อสงสัยเกี่ยวกับโซลาร์บ้าน",
    faqDesc: "รวมคำถามที่ลูกค้าบ้านพักอาศัยถามบ่อยที่สุด",
    faq: [
      { q: "ติดตั้งใช้เวลากี่วัน?", a: "สำหรับบ้านพักอาศัยทั่วไป การติดตั้งใช้เวลาประมาณ 2-3 วัน ขึ้นอยู่กับขนาดระบบและความซับซ้อนของหลังคา โดยรวมเวลาสำรวจ ออกแบบ และขออนุญาตประมาณ 2-4 สัปดาห์" },
      { q: "ต้องขออนุญาตการไฟฟ้าไหม?", a: "ระบบ On-Grid ที่เชื่อมต่อกับการไฟฟ้าต้องยื่นขออนุญาตกับ กฟน./กฟภ. และ กกพ. ซึ่งเราดำเนินการให้ครบทุกขั้นตอน ตั้งแต่เตรียมเอกสารจนได้รับอนุมัติ" },
      { q: "ถ้าไฟดับ ระบบยังทำงานไหม?", a: "ระบบ On-Grid มาตรฐานจะหยุดทำงานเมื่อไฟดับเพื่อความปลอดภัยของเจ้าหน้าที่การไฟฟ้า หากต้องการใช้ไฟต่อเนื่องขณะไฟดับ แนะนำเพิ่มระบบกักเก็บพลังงาน (BESS)" },
      { q: "ผ่อนชำระได้ไหม?", a: "มีทางเลือกผ่อนชำระผ่านสถาบันการเงินพันธมิตร รวมถึงสินเชื่อพลังงานสะอาดดอกเบี้ยพิเศษ ทีมงานสามารถช่วยประเมินและแนะนำแผนที่เหมาะกับคุณได้" },
      { q: "ดูแลรักษายากไหม?", a: "โซลาร์เซลล์แทบไม่ต้องบำรุงรักษา เพียงทำความสะอาดแผงปีละ 1-2 ครั้ง และตรวจสอบระบบประจำปี เรามีบริการดูแลตลอดอายุการใช้งานให้ด้วย" },
      { q: "บ้านที่มีระบบเก่าอยู่แล้ว อัพเกรดได้ไหม?", a: "ได้ เราสามารถประเมินระบบเดิม เพิ่มกำลังผลิต หรือเสริมระบบแบตเตอรี่ได้ โดยวิศวกรจะตรวจสอบความเข้ากันได้ของอุปกรณ์ก่อนเสนอแนวทาง" },
    ],
    projTag: "ผลงานจริง",
    projTitle: "โครงการที่เราติดตั้งจริง",
    projDesc: "ตัวอย่างผลงานติดตั้งระบบโซลาร์ภายใต้เครือข่ายของเรา",
    projView: "ดูผลงานทั้งหมด",
    ctaTitle: "พร้อมเริ่มต้นแล้วหรือยัง?",
    ctaDesc: "รับใบเสนอราคาฟรีและคำปรึกษาจากผู้เชี่ยวชาญของเราวันนี้",
    benefits: [
      { title: "ลดค่าไฟถึง 70%", desc: "ประหยัดค่าไฟฟ้าได้เฉลี่ย 50-70% ต่อเดือน คุ้มค่ากว่าการใช้ไฟจากการไฟฟ้าอย่างชัดเจน" },
      { title: "คืนทุนเร็ว 4-6 ปี", desc: "ระยะเวลาคืนทุนเฉลี่ย 4-6 ปี จากนั้นเป็นกำไรสุทธิเต็มจำนวนตลอด 30 ปีที่เหลือ" },
      { title: "ลด CO2 กว่า 3 ตันต่อปี", desc: "ลดการปล่อยก๊าซเรือนกระจกเฉลี่ย 3-5 ตันต่อปี เทียบเท่าปลูกต้นไม้ 150 ต้น" },
      { title: "การันตี 30 ปี", desc: "รับประกันประสิทธิภาพแผง 30 ปี และอุปกรณ์ 10-15 ปี จากแบรนด์ชั้นนำระดับโลก" },
    ],
  },
  en: {
    back: "Back to Home",
    badge: "Residential Solar Solutions",
    heroTitle: "Transform Your Roof into a Personal Power Plant",
    heroDesc: "We match you with the best installers and premium Tier-1 panels, managing every step from design to long-term maintenance.",
    btnQuote: "Get a Free Quote",
    btnCalc: "Calculate My ROI",
    quickStats: [
      { icon: TrendingDown, value: "70%", label: "Lower monthly bills" },
      { icon: Clock, value: "4-6 yrs", label: "Payback period" },
      { icon: ShieldCheck, value: "30 yrs", label: "Panel warranty" },
    ],
    benefitsTitle: "Key Benefits",
    benefitsDesc: "Residential solar delivers exceptional returns both economically and environmentally",
    understandTag: "Understand Before You Decide",
    understandTitle: "Get to Know Residential Solar",
    understandDesc: "Understand how it works, the real savings, and the installation process before you invest.",
    understand: [
      {
        title: "How Residential Solar Works",
        body: "Solar panels convert sunlight into DC electricity, then an inverter turns it into AC power your home can use instantly. An On-Grid system powers your appliances first, and any surplus flows back to the grid.",
        img: "/images/residential/res-1.jpg",
        alt: "Solar panels on a residential rooftop",
        points: ["Panels generate electricity from daylight", "Inverter converts power for everyday appliances", "Reduces electricity drawn from the grid"],
      },
      {
        title: "How Much You Really Save",
        body: "Homes that use power mainly during the day can cut bills by 50-70% per month, with a 4-6 year payback. Once paid off, the savings over the remaining 20+ years of system life are pure profit.",
        img: "/images/residential/res-2.jpg",
        alt: "Solar system reducing home electricity costs",
        points: ["Immediate savings from the first month", "Payback in 4-6 years, then net profit", "Rising tariffs make solar even more worthwhile"],
      },
      {
        title: "What the Installation Looks Like",
        body: "It starts with a free on-site survey and roof structural check, followed by a system custom-designed for your home. Professional technicians then install to the highest safety standards in just 2-3 days.",
        img: "/images/residential/res-3.jpg",
        alt: "Installation team mounting solar panels on a roof",
        points: ["Free site survey and roof assessment", "System designed for your real usage", "Installed within 2-3 days"],
      },
    ],
    faqTag: "Frequently Asked Questions",
    faqTitle: "Residential Solar Questions",
    faqDesc: "The most common questions from homeowners",
    faq: [
      { q: "How many days does installation take?", a: "For a typical home, installation takes about 2-3 days depending on system size and roof complexity. Including survey, design, and permitting, the full process takes around 2-4 weeks." },
      { q: "Do I need utility approval?", a: "Grid-connected On-Grid systems require approval from MEA/PEA and the ERC. We handle every step for you, from document preparation to final approval." },
      { q: "Does it work during a blackout?", a: "Standard On-Grid systems shut off during outages for utility worker safety. If you need continuous power during blackouts, we recommend adding battery storage (BESS)." },
      { q: "Can I pay in installments?", a: "Yes, financing is available through partner institutions, including special low-interest clean-energy loans. Our team can help assess and recommend a plan that fits you." },
      { q: "Is maintenance difficult?", a: "Solar requires almost no maintenance — just cleaning the panels 1-2 times a year and an annual system check. We also provide lifetime care service." },
      { q: "Can an existing system be upgraded?", a: "Yes. We can assess your current system, add capacity, or integrate battery storage. Our engineers verify equipment compatibility before recommending an approach." },
    ],
    projTag: "Real Projects",
    projTitle: "Projects We've Installed",
    projDesc: "Examples of solar installations delivered through our network",
    projView: "View All Projects",
    ctaTitle: "Ready to Get Started?",
    ctaDesc: "Get a free quote and expert consultation from our team today",
    benefits: [
      { title: "Reduce Bills by 70%", desc: "Save 50-70% on monthly electricity bills with immediate cost reductions from day one of operation." },
      { title: "Quick ROI in 4-6 Years", desc: "Average payback period of 4-6 years, then pure profit for 30+ years of remaining system life." },
      { title: "Cut 3+ Tons CO2/Year", desc: "Reduce your carbon footprint by 3-5 tons per year — equivalent to planting 150 trees annually." },
      { title: "30-Year Warranty", desc: "30-year panel performance warranty and 10-15 year equipment warranty from world-class brands." },
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

const benefitIcons = [DollarSign, Zap, Leaf, Shield];

export default function ResidentialPage() {
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
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.orangePale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}>
            <ArrowLeft size={16} /> {t.back}
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.orange}15`, border: `1px solid ${C.orange}30`, borderRadius: 20, padding: "6px 14px", color: C.orange, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
            <Home size={13} /> {t.badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, color: C.text, marginBottom: 20, maxWidth: 700 }}>
            {t.heroTitle}
          </h1>
          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 580, marginBottom: 36 }}>{t.heroDesc}</p>
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
          <QuickStats stats={t.quickStats} accent={C.green} />
        </div>
      </section>

      {/* ── UNDERSTANDING (Apple-style) ── */}
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
      <FAQAccordion tag={t.faqTag} title={t.faqTitle} desc={t.faqDesc} items={t.faq} accent={C.green} />

      {/* ── RELATED PROJECTS ── */}
      <RelatedProjects tag={t.projTag} title={t.projTitle} desc={t.projDesc}
        images={["/portfolio/project-04.jpg", "/portfolio/project-05.jpg", "/portfolio/project-06.jpg"]}
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
