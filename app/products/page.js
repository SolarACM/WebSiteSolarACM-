"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Download, ExternalLink, ShieldAlert } from "lucide-react";
import { PageShell, VisualHero } from "../_components/site-shell";
import { fireProducts, fireShopDetails } from "./firesave-data";
import "./products.css";

const filters = [
  ["all", "ทั้งหมด", "All"],
  ["portable", "แบบพกพา", "Portable"],
  ["cylinder", "ถังดับเพลิง", "Cylinders"],
  ["specialist", "หัวเชื้อและงานเฉพาะ", "Specialist agents"],
  ["accessory", "อุปกรณ์เสริม", "Accessories"],
];

const content = {
  th: {
    hero: "เทคโนโลยีดูแลโซลาร์และอุปกรณ์ความปลอดภัย",
    intro: "เลือกผลิตภัณฑ์จากลักษณะพื้นที่และการใช้งานจริง พร้อมข้อมูลรายรุ่นที่ตรวจสอบจากเอกสารที่ได้รับ",
    kolchar: "Kolchar GF-Series",
    kolcharTitle: "ทำความสะอาดแผงแบบไร้น้ำ สำหรับไซต์ที่ต้องดูแลอย่างต่อเนื่อง",
    kolcharLead: "หุ่นยนต์ Kolchar จาก Solar ACM Systems Corporation ประเทศแคนาดา ใช้แปรงและระบบขับเคลื่อนอัตโนมัติ ประเมินการติดตั้งตามขนาดแผง ระยะระหว่างแถว และสภาพหน้างาน",
    kolcharPoints: ["เหมาะสำหรับโรงงานและ Solar Farm ที่มีแผงจำนวนมาก", "ใช้พลังงานจากแผงที่ติดตั้งบนตัวหุ่นยนต์ และทำความสะอาดโดยไม่ใช้น้ำ", "ติดตามสถานะและแจ้งเตือนผ่านระบบจัดการระยะไกล", "ต้องตรวจความเข้ากันได้กับแผง การยึดติด ทางเดิน และโครงสร้างก่อนเลือกขนาดรุ่น"],
    kolcharDemo: "ชมการทำงานของ Kolchar",
    kolcharDemoKicker: "การทำงานจริง",
    kolcharDemoText: "คลิปแสดงการเคลื่อนที่และแปรงทำความสะอาดบนแถวแผงจริง เพื่อช่วยประเมินรูปแบบการใช้งานก่อนสำรวจพื้นที่",
    kolcharSpecs: "ข้อมูลรุ่นจากเอกสาร",
    kolcharNote: "ความเร็ว 8–15 เมตร/นาทีระบุในโปรไฟล์ Solar ACM; ความเร็วจริงขึ้นกับรุ่นและสภาพพื้นที่ ต้องยืนยันในข้อเสนอรายโครงการ",
    consultKolchar: "ขอประเมินพื้นที่ / สาธิต",
    brochure: "ดาวน์โหลดโบรชัวร์",
    fireIntro: "FIRESAVE สำหรับแผนรับมือเหตุเพลิงระยะเริ่มต้น",
    fireLead: "มีทั้งอุปกรณ์พกพา ถังน้ำยา หัวเชื้อ และอุปกรณ์เสริม แต่ละรุ่นมีขอบเขตการใช้งานและข้อควรระวังต่างกัน ควรให้ผู้รับผิดชอบความปลอดภัยประเมินร่วมด้วย",
    demoTitle: "ชมการสาธิตผลิตภัณฑ์",
    demoKicker: "วิดีโอสาธิต FIRESAVE",
    demoLead: "คลิปช่วยให้เห็นรูปแบบการใช้งานจริง เป็นการสาธิต ไม่ใช่การรับรองผลในทุกสถานการณ์",
    capsuleDemo: "การสาธิตแคปซูล FS-TH",
    sprayDemo: "การสาธิตสเปรย์ FS-S500 PLUS+",
    capsuleDemoText: "แสดงการขว้างแคปซูลให้ภาชนะแตกเพื่อกระจายสารที่ต้นเพลิง",
    sprayDemoText: "แสดงการปลดสลักและฉีดพ่นไปยังต้นเพลิงระยะเริ่มต้น",
    catalogue: "เลือกผลิตภัณฑ์ตามหน้างาน",
    catalogueKicker: "FIRESAVE ทั้ง 10 รายการ",
    catalogueLead: "ดูสถานการณ์ที่เหมาะสม ความต่าง สเปก และข้อควรระวังของแต่ละรุ่น",
    use: "เหมาะกับ", difference: "จุดต่าง", specs: "ข้อมูลรุ่น", caution: "ข้อควรระวัง",
    ask: "สอบถามสินค้า",
    guide: "เลือกอย่างไรให้เหมาะกับความเสี่ยง",
    guideKicker: "แนวทางเลือกผลิตภัณฑ์",
    guideCards: [["พื้นที่ทั่วไป", "เริ่มจากชนิดเพลิงและตำแหน่งเสี่ยง แคปซูลกับสเปรย์เป็นอุปกรณ์เสริมที่ใช้ต่างวิธีกัน"], ["ครัวและน้ำมัน", "FS-CO ใช้กับน้ำมันประกอบอาหารตามปริมาตรที่ผู้ผลิตกำหนด ห้ามใช้น้ำกับเพลิงน้ำมัน"], ["โรงงานและทีมปฏิบัติการ", "ถังและหัวเชื้อต้องเลือกตามประเภทเพลิง อุปกรณ์จ่ายสาร อัตราผสม และแผนความปลอดภัย"]],
    docs: "เอกสารและหลักฐานประกอบ",
    docsKicker: "เอกสารประกอบ",
    docsLead: "ข้อมูลสรุปจากเอกสารที่ได้รับ ไม่แทนใบรับรองฉบับเต็มหรือการประเมินของผู้เชี่ยวชาญ และไม่ย้ายผลทดสอบของรุ่นหนึ่งไปอ้างกับรุ่นอื่น",
    evidence: [["เอกสารผู้ผลิตและตัวแทน", "ใช้ระบุขนาด อายุการใช้งาน และเงื่อนไขเก็บรักษาของสินค้าแต่ละรุ่น"], ["ISO ของโรงงานในเอกสาร", "มีเอกสาร ISO 9001:2015, 14001:2015 และ 45001:2018 ของโรงงานที่ระบุ ไม่ใช่ใบรับรองของทุกผลิตภัณฑ์"], ["รายงานทดสอบเฉพาะรุ่น", "เอกสาร SGS, JFRL และผลทดสอบเพลิงมีขอบเขตตามตัวอย่างและรุ่นที่ระบุในรายงาน"]],
    safety: "สำหรับแผง PV อินเวอร์เตอร์ ตู้ไฟที่ยังมีกระแส และแบตเตอรี่ลิเทียม ต้องยืนยันความเหมาะสมกับผู้ผลิตและผู้เชี่ยวชาญก่อน เอกสารที่ตรวจยังไม่รองรับการกล่าวว่า FIRESAVE ทุกรุ่นใช้ได้กับทุกความเสี่ยงของระบบโซลาร์",
    finalTitle: "ต้องการสเปก ใบเสนอราคา หรือการสาธิต?",
    finalLead: "แจ้งรุ่นที่สนใจและลักษณะพื้นที่ ทีมงานจะประสานเอกสารและแนวทางที่เหมาะสม",
    contact: "ติดต่อทีมงาน",
  },
  en: {
    hero: "Solar operations technology and site safety products",
    intro: "Select products around your site and use case, with model-specific information grounded in supplied documents.",
    kolchar: "Kolchar GF-Series",
    kolcharTitle: "Waterless panel cleaning for sites requiring regular care",
    kolcharLead: "Kolchar robots from Solar ACM Systems Corporation, Canada, use brushes and automated movement. Model fit depends on panel dimensions, row layout, and site conditions.",
    kolcharPoints: ["For factories and solar farms with large panel arrays", "Self-powered by an onboard solar panel and cleans without water", "Remote status monitoring and alerts through the management system", "Panel compatibility, mounting, paths, and structure must be checked before selecting a model"],
    kolcharDemo: "See Kolchar in operation",
    kolcharDemoKicker: "Kolchar in action",
    kolcharDemoText: "The video shows travel and brushing on panel rows to help assess operation before a site survey.",
    kolcharSpecs: "Documented model information",
    kolcharNote: "The 8–15 m/min cleaning speed is stated in the Solar ACM company profile. Actual speed depends on model and site conditions and must be confirmed in the project proposal.",
    consultKolchar: "Request site assessment / demo",
    brochure: "Download brochure",
    fireIntro: "FIRESAVE for early-stage fire response plans",
    fireLead: "Portable units, cylinders, concentrates, and accessories have different uses and precautions. Involve the responsible safety team in selection.",
    demoTitle: "Product demonstrations",
    demoKicker: "FIRESAVE demos",
    demoLead: "These clips show how the products are used. They are demonstrations, not a guarantee of results in every situation.",
    capsuleDemo: "FS-TH capsule demonstration",
    sprayDemo: "FS-S500 PLUS+ spray demonstration",
    capsuleDemoText: "Shows the capsule breaking on impact to disperse agent at the fire base.",
    sprayDemoText: "Shows unlocking and directing the spray at an early-stage fire.",
    catalogue: "Choose by site and use case",
    catalogueKicker: "10 FIRESAVE products",
    catalogueLead: "Compare suitability, differences, specifications, and precautions by model.",
    use: "Suitable for", difference: "Difference", specs: "Model details", caution: "Precaution",
    ask: "Ask about this model",
    guide: "Selection guidance",
    guideKicker: "Selection guide",
    guideCards: [["General spaces", "Start with fire class and risk location. Capsules and sprays are supplemental products used differently."], ["Kitchens and cooking oil", "FS-CO is for cooking oil within the stated volume. Never apply water to an oil fire."], ["Factories and response teams", "Select cylinders and concentrates for the fire class, delivery equipment, dilution, and site safety plan."]],
    docs: "Documents and evidence",
    docsKicker: "Documentation",
    docsLead: "Summaries follow supplied documents and do not replace full certificates or professional assessment. Model-specific test results are not extended to other products.",
    evidence: [["Supplier documentation", "Used for model dimensions, service life, and storage conditions."], ["Factory ISO documentation", "The set includes ISO 9001:2015, 14001:2015, and 45001:2018 for the named factory, not certification of every product."], ["Model-specific test reports", "SGS, JFRL, and fire-test documents have the scope stated for their samples and models."]],
    safety: "For PV panels, inverters, energized cabinets, and lithium batteries, confirm suitability with the manufacturer and a qualified specialist. Reviewed documents do not establish that every FIRESAVE model covers every solar-system hazard.",
    finalTitle: "Need specifications, a quotation, or a demonstration?",
    finalLead: "Tell us the model and site type so our team can coordinate the relevant documents and next steps.",
    contact: "Contact the team",
  },
};

function Demo({ src, poster, title, description }) {
  return <article className="product-demo"><video controls playsInline preload="none" loading="lazy" poster={poster} aria-label={title}><source src={src} type="video/mp4" /></video><div><h3>{title}</h3><p>{description}</p></div></article>;
}

export default function ProductsPage() {
  const [lang, setLang] = useState("th");
  const [filter, setFilter] = useState("all");
  const t = content[lang];
  const isTh = lang === "th";
  const visibleProducts = fireProducts.filter((product) => filter === "all" || product.group === filter);

  return <PageShell lang={lang} setLang={setLang}>
    <VisualHero image="/products/kolchar-rooftop.jpg" imagePosition="center 55%" imageAlt={isTh ? "หุ่นยนต์บนแผงโซลาร์" : "Robot on solar panels"} kicker="Kolchar / FIRESAVE" title={t.hero} lead={t.intro} />

    <nav className="product-quick-nav" aria-label={isTh ? "ไปยังผลิตภัณฑ์" : "Jump to products"}><div className="site-container"><a href="#kolchar">Kolchar <ArrowDown size={15} /></a><a href="#firesave">FIRESAVE <ArrowDown size={15} /></a></div></nav>

    <section className="site-section product-kolchar" id="kolchar"><div className="site-container product-kolchar__grid"><div className="product-kolchar__image"><Image src="/products/kolchar-gf-series.jpg" alt={isTh ? "หุ่นยนต์ Kolchar GF-Series เคลื่อนบนแผง" : "Kolchar GF-Series robot moving across panels"} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div><span className="site-kicker">{t.kolchar}</span><h2 className="site-title">{t.kolcharTitle}</h2><p className="site-lead">{t.kolcharLead}</p><ul className="check-list">{t.kolcharPoints.map((item)=><li key={item}><Check size={18}/><span>{item}</span></li>)}</ul><div className="product-actions"><Link href="/contact" className="site-btn site-btn--orange">{t.consultKolchar}<ArrowRight size={16}/></Link><a href="/products/kolchar-brochure.pdf" className="site-btn site-btn--outline-dark" download><Download size={16}/>{t.brochure}</a></div></div></div></section>

    <section className="site-section site-section--soft"><div className="site-container"><div className="section-head"><div><span className="site-kicker">{t.kolcharDemoKicker}</span><h2 className="site-title">{t.kolcharDemo}</h2><p className="site-lead">{t.kolcharDemoText}</p></div></div><Demo src="/products/kolchar-demo.mp4" poster="/products/kolchar-demo-poster.jpg" title="Kolchar GF-Series" description={t.kolcharDemoText} /></div></section>

    <section className="site-section"><div className="site-container"><span className="site-kicker">GF-Series</span><h2 className="site-title">{t.kolcharSpecs}</h2><div className="product-spec-strip">{[["8–15 m/min",isTh ? "ความเร็วตามโปรไฟล์บริษัท" : "Speed in company profile"],["2 / 3.5 / 5 m",isTh ? "ขนาดตามโปรไฟล์บริษัท" : "Sizes in company profile"],["RMS",isTh ? "ติดตามสถานะและแจ้งเตือน" : "Monitoring and alerts"]].map(([value,label])=><div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div><p className="product-note">{t.kolcharNote}</p></div></section>

    <section className="site-section product-fire-intro" id="firesave"><div className="site-container product-fire-intro__grid"><div><span className="site-kicker site-kicker--light">FIRESAVE</span><h2 className="site-title">{t.fireIntro}</h2><p className="site-lead">{t.fireLead}</p><Link href="/contact" className="site-btn site-btn--orange">{t.contact}<ArrowRight size={16}/></Link></div><div className="product-fire-intro__media"><Image src="/firesave/capsule.png" alt={isTh ? "แคปซูล FIRESAVE FS-TH" : "FIRESAVE FS-TH capsule"} fill sizes="(max-width: 800px) 100vw, 35vw" /></div></div></section>

    <section className="site-section site-section--soft"><div className="site-container"><div className="section-head"><div><span className="site-kicker">{t.demoKicker}</span><h2 className="site-title">{t.demoTitle}</h2><p className="site-lead">{t.demoLead}</p></div></div><div className="product-demo-grid"><Demo src="/firesave/capsule-field-demo.mp4" poster="/firesave/capsule-field-demo-poster.jpg" title={t.capsuleDemo} description={t.capsuleDemoText} /><Demo src="/firesave/spray-demo.mp4" poster="/firesave/spray-demo-poster.jpg" title={t.sprayDemo} description={t.sprayDemoText} /></div></div></section>

    <section className="site-section" id="catalogue"><div className="site-container"><div className="section-head"><div><span className="site-kicker">{t.catalogueKicker}</span><h2 className="site-title">{t.catalogue}</h2><p className="site-lead">{t.catalogueLead}</p></div></div><div className="product-filters" role="group" aria-label={isTh ? "กรองประเภทสินค้า" : "Filter products"}>{filters.map(([id,th,en])=><button key={id} type="button" className={filter===id?"is-active":""} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{isTh?th:en}</button>)}</div><div className="product-catalogue">{visibleProducts.map((product)=>{const detail=fireShopDetails[product.id]?.[lang];const [name,summary]=product[lang];return <article className="product-card" key={product.id}><div className="product-card__media"><Image src={product.image} alt={`${product.id} ${name}`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="product-card__body"><span className="product-card__code">{product.id} · {detail.tag}</span><h3>{name}</h3><p className="product-card__summary">{summary}</p><div className="product-card__details"><div><h4>{t.use}</h4><ul>{detail.use.map((item)=><li key={item}>{item}</li>)}</ul></div><div><h4>{t.difference}</h4><ul>{detail.difference.map((item)=><li key={item}>{item}</li>)}</ul></div></div><h4>{t.specs}</h4><ul className="product-card__specs">{detail.specs.map((item)=><li key={item}>{item}</li>)}</ul><p className="product-card__caution"><ShieldAlert size={17}/><span><strong>{t.caution}:</strong> {detail.caution}</span></p><Link href="/contact" className="product-card__cta">{t.ask}<ArrowRight size={16}/></Link></div></article>})}</div></div></section>

    <section className="site-section site-section--soft"><div className="site-container"><span className="site-kicker">{t.guideKicker}</span><h2 className="site-title">{t.guide}</h2><div className="product-guide">{t.guideCards.map(([title,description],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="site-section site-section--green" id="documentation"><div className="site-container"><span className="site-kicker">{t.docsKicker}</span><h2 className="site-title">{t.docs}</h2><p className="site-lead">{t.docsLead}</p><div className="product-evidence">{t.evidence.map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div><p className="product-safety"><ShieldAlert size={20}/><span>{t.safety}</span></p></div></section>

    <section className="cta-band"><div className="site-container cta-band__inner"><div><h2>{t.finalTitle}</h2><p>{t.finalLead}</p></div><div className="cta-band__actions"><Link href="/contact" className="site-btn site-btn--orange">{t.contact}<ExternalLink size={16}/></Link></div></div></section>
  </PageShell>;
}
