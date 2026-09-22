"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Calendar, MapPin, X, Zap } from "lucide-react";
import { PageShell, VisualHero } from "../_components/site-shell";
import { projects } from "./data";

export default function PortfolioPage() {
  const [lang, setLang] = useState("th");
  const [selected, setSelected] = useState(null);
  const isTh = lang === "th";

  useEffect(() => {
    if (!selected) return;
    const onKey = (event) => event.key === "Escape" && setSelected(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [selected]);

  return (
    <PageShell lang={lang} setLang={setLang}>
      <style>{`
        .portfolio-note{display:flex;gap:12px;margin:0 0 28px;padding:18px;border-left:3px solid var(--green-600);background:white;color:var(--muted);font-size:14px}.portfolio-note svg{flex:0 0 auto;color:var(--green-600)}
        .portfolio-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.portfolio-card{overflow:hidden;border:1px solid var(--line);border-radius:7px;background:white;cursor:pointer;text-align:left;padding:0}.portfolio-card__image{position:relative;height:340px;overflow:hidden;background:#dfe8e1}.portfolio-card__image img{width:100%;height:100%;object-fit:cover;transition:transform .3s ease}.portfolio-card:hover img{transform:scale(1.025)}.portfolio-card__tag{position:absolute;left:16px;top:16px;padding:7px 10px;border-radius:4px;background:rgba(13,40,31,.9);color:white;font-size:12px;font-weight:700}.portfolio-card__body{padding:22px}.portfolio-card h2{margin:0 0 13px;font-size:1.22rem}.portfolio-meta{display:flex;flex-wrap:wrap;gap:14px;color:var(--muted);font-size:13px}.portfolio-meta span{display:flex;align-items:center;gap:6px}
        .portfolio-modal{position:fixed;z-index:200;inset:0;display:grid;place-items:center;padding:24px;background:rgba(5,22,15,.82);backdrop-filter:blur(8px)}.portfolio-modal__dialog{position:relative;width:min(960px,100%);max-height:90vh;overflow:auto;border-radius:8px;background:white}.portfolio-modal__close{position:absolute;z-index:2;right:14px;top:14px;width:42px;height:42px;display:grid;place-items:center;border:0;border-radius:50%;background:rgba(13,40,31,.88);color:white;cursor:pointer}.portfolio-modal__image{width:100%;max-height:580px;object-fit:cover}.portfolio-modal__body{padding:26px}.portfolio-modal h2{margin:0 0 15px;font-size:1.6rem}.epc-pending{margin-top:18px;padding:14px;border-left:3px solid var(--orange);background:var(--orange-soft);color:#67584f;font-size:13px}
        @media(max-width:760px){.portfolio-grid{grid-template-columns:1fr}.portfolio-card__image{height:260px}.portfolio-modal{padding:10px}.portfolio-modal__body{padding:20px}}
      `}</style>
      <VisualHero image="/portfolio/project-04.jpg" imagePosition="center 42%" imageAlt={isTh?"ผลงานโซลาร์รูฟท็อปภาคอุตสาหกรรม":"Industrial rooftop solar portfolio"} kicker="Portfolio" title={isTh?"ผลงานจริงจากโครงการในประเทศไทย":"Real projects across Thailand"} lead={isTh?"ข้อมูลขนาดระบบ จังหวัด และปีดำเนินการจากชุดข้อมูลโครงการ โดยไม่เปิดเผยชื่อลูกค้าที่เป็นความลับ":"System capacity, province, and completion year from project records, while protecting confidential client identities."}><div className="visual-hero__caption"><strong>{isTh?"ข้อมูลโครงการที่ตรวจสอบได้":"Traceable project information"}</strong><span>{isTh?"บทบาทและผู้ดำเนินงานระบุเฉพาะเมื่อมีข้อมูลยืนยัน":"Roles and executing parties are stated only when confirmed"}</span></div></VisualHero>
      <section className="site-section site-section--soft"><div className="site-container"><div className="portfolio-note"><Building2 size={20}/><span>{isTh?"ชื่อ EPC ผู้ดำเนินการและบทบาทของ Solar ACM ในแต่ละโครงการยังอยู่ระหว่างการยืนยันจากเจ้าของข้อมูล จึงยังไม่เผยแพร่บนเว็บไซต์":"Executing EPC names and Solar ACM's project-specific role are pending confirmation from the data owner and are not yet published."}</span></div><div className="portfolio-grid">{projects.map((project)=><button className="portfolio-card" key={project.id} onClick={()=>setSelected(project)}><div className="portfolio-card__image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 100vw, 50vw"/><span className="portfolio-card__tag">Industrial rooftop</span></div><div className="portfolio-card__body"><h2>{project.title}</h2><div className="portfolio-meta"><span><Zap size={15}/>{project.capacity} kWp</span><span><MapPin size={15}/>{project.province}</span><span><Calendar size={15}/>{project.year}</span></div></div></button>)}</div></div></section>
      <section className="cta-band"><div className="site-container cta-band__inner"><div><h2>{isTh?"ต้องการดูแนวทางสำหรับโครงการของคุณ?":"Need a direction for your own project?"}</h2><p>{isTh?"ส่งบิลค่าไฟและข้อมูลเบื้องต้นเพื่อเริ่มต้นการประเมิน":"Share your bill and initial project information to begin."}</p></div><div className="cta-band__actions"><Link href="/quote" className="site-btn site-btn--orange">{isTh?"เริ่มประเมิน":"Start assessment"}<ArrowRight size={16}/></Link></div></div></section>
      {selected&&<div className="portfolio-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={(e)=>e.target===e.currentTarget&&setSelected(null)}><div className="portfolio-modal__dialog"><button className="portfolio-modal__close" onClick={()=>setSelected(null)} aria-label="Close"><X size={20}/></button><div style={{position:"relative",height:"min(580px,56vw)"}}><Image className="portfolio-modal__image" src={selected.image} alt={selected.title} fill sizes="960px"/></div><div className="portfolio-modal__body"><h2>{selected.title}</h2><div className="portfolio-meta"><span><Zap size={15}/>{selected.capacity} kWp</span><span><MapPin size={15}/>{selected.province}</span><span><Calendar size={15}/>{selected.year}</span></div><div className="epc-pending"><strong>{isTh?"EPC ผู้ดำเนินการ:":"Executing EPC:"}</strong> {isTh?"รอการยืนยันจากเจ้าของข้อมูล":"Pending confirmation from the data owner"}</div></div></div></div>}
    </PageShell>
  );
}
