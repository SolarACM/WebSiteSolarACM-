"use client";
import { useState, useEffect } from "react";
import { Sun, Home, DollarSign, Leaf, Shield, Award, Users, CheckCircle, ArrowRight, ArrowLeft, Zap, MessageCircle, X, Menu } from "lucide-react";
import Link from "next/link";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", darkCard: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
  glass: "rgba(255,255,255,0.7)",
};

const tx = {
  th: {
    back: "← กลับหน้าหลัก",
    badge: "สำหรับบ้านพักอาศัย",
    heroTitle: "เปลี่ยนหลังคาบ้านให้เป็นโรงไฟฟ้าส่วนตัว",
    heroDesc: "เราคัดสรรผู้ติดตั้งมืออาชีพและแผงเกรดพรีเมียมที่เหมาะกับบ้านคุณที่สุด พร้อมดูแลทุกขั้นตอนจนโครงการเสร็จสมบูรณ์",
    btnQuote: "ขอรับใบเสนอราคาฟรี",
    btnCalc: "คำนวณจุดคุ้มทุน",
    benefitsTitle: "ประโยชน์ที่คุณจะได้รับ",
    benefitsDesc: "โซลาร์เซลล์บ้านให้ผลตอบแทนที่คุ้มค่าทั้งเชิงเศรษฐกิจและสิ่งแวดล้อม",
    whyTitle: "ทำไมต้องเลือกเรา",
    whyDesc: "ความเชี่ยวชาญและประสบการณ์ที่คุณไว้วางใจได้",
    processTitle: "กระบวนการทำงาน",
    processDesc: "4 ขั้นตอนง่ายๆ สู่ความเป็นอิสระทางพลังงาน",
    ctaTitle: "พร้อมเริ่มต้นแล้วหรือยัง?",
    ctaDesc: "รับใบเสนอราคาฟรีและคำปรึกษาจากผู้เชี่ยวชาญของเราวันนี้",
    benefits: [
      { title: "ลดค่าไฟถึง 70%", desc: "ประหยัดค่าไฟฟ้าได้เฉลี่ย 50-70% ต่อเดือน คุ้มค่ากว่าการใช้ไฟจากการไฟฟ้าอย่างชัดเจน" },
      { title: "คืนทุนเร็ว 4-6 ปี", desc: "ระยะเวลาคืนทุนเฉลี่ย 4-6 ปี จากนั้นเป็นกำไรสุทธิเต็มจำนวนตลอด 25 ปีที่เหลือ" },
      { title: "ลด CO₂ กว่า 3 ตันต่อปี", desc: "ลดการปล่อยก๊าซเรือนกระจกเฉลี่ย 3-5 ตันต่อปี เทียบเท่าปลูกต้นไม้ 150 ต้น" },
      { title: "การันตี 25 ปี", desc: "รับประกันประสิทธิภาพแผง 25 ปี และอุปกรณ์ 10-15 ปี จากแบรนด์ชั้นนำระดับโลก" },
    ],
    why: [
      { title: "ผู้เชี่ยวชาญที่ไว้วางใจได้", desc: "ทีมวิศวกรและที่ปรึกษามืออาชีพ มีประสบการณ์ติดตั้งกว่า 500+ โครงการทั่วประเทศ" },
      { title: "อุปกรณ์ระดับโลก", desc: "ใช้เฉพาะแผง Tier 1 จาก Longi, Risen และ Inverter จาก Huawei, Deye ที่ผ่านการรับรองแล้ว" },
      { title: "บริการครบวงจร", desc: "จัดการทุกขั้นตอนตั้งแต่ออกแบบ ติดตั้ง จนถึงบำรุงรักษาระยะยาว ไม่ต้องกังวลเรื่องใดๆ" },
      { title: "ราคาโปร่งใส", desc: "ไม่มีค่าใช้จ่ายแอบแฝง รับประกันราคาที่แข่งขันได้ พร้อมใบเสนอราคาละเอียดทุกรายการ" },
    ],
    process: [
      { title: "สำรวจหน้างาน", desc: "วิศวกรออกสำรวจหน้างานฟรี วัดพื้นที่หลังคา ตรวจสอบโครงสร้าง และประเมินศักยภาพการผลิต" },
      { title: "ออกแบบระบบ", desc: "ออกแบบระบบเฉพาะบ้านคุณ คำนวณขนาดที่เหมาะสม พร้อมคาดการณ์ผลตอบแทนที่แม่นยำ" },
      { title: "ติดตั้งและทดสอบ", desc: "ช่างมืออาชีพติดตั้งด้วยมาตรฐานสูงสุด ทดสอบระบบครบถ้วน ใช้เวลา 2-3 วัน" },
      { title: "บำรุงรักษา", desc: "ดูแลระบบประจำปี ตรวจสอบประสิทธิภาพ พร้อมซ่อมบำรุงตลอดอายุการใช้งาน" },
    ],
  },
  en: {
    back: "← Back to Home",
    badge: "Residential Solar Solutions",
    heroTitle: "Transform Your Roof into a Personal Power Plant",
    heroDesc: "We match you with the best installers and premium Tier-1 panels, managing every step from design to long-term maintenance.",
    btnQuote: "Get a Free Quote",
    btnCalc: "Calculate My ROI",
    benefitsTitle: "Key Benefits",
    benefitsDesc: "Residential solar delivers exceptional returns both economically and environmentally",
    whyTitle: "Why Choose Us",
    whyDesc: "Your trusted solar energy partner in Thailand",
    processTitle: "Our Process",
    processDesc: "4 simple steps to energy independence",
    ctaTitle: "Ready to Get Started?",
    ctaDesc: "Get a free quote and expert consultation from our team today",
    benefits: [
      { title: "Reduce Bills by 70%", desc: "Save 50-70% on monthly electricity bills with immediate cost reductions from day one of operation." },
      { title: "Quick ROI in 4-6 Years", desc: "Average payback period of 4-6 years, then pure profit for 25+ years of remaining system life." },
      { title: "Cut 3+ Tons CO₂/Year", desc: "Reduce your carbon footprint by 3-5 tons per year — equivalent to planting 150 trees annually." },
      { title: "25-Year Warranty", desc: "25-year panel performance warranty and 10-15 year equipment warranty from world-class brands." },
    ],
    why: [
      { title: "Trusted Expertise", desc: "Professional engineers with 500+ successful residential installations across Thailand." },
      { title: "World-Class Equipment", desc: "Exclusive Tier 1 panels (Longi, Risen) and premium inverters (Huawei, Deye) only." },
      { title: "End-to-End Service", desc: "Complete management from design, installation, to long-term maintenance and support." },
      { title: "Transparent Pricing", desc: "No hidden costs. Competitive pricing with detailed quotations and clear cost breakdown." },
    ],
    process: [
      { title: "Site Survey", desc: "Free on-site inspection by engineers to assess roof space, structure, and solar potential." },
      { title: "System Design", desc: "Custom system design tailored to your home with precise ROI calculations and energy projections." },
      { title: "Installation", desc: "Professional installation following highest safety standards, completed in 2-3 days with full testing." },
      { title: "Maintenance", desc: "Annual system check-ups and maintenance to ensure optimal performance throughout system lifetime." },
    ],
  },
};

const CONTACT = { phone: "0953095196", line: "Monarrattana" };

function NavBar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,28,20,0.97)" : "rgba(15,28,20,0.88)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid rgba(255,255,255,0.08)`,
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
            { title: "Company", links: [{ label: "About Us", href: "/" }, { label: "Our Process", href: "/" }, { label: "Certifications", href: "/" }, { label: "Careers", href: "/" }] },
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

const benefitIcons = [DollarSign, Zap, Leaf, Shield];
const whyIcons = [Award, Sun, Users, CheckCircle];

export default function ResidentialPage() {
  const [lang, setLang] = useState("th");
  const t = tx[lang];

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
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

      {/* ── HERO ── */}
      <section style={{
        minHeight: "60vh", display: "flex", alignItems: "center",
        background: `radial-gradient(ellipse 80% 60% at 30% 50%, ${C.green}12 0%, transparent 60%), ${C.dark}`,
        padding: "120px 2rem 80px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.orangePale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.textMuted, fontSize: 14, textDecoration: "none", marginBottom: 24 }}>
            <ArrowLeft size={16} /> {t.back}
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${C.orange}15`, border: `1px solid ${C.orange}30`, borderRadius: 20, padding: "6px 14px", color: C.orangeLight, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 28 }}>
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
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: "100px 2rem", background: C.dark }}>
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

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: "100px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.whyTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.whyDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {t.why.map((w, i) => {
              const Icon = whyIcons[i];
              return (
                <div key={i} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, textAlign: "center", transition: "border-color 0.3s, transform 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.green}60`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Icon size={28} color={C.green} />
                  </div>
                  <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{w.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: "100px 2rem", background: C.dark }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Process</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{t.processTitle}</h2>
            <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 520, margin: "0 auto" }}>{t.processDesc}</p>
          </div>
          <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {t.process.map((step, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: 28, left: 28, width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 24, fontWeight: 700, zIndex: 1, boxShadow: `0 8px 24px ${C.green}44` }}>
                  {i + 1}
                </div>
                <div style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "92px 28px 28px" }}>
                  <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
