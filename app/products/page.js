"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BatteryCharging,
  Check,
  CloudCog,
  Droplets,
  Factory,
  FileCheck2,
  Flame,
  Gauge,
  Leaf,
  ShieldCheck,
  SprayCan,
} from "lucide-react";
import { PageShell } from "../_components/site-shell";

const copy = {
  th: {
    title: "ผลิตภัณฑ์สำหรับดูแลระบบโซลาร์และความปลอดภัยของพื้นที่",
    intro: "ข้อมูลในหน้านี้อ้างอิงจากเอกสารผลิตภัณฑ์ที่ Solar ACM ได้รับ เราให้ข้อมูลและประสานงานสินค้า โดยไม่ได้อ้างว่าเป็นผู้ผลิต",
    kolcharTitle: "ทำความสะอาดแผงโซลาร์แบบไร้น้ำ สำหรับโครงการขนาดใหญ่",
    kolcharLead: "Kolchar GF-Series ออกแบบมาเพื่อทำความสะอาดแผงโซลาร์เป็นกิจวัตร โดยลดการใช้น้ำและช่วยให้ทีมดูแลระบบติดตามการทำงานจากระยะไกล",
    fireTitle: "รู้จักผลิตภัณฑ์ FIRESAVE ก่อนเลือกใช้",
    fireLead: "ผลิตภัณฑ์แต่ละประเภทเหมาะกับสถานการณ์ต่างกัน ควรเลือกตามชนิดเพลิง พื้นที่ใช้งาน และคำแนะนำบนฉลากผลิตภัณฑ์",
    docsTitle: "เอกสารประกอบที่ได้รับ",
    docsLead: "ข้อความด้านมาตรฐานบนเว็บไซต์สรุปจากเอกสารที่แนบมา ไม่ได้ใช้แทนใบรับรองฉบับเต็มหรือคำแนะนำจากผู้เชี่ยวชาญด้านอัคคีภัย",
  },
  en: {
    title: "Products for solar operations and site safety",
    intro: "Information on this page is based on product documents received by Solar ACM. We provide information and coordination and do not claim to be the manufacturer.",
    kolcharTitle: "Waterless solar panel cleaning for large-scale sites",
    kolcharLead: "Kolchar GF-Series is designed for routine panel cleaning, reducing water use while enabling remote monitoring and management.",
    fireTitle: "Understand FIRESAVE products before use",
    fireLead: "Each product is intended for a different situation. Selection should consider fire type, location, and instructions on the product label.",
    docsTitle: "Documents received",
    docsLead: "Standards information on this page summarizes attached documents and does not replace full certificates or professional fire-safety guidance.",
  },
};

const firesaveProducts = [
  {
    image: "/products/firesave-capsule.jpg",
    code: "FS-TH",
    titleTh: "แคปซูลดับเพลิงชนิดขว้าง",
    titleEn: "Throwing-type fire extinguisher",
    descTh: "สำหรับขว้างไปยังต้นเพลิงระยะเริ่มต้น ตัวแคปซูลแตกและกระจายสารดับเพลิงเมื่อกระแทก",
    descEn: "Designed to be thrown at an early-stage fire, releasing the extinguishing agent on impact.",
    specsTh: ["เพลิงประเภท A, B, C", "สารดับเพลิง 650 ± 10 มล.", "น้ำหนักรวม 790 ± 15 กรัม", "อายุการใช้งาน 5 ปี", "เก็บรักษา -10 ถึง +60°C"],
    specsEn: ["Fire classes A, B, C", "Agent volume 650 ± 10 ml", "Total weight 790 ± 15 g", "5-year service life", "Storage -10 to +60°C"],
  },
  {
    image: "/products/firesave-spray.jpg",
    code: "FS-S500 PLUS+",
    titleTh: "สเปรย์ดับเพลิงแบบพกพา",
    titleEn: "Portable fire-extinguishing spray",
    descTh: "อุปกรณ์สำหรับจู่โจมเพลิงในช่วงเริ่มต้น ใช้โดยเขย่ากระป๋อง ดึงสลัก และฉีดพ่นไปยังกองเพลิง",
    descEn: "An early-stage fire product used by shaking the can, pulling the pin, and directing the spray at the fire.",
    specsTh: ["เพลิงประเภท A, B, C, K", "สารดับเพลิง 500 ± 5 มล.", "น้ำหนักรวม 690 ± 15 กรัม", "อายุการใช้งาน 3 ปี", "เก็บรักษา 0 ถึง +65°C"],
    specsEn: ["Fire classes A, B, C, K", "Agent volume 500 ± 5 ml", "Total weight 690 ± 15 g", "3-year service life", "Storage 0 to +65°C"],
  },
  {
    image: "/products/firesave-pouch.jpg",
    code: "Cooking oil fire pouch",
    titleTh: "ซองดับเพลิงสำหรับน้ำมันประกอบอาหาร",
    titleEn: "Cooking-oil fire pouch",
    descTh: "หย่อนซองลงในภาชนะที่เกิดเพลิงจากน้ำมันประกอบอาหาร โดยเอกสารระบุว่าหนึ่งซองเหมาะกับปริมาตรน้ำมันไม่เกิน 1 ลิตร",
    descEn: "Placed into a container with a cooking-oil fire. The document states one pouch is intended for up to 1 litre of oil.",
    specsTh: ["ใช้กับเพลิงจากน้ำมันประกอบอาหาร", "หนึ่งซองต่อน้ำมันไม่เกิน 1 ลิตร", "ห้ามใช้น้ำกับเพลิงจากน้ำมัน", "ปฏิบัติตามฉลากทุกครั้ง"],
    specsEn: ["For cooking-oil fires", "One pouch for up to 1 litre of oil", "Do not use water on oil fires", "Always follow the product label"],
  },
];

export default function ProductsPage() {
  const [lang, setLang] = useState("th");
  const isTh = lang === "th";
  const t = copy[lang];

  return (
    <PageShell lang={lang} setLang={setLang}>
      <style>{`
        .products-hero{padding:96px 0 78px;background:linear-gradient(120deg,#f7f6f0 0%,#eef4ef 100%)}
        .products-hero__inner{max-width:930px}.products-hero h1{margin:0;font-size:clamp(2.6rem,5vw,4.8rem);line-height:1.09;letter-spacing:0}.products-hero p{max-width:780px;margin:24px 0 0;color:var(--muted);font-size:1.1rem}
        .product-anchor{display:flex;gap:10px;flex-wrap:wrap;margin-top:31px}.product-anchor a{padding:9px 13px;border:1px solid var(--line);border-radius:999px;background:white;color:var(--green-700);font-weight:700;text-decoration:none}
        .kolchar-specs{display:grid;grid-template-columns:repeat(4,1fr);margin-top:34px;border:1px solid var(--line)}.kolchar-specs div{padding:21px;border-right:1px solid var(--line);background:white}.kolchar-specs div:last-child{border-right:0}.kolchar-specs strong{display:block;font-size:1.15rem}.kolchar-specs span{color:var(--muted);font-size:13px}
        .use-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:32px}.use-card{padding:24px;border:1px solid var(--line);background:white}.use-card svg{margin-bottom:24px;color:var(--green-600)}.use-card h3{margin:0 0 8px}.use-card p{margin:0;color:var(--muted);font-size:14px}
        .firesave-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.firesave-card{display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--line);border-radius:7px;background:white}.firesave-card__image{height:300px;display:grid;place-items:center;padding:32px;background:#f7f5ef}.firesave-card__image img{width:100%;height:100%;object-fit:contain}.firesave-card__body{display:flex;flex:1;flex-direction:column;padding:26px}.firesave-card__body>span{color:var(--orange);font-family:var(--font-display);font-size:11px;font-weight:700;text-transform:uppercase}.firesave-card h3{margin:8px 0 9px;font-size:1.22rem}.firesave-card p{margin:0;color:var(--muted);font-size:14px}.spec-list{display:grid;gap:8px;margin:22px 0 0;padding:0;list-style:none}.spec-list li{display:flex;align-items:flex-start;gap:8px;font-size:13px}.spec-list svg{flex:0 0 auto;margin-top:3px;color:var(--green-600)}
        .warning-box{display:flex;gap:15px;margin-top:28px;padding:22px;border-left:4px solid var(--orange);background:var(--orange-soft)}.warning-box svg{flex:0 0 auto;color:var(--orange)}.warning-box strong{display:block;margin-bottom:3px}.warning-box p{margin:0;color:#67564b;font-size:14px}
        .docs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:32px}.doc-card{display:flex;gap:15px;padding:22px;border:1px solid rgba(255,255,255,.16)}.doc-card svg{flex:0 0 auto;color:#8cd4a7}.doc-card h3{margin:0 0 6px;font-size:1rem}.doc-card p{margin:0;color:rgba(255,255,255,.63);font-size:13px}
        @media(max-width:960px){.kolchar-specs,.firesave-grid{grid-template-columns:1fr 1fr}.kolchar-specs div:nth-child(2){border-right:0}.use-grid{grid-template-columns:1fr}.firesave-card:last-child{grid-column:1/-1}}
        @media(max-width:680px){.kolchar-specs,.firesave-grid,.docs-grid{grid-template-columns:1fr}.kolchar-specs div,.kolchar-specs div:nth-child(2){border-right:0;border-bottom:1px solid var(--line)}.firesave-card:last-child{grid-column:auto}.products-hero{padding:68px 0}.firesave-card__image{height:260px}}
      `}</style>

      <section className="products-hero">
        <div className="site-container products-hero__inner">
          <span className="site-kicker">Products</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <div className="product-anchor"><a href="#kolchar">Kolchar GF-Series</a><a href="#firesave">FIRESAVE</a></div>
        </div>
      </section>

      <section className="site-section" id="kolchar">
        <div className="site-container split-section">
          <div className="split-section__media"><img src="/products/kolchar-gf-series.jpg" alt={isTh ? "หุ่นยนต์ Kolchar GF-Series บนแผงโซลาร์" : "Kolchar GF-Series robots on solar panels"} /></div>
          <div><span className="site-kicker">Kolchar GF-Series</span><h2 className="site-title">{t.kolcharTitle}</h2><p className="site-lead">{t.kolcharLead}</p><ul className="check-list">{(isTh ? ["ระบบทำความสะอาดแบบไร้น้ำ", "เหมาะกับโรงงานและโครงการโซลาร์ขนาดใหญ่", "ติดตามสถานะผ่านระบบจัดการระยะไกล", "ตั้งค่าการทำงานและรับการแจ้งเตือนได้"] : ["Waterless cleaning system", "For factories and large solar sites", "Remote status monitoring", "Scheduling and operational alerts"]).map((item)=><li key={item}><Check size={18}/><span>{item}</span></li>)}</ul><Link href="/contact" className="site-btn">{isTh ? "ขอข้อมูลและสาธิต" : "Request information or a demo"}<ArrowRight size={16}/></Link></div>
        </div>
        <div className="site-container kolchar-specs">
          <div><strong>GF-Series</strong><span>{isTh ? "กลุ่มผลิตภัณฑ์" : "Product series"}</span></div>
          <div><strong>Waterless</strong><span>{isTh ? "ไม่ใช้น้ำในการทำความสะอาด" : "No water used for cleaning"}</span></div>
          <div><strong>3 m/min</strong><span>{isTh ? "ความเร็วทำความสะอาดตามเอกสาร" : "Documented cleaning speed"}</span></div>
          <div><strong>Remote</strong><span>{isTh ? "ติดตามและจัดการจากระยะไกล" : "Remote monitoring and control"}</span></div>
        </div>
      </section>

      <section className="site-section site-section--soft">
        <div className="site-container">
          <span className="site-kicker">Operational value</span><h2 className="site-title">{isTh ? "ออกแบบเพื่อการดูแลแผงอย่างต่อเนื่อง" : "Designed for consistent panel care"}</h2>
          <div className="use-grid">
            {[[Droplets,isTh?"ลดการใช้น้ำ":"Reduce water use",isTh?"เหมาะกับพื้นที่ที่การใช้น้ำมีข้อจำกัด หรืออยากลดขั้นตอนจัดการน้ำ":"Suitable where water access is limited or water handling should be reduced"],[CloudCog,isTh?"จัดการระยะไกล":"Remote management",isTh?"ติดตามสถานะและข้อมูลการทำงานผ่านระบบจัดการ":"Monitor status and operating information through the management system"],[Gauge,isTh?"ช่วยดูแลประสิทธิภาพ":"Support performance",isTh?"การทำความสะอาดเป็นกิจวัตรช่วยลดการสะสมของฝุ่นบนผิวแผง":"Routine cleaning helps reduce dust accumulation on panel surfaces"]].map(([Icon,title,desc])=><div className="use-card" key={title}><Icon size={24}/><h3>{title}</h3><p>{desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className="site-section" id="firesave">
        <div className="site-container">
          <div className="section-head"><div className="section-head__copy"><span className="site-kicker">FIRESAVE</span><h2 className="site-title">{t.fireTitle}</h2><p className="site-lead">{t.fireLead}</p></div><Link href="/contact" className="site-btn site-btn--outline-dark">{isTh ? "สอบถามผลิตภัณฑ์" : "Ask about products"}<ArrowRight size={16}/></Link></div>
          <div className="firesave-grid">
            {firesaveProducts.map((product)=><article className="firesave-card" key={product.code}><div className="firesave-card__image"><img src={product.image} alt={isTh?product.titleTh:product.titleEn}/></div><div className="firesave-card__body"><span>{product.code}</span><h3>{isTh?product.titleTh:product.titleEn}</h3><p>{isTh?product.descTh:product.descEn}</p><ul className="spec-list">{(isTh?product.specsTh:product.specsEn).map((spec)=><li key={spec}><Check size={15}/><span>{spec}</span></li>)}</ul></div></article>)}
          </div>
          <div className="warning-box"><AlertTriangle size={24}/><div><strong>{isTh ? "ข้อควรระวัง" : "Important safety note"}</strong><p>{isTh ? "ผลิตภัณฑ์เหล่านี้ใช้สำหรับระงับเหตุในระยะเริ่มต้นตามขอบเขตที่ระบุ หากไฟลุกลาม มีควันหนาแน่น หรือไม่สามารถเข้าถึงต้นเพลิงได้อย่างปลอดภัย ให้รีบออกจากพื้นที่และโทรแจ้งเหตุฉุกเฉิน 199 ไม่ควรเสี่ยงเข้าไปดับเพลิงด้วยตนเอง" : "These products are intended for early-stage incidents within their stated scope. If the fire spreads, smoke becomes dense, or the source cannot be reached safely, evacuate and call emergency services. Do not take personal risks."}</p></div></div>
        </div>
      </section>

      <section className="site-section site-section--green">
        <div className="site-container"><span className="site-kicker">Documentation</span><h2 className="site-title">{t.docsTitle}</h2><p className="site-lead">{t.docsLead}</p><div className="docs-grid">
          {[[FileCheck2,"ISO management systems",isTh?"เอกสารชุดที่ได้รับมีใบรับรอง ISO 9001:2015, ISO 14001:2015 และ ISO 45001:2018 ของโรงงานที่ระบุในเอกสาร":"The supplied document set includes ISO 9001:2015, ISO 14001:2015, and ISO 45001:2018 certificates for the factory named in the documents"],[Leaf,"JFRL composition analysis",isTh?"มี Certificate of Analysis จาก Japan Food Research Laboratories สำหรับส่วนประกอบของสารดับเพลิง":"Includes a Certificate of Analysis from Japan Food Research Laboratories for the extinguishing agent composition"],[ShieldCheck,"SGS RoHS test report",isTh?"มีรายงาน SGS สำหรับแคปซูลชนิดขว้างตาม RoHS Directive ที่ระบุในเอกสาร":"Includes an SGS report for the throwing-type product under the RoHS Directive stated in the documents"],[Flame,"Fire test documents",isTh?"มีเอกสารผลทดสอบที่อ้างถึงเพลิงประเภท A, B, C และผลทดสอบเฉพาะผลิตภัณฑ์บางรุ่น":"Includes fire-test documents referencing classes A, B, C and model-specific test results"]].map(([Icon,title,desc])=><article className="doc-card" key={title}><Icon size={23}/><div><h3>{title}</h3><p>{desc}</p></div></article>)}
        </div></div>
      </section>

      <section className="cta-band"><div className="site-container cta-band__inner"><div><h2>{isTh ? "ต้องการข้อมูลสเปก เอกสาร หรือการสาธิต?" : "Need specifications, documents, or a demonstration?"}</h2><p>{isTh ? "ติดต่อ Solar ACM เพื่อประสานข้อมูลผลิตภัณฑ์ที่เหมาะกับพื้นที่ของคุณ" : "Contact Solar ACM to coordinate product information for your site."}</p></div><div className="cta-band__actions"><Link href="/contact" className="site-btn site-btn--orange">{isTh ? "ติดต่อทีมงาน" : "Contact the team"}<ArrowRight size={16}/></Link></div></div></section>
    </PageShell>
  );
}
