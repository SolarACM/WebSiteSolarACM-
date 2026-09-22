"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, PageShell } from "../../_components/site-shell";

export default function ThankYouPage() {
  const [lang, setLang] = useState("th");
  const isTh = lang === "th";

  return (
    <PageShell lang={lang} setLang={setLang}>
      <style>{`
        .thanks{padding:88px 0;background:var(--cream)}
        .thanks__panel{max-width:820px;padding:clamp(28px,6vw,64px);background:white;border:1px solid var(--line);text-align:center}
        .thanks__icon{width:72px;height:72px;margin:0 auto 24px;display:grid;place-items:center;border-radius:50%;background:var(--green-100);color:var(--green-700)}
        .thanks h1{max-width:680px;margin:0 auto;font-size:clamp(2.25rem,5vw,4rem);line-height:1.1}
        .thanks__lead{max-width:650px;margin:20px auto 0;color:var(--muted);font-size:1.05rem;line-height:1.8}
        .thanks__next{margin:38px 0 0;padding:24px;border-left:4px solid var(--orange);background:var(--orange-soft);text-align:left}
        .thanks__next h2{margin:0 0 7px;font-size:1.12rem}.thanks__next p{margin:0;color:#67584f}
        .thanks__channels{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:28px}
        .thanks__channels a{min-height:88px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:14px;border:1px solid var(--line);color:var(--ink);text-decoration:none;font-weight:700}
        .thanks__channels a:hover{border-color:var(--green-600);color:var(--green-700)}
        .thanks__back{margin-top:30px}
        @media(max-width:650px){.thanks{padding:52px 0}.thanks__channels{grid-template-columns:1fr}.thanks__channels a{min-height:64px;flex-direction:row}.thanks__panel{text-align:left}.thanks__icon{margin-left:0}.thanks h1,.thanks__lead{margin-left:0}}
      `}</style>
      <section className="thanks">
        <div className="site-container">
          <div className="thanks__panel">
            <div className="thanks__icon"><Check size={36} strokeWidth={2.4} /></div>
            <span className="site-kicker">Request received</span>
            <h1>{isTh ? "ได้รับข้อมูลของคุณแล้ว" : "We have received your request"}</h1>
            <p className="thanks__lead">
              {isTh
                ? "ขอบคุณที่ติดต่อ Solar ACM ทีมงานจะตรวจสอบข้อมูลและติดต่อกลับผ่านเบอร์โทรที่แจ้งไว้ เพื่อสอบถามรายละเอียดที่จำเป็นสำหรับขั้นตอนถัดไป"
                : "Thank you for contacting Solar ACM. Our team will review the information and contact you using the phone number provided to confirm the details needed for the next step."}
            </p>
            <div className="thanks__next">
              <h2>{isTh ? "สิ่งที่จะเกิดขึ้นต่อไป" : "What happens next"}</h2>
              <p>{isTh
                ? "ระยะเวลาและขั้นตอนจะแตกต่างกันตามประเภทคำขอ ข้อมูลหน้างาน และความพร้อมของเอกสาร ทีมงานจะแจ้งรายละเอียดหลังจากตรวจสอบข้อมูลเบื้องต้น"
                : "Timing and next steps vary by enquiry type, site information, and document availability. Our team will confirm the process after the initial review."}</p>
            </div>
            <div className="thanks__channels">
              <a href={`tel:${CONTACT.phone}`}><Phone size={20} />{CONTACT.phoneDisplay}</a>
              <a href={`mailto:${CONTACT.email}`}><Mail size={20} />{CONTACT.email}</a>
              <a href={`https://line.me/ti/p/~${CONTACT.line}`} target="_blank" rel="noreferrer"><MessageCircle size={20} />LINE: {CONTACT.line}</a>
            </div>
            <div className="thanks__back">
              <Link href="/" className="site-btn site-btn--ghost"><ArrowLeft size={17} />{isTh ? "กลับหน้าหลัก" : "Back to home"}</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
