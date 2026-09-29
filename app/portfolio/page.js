"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, X, Zap } from "lucide-react";
import { PageShell, VisualHero } from "../_components/site-shell";
import { projects } from "./data";
import "./portfolio.css";

export default function PortfolioPage() {
  const [lang, setLang] = useState("th");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const isTh = lang === "th";

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key !== "Tab") return;
      const focusable = [...dialogRef.current.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [selected]);

  const openProject = (project, event) => {
    triggerRef.current = event.currentTarget;
    setSelected(project);
  };
  const titleFor = (project) => isTh ? project.title : project.titleEn;
  const provinceFor = (project) => isTh ? project.province : project.provinceEn;

  return <PageShell lang={lang} setLang={setLang}>
    <VisualHero image="/portfolio/project-04.jpg" imagePosition="center 42%" imageAlt={isTh ? "แผงโซลาร์บนหลังคาโรงงาน" : "Solar panels across an industrial rooftop"} kicker="Portfolio" title={isTh ? "ผลงานโครงการพลังงานแสงอาทิตย์" : "Solar project portfolio"} lead={isTh ? "ข้อมูลโครงการ ขนาดระบบ และผู้ดำเนินงาน EPC จากชุดข้อมูลที่ได้รับ โดยไม่เปิดเผยชื่อลูกค้า" : "Project, system capacity, and executing EPC information from supplied records, without disclosing client names."} />
    <section className="site-section site-section--soft"><div className="site-container"><div className="portfolio-grid">{projects.map((project) => <button className="portfolio-card" type="button" key={project.id} onClick={(event) => openProject(project, event)} aria-label={`${titleFor(project)}, ${project.capacity} kWp. ${isTh ? "ดูรายละเอียด" : "View details"}`}><div className="portfolio-card__image"><Image src={project.image} alt={isTh ? `โครงการโซลาร์รูฟท็อปใน${project.province}` : `Solar rooftop project in ${project.provinceEn}`} fill sizes="(max-width: 760px) 100vw, 50vw" /><span className="portfolio-card__tag">{isTh ? project.categoryTh : project.categoryEn}</span></div><div className="portfolio-card__body"><h2>{titleFor(project)}</h2><div className="portfolio-meta"><span><Zap size={15}/>{project.capacity} kWp</span><span><MapPin size={15}/>{provinceFor(project)}</span><span><Calendar size={15}/>{project.year}</span></div><p className="portfolio-card__epc"><strong>{isTh ? "EPC ผู้ดำเนินการ:" : "Executing EPC:"}</strong> {project.epc}</p><p className="portfolio-card__role"><strong>{isTh ? "ขอบเขต Solar ACM:" : "Solar ACM scope:"}</strong> {isTh ? "ที่ปรึกษาและประสานงาน ไม่ใช่ EPC ผู้ติดตั้ง" : "Consultancy and coordination, not the executing EPC"}</p></div></button>)}</div></div></section>
    <section className="cta-band"><div className="site-container cta-band__inner"><div><h2>{isTh ? "ต้องการประเมินโครงการของคุณ?" : "Planning your own project?"}</h2><p>{isTh ? "ส่งข้อมูลการใช้ไฟเบื้องต้นเพื่อเริ่มพูดคุยกับทีมงาน" : "Share initial energy-use information with our team."}</p></div><div className="cta-band__actions"><Link href="/contact" className="site-btn site-btn--orange">{isTh ? "ติดต่อทีมงาน" : "Contact the team"}<ArrowRight size={16}/></Link></div></div></section>
    {selected && <div className="portfolio-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><div className="portfolio-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="portfolio-dialog-title" ref={dialogRef}><button className="portfolio-modal__close" type="button" onClick={() => setSelected(null)} aria-label={isTh ? "ปิดรายละเอียดโครงการ" : "Close project details"}><X size={20}/></button><div className="portfolio-modal__media"><Image src={selected.image} alt={isTh ? `ภาพโครงการใน${selected.province}` : `Project in ${selected.provinceEn}`} fill sizes="(max-width: 960px) 100vw, 960px" /></div><div className="portfolio-modal__body"><span className="site-kicker">{isTh ? selected.categoryTh : selected.categoryEn}</span><h2 id="portfolio-dialog-title">{titleFor(selected)}</h2><div className="portfolio-meta"><span><Zap size={15}/>{selected.capacity} kWp</span><span><MapPin size={15}/>{provinceFor(selected)}</span><span><Calendar size={15}/>{selected.year}</span></div><p><strong>{isTh ? "EPC ผู้ดำเนินการ:" : "Executing EPC:"}</strong> {selected.epc}</p><p><strong>{isTh ? "ขอบเขต Solar ACM:" : "Solar ACM scope:"}</strong> {isTh ? "ที่ปรึกษาและประสานงาน ไม่ใช่ EPC ผู้ติดตั้ง" : "Consultancy and coordination, not the executing EPC"}</p></div></div></div>}
  </PageShell>;
}
