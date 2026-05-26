"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Battery,
  Building2,
  Calculator,
  CheckCircle,
  ChevronRight,
  Clock,
  Cpu,
  FileText,
  Globe,
  Home,
  Leaf,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Shield,
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const C = {
  ink: "#102017",
  muted: "#5A675F",
  soft: "#EEF4F0",
  line: "rgba(16,32,23,0.10)",
  green: "#2D7D46",
  green2: "#47A267",
  orange: "#E8630A",
  orange2: "#FF8C3A",
  white: "#FFFFFF",
  dark: "#0E1B13",
};

const content = {
  th: {
    nav: {
      solutions: "โซลูชัน",
      roi: "ROI",
      cases: "ผลงาน",
      process: "ขั้นตอน",
      partners: "พันธมิตร",
      quote: "ขอใบเสนอราคา",
    },
    heroKicker: "Solar ACM Systems Corporation",
    heroTitle: "ที่ปรึกษาพลังงานสะอาดสำหรับองค์กร บ้าน และโรงงานยุคใหม่",
    heroDesc:
      "เราออกแบบ วางแผน และบริหารโครงการโซลาร์แบบครบวงจร ตั้งแต่การประเมินค่าไฟ เลือกเทคโนโลยี จัดหา EPC ที่เหมาะสม ไปจนถึงส่งมอบระบบที่คุ้มค่าและตรวจสอบได้",
    heroPrimary: "เริ่มประเมินโครงการ",
    heroSecondary: "ดูผลงานจริง",
    metrics: [
      ["15+", "โครงการที่จัดทำ"],
      ["2.2MWp", "กำลังผลิตรวม"],
      ["8", "จังหวัดที่ให้บริการ"],
    ],
    painTitle: "ค่าไฟไม่ได้เป็นแค่ต้นทุน แต่เป็นความเสี่ยงของธุรกิจ",
    painDesc:
      "หลายองค์กรอยากติดโซลาร์ แต่ติดอยู่กับข้อมูลที่กระจัดกระจาย ราคาเปรียบเทียบยาก และไม่มั่นใจว่าใครควรเป็นผู้ติดตั้งจริง เราช่วยแปลงโจทย์พลังงานให้เป็นแผนลงทุนที่ชัดเจน",
    painCards: [
      ["ค่าไฟผันผวน", "วางแผนต้นทุนยากเมื่อค่าไฟเพิ่มขึ้นและโหลดการใช้ไฟเปลี่ยนตามฤดูกาล"],
      ["ข้อมูลเทคนิคซับซ้อน", "ขนาดระบบ อินเวอร์เตอร์ แบตเตอรี่ และโครงสร้างหลังคาควรถูกประเมินร่วมกัน"],
      ["เลือกผู้รับเหมายาก", "ราคาถูกที่สุดไม่ได้แปลว่าคุ้มที่สุด หากไม่มีมาตรฐานงานและการรับประกันที่ชัดเจน"],
    ],
    solutionsTitle: "โซลูชันพลังงานที่ออกแบบตามรูปแบบการใช้ไฟของคุณ",
    solutionsDesc:
      "เราไม่ได้เริ่มจากการขายอุปกรณ์ แต่เริ่มจากค่าไฟ เป้าหมายธุรกิจ และข้อจำกัดของพื้นที่ เพื่อแนะนำระบบที่เหมาะจริง",
    roiTitle: "เห็นภาพความคุ้มค่าก่อนตัดสินใจ",
    roiDesc:
      "ทีมที่ปรึกษาประเมินค่าไฟ รายละเอียดโหลด และรูปแบบการใช้ไฟ เพื่อสรุปขนาดระบบ เงินลงทุน ระยะคืนทุน และทางเลือก On-Grid หรือ Hybrid ให้เข้าใจง่าย",
    whyTitle: "ทำไม Solar ACM จึงเหมาะกับโครงการที่ต้องการความมั่นใจ",
    casesTitle: "ตัวอย่างโครงการที่สะท้อนแนวทางของเรา",
    knowledgeTitle: "Knowledge Center",
    knowledgeDesc:
      "เนื้อหาสั้น กระชับ และใช้ได้จริง สำหรับเจ้าของบ้าน ผู้บริหารโรงงาน และทีมจัดซื้อที่ต้องตัดสินใจเรื่องพลังงาน",
    processTitle: "จากโจทย์ค่าไฟสู่ระบบที่พร้อมใช้งาน",
    partnersTitle: "เทคโนโลยีจากแบรนด์ระดับโลก",
    partnersDesc:
      "เราเลือกอุปกรณ์ตามความเหมาะสมของโครงการ ไม่ยึดติดแบรนด์เดียว เพื่อให้ได้สมดุลระหว่างคุณภาพ การรับประกัน และงบประมาณ",
    finalTitle: "พร้อมเปลี่ยนค่าไฟให้เป็นสินทรัพย์ระยะยาวหรือยัง",
    finalDesc:
      "ส่งบิลค่าไฟหรือข้อมูลเบื้องต้นให้เรา ทีมที่ปรึกษาจะช่วยประเมินแนวทางที่เหมาะสมโดยไม่ผูกมัด",
    footerDesc:
      "ที่ปรึกษาโซลาร์เซลล์และพลังงานสะอาดสำหรับบ้าน ธุรกิจ โรงงาน ระบบกักเก็บพลังงาน และเครือข่าย EPC ในประเทศไทย",
  },
  en: {
    nav: {
      solutions: "Solutions",
      roi: "ROI",
      cases: "Cases",
      process: "Process",
      partners: "Partners",
      quote: "Get Quote",
    },
    heroKicker: "Solar ACM Systems Corporation",
    heroTitle: "Clean energy consulting for modern homes, enterprises, and factories",
    heroDesc:
      "We plan, design, and manage solar projects end to end: from energy-bill analysis and technology selection to EPC matching and project delivery with clear economics.",
    heroPrimary: "Start Project Assessment",
    heroSecondary: "View Case Studies",
    metrics: [
      ["15+", "Projects managed"],
      ["2.2MWp", "Portfolio capacity"],
      ["8", "Provinces served"],
    ],
    painTitle: "Electricity cost is not just an expense. It is an operating risk.",
    painDesc:
      "Many buyers want solar but face fragmented information, hard-to-compare pricing, and uncertainty around installer quality. We turn energy questions into a clear investment plan.",
    painCards: [
      ["Volatile energy cost", "Forecasting becomes harder as tariffs rise and operating loads shift across seasons."],
      ["Complex technical choices", "System size, inverter, battery, roof structure, and usage pattern should be evaluated together."],
      ["Installer uncertainty", "The lowest price is rarely the best value without clear standards, warranty, and project control."],
    ],
    solutionsTitle: "Energy solutions designed around how you actually use power",
    solutionsDesc:
      "We do not start by selling hardware. We start with your bill, business goals, and site constraints, then recommend the system that makes financial sense.",
    roiTitle: "Understand returns before committing capital",
    roiDesc:
      "Our consultants review your bill, load profile, and usage pattern to estimate system size, investment range, payback period, and On-Grid or Hybrid fit.",
    whyTitle: "Why Solar ACM fits projects that need confidence",
    casesTitle: "Selected work that reflects our approach",
    knowledgeTitle: "Knowledge Center",
    knowledgeDesc:
      "Practical, decision-ready insights for homeowners, factory operators, and procurement teams evaluating clean energy.",
    processTitle: "From energy problem to commissioned system",
    partnersTitle: "Technology from global energy brands",
    partnersDesc:
      "We select equipment by project fit, not by a single-brand agenda, balancing quality, warranty, availability, and budget.",
    finalTitle: "Ready to turn electricity cost into a long-term asset?",
    finalDesc:
      "Send us your electricity bill or project details. Our consultants will prepare an initial direction with no obligation.",
    footerDesc:
      "Solar and clean energy consultancy for residential, commercial, industrial, BESS, and EPC network projects in Thailand.",
  },
};

const solutions = [
  {
    icon: Home,
    href: "/residential",
    titleTh: "Residential Solar",
    titleEn: "Residential Solar",
    descTh: "ระบบโซลาร์สำหรับบ้านพักอาศัย เน้นประหยัดค่าไฟ ใช้งานง่าย และดูแลระยะยาว",
    descEn: "Solar systems for homes, focused on savings, simplicity, and long-term care.",
  },
  {
    icon: Building2,
    href: "/industrial",
    titleTh: "Commercial & Industrial",
    titleEn: "Commercial & Industrial",
    descTh: "ระบบสำหรับร้านค้า อาคาร โรงงาน และคลังสินค้า ที่ต้องการลดต้นทุนไฟฟ้าต่อเดือน",
    descEn: "Systems for offices, factories, shops, and warehouses looking to reduce monthly energy cost.",
  },
  {
    icon: Battery,
    href: "/bess",
    titleTh: "Hybrid & BESS",
    titleEn: "Hybrid & BESS",
    descTh: "ระบบกักเก็บพลังงานสำหรับพื้นที่ที่ใช้ไฟกลางคืนหรืออยากเพิ่มความมั่นคงด้านพลังงาน",
    descEn: "Battery storage for night usage, resilience, and higher energy independence.",
  },
  {
    icon: Users,
    href: "/epc",
    titleTh: "EPC Network",
    titleEn: "EPC Network",
    descTh: "คัดเลือกผู้รับเหมาที่เหมาะกับขนาดงาน งบประมาณ พื้นที่ และมาตรฐานโครงการ",
    descEn: "Installer matching based on project scale, budget, location, and quality standards.",
  },
];

const caseStudies = [
  ["Residential", "ระบบบ้านพักอาศัย 10 kWp", "ลดค่าไฟรายเดือนและออกแบบให้เข้ากับพื้นที่หลังคาจำกัด"],
  ["Industrial", "โรงงาน 250 kWp", "วางระบบให้รองรับโหลดกลางวันสูงและควบคุมงบลงทุนอย่างเป็นขั้นตอน"],
  ["Hybrid", "อาคารที่ใช้ไฟกลางคืน", "ประเมินการใช้แบตเตอรี่เพื่อเพิ่ม utilization และลดการพึ่งพากริด"],
];

const knowledge = [
  ["On-Grid หรือ Hybrid?", "เลือกจากพฤติกรรมการใช้ไฟ ไม่ใช่จากคำโฆษณา"],
  ["บิลค่าไฟบอกอะไรได้บ้าง", "ค่าไฟเฉลี่ยช่วยประเมินขนาดระบบและจุดคุ้มทุนเบื้องต้น"],
  ["ทำไมราคาติดตั้งต่างกัน", "อุปกรณ์ โครงสร้าง งานไฟฟ้า และการรับประกันมีผลมากกว่าที่เห็นในใบเสนอราคา"],
];

const process = [
  ["01", "Energy Review", "อ่านบิลค่าไฟและพฤติกรรมการใช้ไฟ"],
  ["02", "System Strategy", "วางทางเลือกระบบและขอบเขตโครงการ"],
  ["03", "EPC Matching", "คัดทีมติดตั้งและอุปกรณ์ที่เหมาะสม"],
  ["04", "Delivery Control", "ติดตามคุณภาพงาน ต้นทุน และเอกสารส่งมอบ"],
];

const partners = ["Huawei", "LONGi Solar", "Deye", "Risen Energy", "Sungrow", "BYD Energy"];

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function Nav({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const t = content[lang];

  const links = [
    ["#solutions", t.nav.solutions],
    ["#roi", t.nav.roi],
    ["/portfolio", t.nav.cases],
    ["#process", t.nav.process],
    ["#partners", t.nav.partners],
  ];

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link href="/" className="brand" aria-label="Solar ACM home">
          <img src="/Logo SolarACM.png" alt="Solar ACM" />
          <div>
            <strong>Solar ACM</strong>
            <span>Systems Corporation</span>
          </div>
        </Link>

        <nav className="nav__links">
          {links.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="lang" onClick={() => setLang(lang === "th" ? "en" : "th")}>
            <Globe size={14} />
            {lang === "th" ? "EN" : "TH"}
          </button>
          <Link className="btn btn--primary nav__quote" href="/quote">
            {t.nav.quote}
          </Link>
          <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link className="btn btn--primary" href="/quote" onClick={() => setOpen(false)}>
            {t.nav.quote}
          </Link>
        </div>
      )}
    </header>
  );
}

function SectionHead({ kicker, title, desc, center = false }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

function Hero({ lang }) {
  const t = content[lang];
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy reveal">
          <span className="eyebrow">
            <Sparkles size={15} />
            {t.heroKicker}
          </span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary btn--large" href="/quote">
              {t.heroPrimary}
              <ArrowRight size={18} />
            </Link>
            <Link className="btn btn--ghost btn--large" href="/portfolio">
              {t.heroSecondary}
            </Link>
          </div>
          <div className="metrics">
            {t.metrics.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-card reveal delay-1" aria-label="Solar project dashboard">
          <div className="hero-card__top">
            <span>Energy Strategy Snapshot</span>
            <span className="status">Live model</span>
          </div>
          <div className="energy-orbit">
            <div className="sun-core">
              <Sun size={34} />
            </div>
            <div className="orbit orbit-1" />
            <div className="orbit orbit-2" />
          </div>
          <div className="dashboard-grid">
            <div>
              <span>Estimated payback</span>
              <strong>4.8 yrs</strong>
            </div>
            <div>
              <span>Monthly bill cut</span>
              <strong>45-70%</strong>
            </div>
            <div>
              <span>Recommended fit</span>
              <strong>On-Grid</strong>
            </div>
            <div>
              <span>Project path</span>
              <strong>EPC Ready</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPoint({ lang }) {
  const t = content[lang];
  return (
    <section className="section pain">
      <div className="container two-col">
        <SectionHead
          kicker="Energy Cost Problem"
          title={t.painTitle}
          desc={t.painDesc}
        />
        <div className="pain-list">
          {t.painCards.map(([title, desc], idx) => (
            <div className="pain-card reveal" key={title}>
              <span>{String(idx + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions({ lang }) {
  const t = content[lang];
  const isTh = lang === "th";
  return (
    <section className="section" id="solutions">
      <div className="container">
        <SectionHead
          center
          kicker="Solutions Overview"
          title={t.solutionsTitle}
          desc={t.solutionsDesc}
        />
        <div className="solution-grid">
          {solutions.map(({ icon: Icon, href, titleTh, titleEn, descTh, descEn }) => (
            <Link className="solution-card reveal" href={href} key={titleEn}>
              <div className="icon-box">
                <Icon size={22} />
              </div>
              <h3>{isTh ? titleTh : titleEn}</h3>
              <p>{isTh ? descTh : descEn}</p>
              <span>
                {isTh ? "ดูรายละเอียด" : "Explore solution"}
                <ChevronRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoiSection({ lang }) {
  const t = content[lang];
  const isTh = lang === "th";
  const rows = [
    [isTh ? "ค่าไฟต่อเดือน" : "Monthly bill", "฿85,000"],
    [isTh ? "ระบบที่เหมาะสม" : "Recommended system", "180 kWp"],
    [isTh ? "ประหยัดต่อปี" : "Annual savings", "฿1.02M"],
    [isTh ? "คืนทุนโดยประมาณ" : "Estimated payback", "4-5 years"],
  ];

  return (
    <section className="section roi" id="roi">
      <div className="container roi__grid">
        <div>
          <SectionHead kicker="ROI & Savings" title={t.roiTitle} desc={t.roiDesc} />
          <div className="roi-points">
            {[
              isTh ? "ประเมินจากบิลค่าไฟจริง ไม่ใช้ตัวเลขเหมารวม" : "Based on real electricity bills, not generic estimates",
              isTh ? "แยกผลลัพธ์ On-Grid / Hybrid ให้เห็นก่อนตัดสินใจ" : "Compares On-Grid and Hybrid scenarios before decision",
              isTh ? "จัดทำข้อมูลให้คุยกับผู้บริหารหรือทีมจัดซื้อได้ง่าย" : "Prepared for management and procurement discussion",
            ].map((item) => (
              <div key={item}>
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link className="btn btn--primary" href="/quote">
            {isTh ? "ส่งบิลค่าไฟเพื่อประเมิน" : "Submit bill for assessment"}
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="roi-panel reveal">
          <div className="roi-panel__header">
            <BarChart3 size={20} />
            <span>{isTh ? "ตัวอย่าง Executive Summary" : "Sample Executive Summary"}</span>
          </div>
          {rows.map(([label, value]) => (
            <div className="roi-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <div className="mini-chart">
            <span style={{ height: "44%" }} />
            <span style={{ height: "58%" }} />
            <span style={{ height: "72%" }} />
            <span style={{ height: "86%" }} />
            <span style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose({ lang }) {
  const isTh = lang === "th";
  const items = [
    [Shield, isTh ? "Vendor-neutral advisory" : "Vendor-neutral advisory", isTh ? "เราเปรียบเทียบทางเลือกและคัดทีมติดตั้งจากความเหมาะสมของโครงการ" : "We compare options and match installers based on project fit."],
    [Calculator, isTh ? "Financial clarity" : "Financial clarity", isTh ? "สรุปเงินลงทุน ผลประหยัด และจุดคุ้มทุนให้ตัดสินใจง่าย" : "Investment, savings, and payback are summarized clearly."],
    [FileText, isTh ? "Project governance" : "Project governance", isTh ? "ช่วยดูขอบเขตงาน เอกสาร และมาตรฐานส่งมอบ ลดความเสี่ยงระหว่างทาง" : "We support scope, documentation, and delivery standards."],
  ];

  return (
    <section className="section why">
      <div className="container">
        <SectionHead center kicker="Why Choose Us" title={content[lang].whyTitle} />
        <div className="why-grid">
          {items.map(([Icon, title, desc]) => (
            <div className="why-card reveal" key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies({ lang }) {
  const isTh = lang === "th";
  return (
    <section className="section cases" id="cases">
      <div className="container">
        <div className="section-row">
          <SectionHead kicker="Case Studies" title={content[lang].casesTitle} />
          <Link className="text-link" href="/portfolio">
            {isTh ? "ดูผลงานทั้งหมด" : "View portfolio"} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="case-grid">
          {caseStudies.map(([type, title, desc], index) => (
            <Link className="case-card reveal" href="/portfolio" key={title}>
              <div className={`case-visual visual-${index + 1}`}>
                <span>{type}</span>
              </div>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgeCenter({ lang }) {
  return (
    <section className="section knowledge">
      <div className="container knowledge__grid">
        <SectionHead
          kicker="Decision Intelligence"
          title={content[lang].knowledgeTitle}
          desc={content[lang].knowledgeDesc}
        />
        <div className="article-list">
          {knowledge.map(([title, desc]) => (
            <article className="article" key={title}>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <ArrowRight size={18} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ lang }) {
  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead center kicker="Process Workflow" title={content[lang].processTitle} />
        <div className="process-grid">
          {process.map(([num, title, desc]) => (
            <div className="process-card reveal" key={num}>
              <span>{num}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners({ lang }) {
  return (
    <section className="section partners" id="partners">
      <div className="container">
        <SectionHead
          center
          kicker="Partner Brands"
          title={content[lang].partnersTitle}
          desc={content[lang].partnersDesc}
        />
        <div className="partner-grid">
          {partners.map((name) => (
            <div className="partner-card" key={name}>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ lang }) {
  const t = content[lang];
  const isTh = lang === "th";
  return (
    <section className="final-cta">
      <div className="container final-cta__box">
        <div>
          <span className="kicker">Final CTA</span>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalDesc}</p>
        </div>
        <div className="final-cta__actions">
          <Link className="btn btn--primary btn--large" href="/quote">
            {isTh ? "ขอใบเสนอราคาฟรี" : "Get a free quote"}
            <ArrowRight size={18} />
          </Link>
          <a className="btn btn--dark btn--large" href="tel:0953095196">
            <Phone size={17} />
            095-309-5196
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang }) {
  const isTh = lang === "th";
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link href="/" className="brand brand--footer">
            <img src="/Logo SolarACM.png" alt="Solar ACM" />
            <div>
              <strong>Solar ACM</strong>
              <span>Systems Corporation</span>
            </div>
          </Link>
          <p>{content[lang].footerDesc}</p>
        </div>
        <div>
          <h4>{isTh ? "บริการ" : "Solutions"}</h4>
          <Link href="/residential">Residential Solar</Link>
          <Link href="/industrial">Commercial & Industrial</Link>
          <Link href="/bess">Hybrid & BESS</Link>
          <Link href="/epc">EPC Network</Link>
        </div>
        <div>
          <h4>{isTh ? "ลิงก์สำคัญ" : "Company"}</h4>
          <Link href="/portfolio">{isTh ? "ผลงานของเรา" : "Portfolio"}</Link>
          <Link href="/#roi">{isTh ? "ประเมิน ROI" : "ROI Assessment"}</Link>
          <Link href="/quote">{isTh ? "ขอใบเสนอราคา" : "Get Quote"}</Link>
          <Link href="/#partners">{isTh ? "พันธมิตร" : "Partners"}</Link>
        </div>
        <div>
          <h4>{isTh ? "ติดต่อ" : "Contact"}</h4>
          <a href="tel:0953095196"><Phone size={15} /> 095-309-5196</a>
          <a href="mailto:mon-attention@hotmail.com"><Mail size={15} /> mon-attention@hotmail.com</a>
          <span><MessageCircle size={15} /> LINE: Monarrattana</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Solar ACM Systems Corporation</span>
        <span>{isTh ? "Clean energy consultancy in Thailand" : "Clean energy consultancy in Thailand"}</span>
      </div>
    </footer>
  );
}

function FloatingSupport() {
  return (
    <a className="float-chat" href="https://line.me/R/ti/p/~Monarrattana" target="_blank" rel="noreferrer" aria-label="LINE chat">
      <MessageCircle size={24} />
    </a>
  );
}

export default function SolarACM() {
  const [lang, setLang] = useState("th");

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #F7FAF7; color: ${C.ink}; }
        a { color: inherit; }
        .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
        .nav { position: sticky; top: 0; z-index: 50; background: rgba(14,27,19,0.92); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,0.08); transition: box-shadow .25s ease, background .25s ease; }
        .nav--scrolled { background: rgba(14,27,19,0.97); box-shadow: 0 18px 48px rgba(0,0,0,.14); }
        .nav__inner { height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: white; }
        .brand img { width: 48px; height: 48px; object-fit: contain; background: white; border-radius: 4px; }
        .brand strong { display: block; font-size: 21px; line-height: 1; }
        .brand span { display: block; margin-top: 4px; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; opacity: .7; font-weight: 700; }
        .nav__links { display: flex; align-items: center; gap: 28px; margin-left: auto; }
        .nav__links a { color: rgba(255,255,255,.76); text-decoration: none; font-size: 14px; font-weight: 700; transition: color .2s; }
        .nav__links a:hover { color: white; }
        .nav__actions { display: flex; align-items: center; gap: 12px; }
        .lang, .menu { border: 1px solid rgba(255,255,255,.16); background: transparent; color: white; border-radius: 999px; height: 42px; padding: 0 14px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-weight: 800; }
        .menu { display: none; width: 42px; justify-content: center; padding: 0; border-radius: 12px; }
        .mobile-menu { display: none; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; padding: 12px 18px; font-size: 14px; font-weight: 800; text-decoration: none; border: 1px solid transparent; transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .btn:hover { transform: translateY(-1px); }
        .btn--large { padding: 15px 22px; font-size: 15px; }
        .btn--primary { background: linear-gradient(135deg, ${C.green}, ${C.green2}); color: white; box-shadow: 0 14px 28px rgba(45,125,70,.24); }
        .btn--ghost { background: rgba(255,255,255,.78); border-color: ${C.line}; color: ${C.ink}; }
        .btn--dark { background: ${C.ink}; color: white; }
        .hero { min-height: calc(100vh - 82px); display: flex; align-items: center; padding: 86px 0 76px; background:
          radial-gradient(circle at 78% 24%, rgba(76,175,114,.25), transparent 28%),
          linear-gradient(180deg, #F8FBF8 0%, #EEF5F0 100%); overflow: hidden; }
        .hero__grid { display: grid; grid-template-columns: 1.04fr .96fr; gap: 64px; align-items: center; }
        .eyebrow, .kicker { display: inline-flex; align-items: center; gap: 8px; color: ${C.green}; font-size: 12px; font-weight: 900; letter-spacing: .13em; text-transform: uppercase; }
        h1, h2, h3, p { margin-top: 0; }
        h1 { font-size: clamp(42px, 6vw, 76px); line-height: .98; letter-spacing: -0.04em; margin: 18px 0 22px; max-width: 820px; }
        .hero__copy > p { font-size: 19px; line-height: 1.75; color: ${C.muted}; max-width: 680px; margin-bottom: 30px; }
        .hero__actions { display: flex; flex-wrap: wrap; gap: 14px; }
        .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 38px; max-width: 620px; }
        .metrics div { padding: 20px; border: 1px solid ${C.line}; border-radius: 16px; background: rgba(255,255,255,.65); }
        .metrics strong { display: block; font-size: 25px; letter-spacing: -0.02em; }
        .metrics span { color: ${C.muted}; font-size: 13px; }
        .hero-card { position: relative; min-height: 600px; border-radius: 28px; background: linear-gradient(145deg, #11251A, #0B1510); box-shadow: 0 34px 80px rgba(13,32,20,.32); border: 1px solid rgba(255,255,255,.12); padding: 26px; color: white; overflow: hidden; }
        .hero-card:before { content: ""; position: absolute; inset: -20%; background: radial-gradient(circle at center, rgba(76,175,114,.34), transparent 28%); animation: pulseGlow 5s ease-in-out infinite; }
        .hero-card__top { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; color: rgba(255,255,255,.72); font-size: 13px; font-weight: 800; }
        .status { color: #BFF4D0; background: rgba(76,175,114,.16); border: 1px solid rgba(76,175,114,.3); border-radius: 999px; padding: 8px 12px; }
        .energy-orbit { position: relative; z-index: 1; height: 330px; display: grid; place-items: center; }
        .sun-core { width: 132px; height: 132px; border-radius: 50%; background: linear-gradient(135deg, ${C.orange}, ${C.orange2}); display: grid; place-items: center; box-shadow: 0 0 70px rgba(232,99,10,.5); }
        .orbit { position: absolute; border: 1px solid rgba(255,255,255,.16); border-radius: 50%; animation: spin 18s linear infinite; }
        .orbit-1 { width: 230px; height: 230px; }
        .orbit-2 { width: 315px; height: 315px; animation-duration: 28s; }
        .dashboard-grid { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .dashboard-grid div { padding: 18px; border-radius: 16px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); }
        .dashboard-grid span { display: block; color: rgba(255,255,255,.58); font-size: 12px; margin-bottom: 8px; }
        .dashboard-grid strong { font-size: 22px; }
        .section { padding: 104px 0; }
        .section-head { max-width: 680px; }
        .section-head.center { margin: 0 auto 44px; text-align: center; }
        .section-head h2 { font-size: clamp(32px, 4vw, 52px); line-height: 1.05; letter-spacing: -0.035em; margin: 12px 0 18px; }
        .section-head p { color: ${C.muted}; font-size: 17px; line-height: 1.8; }
        .two-col, .roi__grid, .knowledge__grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 54px; align-items: center; }
        .pain { background: white; }
        .pain-list { display: grid; gap: 16px; }
        .pain-card, .article, .process-card, .why-card, .solution-card, .case-card, .roi-panel { background: white; border: 1px solid ${C.line}; border-radius: 18px; box-shadow: 0 12px 38px rgba(16,32,23,.06); }
        .pain-card { display: flex; gap: 18px; padding: 24px; }
        .pain-card > span { color: ${C.orange}; font-weight: 900; }
        .pain-card h3, .solution-card h3, .why-card h3, .case-card h3, .article h3, .process-card h3 { margin-bottom: 8px; font-size: 19px; }
        .pain-card p, .solution-card p, .why-card p, .case-card p, .article p, .process-card p { margin: 0; color: ${C.muted}; line-height: 1.7; font-size: 14px; }
        .solution-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .solution-card { padding: 24px; text-decoration: none; min-height: 270px; display: flex; flex-direction: column; transition: transform .2s ease, box-shadow .2s ease; }
        .solution-card:hover, .case-card:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(16,32,23,.11); }
        .icon-box { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; color: ${C.green}; background: ${C.soft}; margin-bottom: 26px; }
        .solution-card span { margin-top: auto; display: inline-flex; align-items: center; gap: 4px; color: ${C.green}; font-weight: 900; font-size: 13px; }
        .roi { background: linear-gradient(180deg, #0E1B13, #13251A); color: white; }
        .roi .section-head p, .roi-points span { color: rgba(255,255,255,.68); }
        .roi .section-head h2 { color: white; }
        .roi-points { display: grid; gap: 14px; margin: 26px 0; }
        .roi-points div { display: flex; align-items: center; gap: 10px; color: #BFF4D0; }
        .roi-panel { padding: 28px; background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.12); color: white; }
        .roi-panel__header { display: flex; gap: 10px; align-items: center; font-weight: 900; margin-bottom: 20px; }
        .roi-row { display: flex; justify-content: space-between; gap: 20px; padding: 17px 0; border-bottom: 1px solid rgba(255,255,255,.1); }
        .roi-row span { color: rgba(255,255,255,.62); }
        .roi-row strong { font-size: 22px; }
        .mini-chart { height: 170px; display: flex; align-items: end; gap: 12px; margin-top: 28px; padding-top: 20px; }
        .mini-chart span { flex: 1; border-radius: 12px 12px 0 0; background: linear-gradient(180deg, ${C.green2}, ${C.green}); min-height: 30px; }
        .why { background: white; }
        .why-grid, .case-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .why-card { padding: 28px; }
        .why-card svg { color: ${C.green}; margin-bottom: 28px; }
        .section-row { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 34px; }
        .text-link { display: inline-flex; align-items: center; gap: 8px; color: ${C.green}; font-weight: 900; text-decoration: none; white-space: nowrap; }
        .case-card { overflow: hidden; text-decoration: none; }
        .case-card > div:last-child { padding: 22px; }
        .case-visual { min-height: 210px; padding: 18px; display: flex; align-items: end; background: linear-gradient(135deg, #DCEBE1, #FFFFFF); }
        .case-visual span { background: rgba(255,255,255,.78); border: 1px solid ${C.line}; border-radius: 999px; padding: 8px 12px; font-size: 12px; font-weight: 900; }
        .visual-1 { background: linear-gradient(135deg, #E8F5EE, #FFF0E6); }
        .visual-2 { background: linear-gradient(135deg, #DDE8DF, #C7D8CD); }
        .visual-3 { background: linear-gradient(135deg, #E7F1EA, #DFE5F0); }
        .knowledge { background: #F4F8F5; }
        .article-list { display: grid; gap: 14px; }
        .article { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 22px; }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .process-card { padding: 24px; min-height: 210px; }
        .process-card > span { display: inline-block; color: ${C.orange}; font-weight: 900; margin-bottom: 48px; }
        .partners { background: white; }
        .partner-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
        .partner-card { height: 96px; display: grid; place-items: center; border-radius: 16px; border: 1px solid ${C.line}; background: #FBFCFB; color: ${C.ink}; font-size: 17px; font-weight: 900; letter-spacing: -0.02em; }
        .final-cta { padding: 96px 0; background: #F4F8F5; }
        .final-cta__box { display: flex; justify-content: space-between; align-items: center; gap: 34px; border-radius: 28px; padding: 46px; background: linear-gradient(135deg, #102017, #183624); color: white; box-shadow: 0 30px 70px rgba(16,32,23,.22); }
        .final-cta h2 { font-size: clamp(32px, 4vw, 52px); line-height: 1.06; letter-spacing: -0.035em; margin: 10px 0 12px; max-width: 720px; }
        .final-cta p { color: rgba(255,255,255,.68); max-width: 680px; line-height: 1.75; margin-bottom: 0; }
        .final-cta__actions { display: grid; gap: 12px; min-width: 240px; }
        .footer { background: #0B1510; color: white; padding: 70px 0 28px; }
        .footer__grid { display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: 38px; }
        .footer p { color: rgba(255,255,255,.62); line-height: 1.75; max-width: 420px; }
        .footer h4 { margin: 0 0 16px; font-size: 14px; color: white; }
        .footer a, .footer span { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.62); text-decoration: none; margin-bottom: 11px; font-size: 14px; }
        .footer a:hover { color: white; }
        .footer__bottom { border-top: 1px solid rgba(255,255,255,.08); margin-top: 42px; padding-top: 22px; display: flex; justify-content: space-between; gap: 16px; color: rgba(255,255,255,.44); font-size: 12px; }
        .float-chat { position: fixed; right: 28px; bottom: 28px; z-index: 40; width: 60px; height: 60px; display: grid; place-items: center; background: ${C.green}; color: white; border-radius: 50%; box-shadow: 0 18px 40px rgba(45,125,70,.3); }
        .reveal { animation: fadeUp .7s ease both; }
        .delay-1 { animation-delay: .12s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseGlow { 0%, 100% { opacity: .65; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
        @media (max-width: 980px) {
          .nav__links, .nav__quote { display: none; }
          .menu { display: inline-flex; }
          .mobile-menu { display: grid; gap: 6px; padding: 0 20px 20px; background: rgba(14,27,19,.98); }
          .mobile-menu a { color: white; text-decoration: none; padding: 14px 0; font-weight: 800; border-top: 1px solid rgba(255,255,255,.08); }
          .hero__grid, .two-col, .roi__grid, .knowledge__grid { grid-template-columns: 1fr; }
          .hero { padding-top: 54px; min-height: auto; }
          .hero-card { min-height: 470px; }
          .solution-grid, .process-grid, .footer__grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid, .case-grid { grid-template-columns: 1fr; }
          .partner-grid { grid-template-columns: repeat(3, 1fr); }
          .final-cta__box { align-items: flex-start; flex-direction: column; }
        }
        @media (max-width: 640px) {
          .container { width: min(100% - 28px, 1180px); }
          .nav__inner { height: 74px; }
          .brand img { width: 42px; height: 42px; }
          .brand strong { font-size: 17px; }
          .brand span { font-size: 9px; }
          .lang { height: 38px; padding: 0 10px; }
          h1 { font-size: 39px; letter-spacing: -0.03em; }
          .hero__copy > p { font-size: 16px; }
          .hero__actions, .metrics, .dashboard-grid, .solution-grid, .process-grid, .partner-grid, .footer__grid { grid-template-columns: 1fr; }
          .hero__actions .btn, .final-cta__actions, .final-cta__actions .btn { width: 100%; }
          .metrics { display: grid; }
          .section { padding: 72px 0; }
          .section-head h2, .final-cta h2 { font-size: 32px; }
          .hero-card { min-height: 430px; padding: 18px; border-radius: 22px; }
          .energy-orbit { height: 250px; }
          .orbit-2 { width: 250px; height: 250px; }
          .orbit-1 { width: 190px; height: 190px; }
          .sun-core { width: 106px; height: 106px; }
          .section-row, .footer__bottom { align-items: flex-start; flex-direction: column; }
          .final-cta__box { padding: 28px; border-radius: 22px; }
        }
      `}</style>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <PainPoint lang={lang} />
        <Solutions lang={lang} />
        <RoiSection lang={lang} />
        <WhyChoose lang={lang} />
        <CaseStudies lang={lang} />
        <KnowledgeCenter lang={lang} />
        <Process lang={lang} />
        <Partners lang={lang} />
        <FinalCta lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingSupport />
    </>
  );
}
