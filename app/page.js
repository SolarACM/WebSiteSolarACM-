"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Battery,
  Building2,
  Check,
  ClipboardCheck,
  Factory,
  Home,
  Network,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import { PageShell } from "./_components/site-shell";

const copy = {
  th: {
    eyebrow: "ที่ปรึกษาโครงการพลังงานสะอาด",
    title: "วางระบบพลังงานให้คุ้มค่า ตั้งแต่โจทย์แรกจนถึงการใช้งานจริง",
    intro: "Solar ACM ช่วยวิเคราะห์ความต้องการ วางแนวทางระบบ และประสานเครือข่ายผู้เชี่ยวชาญ เพื่อให้บ้าน ธุรกิจ และโรงงานตัดสินใจเรื่องพลังงานได้ชัดเจนขึ้น",
    primary: "ขอคำปรึกษาโครงการ",
    secondary: "ดูผลงาน",
    heroLabel: "โครงการโซลาร์ภาคอุตสาหกรรม",
    heroNote: "ภาพจากข้อมูลผลงานที่ได้รับจากเครือข่ายโครงการ",
    segmentKicker: "ใครที่เราดูแล",
    segmentTitle: "โจทย์พลังงานต่างกัน ต้องเริ่มจากคำถามที่ต่างกัน",
    segmentDesc: "เราแยกแนวทางตามพฤติกรรมการใช้ไฟ ขนาดพื้นที่ และเป้าหมายของแต่ละโครงการ ไม่ใช้คำตอบสำเร็จรูปเดียวกับทุกคน",
    processKicker: "แนวทางการทำงาน",
    processTitle: "Solar ACM ทำหน้าที่เชื่อมข้อมูล คน และการตัดสินใจ",
    productKicker: "ผลิตภัณฑ์และโซลูชันเพิ่มเติม",
    productTitle: "ดูแลระบบโซลาร์และความปลอดภัยของพื้นที่ใช้งาน",
    productDesc: "นอกจากโครงการพลังงาน เรายังให้ข้อมูลและประสานงานผลิตภัณฑ์ที่เกี่ยวข้องกับการดูแลแผงและการเตรียมพร้อมรับเหตุอัคคีภัย",
    portfolioKicker: "Selected portfolio",
    portfolioTitle: "ภาพหน้างานจริงจากโครงการในประเทศไทย",
    portfolioDesc: "ดูขนาดระบบ จังหวัด และรายละเอียดที่ได้รับการยืนยัน โดยไม่เปิดเผยข้อมูลลูกค้าที่เป็นความลับ",
    partnersKicker: "Technology ecosystem",
    partnersTitle: "เลือกเทคโนโลยีจากความเหมาะสมของโครงการ",
    ctaTitle: "เริ่มจากบิลค่าไฟหนึ่งใบ แล้วค่อยตัดสินใจด้วยข้อมูล",
    ctaDesc: "ส่งข้อมูลเบื้องต้นให้ทีมที่ปรึกษา เราจะติดต่อกลับเพื่อทำความเข้าใจโจทย์ก่อนเสนอแนวทาง",
  },
  en: {
    eyebrow: "Clean-energy project consultancy",
    title: "Plan energy systems for real value, from the first question to operation",
    intro: "Solar ACM helps assess requirements, shape system direction, and coordinate specialist partners so homes, businesses, and factories can make clearer energy decisions.",
    primary: "Discuss your project",
    secondary: "View portfolio",
    heroLabel: "Industrial solar project",
    heroNote: "Image provided through the project network",
    segmentKicker: "Who we support",
    segmentTitle: "Different energy goals require different starting questions",
    segmentDesc: "We shape each approach around load profile, site constraints, and project goals instead of applying one standard answer to every site.",
    processKicker: "How we work",
    processTitle: "Solar ACM connects information, specialists, and decisions",
    productKicker: "Additional products & solutions",
    productTitle: "Support solar operations and site safety",
    productDesc: "Beyond energy projects, we provide product information and coordination for panel care and early-stage fire preparedness.",
    portfolioKicker: "Selected portfolio",
    portfolioTitle: "Real project imagery from sites in Thailand",
    portfolioDesc: "Review verified system size, location, and project details while protecting confidential client information.",
    partnersKicker: "Technology ecosystem",
    partnersTitle: "Technology selected by project fit",
    ctaTitle: "Start with one electricity bill, then decide with better information",
    ctaDesc: "Send us the basics. Our consultants will contact you to understand the project before recommending a direction.",
  },
};

const segments = [
  { icon: Home, href: "/residential", th: ["บ้านพักอาศัย", "ประเมินจากค่าไฟ พฤติกรรมการใช้ไฟ และข้อจำกัดของพื้นที่บ้าน"], en: ["Residential", "Assess bills, usage behavior, and site constraints before sizing a system."] },
  { icon: Building2, href: "/industrial", th: ["ธุรกิจและโรงงาน", "วางแนวทางให้เหมาะกับโหลดกลางวัน งบลงทุน และแผนการดำเนินงาน"], en: ["Business & industry", "Align daytime load, investment plan, and operating requirements."] },
  { icon: Factory, href: "/epc", th: ["โครงการขนาดใหญ่", "ประสานทีม EPC และอุปกรณ์ตามขนาดงาน พื้นที่ และมาตรฐานที่ต้องการ"], en: ["Large projects", "Coordinate EPC teams and equipment around scale, site, and required standards."] },
  { icon: Battery, href: "/bess", th: ["ระบบกักเก็บพลังงาน", "ศึกษาความเหมาะสมของแบตเตอรี่จากรูปแบบการใช้ไฟและเป้าหมายของระบบ"], en: ["Energy storage", "Assess battery suitability from usage patterns and system objectives."] },
];

const process = [
  { icon: ClipboardCheck, th: ["01 · ทำความเข้าใจโจทย์", "อ่านบิลค่าไฟ ลักษณะการใช้ไฟ และเป้าหมายของโครงการ"], en: ["01 · Understand", "Review the bill, usage pattern, and project objectives."] },
  { icon: Sun, th: ["02 · วางแนวทางระบบ", "เปรียบเทียบขนาดระบบ รูปแบบ On-Grid, Hybrid หรือ BESS ตามข้อมูลที่มี"], en: ["02 · Define direction", "Compare system size and On-Grid, Hybrid, or BESS options."] },
  { icon: Network, th: ["03 · ประสานผู้เชี่ยวชาญ", "คัดและประสานเครือข่าย EPC หรือผู้เชี่ยวชาญที่เหมาะกับงาน"], en: ["03 · Coordinate", "Match the project with relevant EPC and specialist partners."] },
  { icon: Wrench, th: ["04 · ติดตามจนส่งมอบ", "ช่วยประสานข้อมูล ขอบเขตงาน และการสื่อสารตลอดโครงการ"], en: ["04 · Follow through", "Coordinate information, scope, and communication through delivery."] },
];

const partners = [
  ["Huawei", "/partners/huawei.svg"],
  ["LONGi", "/partners/longi.svg"],
  ["Deye", "/partners/deye.svg"],
  ["Sungrow", "/partners/sungrow.svg"],
  ["BYD", "/partners/byd.svg"],
];

export default function HomePage() {
  const [lang, setLang] = useState("th");
  const t = copy[lang];
  const isTh = lang === "th";

  return (
    <PageShell lang={lang} setLang={setLang}>
      <style>{`
        .home-hero { background: var(--cream); padding: 84px 0 72px; }
        .home-hero__grid { display:grid; grid-template-columns:1.03fr .97fr; gap:64px; align-items:center; }
        .home-hero__grid > * { min-width:0; }
        .home-hero h1 { margin:0; max-width:800px; font-size:clamp(2.7rem,5.6vw,5.2rem); line-height:1.06; font-weight:700; letter-spacing:0; }
        .home-hero__intro { max-width:700px; margin:25px 0 31px; color:var(--muted); font-size:1.12rem; }
        .home-hero__actions { display:flex; flex-wrap:wrap; gap:12px; }
        .home-hero__media { position:relative; min-height:590px; overflow:hidden; border-radius:8px; background:#d9e3dc; box-shadow:var(--shadow); }
        .home-hero__media img { width:100%; height:590px; object-fit:cover; }
        .home-hero__media:after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 50%,rgba(8,29,21,.62)); }
        .home-hero__caption { position:absolute; z-index:2; left:24px; right:24px; bottom:24px; color:white; }
        .home-hero__caption strong { display:block; font-size:1.05rem; }
        .home-hero__caption span { color:rgba(255,255,255,.72); font-size:13px; }
        .role-note { margin-top:30px; padding:17px 18px; border-left:3px solid var(--orange); background:rgba(255,255,255,.7); color:#44544c; font-size:14px; }
        .process-grid { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid rgba(255,255,255,.16); }
        .process-item { padding:34px 28px 12px 0; }
        .process-item + .process-item { padding-left:28px; border-left:1px solid rgba(255,255,255,.16); }
        .process-item svg { margin-bottom:40px; color:#8cd4a7; }
        .process-item h3 { margin:0 0 10px; font-size:1.08rem; }
        .process-item p { margin:0; color:rgba(255,255,255,.62); font-size:14px; }
        .product-feature-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        .product-feature { position:relative; min-height:520px; overflow:hidden; border-radius:8px; background:#e3ebe5; text-decoration:none; }
        .product-feature img { width:100%; height:520px; object-fit:cover; transition:transform .35s ease; }
        .product-feature:hover img { transform:scale(1.025); }
        .product-feature:after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 35%,rgba(7,27,19,.86)); }
        .product-feature__copy { position:absolute; z-index:2; left:28px; right:28px; bottom:28px; color:white; }
        .product-feature__copy span { display:inline-block; margin-bottom:8px; color:#b6e7c7; font-family:var(--font-display); font-size:12px; font-weight:700; text-transform:uppercase; }
        .product-feature__copy h3 { margin:0 0 8px; font-size:1.65rem; }
        .product-feature__copy p { max-width:520px; margin:0 0 18px; color:rgba(255,255,255,.72); }
        .project-grid { display:grid; grid-template-columns:1.25fr .75fr .75fr; gap:18px; }
        .project-card { position:relative; min-height:380px; overflow:hidden; border-radius:7px; color:white; text-decoration:none; }
        .project-card img { width:100%; height:100%; min-height:380px; object-fit:cover; }
        .project-card:after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 35%,rgba(5,25,17,.82)); }
        .project-card__copy { position:absolute; z-index:2; left:22px; right:22px; bottom:20px; }
        .project-card__copy span { font-size:12px; color:#b8e7c8; }
        .project-card__copy h3 { margin:5px 0 0; font-size:1.12rem; }
        .partner-row { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-top:40px; }
        .partner-logo { height:104px; display:grid; place-items:center; padding:24px; border:1px solid var(--line); background:white; }
        .partner-logo img { max-width:110px; max-height:44px; object-fit:contain; }
        @media(max-width:1050px){ .home-hero__grid{grid-template-columns:1fr;} .home-hero__media{min-height:480px;} .home-hero__media img{height:480px;} .process-grid{grid-template-columns:1fr 1fr;} .process-item:nth-child(3){border-left:0;} .project-grid{grid-template-columns:1fr 1fr;} .project-card:first-child{grid-column:1/-1;} }
        @media(max-width:760px){ .home-hero{padding:62px 0;} .home-hero h1{font-size:clamp(2.35rem,12vw,3.45rem);} .home-hero__actions .site-btn{width:100%;} .home-hero__media,.home-hero__media img{height:360px;min-height:360px;} .process-grid,.product-feature-grid,.project-grid,.partner-row{grid-template-columns:1fr;} .process-item,.process-item+.process-item{padding:26px 0;border-left:0;border-bottom:1px solid rgba(255,255,255,.16);} .product-feature,.product-feature img{min-height:430px;height:430px;} .project-card:first-child{grid-column:auto;} .partner-row{grid-template-columns:1fr 1fr;} }
      `}</style>

      <section className="home-hero">
        <div className="site-container home-hero__grid">
          <div>
            <span className="site-kicker"><Sparkles size={14} />{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p className="home-hero__intro">{t.intro}</p>
            <div className="home-hero__actions">
              <Link href="/quote" className="site-btn site-btn--orange">{t.primary}<ArrowRight size={17} /></Link>
              <Link href="/portfolio" className="site-btn site-btn--outline-dark">{t.secondary}</Link>
            </div>
            <div className="role-note">{isTh
              ? "บทบาทของเรา: ที่ปรึกษาและผู้ประสานโครงการ ช่วยคัดเลือกแนวทางและเครือข่ายผู้ดำเนินงานให้เหมาะกับแต่ละไซต์"
              : "Our role: project consultant and coordinator, helping select suitable approaches and delivery partners for each site."}</div>
          </div>
          <div className="home-hero__media">
            <img src="/portfolio/project-08.jpg" alt={isTh ? "ระบบโซลาร์บนหลังคาโรงงาน" : "Industrial rooftop solar system"} />
            <div className="home-hero__caption"><strong>{t.heroLabel}</strong><span>{t.heroNote}</span></div>
          </div>
        </div>
      </section>

      <section className="site-section" id="solutions">
        <div className="site-container">
          <div className="section-head">
            <div className="section-head__copy"><span className="site-kicker">{t.segmentKicker}</span><h2 className="site-title">{t.segmentTitle}</h2><p className="site-lead">{t.segmentDesc}</p></div>
          </div>
          <div className="grid-4">
            {segments.map(({ icon: Icon, href, th, en }) => {
              const [title, desc] = isTh ? th : en;
              return <article className="flat-card" key={href}><div className="flat-card__icon"><Icon size={21} /></div><h3>{title}</h3><p>{desc}</p><Link href={href} className="flat-card__link">{isTh ? "ดูแนวทาง" : "Explore"}<ArrowRight size={15} /></Link></article>;
            })}
          </div>
        </div>
      </section>

      <section className="site-section site-section--green">
        <div className="site-container">
          <div className="section-head"><div className="section-head__copy"><span className="site-kicker">{t.processKicker}</span><h2 className="site-title">{t.processTitle}</h2></div></div>
          <div className="process-grid">
            {process.map(({ icon: Icon, th, en }) => { const [title, desc] = isTh ? th : en; return <div className="process-item" key={title}><Icon size={25} /><h3>{title}</h3><p>{desc}</p></div>; })}
          </div>
        </div>
      </section>

      <section className="site-section site-section--soft">
        <div className="site-container">
          <div className="section-head"><div className="section-head__copy"><span className="site-kicker">{t.productKicker}</span><h2 className="site-title">{t.productTitle}</h2><p className="site-lead">{t.productDesc}</p></div><Link href="/products" className="site-btn site-btn--outline-dark">{isTh ? "ดูผลิตภัณฑ์ทั้งหมด" : "View all products"}<ArrowRight size={16} /></Link></div>
          <div className="product-feature-grid">
            <Link className="product-feature" href="/products#kolchar"><img src="/products/kolchar-gf-series.jpg" alt={isTh ? "หุ่นยนต์ Kolchar ทำความสะอาดแผงโซลาร์" : "Kolchar solar panel cleaning robots"} /><div className="product-feature__copy"><span>Kolchar GF-Series</span><h3>{isTh ? "หุ่นยนต์ทำความสะอาดแผงแบบไร้น้ำ" : "Waterless solar panel cleaning robots"}</h3><p>{isTh ? "ออกแบบสำหรับงานทำความสะอาดแผงในโครงการขนาดใหญ่ พร้อมระบบติดตามและจัดการระยะไกล" : "Built for routine panel cleaning at large sites, with remote monitoring and management."}</p><strong>{isTh ? "ดูรายละเอียด →" : "Explore →"}</strong></div></Link>
            <Link className="product-feature" href="/products#firesave"><img src="/products/firesave-fire.jpg" alt={isTh ? "ผลิตภัณฑ์ระงับอัคคีภัย FIRESAVE" : "FIRESAVE fire suppression products"} /><div className="product-feature__copy"><span>FIRESAVE</span><h3>{isTh ? "อุปกรณ์ระงับเหตุเพลิงระยะเริ่มต้น" : "Early-stage fire suppression products"}</h3><p>{isTh ? "แคปซูล สเปรย์ และซองดับเพลิง พร้อมข้อมูลการใช้งานและเอกสารผลทดสอบประกอบ" : "Throwing capsules, spray, and cooking-oil fire pouches with usage and test documentation."}</p><strong>{isTh ? "ดูรายละเอียด →" : "Explore →"}</strong></div></Link>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="section-head"><div className="section-head__copy"><span className="site-kicker">{t.portfolioKicker}</span><h2 className="site-title">{t.portfolioTitle}</h2><p className="site-lead">{t.portfolioDesc}</p></div><Link href="/portfolio" className="site-btn site-btn--outline-dark">{isTh ? "ดูผลงานทั้งหมด" : "View portfolio"}<ArrowRight size={16} /></Link></div>
          <div className="project-grid">
            {[["/portfolio/project-03.jpg", "928.8 kWp", "สมุทรปราการ"],["/portfolio/project-08.jpg", "959.2 kWp", "ระยอง"],["/portfolio/project-10.jpg", "973 kWp", "นครปฐม"]].map(([image,title,location]) => <Link className="project-card" href="/portfolio" key={image}><img src={image} alt={`${title} ${location}`} /><div className="project-card__copy"><span>{location}</span><h3>{title} · {isTh ? "ระบบโซลาร์รูฟท็อป" : "Rooftop solar"}</h3></div></Link>)}
          </div>
        </div>
      </section>

      <section className="site-section site-section--soft">
        <div className="site-container">
          <span className="site-kicker">{t.partnersKicker}</span><h2 className="site-title">{t.partnersTitle}</h2>
          <div className="partner-row">{partners.map(([name,image]) => <div className="partner-logo" key={name}><img src={image} alt={`${name} logo`} /></div>)}</div>
        </div>
      </section>

      <section className="cta-band"><div className="site-container cta-band__inner"><div><h2>{t.ctaTitle}</h2><p>{t.ctaDesc}</p></div><div className="cta-band__actions"><Link href="/quote" className="site-btn site-btn--orange">{isTh ? "ขอคำปรึกษา" : "Request consultation"}<ArrowRight size={17} /></Link><Link href="/contact" className="site-btn site-btn--outline">{isTh ? "ติดต่อเรา" : "Contact us"}</Link></div></div></section>
    </PageShell>
  );
}
