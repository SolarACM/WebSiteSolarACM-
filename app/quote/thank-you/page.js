"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun, CheckCircle2, Phone, MessageCircle, ArrowRight, Clock, Calendar, Home,
  Mail, X
} from "lucide-react";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", darkCard: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
  glass: "rgba(255,255,255,0.7)",
};

const CONTACT = { phone: "0953095196", line: "Monarrattana", email: "mon-attention@hotmail.com" };

const tx = {
  th: {
    badge: "ส่งข้อมูลสำเร็จแล้ว",
    title: "ขอบคุณสำหรับความสนใจค่ะ",
    desc:
      "เราได้รับข้อมูลของคุณเรียบร้อยแล้ว ทีมที่ปรึกษาของเราจะติดต่อกลับภายใน 24 ชั่วโมง พร้อมใบเสนอราคาที่ละเอียดและคำแนะนำที่ดีที่สุดสำหรับคุณ",
    nextTitle: "ขั้นตอนต่อไป",
    steps: [
      { icon: Clock, title: "ภายใน 2 ชั่วโมง", desc: "ทีมงานจะตรวจสอบข้อมูลและโทรกลับเพื่อยืนยันรายละเอียดเบื้องต้น" },
      { icon: Calendar, title: "ภายใน 24 ชั่วโมง", desc: "ส่งใบเสนอราคาฟรีที่ละเอียด พร้อมการวิเคราะห์ ROI เฉพาะของคุณ" },
      { icon: CheckCircle2, title: "นัดสำรวจหน้างาน", desc: "วิศวกรของเราจะนัดเข้าสำรวจหน้างานในเวลาที่คุณสะดวก (ฟรี ไม่มีข้อผูกมัด)" },
    ],
    chatTitle: "ต้องการคำตอบเร็วกว่านี้?",
    chatDesc: "ติดต่อทีมที่ปรึกษาของเราโดยตรงผ่านช่องทางด้านล่างได้เลยค่ะ",
    btnHome: "กลับสู่หน้าหลัก",
    btnLine: "แชทผ่าน LINE",
    btnCall: "โทรหาเรา",
  },
  en: {
    badge: "Submission Received",
    title: "Thank You for Your Interest!",
    desc:
      "We've received your information. Our consultants will reach out within 24 hours with a detailed quote and personalized recommendations tailored for you.",
    nextTitle: "What Happens Next",
    steps: [
      { icon: Clock, title: "Within 2 Hours", desc: "Our team reviews your details and calls to confirm initial requirements." },
      { icon: Calendar, title: "Within 24 Hours", desc: "We send you a free detailed quotation with personalized ROI analysis." },
      { icon: CheckCircle2, title: "Site Survey", desc: "Our engineers schedule a free on-site assessment at your convenience — no obligation." },
    ],
    chatTitle: "Need Answers Faster?",
    chatDesc: "Contact our consultants directly through any of the channels below.",
    btnHome: "Back to Home",
    btnLine: "Chat on LINE",
    btnCall: "Call Us",
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
        </div>
      </div>
    </nav>
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
                <Link key={l.label} href={l.href} style={{ display: "block", color: C.textMuted, fontSize: 13, marginBottom: 10, textDecoration: "none" }}>
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

export default function ThankYouPage() {
  const [lang, setLang] = useState("th");
  const t = tx[lang];

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .channels-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes popIn {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); }
        }
      `}</style>

      <NavBar lang={lang} setLang={setLang} />

      {/* ── HERO / SUCCESS ── */}
      <section style={{
        minHeight: "70vh", display: "flex", alignItems: "center",
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${C.green}20 0%, transparent 60%), ${C.dark}`,
        padding: "120px 2rem 60px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 360, height: 360, borderRadius: "50%", background: `radial-gradient(circle, ${C.greenPale}, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(circle, ${C.orangePale}, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1, width: "100%" }}>
          {/* Big check icon */}
          <div style={{
            width: 96, height: 96, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
            boxShadow: `0 16px 48px ${C.green}55`,
            animation: "popIn 0.6s ease-out",
          }}>
            <CheckCircle2 size={52} color="white" strokeWidth={2.5} />
          </div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${C.green}15`, border: `1px solid ${C.green}30`,
            borderRadius: 20, padding: "6px 14px",
            color: C.green, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24,
          }}>
            <CheckCircle2 size={13} /> {t.badge}
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 700, lineHeight: 1.2, color: C.text,
            marginBottom: 20,
          }}>
            {t.title}
          </h1>

          <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, marginBottom: 36, maxWidth: 620, margin: "0 auto 36px" }}>
            {t.desc}
          </p>

          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
            color: "white", padding: "14px 28px", borderRadius: 10,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 8px 32px ${C.green}44`,
          }}>
            <Home size={18} /> {t.btnHome}
          </Link>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section style={{ padding: "80px 2rem", background: C.midDark }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              Next Steps
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", color: C.text }}>
              {t.nextTitle}
            </h2>
          </div>

          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {t.steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{
                  background: C.darkCard, border: `1px solid ${C.border}`,
                  borderRadius: 16, padding: 28, height: "100%",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: `${C.green}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 20,
                  }}>
                    <Icon size={22} color={C.green} />
                  </div>
                  <div style={{
                    color: C.orange, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
                    textTransform: "uppercase", marginBottom: 8,
                  }}>
                    Step {i + 1}
                  </div>
                  <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, marginBottom: 10 }}>{title}</h3>
                  <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTANT CONTACT ── */}
      <section style={{ padding: "80px 2rem", background: C.dark }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: C.text, marginBottom: 12 }}>
              {t.chatTitle}
            </h2>
            <p style={{ color: C.textMuted, fontSize: 16 }}>{t.chatDesc}</p>
          </div>

          <div className="channels-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <a href={`https://line.me/ti/p/~${CONTACT.line}`} target="_blank" rel="noreferrer"
              style={{
                background: C.darkCard, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 24, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 16,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#06C75560"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#06C75518", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageCircle size={22} color="#06C755" />
              </div>
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{t.btnLine}</div>
                <div style={{ color: "#06C755", fontSize: 13, fontWeight: 500 }}>@{CONTACT.line}</div>
              </div>
            </a>

            <a href={`tel:${CONTACT.phone}`}
              style={{
                background: C.darkCard, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 24, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 16,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.orange}60`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.orange}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={22} color={C.orange} />
              </div>
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{t.btnCall}</div>
                <div style={{ color: C.orange, fontSize: 13, fontWeight: 500 }}>095-309-5196</div>
              </div>
            </a>

            <a href={`mailto:${CONTACT.email}`}
              style={{
                background: C.darkCard, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 24, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 16,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.green}60`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${C.green}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail size={22} color={C.green} />
              </div>
              <div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Email</div>
                <div style={{ color: C.green, fontSize: 13, fontWeight: 500 }}>{CONTACT.email}</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
