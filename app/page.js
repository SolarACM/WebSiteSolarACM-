"use client"; //
import { useState, useEffect, useRef } from "react";
import {
  Sun, Zap, TrendingUp, Shield, ChevronRight, ChevronDown,
  Phone, MessageCircle, Building2, Home, BarChart3, Leaf,
  Star, CheckCircle, ArrowRight, Calculator, Globe, Award,
  Users, Battery, Cpu, Wind, DollarSign, Calendar, MapPin,
  Mail, Menu, X
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const content = {
  th: {
    heroTitle: "ยกระดับธุรกิจสู่อนาคต ด้วยพลังงานสะอาด",
    heroDesc: "ศูนย์รวมที่ปรึกษาและผู้เชี่ยวชาญการติดตั้งโซลาร์เซลล์ครบวงจร พร้อมบริหารจัดการทุกขั้นตอนอย่างมืออาชีพ เพื่อความคุ้มค่าที่ยั่งยืน",
    solutionsTitle: "บริการโซลาร์เซลล์ครบวงจร",
    solutionsDesc: "ดูแลครอบคลุมตั้งแต่การให้คำปรึกษาจนถึงการส่งมอบงาน ผ่านเครือข่ายพันธมิตรที่ได้มาตรฐานระดับสากล",
    calcTitle: "คำนวณความคุ้มค่าของโซลาร์เซลล์",
    calcDesc: "อ้างอิงจากอัตราค่าไฟฟ้าในไทย 4.7 บาท/หน่วย",
    btnCalc: "คำนวณจุดคุ้มทุน",
    nav: ["หน้าหลัก", "เครื่องคำนวณ", "พันธมิตร", "ติดต่อเรา"],
    resTitle: "สำหรับที่พักอาศัย",
    indTitle: "สำหรับธุรกิจและอุตสาหกรรม",
    // ข้อมูลติดต่อจริงของพวกเราค่ะ
    line: "Monarrattana", 
    phone: "095-309-5196",
    email: "mon-attention@hotmail.com",
    contactTitle: "ช่องทางการติดต่อ",
    contactDesc: "ทีมที่ปรึกษาของพวกเราพร้อมดูแลบริหารจัดการโครงการให้ทุกขั้นตอนค่ะ"
  },
  en: {
    heroTitle: "Power Your Future Smarter with Solar",
    heroDesc: "Thailand's trusted solar consultancy for residential and industrial solutions, managing every step with professional excellence.",
    solutionsTitle: "End-to-End Solar Solutions",
    solutionsDesc: "From consultation to commissioning, we handle every step with our vetted partner network.",
    calcTitle: "Know Your Solar Returns",
    calcDesc: "Based on Thai energy rates of ฿4.7/kWh",
    btnCalc: "Calculate ROI",
    nav: ["Home", "Calculator", "Partners", "Support"],
    resTitle: "Residential",
    indTitle: "Industrial / Commercial",
    line: "Monarrattana",
    phone: "+095-309-5196",
    email: "mon-attention@hotmail.com",
    contactTitle: "Contact Us",
    contactDesc: "Our consultants are ready to manage your project every step of the way."
  }
};
const C = {
    green: "#2D7D46",
    greenLight: "#4CAF72",
    greenPale: "#E8F5EE",
    orange: "#E8630A",
    orangeLight: "#FF8C3A",
    orangePale: "#FFF0E6",
    dark: "#F9FCF9",        // เปลี่ยนเป็นสีขาวนวลสะอาดตา
    darkCard: "#FFFFFF",    // เปลี่ยนเป็นการ์ดสีขาวบริสุทธิ์
    midDark: "#F0F4F1",     // ส่วนตกแต่งสีเขียวอ่อนสว่าง
    text: "#14241B",        // เปลี่ยนตัวหนังสือเป็นสีเข้มเพื่อให้อ่านง่าย
    textMuted: "#5C6B61",   // ตัวหนังสือรองโทนเข้ม
    border: "rgba(0,0,0,0.08)",
    glass: "rgba(255,255,255,0.7)",
  };

/* ─── SOLAR CALC LOGIC ──────────────────────────────────────── */
const TARIFF = 4.7; // THB/kWh Thai rate
const SOLAR_HOURS = 4.5; // peak sun hours/day Thailand
const COST_PER_KWP = 35000; // THB
const PANEL_EFFICIENCY = 0.20;

function calcSolar({ bill, area, type }) {
  const kwhPerMonth = bill / TARIFF;
  const kwhPerYear = kwhPerMonth * 12;
  const kwpNeeded = Math.ceil(kwhPerYear / (SOLAR_HOURS * 365));
  const systemCost = kwpNeeded * COST_PER_KWP * (type === "industrial" ? 0.88 : 1);
  const annualSavings = kwhPerYear * TARIFF;
  const roiYears = systemCost / annualSavings;
  const panels = Math.ceil(kwpNeeded / 0.4); // ~400W panels
  const co2Saved = (kwhPerYear * 0.4644) / 1000; // tons CO2

  const projections = Array.from({ length: 26 }, (_, i) => {
    const yr = i;
    const cumSavings = annualSavings * yr * 1.035 ** yr; // 3.5% tariff increase
    const netBenefit = cumSavings - systemCost;
    return {
      year: `Y${yr}`,
      savings: Math.round(cumSavings / 1000),
      net: Math.round(netBenefit / 1000),
      bill: Math.round((bill * 1.035 ** yr) / 1000),
    };
  });

  return { kwpNeeded, systemCost, annualSavings, roiYears, panels, co2Saved, projections };
}

/* ─── COMPONENTS ────────────────────────────────────────────── */

function Nav({ scrolled, lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,28,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
        
        {/* --- ส่วนโลโก้บริษัท (รูป + ชื่อบริษัท Solar ACM) --- */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img 
            src="/Logo SolarACM.png" 
            alt="Solar ACM Logo" 
            style={{ height: "45px", width: "auto", objectFit: "contain" }} 
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
            <span style={{ fontWeight: "700", fontSize: "18px", color: "white" }}>Solar ACM</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Systems Corporation</span>
          </div>
        </div>

        {/* --- ส่วนเมนูหลัก และปุ่มสลับภาษา --- */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {["Solutions", "Calculator", "Partners", "Support"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "white", fontSize: 14, fontWeight: 500, textDecoration: "none", opacity: 0.8 }}>
              {l}
            </a>
          ))}
          
          {/* ปุ่มสลับภาษา TH/EN ที่เราเพิ่มใหม่ค่ะ */}
          <button 
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            style={{ 
              marginLeft: "10px", padding: "6px 12px", borderRadius: "15px", 
              border: `1px solid ${C.orange}`, color: C.orange, fontWeight: "bold", 
              cursor: "pointer", fontSize: "12px", background: "transparent"
            }}
          >
            {lang === "th" ? "EN" : "TH"}
          </button>

          {/* ปุ่มขอใบเสนอราคา (Get Free Quote) */}
          <a href="#calculator" style={{
            background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
            color: "white", padding: "10px 20px", borderRadius: 8, 
            fontSize: 13, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 4px 20px ${C.green}44`
          }}>
            Get Free Quote
          </a>
        </div>
      </div>
    </nav>
  );
}

function StatPill({ icon: Icon, label, value }) {
  return (
    <div style={{
      background: C.glass, backdropFilter: "blur(16px)", border: `1px solid ${C.border}`,
      borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${C.green}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={18} color={C.greenLight} />
      </div>
      <div>
        <div style={{ color: C.text, fontWeight: 700, fontSize: 18, lineHeight: 1 }}>{value}</div>
        <div style={{ color: C.textMuted, fontSize: 12, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

function Hero({ lang }) {
  return (
    <section id="hero" style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.green}18 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, ${C.orange}12 0%, transparent 50%), ${C.dark}`,
      overflow: "hidden", padding: "0 2rem"
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "15%", right: "8%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}18, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}20, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", paddingTop: 80 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, background: `${C.orange}15`,
              border: `1px solid ${C.orange}30`, borderRadius: 20, padding: "6px 14px",
              color: C.orangeLight, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: 28
            }}>
              <Leaf size={13} /> Thailand's Trusted Solar Consultancy
            </div>

            <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
          fontWeight: 600,
          lineHeight: 1.25,
          color: C.text, margin: "0 0 24px", letterSpacing: "-0.01em",
          maxWidth: "680px"
        }}>
          {content[lang].heroTitle}
        </h1>

        <p style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 540, margin: "0 0 36px" }}>
          {content[lang].heroDesc}
        </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
              <a href="#calculator" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                textDecoration: "none", boxShadow: `0 8px 32px ${C.orange}44`
              }}>
                <Calculator size={18} /> Calculate My ROI
              </a>
              <a href="#solutions" style={{
                display: "flex", alignItems: "center", gap: 8,
                background: C.glass, backdropFilter: "blur(12px)",
                border: `1px solid ${C.border}`, color: C.text,
                padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none"
              }}>
                Explore Solutions <ChevronRight size={16} />
              </a>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <StatPill icon={Building2} label="Projects completed" value="1,200+" />
              <StatPill icon={Zap} label="MW installed" value="48 MW" />
              <StatPill icon={Leaf} label="Tons CO₂ saved" value="32,000" />
            </div>
          </div>

          {/* Hero visual — solar system illustration */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 440, height: 440 }}>
              {/* Orbit rings */}
              {[280, 340, 400].map((d, i) => (
                <div key={i} style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: d, height: d, borderRadius: "50%",
                  border: `1px solid rgba(45,125,70,${0.12 + i * 0.06})`,
                  transform: "translate(-50%, -50%)"
                }} />
              ))}
              {/* Center sun */}
              <div style={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                width: 120, height: 120, borderRadius: "50%",
                background: `radial-gradient(circle, ${C.orangeLight}, ${C.orange})`,
                boxShadow: `0 0 60px ${C.orange}88, 0 0 120px ${C.orange}44`,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Sun size={48} color="white" />
              </div>
              {/* Orbiting elements */}
              {[
                { angle: 30, r: 140, icon: Home, label: "Residential", color: C.green },
                { angle: 130, r: 140, icon: Building2, label: "Industrial", color: C.greenLight },
                { angle: 230, r: 140, icon: Battery, label: "Storage", color: C.orange },
                { angle: 320, r: 140, icon: Cpu, label: "Smart Grid", color: C.orangeLight },
              ].map(({ angle, r, icon: Icon, label, color }) => {
                const x = Math.cos((angle * Math.PI) / 180) * r;
                const y = Math.sin((angle * Math.PI) / 180) * r;
                return (
                  <div key={label} style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 14,
                      background: C.glass, backdropFilter: "blur(16px)",
                      border: `1px solid ${color}40`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
                      boxShadow: `0 4px 24px ${color}30`
                    }}>
                      <Icon size={20} color={color} />
                      <span style={{ fontSize: 9, color: C.textMuted, textAlign: "center", letterSpacing: "0.05em" }}>{label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Solutions({ lang }) {
  const items = [
    { icon: Home, title: "Residential Solar", desc: "Turn your rooftop into a personal power plant. We match you with the best installers and premium panels.", badge: "Most Popular", color: C.green },
    { icon: Building2, title: "Industrial & Commercial", desc: "Large-scale installations with industrial-grade components and performance guarantees.", badge: "High ROI", color: C.orange },
    { icon: Battery, title: "Energy Storage (BESS)", desc: "Store excess energy with cutting-edge battery systems for 24/7 independence from the grid.", badge: "Future-Ready", color: C.greenLight },
    { icon: Globe, title: "EPC Vendor Aggregation", desc: "Access our curated network of certified installers without revealing individual contractors.", badge: "Exclusive", color: C.orangeLight },
  ];

  return (
    <section id="solutions" style={{ padding: "100px 2rem", background: C.dark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>What We Offer</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: 0 }}>{content[lang].solutionsTitle}</h2>
          <p style={{ color: C.textMuted, fontSize: 17, marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>{content[lang].solutionsDesc}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {items.map(({ icon: Icon, title, desc, badge, color }) => (
            <div key={title} style={{
              background: C.darkCard, border: `1px solid ${C.border}`,
              borderRadius: 16, padding: 28, position: "relative", overflow: "hidden",
              transition: "border-color 0.3s, transform 0.3s",
              cursor: "pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ position: "absolute", top: 16, right: 16, background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 20, padding: "4px 10px", fontSize: 11, color: color, fontWeight: 600 }}>{badge}</div>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <Icon size={26} color={color} />
              </div>
              <h3 style={{ color: C.text, fontWeight: 600, fontSize: 18, margin: "0 0 12px" }}>{title}</h3>
              <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, color: color, fontSize: 13, fontWeight: 600 }}>
                Learn more <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROI CALCULATOR ────────────────────────────────────────── */
function Calculator_({ lang }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [form, setForm] = useState({ bill: 3000, area: 50, location: "Bangkok" });
  const [result, setResult] = useState(null);

  const locations = ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Rayong", "Korat", "Khon Kaen", "Other"];

  function handleCalc() {
    setResult(calcSolar({ ...form, type }));
    setStep(4);
  }

  const COLORS_CHART = ["#2D7D46", "#E8630A", "#4CAF72", "#FF8C3A"];

  return (
    <section id="calculator" style={{ padding: "100px 2rem", background: C.midDark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: C.orangeLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Smart ROI Calculator</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: 0 }}>
            {content[lang].calcTitle}
          </h2>
          <p style={{ color: C.textMuted, fontSize: 17, marginTop: 16 }}>{content[lang].calcDesc}</p>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 48 }}>
          {[1, 2, 3, 4].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: step >= s ? `linear-gradient(135deg, ${C.green}, ${C.greenLight})` : C.darkCard,
                border: `2px solid ${step >= s ? C.green : C.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, color: step >= s ? "white" : C.textMuted,
                transition: "all 0.3s"
              }}>{step > s ? <CheckCircle size={18} /> : s}</div>
              {i < 3 && <div style={{ width: 80, height: 2, background: step > s ? C.green : C.border, transition: "background 0.3s" }} />}
            </div>
          ))}
        </div>

        <div style={{
          maxWidth: step === 4 ? "100%" : 580,
          margin: "0 auto",
          background: C.darkCard, border: `1px solid ${C.border}`,
          borderRadius: 20, padding: 40
        }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h3 style={{ color: C.text, fontSize: 22, marginBottom: 8, textAlign: "center" }}>
          {lang === "th" ? "เลือกประเภทการติดตั้ง" : "What type of installation?"}
        </h3>
        <p style={{ color: C.textMuted, textAlign: "center", marginBottom: 32, fontSize: 14 }}>
          {lang === "th" ? "เลือกประเภทสถานที่ของพวกเราเพื่อการคำนวณที่แม่นยำค่ะ" : "Choose your property type for accurate estimates"}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { id: "residential", icon: Home, title: content[lang].resTitle, sub: lang === "th" ? "บ้านและคอนโด" : "Houses & condos", color: C.green },
            { id: "industrial", icon: Building2, title: content[lang].indTitle, sub: lang === "th" ? "โรงงานและอาคารธุรกิจ" : "Factories, offices & retail", color: C.orange },
          ].map(({ id, icon: Icon, title, sub, color }) => (
                  <div key={id} onClick={() => { setType(id); setStep(2); }} style={{
                    border: `2px solid ${type === id ? color : C.border}`,
                    borderRadius: 14, padding: 28, cursor: "pointer", textAlign: "center",
                    background: type === id ? `${color}12` : "transparent",
                    transition: "all 0.2s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = color}
                    onMouseLeave={e => e.currentTarget.style.borderColor = type === id ? color : C.border}
                  >
                    <Icon size={40} color={color} style={{ margin: "0 auto 16px" }} />
                    <div style={{ color: C.text, fontWeight: 600, fontSize: 16 }}>{title}</div>
                    <div style={{ color: C.textMuted, fontSize: 13, marginTop: 6 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h3 style={{ color: C.text, fontSize: 22, marginBottom: 8 }}>Your energy usage</h3>
              <p style={{ color: C.textMuted, marginBottom: 32, fontSize: 14 }}>Find this on your electricity bill from PEA or MEA</p>
              <div style={{ marginBottom: 24 }}>
                <label style={{ color: C.textMuted, fontSize: 13, display: "block", marginBottom: 8 }}>Average Monthly Electric Bill (฿)</label>
                <input type="number" value={form.bill}
                  onChange={e => setForm({ ...form, bill: +e.target.value })}
                  style={{ width: "100%", background: C.midDark, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", color: C.text, fontSize: 16, outline: "none", boxSizing: "border-box" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  {[1500, 3000, 6000, 15000].map(v => (
                    <button key={v} onClick={() => setForm({ ...form, bill: v })}
                      style={{ background: form.bill === v ? `${C.green}30` : "transparent", border: `1px solid ${form.bill === v ? C.green : C.border}`, borderRadius: 6, padding: "4px 12px", color: form.bill === v ? C.greenLight : C.textMuted, fontSize: 12, cursor: "pointer" }}>฿{v.toLocaleString()}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ color: C.textMuted, fontSize: 13, display: "block", marginBottom: 8 }}>Available Roof / Area (m²)</label>
                <input type="number" value={form.area}
                  onChange={e => setForm({ ...form, area: +e.target.value })}
                  style={{ width: "100%", background: C.midDark, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", color: C.text, fontSize: 16, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.textMuted, cursor: "pointer", fontSize: 15 }}>← Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600 }}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h3 style={{ color: C.text, fontSize: 22, marginBottom: 8 }}>Your location</h3>
              <p style={{ color: C.textMuted, marginBottom: 32, fontSize: 14 }}>Solar irradiance varies by province — we use local averages</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {locations.map(loc => (
                  <button key={loc} onClick={() => setForm({ ...form, location: loc })}
                    style={{
                      background: form.location === loc ? `${C.green}20` : "transparent",
                      border: `1px solid ${form.location === loc ? C.green : C.border}`,
                      borderRadius: 8, padding: "10px 16px", color: form.location === loc ? C.greenLight : C.textMuted,
                      cursor: "pointer", fontSize: 14, fontWeight: form.location === loc ? 600 : 400,
                      display: "flex", alignItems: "center", gap: 8
                    }}>
                    <MapPin size={14} /> {loc}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.textMuted, cursor: "pointer", fontSize: 15 }}>← Back</button>
                <button onClick={handleCalc} style={{ flex: 2, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600 }}>
                  Calculate My ROI ✨
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Dashboard */}
          {step === 4 && result && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Your Solar Report — {form.location}</div>
                <h3 style={{ color: C.text, fontSize: 26, margin: 0 }}>
                  You could save <span style={{ color: C.orangeLight }}>฿{Math.round(result.annualSavings).toLocaleString()}</span> per year
                </h3>
              </div>

              {/* KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
                {[
                  { label: "System Size", value: `${result.kwpNeeded} kWp`, icon: Zap, color: C.green },
                  { label: "System Cost", value: `฿${Math.round(result.systemCost / 1000)}K`, icon: DollarSign, color: C.orange },
                  { label: "ROI Period", value: `${result.roiYears.toFixed(1)} yrs`, icon: Calendar, color: C.greenLight },
                  { label: "CO₂ Saved/yr", value: `${result.co2Saved.toFixed(1)}t`, icon: Leaf, color: C.orangeLight },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} style={{ background: C.midDark, borderRadius: 12, padding: 18, border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                      <Icon size={18} color={color} />
                    </div>
                    <div style={{ color: C.text, fontWeight: 700, fontSize: 20 }}>{value}</div>
                    <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* 25-year savings chart */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>25-Year Savings Projection (฿ thousands)</div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={result.projections} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.green} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={C.green} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gNet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={C.orange} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={C.orange} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${C.border}`} />
                    <XAxis dataKey="year" tick={{ fill: C.textMuted, fontSize: 11 }} tickLine={false} interval={4} />
                    <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text }}
                      formatter={(v, n) => [`฿${v}K`, n === "savings" ? "Cumulative Savings" : "Net Benefit"]}
                    />
                    <Legend wrapperStyle={{ color: C.textMuted, fontSize: 12 }} />
                    <Area type="monotone" dataKey="savings" stroke={C.green} strokeWidth={2} fill="url(#gSavings)" name="savings" />
                    <Area type="monotone" dataKey="net" stroke={C.orange} strokeWidth={2} fill="url(#gNet)" name="net" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly comparison bar */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>Monthly Bill Comparison — Now vs. Solar (sample 12 months)</div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={result.projections.slice(0, 12).map((d, i) => ({
                    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
                    current: Math.round(form.bill / 1000 * (1 + i * 0.003)),
                    withSolar: Math.round(form.bill * 0.08 / 1000),
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" tick={{ fill: C.textMuted, fontSize: 11 }} tickLine={false} />
                    <YAxis tick={{ fill: C.textMuted, fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text }} formatter={(v) => `฿${v}K`} />
                    <Bar dataKey="current" fill={`${C.orange}88`} name="Without Solar" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="withSolar" fill={`${C.green}99`} name="With Solar" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => { setStep(1); setResult(null); setType(null); }} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.textMuted, cursor: "pointer", fontSize: 14 }}>Recalculate</button>
                <a href="#support" style={{ flex: 2, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <MessageCircle size={18} /> Get a Free Quote Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── PARTNERS ──────────────────────────────────────────────── */
function Partners() {
  const brands = [
    { name: "Huawei", role: "Smart Inverters & Energy Management", tier: "Platinum", color: "#E8630A" },
    { name: "LONGi Solar", role: "High-Efficiency Monocrystalline Panels", tier: "Platinum", color: "#2D7D46" },
    { name: "Deye", role: "Hybrid Inverters & Battery Systems", tier: "Gold", color: "#FF8C3A" },
    { name: "Risen Energy", role: "BIPV & Commercial Solar Panels", tier: "Gold", color: "#4CAF72" },
    { name: "Sungrow", role: "Utility-Scale Inverter Solutions", tier: "Gold", color: "#2D7D46" },
    { name: "BYD Energy", role: "Battery Energy Storage Systems", tier: "Silver", color: "#E8630A" },
  ];

  return (
    <section id="partners" style={{ padding: "100px 2rem", background: C.dark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Equipment Partners</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: 0 }}>Top-Tier Global Brands</h2>
          <p style={{ color: C.textMuted, fontSize: 17, marginTop: 16, maxWidth: 540, margin: "16px auto 0" }}>
            We partner with world-class manufacturers while our certified installer network remains carefully curated — ensuring consistent quality and competitive pricing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 48 }}>
          {brands.map(({ name, role, tier, color }) => (
            <div key={name} style={{
              background: C.darkCard, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: 24, display: "flex", alignItems: "center", gap: 20,
              transition: "border-color 0.3s, transform 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, fontWeight: 700, color, textAlign: "center" }}>{name.slice(0, 3).toUpperCase()}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ color: C.text, fontWeight: 600, fontSize: 16 }}>{name}</span>
                  <span style={{ background: `${color}20`, border: `1px solid ${color}40`, borderRadius: 10, padding: "2px 8px", fontSize: 10, color, fontWeight: 600 }}>{tier}</span>
                </div>
                <div style={{ color: C.textMuted, fontSize: 13 }}>{role}</div>
              </div>
              <Award size={18} color={color} style={{ flexShrink: 0 }} />
            </div>
          ))}
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${C.green}18, ${C.orange}10)`,
          border: `1px solid ${C.green}30`, borderRadius: 16, padding: 32,
          display: "flex", alignItems: "center", gap: 32
        }}>
          <Shield size={48} color={C.greenLight} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: C.text, fontSize: 18, margin: "0 0 8px" }}>Our Installer Network — Trusted, Vetted, Private</h4>
            <p style={{ color: C.textMuted, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              We maintain a carefully curated network of certified EPC contractors across Thailand. By aggregating multiple installers, we drive competitive pricing while protecting our partnerships. You get top-quality installation without the vendor friction.
            </p>
          </div>
          <a href="#support" style={{ flexShrink: 0, background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, color: "white", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
            Request Access
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── TRUST SECTION ─────────────────────────────────────────── */
function Trust() {
  const testimonials = [
    { name: "Somchai P.", location: "Bangkok", bill: "฿8,200 → ฿640/mo", stars: 5, quote: "Solar ACM matched me with an excellent installer. My electricity bill dropped by 92%. The ROI calculator was spot-on." },
    { name: "Wanida T.", location: "Chiang Mai", bill: "Industrial 48 kWp", stars: 5, quote: "As a factory owner I was skeptical, but the team aggregated three quotes and handled everything. Best investment decision of 2024." },
    { name: "Prayut L.", location: "Rayong", bill: "฿4,500 → ฿200/mo", stars: 5, quote: "The 25-year savings dashboard convinced me. Transparent, professional, and the installation was flawless." },
  ];

  return (
    <section style={{ padding: "80px 2rem", background: C.midDark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ color: C.orangeLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>Client Stories</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: C.text, margin: 0 }}>Real Results, Real Savings</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {testimonials.map(({ name, location, bill, stars, quote }) => (
            <div key={name} style={{ background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28 }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {Array.from({ length: stars }).map((_, i) => <Star key={i} size={14} color={C.orangeLight} fill={C.orangeLight} />)}
              </div>
              <p style={{ color: C.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{quote}"</p>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                <div style={{ color: C.text, fontWeight: 600 }}>{name}</div>
                <div style={{ color: C.textMuted, fontSize: 13 }}>{location} · {bill}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SUPPORT WIDGET ────────────────────────────────────────── */
function Support() {
  const lang = 'th'; 
  const channels = [
    { name: "LINE Official", handle: content[lang].line, color: "#06C755", icon: "...", desc: "Fastest response" },
{ name: "WhatsApp", handle: content[lang].phone, color: "#25D366", icon: "...", desc: "Chat with us" },
{ name: "Phone", handle: content[lang].phone, color: C.orangeLight, icon: "...", desc: "Mon-Sat 8am-8pm" },
{ name: "Email", handle: content[lang].email, color: C.greenLight, icon: "...", desc: "Detailed quotes" },
  ];

  return (
    <section id="support" style={{ padding: "100px 2rem", background: C.dark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>24/7 Support</div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.text, margin: "0 0 20px" }}>
              {content[lang].contactTitle}
            </h2>
            <p style={{ color: C.textMuted, fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>
              {content[lang].contactDesc}
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ textAlign: "center", background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 24px" }}>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 22 }}>{"<2h"}</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>Avg. Response</div>
              </div>
              <div style={{ textAlign: "center", background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 24px" }}>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 22 }}>98%</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>Satisfaction Rate</div>
              </div>
              <div style={{ textAlign: "center", background: C.darkCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 24px" }}>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 22 }}>TH/EN</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>Languages</div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {channels.map(({ name, handle, color, icon, desc }) => (
              <div key={name} style={{
                background: C.darkCard, border: `1px solid ${C.border}`,
                borderRadius: 16, padding: 24, cursor: "pointer",
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "scale(1)"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{name}</div>
                <div style={{ color, fontSize: 13, marginBottom: 8, fontWeight: 500 }}>{handle}</div>
                <div style={{ color: C.textMuted, fontSize: 12 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FLOATING SUPPORT BUTTON ───────────────────────────────── */
function FloatingSupport() {
  const lang = 'th';
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 200 }}>
      {open && (
        <div style={{
          position: "absolute", bottom: 70, right: 0,
          background: C.darkCard, border: `1px solid ${C.border}`,
          borderRadius: 16, padding: 20, width: 220,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
        }}>
          <div style={{ color: C.text, fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Contact Us</div>
          {[
            // แก้บรรทัด 757-759 ให้เป็นแบบนี้ค่ะ:
{ label: "LINE Chat", color: "#06C755", href: `https://line.me/ti/p/~${content[lang].line.replace('@', '')}` },
{ label: "WhatsApp", color: "#25D366", href: `https://wa.me/${content[lang].phone.replace(/[^0-9]/g, '')}` },
{ label: "Call Us", color: C.orangeLight, href: `tel:${content[lang].phone}` },
          ].map(({ label, color, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 14px", borderRadius: 10, marginBottom: 8,
              background: `${color}15`, border: `1px solid ${color}30`,
              color, fontSize: 14, fontWeight: 500, textDecoration: "none"
            }}>
              <MessageCircle size={16} /> {label}
            </a>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={{
        width: 56, height: 56, borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
        border: "none", cursor: "pointer",
        boxShadow: `0 8px 32px ${C.green}66`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.2s"
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: C.darkCard, borderTop: `1px solid ${C.border}`, padding: "48px 2rem 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
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
            { title: "Solutions", links: ["Residential", "Industrial", "Energy Storage", "Smart Grid"] },
            { title: "Company", links: ["About Us", "Our Process", "Certifications", "Careers"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Warranty Policy", "PDPA Compliance"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: C.text, fontWeight: 600, marginBottom: 16, fontSize: 14 }}>{title}</div>
              {links.map(l => <div key={l} style={{ color: C.textMuted, fontSize: 13, marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = C.greenLight}
                onMouseLeave={e => e.target.style.color = C.textMuted}
              >{l}</div>)}
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

/* ─── APP ROOT ──────────────────────────────────────────────── */
export default function SolarACM() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("th");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        input:focus { border-color: #2D7D46 !important; box-shadow: 0 0 0 3px rgba(45,125,70,0.15); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0F1C14; }
        ::-webkit-scrollbar-thumb { background: #2D7D46; border-radius: 3px; }
      `}</style>
    <Nav lang={lang} scrolled={scrolled} setLang={setLang} />
<Hero lang={lang} />
     <Solutions lang={lang} />
        <Calculator_ lang={lang} />
        <Partners lang={lang} />
        <Trust lang={lang} />
        <Support lang={lang} />
        <Footer lang={lang} />
        <FloatingSupport lang={lang} />
    </div>
  );
}
