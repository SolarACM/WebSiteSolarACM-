"use client"; //
import { useState, useEffect, useRef } from "react";
import {
  Sun, Moon, Zap, TrendingUp, Shield, ChevronRight, ChevronDown,
  Phone, MessageCircle, Building2, Home, BarChart3, Leaf,
  CheckCircle, ArrowRight, Calculator, Globe, Award, Sparkles,
  Users, Battery, Cpu, Wind, DollarSign, Calendar, MapPin,
  Mail, Menu, X, Star, Clock, Wallet, TreePine
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import Link from "next/link";

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
    contactDesc: "ทีมที่ปรึกษาของพวกเราพร้อมดูแลบริหารจัดการโครงการให้ทุกขั้นตอน" ,
    offerTag: "บริการของเรา",
    learnMore: "รายละเอียดเพิ่มเติม",
    resTitle: "โซลาร์สำหรับบ้านพักอาศัย",
    resDesc: "เปลี่ยนหลังคาบ้านให้เป็นแหล่งผลิตไฟฟ้าส่วนตัว เราคัดสรรผู้ติดตั้งมืออาชีพและแผงเกรดพรีเมียมที่เหมาะกับบ้านเราที่สุด",
    resBadge: "ยอดนิยม",
    indTitle: "ธุรกิจและอุตสาหกรรม",
    indDesc: "ระบบโซลาร์ขนาดใหญ่สำหรับโรงงานและอาคารพาณิชย์ ด้วยอุปกรณ์เกรดอุตสาหกรรม พร้อมการรับประกันประสิทธิภาพในระยะยาว",
    indBadge: "คืนทุนไว",
    bessTitle: "ระบบกักเก็บพลังงาน (BESS)",
    bessDesc: "เก็บไฟฟ้าส่วนเกินไว้ใช้ด้วยระบบแบตเตอรี่อัจฉริยะ เพื่อความอิสระในการใช้พลังงานตลอด 24 ชั่วโมง",
    bessBadge: "พร้อมรับอนาคต",
    epcTitle: "เครือข่ายผู้รับเหมา EPC",
    epcDesc: "เข้าถึงเครือข่ายผู้รับเหมาที่ผ่านการคัดเกรดมาตรฐาน โดยที่เราไม่ต้องเสียเวลาหาและตรวจสอบประวัติเอง",
    epcBadge: "พิเศษเฉพาะเรา",
    partnerTag: "พันธมิตรแบรนด์ชั้นนำ",
    partnerTitle: "แบรนด์ระดับโลกที่เราไว้วางใจ",
    partnerDesc: "เราร่วมมือกับผู้ผลิตชั้นนำระดับโลก พร้อมเครือข่ายผู้ติดตั้งที่ผ่านการรับรอง เพื่อส่งมอบงานที่มีคุณภาพสม่ำเสมอในราคาที่คุ้มค่าที่สุดค่ะ",
    huaweiDesc: "ระบบอินเวอร์เตอร์อัจฉริยะและการจัดการพลังงาน",
    longiDesc: "แผงโซลาร์เซลล์ชนิดโมโนคริสตัลไลน์ประสิทธิภาพสูง",
    deyeDesc: "ระบบไฮบริดอินเวอร์เตอร์และแบตเตอรี่",
    risenDesc: "แผงโซลาร์เซลล์สำหรับอาคารพาณิชย์และ BIPV",
    sungrowDesc: "โซลูชันอินเวอร์เตอร์สำหรับโครงการขนาดใหญ่",
    bydDesc: "ระบบกักเก็บพลังงานด้วยแบตเตอรี่",
    btnQuote: "ขอรับใบเสนอราคาฟรี",
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
    resDesc: "Turn your rooftop into a personal power plant. We match you with the best installers and premium panels.",
      resBadge: "Most Popular",
      indDesc: "Large-scale installations with industrial-grade components and performance guarantees.",
      indBadge: "High ROI",
      bessTitle: "Energy Storage (BESS)",
      bessDesc: "Store excess energy with cutting-edge battery systems for 24/7 independence from the grid.",
      bessBadge: "Future-Ready",
      epcTitle: "EPC Vendor Aggregation",
      epcDesc: "Access our curated network of certified installers without revealing individual contractors.",
      epcBadge: "Exclusive",
      learnMore: "Learn more",
    line: "Monarrattana",
    phone: "+095-309-5196",
    email: "mon-attention@hotmail.com",
    contactTitle: "Contact Us",
    contactDesc: "Our consultants are ready to manage your project every step of the way." ,
    partnerTag: "EQUIPMENT PARTNERS",
    partnerTitle: "Top-Tier Global Brands",
    partnerDesc: "We partner with world-class manufacturers while our certified installer network remains carefully curated — ensuring consistent quality and competitive pricing.",
    huaweiDesc: "Smart Inverters & Energy Management",
    longiDesc: "High-Efficiency Monocrystalline Panels",
    deyeDesc: "Hybrid Inverters & Battery Systems",
    risenDesc: "BIPV & Commercial Solar Panels",
    sungrowDesc: "Utility-Scale Inverter Solutions",
    bydDesc: "Battery Energy Storage Systems",
    btnQuote: "Get a Free Quote",
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

function calcSolar({ bill, roofDir = "south", type, dayUsage = 50 }) {
  // ปรับ Solar Hours ตามทิศทางหลังคา (ไทยอยู่ซีกโลกเหนือ → หันใต้ดีที่สุด)
  const roofDirMultiplier = { south: 1.0, eastwest: 0.87, north: 0.75 };
  const effectiveSolarHours = SOLAR_HOURS * (roofDirMultiplier[roofDir] ?? 1.0);

  const kwhPerMonth = bill / TARIFF;
  const kwhPerYear = kwhPerMonth * 12;
  const kwpNeeded = Math.ceil(kwhPerYear / (effectiveSolarHours * 365));

  // Hybrid system (มีแบตเตอรี่) ราคา ~1.7x ของ On-Grid
  const needsBattery = dayUsage < 50;
  const batteryMultiplier = needsBattery ? 1.7 : 1.0;

  const baseCost = kwpNeeded * COST_PER_KWP * (type === "industrial" ? 0.88 : 1);
  const systemCost = baseCost * batteryMultiplier;

  // On-Grid ใช้ไฟกลางวันได้เต็มที่ กลางคืนต้องซื้อจากกริด
  // Hybrid ใช้ไฟทั้งวันได้ (กลางคืนใช้จากแบตเตอรี่)
  const utilization = needsBattery ? 0.92 : (dayUsage / 100) * 0.95 + 0.05;
  const annualSavings = kwhPerYear * TARIFF * utilization;

  const roiYears = systemCost / annualSavings;
  const panels = Math.ceil(kwpNeeded / 0.4); // ~400W panels
  const co2Saved = (kwhPerYear * 0.4644) / 1000; // tons CO2

  const projections = Array.from({ length: 31 }, (_, i) => {
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

  return { kwpNeeded, systemCost, annualSavings, roiYears, panels, co2Saved, projections, needsBattery };
}

// AI-style recommendation logic ตามพฤติกรรมการใช้ไฟ
function recommendSystem({ dayUsage, type, bill }) {
  if (dayUsage >= 70) {
    return {
      system: "ongrid",
      confidence: 95,
      reasonTh: "ใช้ไฟกลางวันเป็นหลัก On-Grid คือทางเลือกที่คุ้มที่สุด ลงทุนต่ำ คืนทุนเร็ว",
      reasonEn: "Primarily daytime usage. On-Grid is the most cost-effective choice — lower investment, faster ROI.",
    };
  }
  if (dayUsage >= 50) {
    return {
      system: "ongrid",
      confidence: 80,
      reasonTh: "ใช้ไฟกลางวันมากกว่า On-Grid เหมาะสม และสามารถเพิ่มแบตเตอรี่ในอนาคตได้",
      reasonEn: "Mostly daytime usage. On-Grid recommended — battery upgrade can be added later.",
    };
  }
  if (dayUsage >= 30) {
    return {
      system: "hybrid",
      confidence: 85,
      reasonTh: "ใช้ไฟกลางคืนเยอะ Hybrid เหมาะสมเพราะเก็บไฟจากแสงแดดไว้ใช้กลางคืนได้",
      reasonEn: "Significant night usage. Hybrid recommended — store solar energy for nighttime use.",
    };
  }
  return {
    system: "hybrid",
    confidence: 95,
    reasonTh: "ใช้ไฟกลางคืนเป็นหลัก จำเป็นต้องใช้ Hybrid + แบตเตอรี่เพื่อสำรองไฟใช้ตลอดคืน",
    reasonEn: "Primarily night usage. Hybrid system with battery is essential for nighttime power.",
  };
}

/* ─── COMPONENTS ────────────────────────────────────────────── */

// Force scroll แม้ URL hash จะตรงกับปัจจุบัน (native anchor จะไม่ทำงาน)
function scrollToId(id) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const navOffset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
  // ถ้า URL hash ตรงกับ id อยู่แล้ว ต้องลบ hash ออกก่อนแล้วใส่กลับเพื่อให้ scroll ใหม่
  if (window.location.hash === `#${id}`) {
    history.replaceState(null, "", window.location.pathname);
  }
  window.scrollTo({ top, behavior: "smooth" });
  setTimeout(() => { try { history.replaceState(null, "", `#${id}`); } catch {} }, 50);
}

function Nav({ scrolled, lang, setLang }) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: lang === "th" ? "Solutions" : "Solutions", href: "#solutions" },
    { label: "Calculator", href: "#calculator" },
    { label: "Partners", href: "#partners" },
    { label: "Support", href: "#support" },
    { label: lang === "th" ? "ผลงาน" : "Portfolio", href: "/portfolio", isLink: true },
  ];

  function handleHashClick(e, href) {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToId(href.slice(1));
      setOpen(false);
    }
  }

  return (
    <nav className="nav-bar" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,28,20,0.97)" : "rgba(15,28,20,0.88)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid rgba(255,255,255,0.08)`,
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.15)" : "none",
      transition: "all 0.4s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/Logo SolarACM.png" alt="Solar ACM Logo" style={{ height: "45px", width: "auto", objectFit: "contain" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.2" }}>
            <span style={{ fontWeight: "700", fontSize: "18px", color: "white" }}>Solar ACM</span>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Systems Corporation</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {navLinks.map(({ label, href, isLink }) =>
            isLink ? (
              <Link key={href} href={href} style={{ color: "white", fontSize: 14, fontWeight: 500, textDecoration: "none", opacity: 0.8 }}>
                {label}
              </Link>
            ) : (
              <button key={href} type="button" onClick={() => { scrollToId(href.slice(1)); setOpen(false); }} style={{ background: "transparent", border: "none", color: "white", fontSize: 14, fontWeight: 500, opacity: 0.8, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
                {label}
              </button>
            )
          )}
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
          <Link href="/quote" style={{
            background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
            color: "white", padding: "10px 20px", borderRadius: 8,
            fontSize: 13, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 4px 20px ${C.green}44`
          }}>
            {lang === "th" ? "ขอใบเสนอราคา" : "Get Free Quote"}
          </Link>
        </div>

        {/* Mobile: ปุ่มภาษา + hamburger */}
        <div className="mobile-nav-controls" style={{ display: "none", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setLang(lang === "th" ? "en" : "th")}
            style={{
              padding: "6px 12px", borderRadius: "15px",
              border: `1px solid ${C.orange}`, color: C.orange, fontWeight: "bold",
              cursor: "pointer", fontSize: "12px", background: "transparent"
            }}
          >
            {lang === "th" ? "EN" : "TH"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4, color: "white" }}
          >
            {open ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div style={{
          background: "rgba(15,28,20,0.98)", backdropFilter: "blur(20px)",
          borderTop: `1px solid rgba(255,255,255,0.1)`,
          padding: "16px 2rem 24px",
        }}>
          {navLinks.map(({ label, href, isLink }) =>
            isLink ? (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{
                display: "block", color: "white", fontSize: 16, fontWeight: 500,
                textDecoration: "none", padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                {label}
              </Link>
            ) : (
              <button key={href} type="button" onClick={() => { scrollToId(href.slice(1)); setOpen(false); }} style={{
                display: "block", width: "100%", textAlign: "left",
                background: "transparent", border: "none", color: "white", fontSize: 16, fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer",
                fontFamily: "inherit",
              }}>
                {label}
              </button>
            )
          )}
          <Link href="/quote" onClick={() => setOpen(false)} style={{
            display: "block", marginTop: 16, textAlign: "center",
            background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
            color: "white", padding: "12px 20px", borderRadius: 8,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
          }}>
            {lang === "th" ? "ขอใบเสนอราคาฟรี" : "Get Free Quote"}
          </Link>
        </div>
      )}
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

/* ─── 3D SOLAR PANEL — Longi HiMO X10 (portrait, 6×22 half-cut, silver frame) ──── */
function SolarPanel3D() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove(e) {
    if (!wrapperRef.current || !panelRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    panelRef.current.style.transform = `perspective(1400px) rotateX(${-dy * 12 - 2}deg) rotateY(${dx * 25 - 15}deg)`;
  }
  function handleMouseLeave() {
    setIsHovering(false);
    if (panelRef.current) panelRef.current.style.transform = "";
  }

  // Longi HiMO X10: 132 half-cut cells = 6 cols × 22 rows (11 top + 11 bottom)
  const cols = 6;
  const halfRows = 11;

  function CellHalf() {
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${halfRows}, 1fr)`,
        gap: 1.5,
        flex: 1,
        minHeight: 0,
      }}>
        {Array.from({ length: cols * halfRows }).map((_, i) => (
          <div key={i} style={{
            background: `linear-gradient(135deg, #182f5b 0%, #1d3669 22%, #15294e 55%, #0d1a36 100%)`,
            position: "relative",
            overflow: "hidden",
            boxShadow: "inset 0 0 0 0.5px rgba(140,180,230,0.12)",
          }}>
            {/* 6 vertical busbar lines (multi-busbar MBB) */}
            {[14, 28, 42, 56, 70, 84].map((left) => (
              <div key={left} style={{
                position: "absolute", top: "8%", bottom: "8%", left: `${left}%`,
                width: 0.5,
                background: "linear-gradient(180deg, transparent 0%, rgba(225,235,245,0.65) 15%, rgba(225,235,245,0.65) 85%, transparent 100%)",
              }} />
            ))}
            {/* Iridescent reflection */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 25% 20%, rgba(100,170,235,0.14) 0%, transparent 55%)",
            }} />
            {/* Subtle cell sheen */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
            }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "min(420px, 95%)", height: 500,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 2,
      }}
    >
      <div
        ref={panelRef}
        className={isHovering ? "" : "solar-panel-auto-rotate"}
        style={{
          width: 295, height: 470, // portrait 1.6:1 ratio (HiMO X10 ~2278×1134mm scaled)
          position: "relative",
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.7s ease-out",
          transformOrigin: "center center",
        }}
      >
        {/* Silver anodized aluminum frame */}
        <div style={{
          width: "100%", height: "100%",
          background: `linear-gradient(135deg, #e0e3e8 0%, #b8bdc4 30%, #d4d8de 50%, #a8acb3 70%, #c8ccd2 100%)`,
          borderRadius: 8,
          padding: 8,
          boxShadow: `
            0 35px 65px -10px rgba(0,0,0,0.45),
            0 18px 28px -10px rgba(0,0,0,0.35),
            0 0 0 1px rgba(255,255,255,0.12),
            inset 0 1px 0 rgba(255,255,255,0.7),
            inset 0 -1px 0 rgba(0,0,0,0.3),
            inset 1px 0 0 rgba(255,255,255,0.4),
            inset -1px 0 0 rgba(0,0,0,0.15)
          `,
        }}>
          {/* Inner: dark backsheet */}
          <div style={{
            width: "100%", height: "100%",
            background: "#02030a",
            borderRadius: 2,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 6, // wider gap in middle = half-cut cell split
            position: "relative",
            overflow: "hidden",
            boxShadow: "inset 0 0 25px rgba(0,0,0,0.7)",
          }}>
            {/* Top half (11 rows × 6 cols) */}
            <CellHalf />
            {/* Bottom half (11 rows × 6 cols) */}
            <CellHalf />

            {/* Animated glass sheen across whole panel */}
            <div className="panel-sheen" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(115deg, transparent 22%, rgba(255,255,255,0.18) 50%, transparent 78%)",
              pointerEvents: "none",
            }} />
            {/* Anti-reflective coating */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(30,65,130,0.08) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Product label on silver frame (top-left, like real panel — moved from bottom-right to avoid overlap with info card) */}
          <div style={{
            position: "absolute", top: 1, left: 5,
            display: "flex", alignItems: "center", gap: 3,
            pointerEvents: "none",
          }}>
            <span style={{
              fontSize: 6, fontWeight: 800, color: "#CF0A2C",
              fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em",
            }}>LONGi</span>
            <span style={{
              fontSize: 6, fontWeight: 600, color: "rgba(60,70,80,0.7)",
              fontFamily: "system-ui, sans-serif", letterSpacing: "0.08em",
            }}>HiMO X10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PANEL INFO CARD — sales pitch ที่ลอยข้างๆ แผง ───────────────── */
function PanelInfoCard({ lang }) {
  const isTh = lang === "th";
  return (
    <div className="panel-info-card" style={{
      position: "absolute",
      bottom: 6,
      right: 0,
      zIndex: 4,
      width: 250,
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: 14,
      padding: 18,
      boxShadow: "0 20px 50px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.06)",
    }}>
      {/* Brand row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{
          background: "#CF0A2C", color: "white", fontWeight: 800, fontSize: 11,
          padding: "3px 8px", borderRadius: 4, letterSpacing: "0.04em",
          fontFamily: "system-ui, sans-serif",
        }}>LONGi</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#14241B", letterSpacing: "0.02em" }}>Hi-MO X10</span>
        <span style={{
          marginLeft: "auto", background: "#E8630A18", color: "#E8630A",
          fontSize: 9, fontWeight: 800, padding: "3px 7px", borderRadius: 4,
          border: "1px solid #E8630A40", letterSpacing: "0.06em",
        }}>TIER-1</span>
      </div>

      {/* Headline */}
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 17, fontWeight: 700, lineHeight: 1.3,
        color: "#14241B", marginBottom: 6,
      }}>
        {isTh ? (
          <>
            แผง{" "}
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 800,
              color: "#CF0A2C",
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1, "lnum" 1',
            }}>650W</span>
            {" "}ระดับโลก
          </>
        ) : (
          <>
            World-Class{" "}
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 800,
              color: "#CF0A2C",
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1, "lnum" 1',
            }}>650W</span>
            {" "}Panel
          </>
        )}
      </div>

      {/* Sales tagline */}
      <div style={{ color: "#5C6B61", fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>
        {isTh
          ? "เทคโนโลยี BC-Cell ล่าสุด ประสิทธิภาพสูงสุดของโลก ในราคาที่จับต้องได้"
          : "Latest BC-Cell tech, world's highest efficiency — at the most accessible price."}
      </div>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {[
          isTh ? "ประสิทธิภาพสูงสุด 24.1%" : "24.1% peak efficiency",
          isTh ? "กำลังไฟ 650W (LR7-72HVH)" : "650W output (LR7-72HVH)",
          isTh ? "รับประกัน 30 ปี เสื่อม <12%" : "30-year warranty, <12% degradation",
        ].map(f => (
          <div key={f} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11.5, color: "#2D7D46", fontWeight: 500,
          }}>
            <CheckCircle size={12} color="#2D7D46" /> {f}
          </div>
        ))}
      </div>

      {/* Value prop footer */}
      <div style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        paddingTop: 10, marginTop: 4,
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 11, color: "#E8630A", fontWeight: 700,
        letterSpacing: "0.04em",
      }}>
        <Sparkles size={11} /> {isTh ? "ดีกว่าเจ้าอื่นในราคาเท่ากัน" : "Better than competitors at same price"}
      </div>
    </div>
  );
}

/* ─── SUN RAYS ─────────────────────────────────────────────── */
function SunRays() {
  return (
    <div style={{
      position: "absolute", top: -60, right: -40,
      width: 480, height: 480,
      pointerEvents: "none", zIndex: 1,
    }}>
      {/* Glow center */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 180, height: 180, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,180,80,0.55) 0%, rgba(232,99,10,0.25) 40%, transparent 70%)",
        filter: "blur(4px)",
      }} className="sun-pulse" />

      {/* Animated rays via SVG */}
      <svg viewBox="0 0 480 480" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} className="sun-rotate">
        <defs>
          <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB54D" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#E8630A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E8630A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rayLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB54D" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFB54D" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Center bright spot */}
        <circle cx="240" cy="240" r="60" fill="url(#rayGrad)" />
        {/* 12 rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 240 + Math.cos(angle) * 70;
          const y1 = 240 + Math.sin(angle) * 70;
          const x2 = 240 + Math.cos(angle) * 220;
          const y2 = 240 + Math.sin(angle) * 220;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#rayLine)" strokeWidth={i % 2 === 0 ? 3 : 1.5} strokeLinecap="round" opacity={0.7} />
          );
        })}
      </svg>

      {/* Floating particles */}
      {[
        { top: "30%", left: "20%", size: 4, delay: "0s" },
        { top: "60%", left: "70%", size: 3, delay: "1.2s" },
        { top: "45%", left: "55%", size: 5, delay: "2.4s" },
        { top: "75%", left: "30%", size: 3, delay: "0.6s" },
        { top: "20%", left: "65%", size: 4, delay: "1.8s" },
      ].map((p, i) => (
        <div key={i} className="sun-particle" style={{
          position: "absolute", top: p.top, left: p.left,
          width: p.size, height: p.size, borderRadius: "50%",
          background: "#FFB54D",
          boxShadow: "0 0 8px #FFB54D",
          animationDelay: p.delay,
        }} />
      ))}
    </div>
  );
}

/* ─── ANIMATED STATS COUNTER (IntersectionObserver) ───────────── */
function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current || hasStarted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
            const startTime = performance.now();
            function tick(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(start + (end - start) * eased));
              if (progress < 1) requestAnimationFrame(tick);
              else setCount(end);
            }
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [end, duration, start, hasStarted]);

  return [count, elRef];
}

function CounterStat({ value, suffix = "", label, color, icon: Icon }) {
  const [count, ref] = useCountUp(value, 2200);
  return (
    <div ref={ref} style={{
      background: C.darkCard, border: `1px solid ${C.border}`,
      borderRadius: 16, padding: "28px 24px", textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.boxShadow = `0 16px 36px ${color}1f`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 12,
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
      }}>
        <Icon size={26} color={color} />
      </div>
      <div style={{
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        fontSize: "clamp(2.2rem, 4.5vw, 3rem)", fontWeight: 700,
        color: C.text, lineHeight: 1, marginBottom: 8,
        fontVariantNumeric: "tabular-nums",
        fontFeatureSettings: '"tnum" 1, "lnum" 1',
        letterSpacing: "-0.02em",
      }}>
        {count.toLocaleString()}<span style={{ fontWeight: 600, color: C.textMuted, fontSize: "0.6em", marginLeft: 2 }}>{suffix}</span>
      </div>
      <div style={{ color: C.textMuted, fontSize: 14, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function StatsCounterSection({ lang }) {
  const stats = lang === "th"
    ? [
        { value: 100, suffix: "+", label: "โครงการที่ติดตั้งแล้ว", color: "#2D7D46", icon: Building2 },
        { value: 30, suffix: " ปี", label: "การรับประกันระบบ", color: "#E8630A", icon: Shield },
        { value: 70, suffix: "%", label: "ประหยัดค่าไฟต่อเดือน", color: "#4CAF72", icon: TrendingUp },
        { value: 98, suffix: "%", label: "ความพึงพอใจของลูกค้า", color: "#FF8C3A", icon: Award },
      ]
    : [
        { value: 100, suffix: "+", label: "Projects Installed", color: "#2D7D46", icon: Building2 },
        { value: 30, suffix: " yrs", label: "System Warranty", color: "#E8630A", icon: Shield },
        { value: 70, suffix: "%", label: "Monthly Bill Savings", color: "#4CAF72", icon: TrendingUp },
        { value: 98, suffix: "%", label: "Customer Satisfaction", color: "#FF8C3A", icon: Award },
      ];

  return (
    <section style={{ padding: "80px 2rem", background: C.dark, position: "relative", overflow: "hidden" }}>
      {/* Dot pattern bg */}
      <div className="dot-pattern-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
            {lang === "th" ? "ตัวเลขที่พิสูจน์ได้" : "Numbers That Prove It"}
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: C.text, margin: 0 }}>
            {lang === "th" ? "ทำไมลูกค้าเลือกเรา" : "Why Customers Trust Us"}
          </h2>
        </div>
        <div className="stats-counter-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}>
          {stats.map((s, i) => <CounterStat key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function Hero({ lang }) {
  return (
    <section id="hero" className="hero-section" style={{
      minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
      background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${C.green}18 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, ${C.orange}12 0%, transparent 50%), ${C.dark}`,
      overflow: "hidden", padding: "0 2rem"
    }}>
      {/* Subtle dot pattern background (เขียวจางๆ) */}
      <div className="dot-pattern-bg-soft" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
      }} />
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "15%", right: "8%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}18, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.green}20, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", paddingTop: 80 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            {/* ─── Social Proof Badge (5-star + trust statement) ─── */}
            <div className="hero-social-proof" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: `${C.green}12`,
              border: `1px solid ${C.green}30`, borderRadius: 22, padding: "6px 14px 6px 10px",
              color: C.green, fontSize: 12.5, fontWeight: 600,
              marginBottom: 18,
            }}>
              <span style={{ display: "inline-flex", gap: 1 }}>
                {[0,1,2,3,4].map(i => (
                  <Star key={i} size={13} color="#F59E0B" fill="#F59E0B" />
                ))}
              </span>
              <span>{lang === "th" ? "เชื่อถือโดย 100+ ครัวเรือนและธุรกิจทั่วไทย" : "Trusted by 100+ homes & businesses across Thailand"}</span>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, background: `${C.orange}15`,
              border: `1px solid ${C.orange}30`, borderRadius: 20, padding: "6px 14px",
              color: C.orangeLight, fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", marginBottom: 22, marginLeft: 10,
            }}>
              <Leaf size={13} /> Thailand's Trusted Solar Consultancy
            </div>

            <h1 className="hero-title" style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
          fontWeight: 600,
          lineHeight: 1.25,
          color: C.text, margin: "0 0 24px", letterSpacing: "-0.01em",
          maxWidth: "680px"
        }}>
          {content[lang].heroTitle}
        </h1>

        <p className="hero-desc" style={{ color: C.textMuted, fontSize: 18, lineHeight: 1.8, maxWidth: 540, margin: "0 0 32px" }}>
          {content[lang].heroDesc}
        </p>

            <div className="hero-ctas" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
              <button type="button" onClick={() => scrollToId('calculator')} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
                color: "white", padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600,
                border: "none", boxShadow: `0 8px 32px ${C.orange}44`, cursor: "pointer",
                fontFamily: "inherit",
              }}>
                <Calculator size={18} /> Calculate My ROI
              </button>
              <button type="button" onClick={() => scrollToId('solutions')} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: C.glass, backdropFilter: "blur(12px)",
                border: `1px solid ${C.border}`, color: C.text,
                padding: "14px 28px", borderRadius: 10, fontSize: 15, fontWeight: 500, cursor: "pointer",
                fontFamily: "inherit",
              }}>
                Explore Solutions <ChevronRight size={16} />
              </button>
            </div>

            {/* ─── Trust Badges (ใต้ CTA) ─────────────────────────── */}
            <div className="hero-trust-badges" style={{
              display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 36,
              color: C.textMuted, fontSize: 13, fontWeight: 500,
            }}>
              {[
                { icon: Shield, text: lang === "th" ? "ฟรีสำรวจหน้างาน" : "Free site survey" },
                { icon: Clock, text: lang === "th" ? "ติดตั้งภายใน 3 วัน" : "Install in 3 days" },
                { icon: DollarSign, text: lang === "th" ? "คืนทุน 4-6 ปี" : "ROI in 4-6 years" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Icon size={14} color={C.green} /> {text}
                </div>
              ))}
            </div>

            <div className="stats-row" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <StatPill icon={Building2} label="Projects completed" value="100+" />
              <StatPill icon={Zap} label="MW installed" value="20 MW" />
              <StatPill icon={Leaf} label="Tons CO₂ / year" value="13,900" />
            </div>
          </div>

          {/* Hero visual — 3D Solar Panel + Sun Rays + Info Card (ซ่อนบนมือถือเพื่อ performance) */}
          <div className="hero-visual" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 540 }}>
            <SunRays />
            <SolarPanel3D />
            <PanelInfoCard lang={lang} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Solutions({ lang }) {
  const items = [
  { icon: Home, title: content[lang].resTitle, desc: content[lang].resDesc, badge: content[lang].resBadge, color: "#2D7D46" },
  { icon: Building2, title: content[lang].indTitle, desc: content[lang].indDesc, badge: content[lang].indBadge, color: "#E8630A" },
  { icon: Battery, title: content[lang].bessTitle, desc: content[lang].bessDesc, badge: content[lang].bessBadge, color: "#4CAF72" },
  { icon: Globe, title: content[lang].epcTitle, desc: content[lang].epcDesc, badge: content[lang].epcBadge, color: "#FF8C3A" },
];

  return (
    <section id="solutions" className="section-pad" style={{ padding: "100px 2rem", background: C.dark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{content[lang].offerTag}</div>
          <h2 className="section-h2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: 0 }}>{content[lang].solutionsTitle}</h2>
          <p style={{ color: C.textMuted, fontSize: 17, marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>{content[lang].solutionsDesc}</p>
        </div>

        <div className="solutions-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
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
                <a href={`/${title === content[lang].resTitle ? "residential" : title === content[lang].indTitle ? "industrial" : title === content[lang].bessTitle ? "bess" : "epc"}`} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 6 }}>Learn more <ArrowRight size={14} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Animated number hook สำหรับ Executive Dashboard ─────── */
function useAnimatedNumber(end, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (typeof end !== "number" || isNaN(end)) { setValue(0); return; }
    if (end === 0) { setValue(0); return; }
    const startTime = performance.now();
    let raf;
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(end);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return value;
}

/* ─── EXECUTIVE FINANCIAL & ESG DASHBOARD ───────────────────── */
function ExecutiveDashboard({ result, isTh }) {
  // ใช้ค่าจาก result ที่คำนวณแล้ว (ไม่สร้างตัวแปรซ้ำซ้อน)
  const payback = result.roiYears;
  const irr = (result.annualSavings / result.systemCost) * 100;
  const totalSavings30Yr = result.annualSavings * 30 * 1.035;
  const co2Tons = result.co2Saved;
  const trees = (co2Tons * 1000) / 21.77;

  // Animate ตัวเลข
  const aPayback = useAnimatedNumber(payback);
  const aIRR = useAnimatedNumber(irr);
  const aSavings = useAnimatedNumber(totalSavings30Yr);
  const aCO2 = useAnimatedNumber(co2Tons);
  const aTrees = useAnimatedNumber(trees);

  const cardStyle = {
    background: "#FFFFFF",
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: "22px 22px 24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
  };
  function onCardHover(e, color) {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = `0 14px 32px ${color}1f`;
    e.currentTarget.style.borderColor = `${color}40`;
  }
  function onCardLeave(e) {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
    e.currentTarget.style.borderColor = C.border;
  }

  const numFont = {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontVariantNumeric: "tabular-nums",
    fontFeatureSettings: '"tnum" 1, "lnum" 1',
    letterSpacing: "-0.025em",
    lineHeight: 1.05,
  };
  const labelStyle = { fontSize: 11.5, color: C.textMuted, fontWeight: 600, letterSpacing: "0.04em" };
  const iconBox = (color) => ({
    width: 40, height: 40, borderRadius: 10,
    background: `${color}15`,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  });
  const fmt = (n, d = 0) => n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });

  return (
    <div className="exec-dashboard" style={{ marginBottom: 32 }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ color: C.orangeLight, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
          {isTh ? "Executive Dashboard" : "Executive Dashboard"}
        </div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: C.text, fontWeight: 700 }}>
          {isTh ? "ผลตอบแทนการลงทุนและความยั่งยืน" : "Financial Returns & ESG Impact"}
        </div>
      </div>

      {/* Row 1: Financial Performance (3 cards) */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ color: C.green, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, paddingLeft: 4, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 1, background: C.green }} />
          {isTh ? "ผลตอบแทนทางการเงิน" : "Financial Performance"}
        </div>
        <div className="exec-row-financial" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {/* Card 1: Payback */}
          <div style={cardStyle} onMouseEnter={(e) => onCardHover(e, C.green)} onMouseLeave={onCardLeave}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={iconBox(C.green)}><Clock size={19} color={C.green} /></div>
              <div style={labelStyle}>{isTh ? "ระยะเวลาคืนทุน" : "Payback Period"}</div>
            </div>
            <div style={{ ...numFont, fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)", fontWeight: 800, color: C.green }}>
              {fmt(aPayback, 1)}<span style={{ fontSize: "0.45em", fontWeight: 600, color: C.textMuted, marginLeft: 6 }}>{isTh ? "ปี" : "yrs"}</span>
            </div>
          </div>

          {/* Card 2: IRR */}
          <div style={cardStyle} onMouseEnter={(e) => onCardHover(e, C.orange)} onMouseLeave={onCardLeave}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={iconBox(C.orange)}><TrendingUp size={19} color={C.orange} /></div>
              <div style={labelStyle}>{isTh ? "ผลตอบแทนการลงทุน (IRR)" : "Project IRR"}</div>
            </div>
            <div style={{ ...numFont, fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)", fontWeight: 800, color: C.orange }}>
              {fmt(aIRR, 1)}<span style={{ fontSize: "0.55em", fontWeight: 700 }}>%</span>
            </div>
          </div>

          {/* Card 3: 30-Year Total Savings */}
          <div style={cardStyle} onMouseEnter={(e) => onCardHover(e, C.green)} onMouseLeave={onCardLeave}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={iconBox(C.green)}><Wallet size={19} color={C.green} /></div>
              <div style={labelStyle}>{isTh ? "ประหยัดรวม 30 ปี" : "30-Year Total Savings"}</div>
            </div>
            <div style={{ ...numFont, fontSize: "clamp(1.5rem, 3.3vw, 2.1rem)", fontWeight: 800, color: C.green }}>
              <span style={{ fontSize: "0.65em", fontWeight: 700, marginRight: 2 }}>฿</span>{fmt(aSavings)}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: ESG & Sustainability (2 cards centered) */}
      <div>
        <div style={{ color: C.green, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, paddingLeft: 4, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 18, height: 1, background: C.green }} />
          {isTh ? "ความยั่งยืน (ESG & Green Impact)" : "ESG & Sustainability"}
        </div>
        <div className="exec-row-esg" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: "calc(66.66% - 5px)", margin: "0 auto" }}>
          {/* Card 4: Carbon Reduction */}
          <div style={cardStyle} onMouseEnter={(e) => onCardHover(e, C.green)} onMouseLeave={onCardLeave}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={iconBox(C.green)}><Leaf size={19} color={C.green} /></div>
              <div style={labelStyle}>{isTh ? "ลดคาร์บอน CO₂" : "Carbon Reduction"}</div>
            </div>
            <div style={{ ...numFont, fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)", fontWeight: 800, color: C.green }}>
              {fmt(aCO2, 1)}<span style={{ fontSize: "0.45em", fontWeight: 600, color: C.textMuted, marginLeft: 6 }}>{isTh ? "ตัน/ปี" : "tons/yr"}</span>
            </div>
          </div>

          {/* Card 5: Trees */}
          <div style={cardStyle} onMouseEnter={(e) => onCardHover(e, C.green)} onMouseLeave={onCardLeave}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={iconBox(C.green)}><TreePine size={19} color={C.green} /></div>
              <div style={labelStyle}>{isTh ? "เทียบเท่าปลูกต้นไม้" : "Equivalent Trees Planted"}</div>
            </div>
            <div style={{ ...numFont, fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)", fontWeight: 800, color: C.green }}>
              {fmt(aTrees, 0)}<span style={{ fontSize: "0.45em", fontWeight: 600, color: C.textMuted, marginLeft: 6 }}>{isTh ? "ต้น/ปี" : "trees/yr"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CALCULATOR SIDE GRAPHICS ─────────────────────────────── */
function SmartHomeGraphic({ active }) {
  return (
    <div style={{ width: "100%", maxWidth: 230, margin: "0 auto" }}>
      <svg viewBox="0 0 240 310" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="calc-graphic-float" style={{ width: "100%", height: "auto" }}>
        <defs>
          <radialGradient id="homeAura" cx="50%" cy="85%" r="55%">
            <stop offset="0%" stopColor="#2D7D46" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#2D7D46" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Background aura */}
        <ellipse cx="120" cy="268" rx="105" ry="38" fill="url(#homeAura)"/>
        <ellipse cx="120" cy="278" rx="72" ry="9" fill="#2D7D46" opacity="0.14"/>

        {/* Left tree */}
        <rect x="16" y="214" width="7" height="38" rx="3.5" fill="#1a4a28"/>
        <circle cx="19.5" cy="200" r="22" fill="#2D7D46" opacity="0.75"/>
        <circle cx="19.5" cy="191" r="15" fill="#4CAF72" opacity="0.55"/>

        {/* Right tree (smaller) */}
        <rect x="214" y="228" width="6" height="24" rx="3" fill="#1a4a28"/>
        <circle cx="217" cy="218" r="15" fill="#2D7D46" opacity="0.65"/>
        <circle cx="217" cy="211" r="10" fill="#4CAF72" opacity="0.5"/>

        {/* === HOUSE BODY === */}
        <rect x="60" y="170" width="132" height="88" rx="5"
          fill="#0f1f14" stroke="#2D7D46" strokeWidth="1.6"
          className={active ? "calc-graphic-glow" : ""}/>

        {/* House side wall (3-D depth) */}
        <polygon points="192,170 222,150 222,234 192,258"
          fill="#0a1610" stroke="#2D7D46" strokeWidth="0.9" opacity="0.9"/>

        {/* Roof (front) */}
        <polygon points="46,172 120,106 194,172"
          fill="#14241B" stroke={active ? "#4CAF72" : "#2D7D46"} strokeWidth="2"/>
        {/* Roof (side) */}
        <polygon points="194,172 224,150 198,106 120,106"
          fill="#0d1c10" stroke="#2D7D46" strokeWidth="0.9" opacity="0.85"/>

        {/* Solar panels on roof */}
        {[82, 108, 134, 160].map((x, i) => (
          <g key={i}>
            <rect x={x} y={i % 2 === 1 ? 126 : 132} width={22} height={15}
              rx="2" fill="#12345a" stroke="#4CAF72" strokeWidth="1.1"/>
            <line x1={x+11} y1={i%2===1?126:132} x2={x+11} y2={i%2===1?141:147}
              stroke="#4CAF7270" strokeWidth="0.6"/>
            <line x1={x} y1={i%2===1?133:139} x2={x+22} y2={i%2===1?133:139}
              stroke="#4CAF7270" strokeWidth="0.6"/>
          </g>
        ))}

        {/* Windows */}
        {[[72,183],[148,183]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x} y={y} width={32} height={26} rx="3"
              fill="#2D7D4622" stroke="#4CAF72" strokeWidth="1.3"/>
            <line x1={x+16} y1={y} x2={x+16} y2={y+26} stroke="#4CAF7255" strokeWidth="0.8"/>
            <line x1={x} y1={y+13} x2={x+32} y2={y+13} stroke="#4CAF7255" strokeWidth="0.8"/>
            {active && <rect x={x+1} y={y+1} width={14} height={11} rx="1" fill="#4CAF72" opacity="0.13"/>}
          </g>
        ))}

        {/* Door */}
        <rect x="108" y="220" width="36" height="38" rx="4"
          fill="#1a2e1f" stroke="#4CAF72" strokeWidth="1.3"/>
        <circle cx="138" cy="240" r="2.5" fill="#4CAF72" opacity="0.8"/>

        {/* Ground line */}
        <rect x="50" y="257" width="152" height="5" rx="2.5" fill="#2D7D46" opacity="0.22"/>

        {/* WiFi / smart badge — top-left */}
        <g className="calc-graphic-pulse">
          <circle cx="46" cy="104" r="20" fill="#2D7D4618"/>
          <circle cx="46" cy="104" r="12" fill="#2D7D4628"/>
          <path d="M38,108 Q46,98 54,108" stroke="#4CAF72" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <path d="M41,112 Q46,105 51,112" stroke="#4CAF72" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          <circle cx="46" cy="115" r="2.5" fill="#4CAF72"/>
        </g>

        {/* Lightning badge — top-right */}
        <g transform="translate(192,92)" className="calc-graphic-pulse-2">
          <circle cx="0" cy="0" r="18" fill="#E8630A1a"/>
          <circle cx="0" cy="0" r="10" fill="#E8630A28"/>
          <path d="M3,-9 L-3,1 L2,1 L-3,11 L5,-1 L0,-1 Z" fill="#FF8C3A"/>
        </g>

        {/* Floating energy particles */}
        <circle cx="118" cy="88" r="4"   fill="#4CAF72" opacity="0.9" className="calc-graphic-flow"/>
        <circle cx="140" cy="78" r="3"   fill="#4CAF72" opacity="0.7" className="calc-graphic-flow-2"/>
        <circle cx="100" cy="84" r="2.5" fill="#E8630A" opacity="0.8" className="calc-graphic-flow-3"/>

        {/* Label pill */}
        <rect x="72" y="274" width="96" height="24" rx="12"
          fill="#2D7D4615" stroke="#2D7D46" strokeWidth="1.2"/>
        <text x="120" y="290" textAnchor="middle" fontSize="10.5" fontWeight="700"
          fill="#4CAF72" fontFamily="DM Sans, sans-serif">🏠 Residential</text>
      </svg>

      <div style={{ textAlign: "center", marginTop: 6 }}>
        <div style={{ fontSize: 12, color: "#4CAF72", fontWeight: 700, letterSpacing: "0.06em" }}>Smart Home</div>
        <div style={{ fontSize: 11, color: "#5C6B61", marginTop: 2 }}>Solar Rooftop System</div>
      </div>
    </div>
  );
}

function SmartFactoryGraphic({ active }) {
  return (
    <div style={{ width: "100%", maxWidth: 230, margin: "0 auto" }}>
      <svg viewBox="0 0 240 310" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="calc-graphic-float-delay" style={{ width: "100%", height: "auto" }}>
        <defs>
          <radialGradient id="factoryAura" cx="50%" cy="85%" r="55%">
            <stop offset="0%" stopColor="#E8630A" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#E8630A" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Background aura */}
        <ellipse cx="120" cy="268" rx="108" ry="38" fill="url(#factoryAura)"/>
        <ellipse cx="120" cy="278" rx="78" ry="9" fill="#E8630A" opacity="0.11"/>

        {/* === FACTORY BUILDING === */}
        {/* Main body */}
        <rect x="22" y="168" width="188" height="90" rx="4"
          fill="#0f1a0e" stroke="#E8630A" strokeWidth="1.6"
          className={active ? "calc-graphic-glow-orange" : ""}/>

        {/* Side depth */}
        <polygon points="210,168 232,153 232,244 210,258"
          fill="#0a1208" stroke="#E8630A" strokeWidth="0.9" opacity="0.85"/>

        {/* Flat roof face */}
        <rect x="20" y="158" width="192" height="14" rx="3"
          fill="#14241B" stroke={active ? "#FF8C3A" : "#E8630A"} strokeWidth="1.6"/>
        {/* Roof side */}
        <polygon points="212,158 234,143 234,157 212,172"
          fill="#0d1c10" stroke="#E8630A" strokeWidth="0.9" opacity="0.8"/>

        {/* Solar array on flat roof — 2 rows */}
        {[28, 56, 84, 112, 140, 168].map((x, i) => (
          <g key={i}>
            <rect x={x} y={133} width={24} height={14} rx="1.5"
              fill="#12345a" stroke="#4CAF72" strokeWidth="1"/>
            <line x1={x+12} y1={133} x2={x+12} y2={147}
              stroke="#4CAF7265" strokeWidth="0.55"/>
            <line x1={x} y1={140} x2={x+24} y2={140}
              stroke="#4CAF7265" strokeWidth="0.55"/>
          </g>
        ))}
        {[28, 56, 84, 112, 140].map((x, i) => (
          <rect key={i} x={x} y={149} width={24} height={9} rx="1.5"
            fill="#12345a" stroke="#4CAF72" strokeWidth="0.7" opacity="0.7"/>
        ))}

        {/* Chimneys */}
        <rect x="50" y="112" width="14" height="48" rx="3"
          fill="#14241B" stroke="#E8630A" strokeWidth="1.2"/>
        <rect x="47" y="109" width="20" height="7" rx="2"
          fill="#0f1a0e" stroke="#E8630A" strokeWidth="1"/>

        <rect x="172" y="118" width="12" height="42" rx="3"
          fill="#14241B" stroke="#E8630A" strokeWidth="1.2"/>
        <rect x="169" y="115" width="18" height="7" rx="2"
          fill="#0f1a0e" stroke="#E8630A" strokeWidth="1"/>

        {/* Window strips */}
        <rect x="30" y="182" width="62" height="12" rx="2"
          fill="#2D7D4618" stroke="#4CAF72" strokeWidth="1"/>
        <line x1="61" y1="182" x2="61" y2="194" stroke="#4CAF7240" strokeWidth="0.8"/>
        {active && <rect x="31" y="183" width="28" height="10" rx="1" fill="#4CAF72" opacity="0.1"/>}

        <rect x="138" y="182" width="62" height="12" rx="2"
          fill="#E8630A18" stroke="#E8630A" strokeWidth="1"/>
        <line x1="169" y1="182" x2="169" y2="194" stroke="#E8630A40" strokeWidth="0.8"/>

        <rect x="30" y="204" width="62" height="10" rx="2"
          fill="#2D7D4610" stroke="#2D7D46" strokeWidth="0.8"/>
        <rect x="138" y="204" width="62" height="10" rx="2"
          fill="#E8630A10" stroke="#E8630A" strokeWidth="0.8"/>

        {/* Large industrial doors */}
        <rect x="90" y="210" width="58" height="48" rx="3"
          fill="#0a1208" stroke="#E8630A" strokeWidth="1.5"/>
        <line x1="119" y1="210" x2="119" y2="258" stroke="#E8630A" strokeWidth="0.8" opacity="0.45"/>
        <rect x="91" y="219" width="27" height="4" rx="2" fill="#E8630A" opacity="0.22"/>
        <rect x="120" y="219" width="27" height="4" rx="2" fill="#E8630A" opacity="0.22"/>

        {/* Ground line */}
        <rect x="16" y="257" width="196" height="5" rx="2.5" fill="#E8630A" opacity="0.18"/>

        {/* Smart connectivity nodes — top right */}
        <g className="calc-graphic-pulse">
          <circle cx="200" cy="98" r="7" fill="none" stroke="#E8630A" strokeWidth="1.5"/>
          <circle cx="200" cy="98" r="3" fill="#E8630A" opacity="0.85"/>
        </g>
        <g className="calc-graphic-pulse-2">
          <circle cx="222" cy="80" r="5" fill="none" stroke="#FF8C3A" strokeWidth="1.2"/>
          <circle cx="222" cy="80" r="2" fill="#FF8C3A" opacity="0.85"/>
        </g>
        <g className="calc-graphic-pulse-3">
          <circle cx="212" cy="116" r="6" fill="none" stroke="#E8630A" strokeWidth="1.2"/>
          <circle cx="212" cy="116" r="2.5" fill="#E8630A" opacity="0.75"/>
        </g>
        <line x1="200" y1="98" x2="222" y2="80"  stroke="#E8630A" strokeWidth="0.8" opacity="0.35"/>
        <line x1="200" y1="98" x2="212" y2="116" stroke="#E8630A" strokeWidth="0.8" opacity="0.35"/>
        <line x1="222" y1="80" x2="212" y2="116" stroke="#E8630A" strokeWidth="0.5" opacity="0.25"/>

        {/* AI badge — top left */}
        <g className="calc-graphic-pulse-3">
          <circle cx="26" cy="104" r="20" fill="#2D7D4618"/>
          <circle cx="26" cy="104" r="12" fill="#2D7D4628"/>
          <text x="26" y="110" textAnchor="middle" fontSize="14" fill="#4CAF72">⚡</text>
        </g>

        {/* Floating energy particles */}
        <circle cx="57" cy="104" r="3.5" fill="#E8630A" opacity="0.85" className="calc-graphic-flow"/>
        <circle cx="66" cy="94"  r="2.5" fill="#E8630A" opacity="0.65" className="calc-graphic-flow-2"/>
        <circle cx="50" cy="97"  r="2"   fill="#FF8C3A" opacity="0.75" className="calc-graphic-flow-3"/>

        {/* Label pill */}
        <rect x="68" y="274" width="104" height="24" rx="12"
          fill="#E8630A12" stroke="#E8630A" strokeWidth="1.2"/>
        <text x="120" y="290" textAnchor="middle" fontSize="10.5" fontWeight="700"
          fill="#FF8C3A" fontFamily="DM Sans, sans-serif">🏭 Industrial</text>
      </svg>

      <div style={{ textAlign: "center", marginTop: 6 }}>
        <div style={{ fontSize: 12, color: "#FF8C3A", fontWeight: 700, letterSpacing: "0.06em" }}>Smart Factory</div>
        <div style={{ fontSize: 11, color: "#5C6B61", marginTop: 2 }}>Industrial Solar EPC</div>
      </div>
    </div>
  );
}

/* ─── ROI CALCULATOR ────────────────────────────────────────── */
function Calculator_({ lang }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [form, setForm] = useState({ bill: 3000, roofDir: "south", location: "Bangkok", dayUsage: 50 });
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const locations = ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Rayong", "Korat", "Khon Kaen", "Other"];
  const isTh = lang === "th";

  const usagePatterns = [
    { dayUsage: 80, icon: Sun, iconColor: "#E8630A",
      labelTh: "ใช้ไฟกลางวันเป็นหลัก", labelEn: "Mostly daytime",
      subTh: "ทำงานบ้าน / โรงงาน / ร้านค้า", subEn: "Work from home / factory / shop",
      ratio: "80% / 20%" },
    { dayUsage: 60, icon: Sun, iconColor: "#FF8C3A",
      labelTh: "ใช้กลางวันมากกว่า", labelEn: "More day than night",
      subTh: "อยู่บ้านครึ่งวัน", subEn: "Home for half the day",
      ratio: "60% / 40%" },
    { dayUsage: 50, icon: Sparkles, iconColor: "#4CAF72",
      labelTh: "ใช้พอๆ กัน", labelEn: "Balanced usage",
      subTh: "ใช้ไฟทั้งวันทั้งคืน", subEn: "All-day usage",
      ratio: "50% / 50%" },
    { dayUsage: 40, icon: Moon, iconColor: "#2D7D46",
      labelTh: "ใช้กลางคืนมากกว่า", labelEn: "More night than day",
      subTh: "กลับบ้านตอนเย็น", subEn: "Home in the evening",
      ratio: "40% / 60%" },
    { dayUsage: 20, icon: Moon, iconColor: "#7B3FA0",
      labelTh: "ใช้ไฟกลางคืนเป็นหลัก", labelEn: "Mostly nighttime",
      subTh: "เปิดแอร์ / อุปกรณ์กลางคืน", subEn: "AC / appliances at night",
      ratio: "20% / 80%" },
  ];

  function handleCalc() {
    const calcResult = calcSolar({ ...form, type });
    const rec = recommendSystem({ ...form, type });
    setResult(calcResult);
    setRecommendation(rec);
    setStep(5);
  }

  const COLORS_CHART = ["#2D7D46", "#E8630A", "#4CAF72", "#FF8C3A"];

  return (
    <section id="calculator" className="section-pad" style={{ padding: "100px 2rem", background: C.midDark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: C.orangeLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Smart ROI Calculator</div>
          <h2 className="section-h2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: 0 }}>
            {content[lang].calcTitle}
          </h2>
          <p style={{ color: C.textMuted, fontSize: 17, marginTop: 16 }}>{content[lang].calcDesc}</p>
        </div>

        {/* ── 3-column layout: [Home graphic] [Form] [Factory graphic] ── */}
        <div className="calc-layout">

          {/* Left column — Smart Home graphic (hidden on mobile) */}
          {step !== 5 && (
            <div className="calc-side-graphic" style={{ flex: "0 0 210px" }}>
              <SmartHomeGraphic active={type === "residential"} />
            </div>
          )}

          {/* Center column — Progress bar + Calculator card */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Progress bar */}
            <div className="calc-progress" style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 48, flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: step >= s ? `linear-gradient(135deg, ${C.green}, ${C.greenLight})` : C.darkCard,
                    border: `2px solid ${step >= s ? C.green : C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: step >= s ? "white" : C.textMuted,
                    transition: "all 0.3s"
                  }}>{step > s ? <CheckCircle size={18} /> : s}</div>
                  {i < 4 && <div style={{ width: 56, height: 2, background: step > s ? C.green : C.border, transition: "background 0.3s" }} />}
                </div>
              ))}
            </div>

            <div className="calc-card" style={{
              maxWidth: step === 5 ? "100%" : 580,
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
        <div className="calc-types" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
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
              <h3 style={{ color: C.text, fontSize: 22, marginBottom: 8 }}>
                {isTh ? "ค่าไฟและหลังคาของคุณ" : "Your energy bill & rooftop"}
              </h3>
              <p style={{ color: C.textMuted, marginBottom: 32, fontSize: 14 }}>
                {isTh ? "ดูค่าไฟเฉลี่ยจากบิล กฟน./กฟภ. และทิศที่หลังคาหันออก" : "Check your PEA/MEA bill and the direction your roof faces"}
              </p>

              {/* Monthly bill */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ color: C.textMuted, fontSize: 13, display: "block", marginBottom: 8 }}>
                  {isTh ? "ค่าไฟเฉลี่ยต่อเดือน (฿)" : "Average Monthly Electric Bill (฿)"}
                </label>
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

              {/* Roof orientation */}
              <div style={{ marginBottom: 32 }}>
                <label style={{ color: C.textMuted, fontSize: 13, display: "block", marginBottom: 12 }}>
                  {isTh ? "หลังคาของคุณหันไปทิศใด?" : "Which direction does your roof face?"}
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { id: "south", emoji: "🧭", labelTh: "ทิศใต้", labelEn: "South", subTh: "ดีที่สุด +100%", subEn: "Best yield", color: C.green },
                    { id: "eastwest", emoji: "↔️", labelTh: "ตะวันออก/ตก", labelEn: "East / West", subTh: "ดีมาก ~87%", subEn: "Good ~87%", color: C.orange },
                    { id: "north", emoji: "🔻", labelTh: "ทิศเหนือ", labelEn: "North", subTh: "ลดลง ~75%", subEn: "Lower ~75%", color: C.textMuted },
                  ].map(({ id, emoji, labelTh, labelEn, subTh, subEn, color }) => {
                    const selected = form.roofDir === id;
                    return (
                      <button key={id} type="button"
                        onClick={() => setForm({ ...form, roofDir: id })}
                        style={{
                          background: selected ? `${color}18` : "transparent",
                          border: `2px solid ${selected ? color : C.border}`,
                          borderRadius: 12, padding: "14px 10px", cursor: "pointer",
                          textAlign: "center", transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = color; }}
                        onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = C.border; }}
                      >
                        <div style={{ fontSize: 22, marginBottom: 6 }}>{emoji}</div>
                        <div style={{ color: selected ? color : C.text, fontWeight: 700, fontSize: 13 }}>
                          {isTh ? labelTh : labelEn}
                        </div>
                        <div style={{ color: selected ? color : C.textMuted, fontSize: 11, marginTop: 3 }}>
                          {isTh ? subTh : subEn}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* Helper tip */}
                <div style={{ marginTop: 10, padding: "8px 14px", background: `${C.green}12`, borderRadius: 8, fontSize: 12, color: C.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
                  <Sun size={13} color={C.greenLight} />
                  {isTh
                    ? "เคล็ดลับ: ยืนมองหน้าบ้าน ถ้าเห็นดวงอาทิตย์ตรงข้ามในช่วงกลางวัน → หลังคาหันใต้"
                    : "Tip: Stand facing your house. If you see the sun opposite you at noon → south-facing roof"}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.textMuted, cursor: "pointer", fontSize: 15 }}>
                  {isTh ? "← กลับ" : "← Back"}
                </button>
                <button onClick={() => setStep(3)} style={{ flex: 2, background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600 }}>
                  {isTh ? "ถัดไป →" : "Continue →"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h3 style={{ color: C.text, fontSize: 22, marginBottom: 8 }}>Your location</h3>
              <p style={{ color: C.textMuted, marginBottom: 32, fontSize: 14 }}>Solar irradiance varies by province — we use local averages</p>
              <div className="calc-locations" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
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
                <button onClick={() => setStep(4)} style={{ flex: 2, background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600 }}>Continue →</button>
              </div>
            </div>
          )}

          {/* Step 4 — Usage Pattern */}
          {step === 4 && (
            <div>
              <h3 style={{ color: C.text, fontSize: 22, marginBottom: 8 }}>
                {isTh ? "พฤติกรรมการใช้ไฟของคุณ" : "Your electricity usage pattern"}
              </h3>
              <p style={{ color: C.textMuted, marginBottom: 24, fontSize: 14 }}>
                {isTh
                  ? "ช่วยให้เราแนะนำระบบที่เหมาะสม (On-Grid หรือ Hybrid)"
                  : "Helps us recommend the right system (On-Grid or Hybrid)"}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, fontSize: 12, color: C.textMuted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Sun size={13} color={C.orange} /> {isTh ? "กลางวัน" : "Day"}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>{isTh ? "กลางคืน" : "Night"} <Moon size={13} color={C.green} /></span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {usagePatterns.map((p) => {
                  const selected = form.dayUsage === p.dayUsage;
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.dayUsage}
                      onClick={() => setForm({ ...form, dayUsage: p.dayUsage })}
                      style={{
                        border: `2px solid ${selected ? p.iconColor : C.border}`,
                        borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                        background: selected ? `${p.iconColor}10` : "transparent",
                        display: "flex", alignItems: "center", gap: 16,
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = `${p.iconColor}80`; }}
                      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = C.border; }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        background: `${p.iconColor}18`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={22} color={p.iconColor} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 2 }}>
                          {isTh ? p.labelTh : p.labelEn}
                        </div>
                        <div style={{ color: C.textMuted, fontSize: 12 }}>{isTh ? p.subTh : p.subEn}</div>
                      </div>
                      <div style={{
                        background: selected ? p.iconColor : `${p.iconColor}18`,
                        color: selected ? "white" : p.iconColor,
                        fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 8,
                        flexShrink: 0, whiteSpace: "nowrap",
                      }}>
                        {p.ratio}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(3)} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.textMuted, cursor: "pointer", fontSize: 15 }}>← Back</button>
                <button onClick={handleCalc} style={{ flex: 2, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Sparkles size={16} /> {isTh ? "วิเคราะห์ด้วย AI" : "Analyze with AI"}
                </button>
              </div>
            </div>
          )}

          {/* Step 5 — Dashboard */}
          {step === 5 && result && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  {isTh ? `รายงานโซลาร์ของคุณ — ${form.location}` : `Your Solar Report — ${form.location}`}
                </div>
                <h3 style={{ color: C.text, fontSize: 26, margin: 0 }}>
                  {isTh ? "คุณประหยัดได้ " : "You could save "}
                  <span style={{ color: C.orangeLight }}>฿{Math.round(result.annualSavings).toLocaleString()}</span>
                  {isTh ? " ต่อปี" : " per year"}
                </h3>
              </div>

              {/* 🤖 AI Recommendation Card */}
              {recommendation && (() => {
                const isOnGrid = recommendation.system === "ongrid";
                const recColor = isOnGrid ? C.green : "#7B3FA0";
                const recColorLight = isOnGrid ? C.greenLight : "#a569bd";
                const RecIcon = isOnGrid ? Sun : Battery;
                return (
                  <div style={{
                    background: `linear-gradient(135deg, ${recColor}10, ${recColorLight}06)`,
                    border: `1.5px solid ${recColor}40`,
                    borderRadius: 16, padding: 24, marginBottom: 28,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <Sparkles size={16} color={recColor} />
                      <span style={{ color: recColor, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {isTh ? "AI วิเคราะห์ระบบที่เหมาะสม" : "AI System Recommendation"}
                      </span>
                      <span style={{
                        marginLeft: "auto", background: `${recColor}20`, color: recColor,
                        fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 12,
                      }}>
                        {recommendation.confidence}% {isTh ? "มั่นใจ" : "confidence"}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: 14, flexShrink: 0,
                        background: `linear-gradient(135deg, ${recColor}, ${recColorLight})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: `0 8px 24px ${recColor}44`,
                      }}>
                        <RecIcon size={30} color="white" />
                      </div>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ color: C.text, fontWeight: 700, fontSize: 22, fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>
                          {isOnGrid ? "On-Grid System" : "Hybrid System"}
                        </div>
                        <div style={{ color: C.textMuted, fontSize: 13.5, lineHeight: 1.6 }}>
                          {isTh ? recommendation.reasonTh : recommendation.reasonEn}
                        </div>
                      </div>
                    </div>
                    {/* Benefits */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                      {(isOnGrid
                        ? (isTh
                            ? ["ลงทุนต่ำ", "คืนทุน 4-5 ปี", "ไม่ต้องบำรุงรักษาแบต", "เสถียร 30 ปี"]
                            : ["Lower investment", "ROI 4-5 yrs", "No battery maintenance", "30-year stable"])
                        : (isTh
                            ? ["สำรองไฟกลางคืน", "พร้อมรับไฟดับ", "ใช้ไฟ 24 ชม.", "ลดค่าไฟ Peak"]
                            : ["Night backup", "Power outage ready", "24/7 power", "Peak shaving"])
                      ).map(b => (
                        <span key={b} style={{
                          fontSize: 12, fontWeight: 500, color: recColor,
                          background: `${recColor}12`, border: `1px solid ${recColor}30`,
                          padding: "5px 11px", borderRadius: 14,
                          display: "inline-flex", alignItems: "center", gap: 5,
                        }}>
                          <CheckCircle size={12} /> {b}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* KPI Cards */}
              <div className="calc-kpi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
                {[
                  {
                    label: isTh ? "ขนาดระบบ" : "System Size",
                    value: `${result.kwpNeeded.toLocaleString("th-TH")} kWp`,
                    icon: Zap, color: C.green,
                  },
                  {
                    label: isTh ? "เงินลงทุน" : "System Cost",
                    // ฿13,923,000 — ตัวเลขเต็มพร้อมคอมม่าคั่น (รูปแบบที่คนไทยคุ้นเคย)
                    value: Math.round(result.systemCost).toLocaleString("th-TH", { style: "currency", currency: "THB", minimumFractionDigits: 0, maximumFractionDigits: 0 }),
                    icon: DollarSign, color: C.orange,
                  },
                  {
                    label: isTh ? "ระยะคืนทุน" : "ROI Period",
                    value: `${result.roiYears.toFixed(1)} ${isTh ? "ปี" : "yrs"}`,
                    icon: Calendar, color: C.greenLight,
                  },
                  {
                    label: isTh ? "ลด CO₂ /ปี" : "CO₂ Saved/yr",
                    value: `${result.co2Saved.toFixed(1)} ${isTh ? "ตัน" : "t"}`,
                    icon: Leaf, color: C.orangeLight,
                  },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} style={{ background: C.midDark, borderRadius: 12, padding: 18, border: `1px solid ${C.border}`, textAlign: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                      <Icon size={18} color={color} />
                    </div>
                    <div style={{
                      color: C.text, fontWeight: 700,
                      fontSize: "clamp(15px, 1.6vw, 19px)",
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontVariantNumeric: "tabular-nums",
                      fontFeatureSettings: '"tnum" 1, "lnum" 1',
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}>{value}</div>
                    <div style={{ color: C.textMuted, fontSize: 12, marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* 30-year savings chart */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 16, fontWeight: 600 }}>{isTh ? "การประหยัด 30 ปี (พันบาท)" : "30-Year Savings Projection (฿ thousands)"}</div>
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
                      // v อยู่ในหน่วย "พันบาท" (data ÷ 1000) — × 1000 กลับเป็นบาทเต็ม แล้วใส่ comma
                      formatter={(v, n) => [
                        `฿${(v * 1000).toLocaleString("th-TH")}`,
                        n === "savings"
                          ? (isTh ? "ประหยัดสะสม" : "Cumulative Savings")
                          : (isTh ? "กำไรสุทธิ" : "Net Benefit"),
                      ]}
                    />
                    <Legend wrapperStyle={{ color: C.textMuted, fontSize: 12 }} />
                    <Area type="monotone" dataKey="savings" stroke={C.green} strokeWidth={2} fill="url(#gSavings)" name={isTh ? "ประหยัดสะสม" : "Cumulative Savings"} />
                    <Area type="monotone" dataKey="net" stroke={C.orange} strokeWidth={2} fill="url(#gNet)" name={isTh ? "กำไรสุทธิ" : "Net Benefit"} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Executive Financial & ESG Dashboard (แทน Monthly Bill Comparison) */}
              <ExecutiveDashboard result={result} isTh={isTh} />

              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => { setStep(1); setResult(null); setRecommendation(null); setType(null); }} style={{ flex: 1, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, color: C.textMuted, cursor: "pointer", fontSize: 14 }}>{isTh ? "คำนวณใหม่" : "Recalculate"}</button>
                <Link href="/quote" style={{ flex: 2, background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`, border: "none", borderRadius: 10, padding: 14, color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600, textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <MessageCircle size={18} /> {content[lang].btnQuote}
                </Link>
              </div>
            </div>
          )}
          </div> {/* ── end calc-card ── */}
          </div> {/* ── end center column ── */}

          {/* Right column — Smart Factory graphic (hidden on mobile) */}
          {step !== 5 && (
            <div className="calc-side-graphic" style={{ flex: "0 0 210px" }}>
              <SmartFactoryGraphic active={type === "industrial"} />
            </div>
          )}

        </div> {/* ── end calc-layout ── */}
      </div>
    </section>
  );
}

/* ─── PARTNER LOGO ──────────────────────────────────────────── */
// โหลดจาก /public/partners/ ก่อน → ถ้าไม่มีลอง Clearbit → fallback ชื่อแบรนด์เต็ม
function PartnerLogo({ name, slug, domain, brandColor }) {
  const [srcIdx, setSrcIdx] = useState(0);
  const sources = [
    `/partners/${slug}.svg`,
    `/partners/${slug}.png`,
    domain ? `https://logo.clearbit.com/${domain}` : null,
  ].filter(Boolean);

  if (srcIdx >= sources.length) {
    return (
      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 17, fontWeight: 700, color: brandColor,
        letterSpacing: "-0.01em", textAlign: "center",
      }}>
        {name}
      </span>
    );
  }

  return (
    <img
      src={sources[srcIdx]}
      alt={`${name} logo`}
      onError={() => setSrcIdx(srcIdx + 1)}
      style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
    />
  );
}

/* ─── COMPACT LOGO CARD (สำหรับ infinite scroll row) ─────────── */
function PartnerLogoCard({ name, slug, domain, brandColor, tier, color }) {
  return (
    <div style={{
      flexShrink: 0, width: 260,
      background: C.darkCard, border: `1px solid ${C.border}`,
      borderRadius: 14, padding: "16px 18px",
      display: "flex", alignItems: "center", gap: 14,
      transition: "border-color 0.3s, box-shadow 0.3s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.boxShadow = `0 10px 24px ${color}1f`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{
        width: 80, height: 56, borderRadius: 8,
        background: "#FFFFFF", border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, padding: 10, overflow: "hidden",
      }}>
        <PartnerLogo name={name} slug={slug} domain={domain} brandColor={brandColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 4, lineHeight: 1.2 }}>{name}</div>
        <span style={{
          background: `${color}18`, border: `1px solid ${color}40`,
          borderRadius: 8, padding: "2px 7px", fontSize: 9.5,
          color, fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", display: "inline-block",
        }}>{tier}</span>
      </div>
    </div>
  );
}

/* ─── PARTNERS ──────────────────────────────────────────────── */
function Partners({ lang }) {
  const brands = [
  { name: "Huawei",        slug: "huawei",  domain: "huawei.com",         role: content[lang].huaweiDesc, tier: "Platinum", color: "#E8630A", brandColor: "#CF0A2C" },
  { name: "LONGi Solar",   slug: "longi",   domain: "longi.com",          role: content[lang].longiDesc,  tier: "Platinum", color: "#2D7D46", brandColor: "#003F88" },
  { name: "Deye",          slug: "deye",    domain: "deyeinverter.com",   role: content[lang].deyeDesc,   tier: "Gold",     color: "#FF8C3A", brandColor: "#E30613" },
  { name: "Sungrow",       slug: "sungrow", domain: "sungrowpower.com",   role: content[lang].sungrowDesc,tier: "Gold",     color: "#2D7D46", brandColor: "#C8102E" },
  { name: "BYD Energy",    slug: "byd",     domain: "byd.com",            role: content[lang].bydDesc,    tier: "Silver",   color: "#E8630A", brandColor: "#E60012" },
];

  return (
    <section id="partners" className="section-pad" style={{ padding: "100px 2rem", background: C.dark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{content[lang].partnerTag}</div>
          <h2 className="section-h2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: 0 }}>{content[lang].partnerTitle}</h2>
          <p style={{ color: C.textMuted, fontSize: 17, marginTop: 16, maxWidth: 540, margin: "16px auto 0" }}>
            {content[lang].partnerDesc}
          </p>
        </div>

        {/* ─── Infinite Scrolling Logo Rows (2 ทิศทาง สวนกัน) ────── */}
        <div className="partners-scroller" style={{
          position: "relative", marginBottom: 48,
          maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}>
          {/* Row 1 — scroll LEFT */}
          <div className="scroll-row" style={{ overflow: "hidden", marginBottom: 14 }}>
            <div className="logo-track logo-track-left" style={{ display: "flex", gap: 16, width: "fit-content" }}>
              {[...brands, ...brands].map((b, i) => (
                <PartnerLogoCard key={`l-${i}`} {...b} />
              ))}
            </div>
          </div>
          {/* Row 2 — scroll RIGHT */}
          <div className="scroll-row" style={{ overflow: "hidden" }}>
            <div className="logo-track logo-track-right" style={{ display: "flex", gap: 16, width: "fit-content" }}>
              {[...brands, ...brands].reverse().map((b, i) => (
                <PartnerLogoCard key={`r-${i}`} {...b} />
              ))}
            </div>
          </div>
        </div>

        <div className="partners-cta" style={{
          background: `linear-gradient(135deg, ${C.green}18, ${C.orange}10)`,
          border: `1px solid ${C.green}30`, borderRadius: 16, padding: 32,
          display: "flex", alignItems: "center", gap: 32
        }}>
          <Shield size={48} color={C.greenLight} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: C.text, fontSize: 18, margin: "0 0 8px" }}>
              {lang === "th" ? "เครือข่ายผู้ติดตั้ง — น่าเชื่อถือ คัดสรรแล้ว" : "Our Installer Network — Trusted, Vetted, Private"}
            </h4>
            <p style={{ color: C.textMuted, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              {lang === "th"
                ? "เราบริหารเครือข่ายผู้รับเหมา EPC ที่ผ่านการคัดเกรดทั่วประเทศไทย ด้วยการรวมผู้ติดตั้งหลายราย เราขับเคลื่อนราคาที่แข่งขันได้ พร้อมปกป้องความสัมพันธ์กับพันธมิตร คุณได้งานติดตั้งคุณภาพสูงโดยไม่ต้องยุ่งยากกับการเลือกผู้รับเหมาเอง"
                : "We maintain a carefully curated network of certified EPC contractors across Thailand. By aggregating multiple installers, we drive competitive pricing while protecting our partnerships. You get top-quality installation without the vendor friction."}
            </p>
          </div>
          <a href="#support" onClick={(e) => { e.preventDefault(); scrollToId('support'); }} style={{ flexShrink: 0, background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`, color: "white", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", cursor: "pointer" }}>
            {lang === "th" ? "ติดต่อเรา" : "Request Access"}
          </a>
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
    <section id="support" className="section-pad" style={{ padding: "100px 2rem", background: C.dark, position: "relative", overflow: "hidden" }}>
      {/* Dot pattern bg */}
      <div className="dot-pattern-bg-soft" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div className="support-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>24/7 Support</div>
            <h2 className="section-h2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: C.text, margin: "0 0 20px" }}>
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

          <div className="support-channels" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
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

/* ─── PORTFOLIO TEASER ──────────────────────────────────────── */
function PortfolioTeaser({ lang }) {
  const t = {
    th: {
      tag: "ผลงานของเรา",
      title: "โครงการที่เราภาคภูมิใจ",
      desc: "ผลงานครอบคลุมทุกประเภท ตั้งแต่บ้านพักอาศัยจนถึง Solar Farm ขนาด 1 MWp",
      btn: "ดูผลงานทั้งหมด",
      highlights: [
        { type: "residential", label: "บ้านพักอาศัย", kw: "5–12 kWp", icon: Home, color: "#2D7D46" },
        { type: "industrial", label: "ธุรกิจ/อุตสาหกรรม", kw: "50–200 kWp", icon: Building2, color: "#1a5e8a" },
        { type: "bess", label: "ระบบกักเก็บพลังงาน", kw: "BESS + Solar", icon: Battery, color: "#7B3FA0" },
        { type: "epc", label: "EPC / Solar Farm", kw: "500 kWp – 1 MWp", icon: Globe, color: "#E8630A" },
      ],
    },
    en: {
      tag: "Our Projects",
      title: "Projects We're Proud Of",
      desc: "Covering all types from residential to utility-scale Solar Farm at 1 MWp",
      btn: "View All Projects",
      highlights: [
        { type: "residential", label: "Residential", kw: "5–12 kWp", icon: Home, color: "#2D7D46" },
        { type: "industrial", label: "Business / Industrial", kw: "50–200 kWp", icon: Building2, color: "#1a5e8a" },
        { type: "bess", label: "Energy Storage (BESS)", kw: "BESS + Solar", icon: Battery, color: "#7B3FA0" },
        { type: "epc", label: "EPC / Solar Farm", kw: "500 kWp – 1 MWp", icon: Globe, color: "#E8630A" },
      ],
    },
  };
  const tx = t[lang] || t.th;

  return (
    <section style={{ padding: "100px 2rem", background: C.midDark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{tx.tag}</div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: C.text, margin: "0 0 16px" }}>
            {tx.title}
          </h2>
          <p style={{ color: C.textMuted, fontSize: 17, margin: "0 auto", maxWidth: 500, lineHeight: 1.7 }}>
            {tx.desc}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 40 }}>
          {tx.highlights.map(({ label, kw, icon: Icon, color }) => (
            <div key={label} style={{
              background: C.darkCard, border: `1px solid ${C.border}`,
              borderRadius: 14, padding: "24px 20px", textAlign: "center",
              transition: "transform 0.25s, border-color 0.25s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}50`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Icon size={26} color={color} />
              </div>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{label}</div>
              <div style={{ color, fontSize: 13, fontWeight: 500 }}>{kw}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/portfolio" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
            color: "white", padding: "13px 28px", borderRadius: 10,
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 8px 28px ${C.green}40`,
          }}>
            {tx.btn} <ArrowRight size={16} />
          </Link>
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
{ label: "WhatsApp", color: "#25D366", href: `https://line.me/ti/p/~Monarrattana${content[lang].phone.replace(/[^0-9]/g, '')}` },
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

function Footer({ lang = "th" }) {
  const isTh = lang === "th";

  const sections = [
    {
      title: isTh ? "บริการของเรา" : "Our Services",
      links: [
        { label: isTh ? "บ้านพักอาศัย" : "Residential", href: "/residential" },
        { label: isTh ? "ธุรกิจ/อุตสาหกรรม" : "Industrial", href: "/industrial" },
        { label: isTh ? "ระบบกักเก็บพลังงาน" : "Energy Storage", href: "/bess" },
        { label: isTh ? "เครือข่าย EPC" : "EPC Network", href: "/epc" },
      ],
    },
    {
      title: isTh ? "ลิงก์ลัด" : "Quick Links",
      links: [
        { label: isTh ? "ผลงานของเรา" : "Portfolio", href: "/portfolio" },
        { label: isTh ? "คำนวณ ROI" : "ROI Calculator", href: "/#calculator" },
        { label: isTh ? "ขอใบเสนอราคา" : "Get a Quote", href: "/quote" },
        { label: isTh ? "พันธมิตร" : "Partners", href: "/#partners" },
      ],
    },
  ];

  const contacts = [
    { icon: Phone, label: "095-309-5196", href: "tel:0953095196" },
    { icon: Mail, label: "mon-attention@hotmail.com", href: "mailto:mon-attention@hotmail.com" },
    { icon: MessageCircle, label: "LINE: Monarrattana", href: "https://line.me/ti/p/~Monarrattana" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: "linear-gradient(180deg, #0F1C14 0%, #14241B 100%)",
      borderTop: `1px solid rgba(255,255,255,0.06)`,
      padding: "64px 2rem 28px",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 48, marginBottom: 48 }}>

          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <img src="/Logo SolarACM.png" alt="Solar ACM" style={{ height: 42, width: "auto", objectFit: "contain" }} />
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: "white" }}>Solar ACM</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Systems Corporation</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.75, maxWidth: 320, margin: "0 0 20px" }}>
              {isTh
                ? "ที่ปรึกษาและผู้เชี่ยวชาญติดตั้งโซลาร์เซลล์ครบวงจรในไทย ทำให้พลังงานสะอาดเข้าถึงง่าย คุ้มค่า และไม่ซับซ้อน"
                : "Thailand's trusted solar consultancy. Making clean energy accessible, affordable, and simple."}
            </p>
            {/* Trust badges */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                isTh ? "TAT License" : "TAT License",
                isTh ? "PEA / MEA รับรอง" : "PEA / MEA Certified",
                isTh ? "PDPA Compliant" : "PDPA Compliant",
              ].map(b => (
                <span key={b} style={{
                  fontSize: 10, color: "rgba(255,255,255,0.7)",
                  background: "rgba(76,175,114,0.12)", border: "1px solid rgba(76,175,114,0.25)",
                  padding: "4px 10px", borderRadius: 20, fontWeight: 500,
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map(({ title, links }) => (
            <div key={title}>
              <div style={{ color: "white", fontWeight: 600, marginBottom: 18, fontSize: 14, letterSpacing: "0.02em" }}>{title}</div>
              {links.map(({ label, href }) => (
                <Link key={label} href={href} style={{
                  color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 12,
                  textDecoration: "none", display: "block", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = C.greenLight}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact column */}
          <div>
            <div style={{ color: "white", fontWeight: 600, marginBottom: 18, fontSize: 14, letterSpacing: "0.02em" }}>
              {isTh ? "ติดต่อเรา" : "Contact Us"}
            </div>
            {contacts.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", gap: 10,
                color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 14,
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = C.greenLight}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "rgba(76,175,114,0.12)", border: "1px solid rgba(76,175,114,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={14} color={C.greenLight} />
                </div>
                <span>{label}</span>
              </a>
            ))}
            {/* CTA */}
            <Link href="/quote" style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8,
              background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
              color: "white", padding: "10px 18px", borderRadius: 8,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
              boxShadow: `0 6px 20px ${C.orange}33`,
            }}>
              <MessageCircle size={14} /> {isTh ? "ขอใบเสนอราคาฟรี" : "Get Free Quote"}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{
          borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
            © {currentYear} Solar ACM Systems Corporation. {isTh ? "สงวนลิขสิทธิ์" : "All rights reserved."}
          </div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>
            {isTh ? "จดทะเบียนในประเทศไทย" : "Registered in Thailand"} · Thai Solar Industry Association
          </div>
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
        html { scroll-behavior: smooth; scroll-padding-top: 90px; overflow-x: clip; }
        body { overflow-x: clip; margin: 0; }
        section[id] { scroll-margin-top: 90px; }
        img { max-width: 100%; height: auto; }
        input:focus { border-color: #2D7D46 !important; box-shadow: 0 0 0 3px rgba(45,125,70,0.15); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0F4F1; }
        ::-webkit-scrollbar-thumb { background: #2D7D46; border-radius: 3px; }

        /* ── 3D Solar Panel: subtle product-shot style tilt ─────── */
        @keyframes solar-panel-tilt {
          0%, 100% { transform: perspective(1400px) rotateX(-2deg) rotateY(-22deg); }
          50%      { transform: perspective(1400px) rotateX(-2deg) rotateY(-10deg); }
        }
        .solar-panel-auto-rotate {
          animation: solar-panel-tilt 8s ease-in-out infinite;
        }
        /* Sheen sweep across the panel */
        @keyframes panel-sheen {
          0% { transform: translateX(-100%); opacity: 0; }
          40% { opacity: 1; }
          60% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .panel-sheen {
          animation: panel-sheen 5s ease-in-out infinite;
        }

        /* ── Sun Rays: rotation + pulse + particles ──────── */
        @keyframes sun-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sun-rotate { animation: sun-rotate 60s linear infinite; transform-origin: center; }

        @keyframes sun-pulse {
          0%, 100% { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        .sun-pulse { animation: sun-pulse 4s ease-in-out infinite; }

        @keyframes particle-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-20px) scale(1.3); opacity: 1; }
        }
        .sun-particle { animation: particle-float 4s ease-in-out infinite; }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .solar-panel-auto-rotate, .sun-rotate, .sun-pulse, .sun-particle, .panel-sheen,
          .logo-track-left, .logo-track-right {
            animation: none !important;
          }
        }

        /* ── Infinite Logo Scroll (2 ทิศทางสวนกัน) ──────── */
        @keyframes logo-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 8px)); }
        }
        @keyframes logo-scroll-right {
          0%   { transform: translateX(calc(-50% - 8px)); }
          100% { transform: translateX(0); }
        }
        .logo-track-left  { animation: logo-scroll-left  30s linear infinite; }
        .logo-track-right { animation: logo-scroll-right 30s linear infinite; }
        .scroll-row:hover .logo-track-left,
        .scroll-row:hover .logo-track-right { animation-play-state: paused; }

        /* ── Subtle Dot Pattern Backgrounds ───────────── */
        .dot-pattern-bg {
          background-image: radial-gradient(circle at 1px 1px, rgba(45,125,70,0.10) 1px, transparent 0);
          background-size: 28px 28px;
        }
        .dot-pattern-bg-soft {
          background-image: radial-gradient(circle at 1px 1px, rgba(45,125,70,0.07) 1px, transparent 0);
          background-size: 24px 24px;
        }

        /* ── TABLET (≤ 1024px) ─────────────────────────── */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-visual { display: none !important; }
          .calc-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .partners-cta { flex-direction: column !important; text-align: center !important; gap: 20px !important; }
          .support-section-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }

        /* ── MOBILE (≤ 768px) ──────────────────────────── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-controls { display: flex !important; }
          .hero-section, .section-pad { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
          .nav-bar { padding: 0 1rem !important; }
          .hero-title { font-size: clamp(1.8rem, 7vw, 2.4rem) !important; }
          .hero-desc { font-size: 16px !important; }
          .hero-ctas { flex-direction: column !important; align-items: stretch !important; }
          .hero-ctas > a { justify-content: center !important; }
          .stats-row { gap: 10px !important; }
          .stats-row > div { flex: 1 1 calc(50% - 5px) !important; min-width: 0 !important; }
          .solutions-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .calc-types { grid-template-columns: 1fr !important; gap: 14px !important; }
          .calc-locations { grid-template-columns: 1fr 1fr !important; }
          .calc-kpi-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .partners-grid { grid-template-columns: 1fr !important; }
          .trust-grid { grid-template-columns: 1fr !important; }
          .support-channels { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1 !important; }
          .footer-bottom { flex-direction: column !important; gap: 8px !important; text-align: center !important; }
          .calc-card { padding: 24px !important; max-width: 100% !important; }
          .section-h2 { font-size: clamp(1.6rem, 5vw, 2.2rem) !important; }
          .stats-counter-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .hero-social-proof { font-size: 11.5px !important; padding: 5px 12px 5px 10px !important; gap: 8px !important; }
          .hero-trust-badges { gap: 14px !important; font-size: 12px !important; }
          .exec-row-financial { grid-template-columns: 1fr !important; }
          .exec-row-esg { grid-template-columns: 1fr !important; max-width: 100% !important; }
        }

        /* ── SMALL MOBILE (≤ 480px) ────────────────────── */
        @media (max-width: 480px) {
          .stats-row > div { flex: 1 1 100% !important; }
          .support-channels { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .calc-locations { grid-template-columns: 1fr !important; }
        }
      `}</style>
    <Nav lang={lang} scrolled={scrolled} setLang={setLang} />
        <Hero lang={lang} />
        <StatsCounterSection lang={lang} />
        <Solutions lang={lang} />
        <Calculator_ lang={lang} />
        <Partners lang={lang} />
        <PortfolioTeaser lang={lang} />
        <Support lang={lang} />
        <Footer lang={lang} />
        <FloatingSupport lang={lang} />
    </div>
  );
}
