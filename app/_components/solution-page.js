"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Network, Search, Wrench } from "lucide-react";
import { PageShell } from "./site-shell";

export default function SolutionPage({ data }) {
  const [lang, setLang] = useState("th");
  const isTh = lang === "th";
  const text = data[lang];
  const stages = isTh
    ? [[Search,"สำรวจโจทย์","รวบรวมบิลค่าไฟ รูปแบบการใช้งาน และข้อจำกัดของพื้นที่"],[ClipboardCheck,"วางแนวทาง","สรุปขนาดและประเภทระบบที่ควรศึกษาต่อ"],[Network,"ประสานเครือข่าย","คัดผู้เชี่ยวชาญหรือ EPC ที่เหมาะกับขอบเขตงาน"],[Wrench,"ติดตามโครงการ","ช่วยประสานข้อมูลตั้งแต่ข้อเสนอจนถึงการส่งมอบ"]]
    : [[Search,"Discover","Review bills, usage, and site constraints"],[ClipboardCheck,"Define","Outline system size and suitable options"],[Network,"Coordinate","Match relevant specialists or EPC partners"],[Wrench,"Follow through","Coordinate information from proposal to delivery"]];

  return (
    <PageShell lang={lang} setLang={setLang}>
      <style>{`
        .solution-role{padding:22px 24px;border-left:4px solid var(--orange);background:var(--orange-soft)}.solution-role strong{display:block;margin-bottom:5px}.solution-role p{margin:0;color:#67584f}
        .feature-card{min-height:250px}.feature-card h3{font-size:1.18rem}.feature-number{margin-bottom:40px;color:var(--orange);font-family:var(--font-display);font-weight:700}
        .stage-grid{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid rgba(255,255,255,.16)}.stage{padding:28px}.stage+.stage{border-left:1px solid rgba(255,255,255,.16)}.stage svg{margin-bottom:45px;color:#8cd4a7}.stage h3{margin:0 0 8px}.stage p{margin:0;color:rgba(255,255,255,.64);font-size:14px}
        @media(max-width:900px){.stage-grid{grid-template-columns:1fr 1fr}.stage:nth-child(3){border-left:0}.stage:nth-child(-n+2){border-bottom:1px solid rgba(255,255,255,.16)}}
        @media(max-width:620px){.stage-grid{grid-template-columns:1fr}.stage+.stage,.stage:nth-child(3){border-left:0}.stage{border-bottom:1px solid rgba(255,255,255,.16)}.stage:last-child{border-bottom:0}}
      `}</style>
      <section className="page-hero"><div className="site-container page-hero__grid"><div><span className="site-kicker">{text.kicker}</span><h1>{text.title}</h1><p>{text.lead}</p><div className="page-hero__actions"><Link href="/quote" className="site-btn site-btn--orange">{isTh?"ขอประเมินโครงการ":"Request project assessment"}<ArrowRight size={17}/></Link><Link href="/portfolio" className="site-btn site-btn--outline-dark">{isTh?"ดูผลงาน":"View portfolio"}</Link></div></div><div className="page-hero__media"><img src={data.image} alt={text.imageAlt}/><div className="page-hero__label"><strong>{text.imageLabel}</strong><span>{text.imageNote}</span></div></div></div></section>

      <section className="site-section"><div className="site-container split-section"><div><span className="site-kicker">{isTh?"บทบาทของ Solar ACM":"Our role"}</span><h2 className="site-title">{text.roleTitle}</h2><p className="site-lead">{text.roleLead}</p><ul className="check-list">{text.rolePoints.map((point)=><li key={point}><Check size={18}/><span>{point}</span></li>)}</ul></div><div className="solution-role"><strong>{text.roleBoxTitle}</strong><p>{text.roleBox}</p></div></div></section>

      <section className="site-section site-section--soft"><div className="site-container"><div className="section-head"><div className="section-head__copy"><span className="site-kicker">{isTh?"สิ่งที่ต้องพิจารณา":"What to consider"}</span><h2 className="site-title">{text.featuresTitle}</h2></div></div><div className="grid-3">{text.features.map((item,index)=><article className="flat-card feature-card" key={item[0]}><div className="feature-number">0{index+1}</div><h3>{item[0]}</h3><p>{item[1]}</p></article>)}</div></div></section>

      <section className="site-section site-section--green"><div className="site-container"><div className="section-head"><div className="section-head__copy"><span className="site-kicker">{isTh?"ขั้นตอน":"Process"}</span><h2 className="site-title">{isTh?"ทำงานเป็นขั้นตอน เพื่อให้ทุกฝ่ายเห็นภาพเดียวกัน":"A clear process that keeps every party aligned"}</h2></div></div><div className="stage-grid">{stages.map(([Icon,title,desc])=><article className="stage" key={title}><Icon size={24}/><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>

      <section className="cta-band"><div className="site-container cta-band__inner"><div><h2>{text.ctaTitle}</h2><p>{text.ctaLead}</p></div><div className="cta-band__actions"><Link href="/quote" className="site-btn site-btn--orange">{isTh?"ส่งข้อมูลเบื้องต้น":"Share project details"}<ArrowRight size={16}/></Link><Link href="/contact" className="site-btn site-btn--outline">{isTh?"คุยกับทีมงาน":"Talk to the team"}</Link></div></div></section>
    </PageShell>
  );
}
