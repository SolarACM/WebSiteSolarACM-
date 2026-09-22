"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Battery,
  Bot,
  Building2,
  Check,
  Flame,
  Home,
  Loader2,
  Network,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { PageShell } from "../_components/site-shell";

const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_SHEET_URL || "https://script.google.com/macros/s/REPLACE_WITH_YOUR_WEB_APP_URL/exec";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_MIME = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];

const services = {
  th: [
    ["residential", "โซลาร์บ้าน", Home],
    ["industrial", "ธุรกิจ / โรงงาน", Building2],
    ["bess", "ระบบ BESS", Battery],
    ["epc", "ประสาน EPC", Network],
    ["kolchar", "Kolchar", Bot],
    ["firesave", "FIRESAVE", Flame],
  ],
  en: [
    ["residential", "Residential solar", Home],
    ["industrial", "Business / factory", Building2],
    ["bess", "BESS", Battery],
    ["epc", "EPC coordination", Network],
    ["kolchar", "Kolchar", Bot],
    ["firesave", "FIRESAVE", Flame],
  ],
};

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function Field({ label, required, error, children, hint }) {
  return <div className="quote-field"><label>{label}{required&&<span> *</span>}</label>{hint&&<small>{hint}</small>}{children}{error&&<div className="quote-error"><AlertCircle size={14}/>{error}</div>}</div>;
}

export default function QuotePage() {
  const router = useRouter();
  const fileRef = useRef(null);
  const [lang, setLang] = useState("th");
  const [form, setForm] = useState({ name:"", phone:"", service:"", bill:"", phase:"", usage:"", province:"", note:"" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const isTh = lang === "th";
  const isEnergy = ["residential","industrial","bess","epc"].includes(form.service);

  const update = (key, value) => { setForm((current)=>({...current,[key]:value})); setErrors((current)=>({...current,[key]:undefined})); };

  function chooseFile(nextFile) {
    if (!nextFile) return;
    const image = ACCEPTED_MIME.includes(nextFile.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(nextFile.name);
    if (!image) return setErrors((current)=>({...current,file:isTh?"รองรับเฉพาะไฟล์รูปภาพ":"Image files only"}));
    if (nextFile.size > MAX_FILE_SIZE) return setErrors((current)=>({...current,file:isTh?"ไฟล์ต้องไม่เกิน 5 MB":"Maximum file size is 5 MB"}));
    setFile(nextFile); setErrors((current)=>({...current,file:undefined}));
    const reader = new FileReader(); reader.onload=()=>setPreview(String(reader.result||"")); reader.readAsDataURL(nextFile);
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = isTh ? "กรุณากรอกชื่อ" : "Please enter your name";
    const digits = form.phone.replace(/\D/g,"");
    if (digits.length < 9 || digits.length > 10) next.phone = isTh ? "กรุณากรอกเบอร์โทร 9–10 หลัก" : "Enter a 9–10 digit phone number";
    if (!form.service) next.service = isTh ? "กรุณาเลือกเรื่องที่สนใจ" : "Please select an enquiry type";
    if (isEnergy && (!form.bill || Number(form.bill)<=0)) next.bill = isTh ? "กรุณากรอกค่าไฟเฉลี่ย" : "Please enter an average bill";
    if (isEnergy && !form.usage) next.usage = isTh ? "กรุณาเลือกช่วงเวลาที่ใช้ไฟสูง" : "Please select peak usage time";
    setErrors(next); return Object.keys(next).length===0;
  }

  async function submit(event) {
    event.preventDefault(); setSubmitError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const selectedService = services[lang].find(([id])=>id===form.service)?.[1] || form.service;
      const details = [form.province&&`จังหวัด/พื้นที่: ${form.province}`,form.usage&&`ช่วงใช้ไฟสูง: ${form.usage}`,form.note].filter(Boolean).join(" | ");
      const payload = { date:new Date().toISOString(), name:form.name.trim(), phone:form.phone.replace(/\D/g,""), bill:isEnergy?Number(form.bill):0, service:selectedService, phase:form.phase==="single"?"1 เฟส":form.phase==="three"?"3 เฟส":"ไม่ระบุ", note:details, file:null };
      if (file) payload.file = { name:file.name, type:file.type||"image/jpeg", size:file.size, data:await readFileAsBase64(file) };
      await fetch(SHEET_ENDPOINT,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});
      router.push("/quote/thank-you");
    } catch (error) {
      console.error(error); setSubmitError(isTh?"ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่หรือติดต่อทาง LINE":"Unable to send. Please retry or contact us on LINE."); setSubmitting(false);
    }
  }

  return <PageShell lang={lang} setLang={setLang}>
    <style>{`
      .quote-hero{padding:78px 0 56px;background:var(--cream)}.quote-hero__inner{max-width:820px}.quote-hero h1{margin:0;font-size:clamp(2.5rem,5vw,4.3rem);line-height:1.1}.quote-hero p{margin:22px 0 0;color:var(--muted);font-size:1.05rem}
      .quote-layout{display:grid;grid-template-columns:.72fr 1.28fr;gap:38px;align-items:start}.quote-aside{position:sticky;top:108px;padding:28px;background:var(--green-950);color:white}.quote-aside h2{margin:0 0 12px;font-size:1.45rem}.quote-aside p{color:rgba(255,255,255,.66)}.quote-aside ul{display:grid;gap:13px;margin:24px 0 0;padding:0;list-style:none}.quote-aside li{display:flex;gap:9px;color:rgba(255,255,255,.78)}.quote-aside svg{flex:0 0 auto;margin-top:4px;color:#8cd4a7}
      .quote-form{padding:34px;border:1px solid var(--line);background:white}.quote-form h2{margin:0 0 5px;font-size:1.55rem}.quote-form>p{margin:0 0 28px;color:var(--muted)}.quote-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.quote-field{margin-bottom:22px}.quote-field label{display:block;margin-bottom:7px;font-weight:700}.quote-field label span{color:var(--orange)}.quote-field small{display:block;margin:-3px 0 9px;color:var(--muted)}.quote-input{width:100%;min-height:48px;padding:11px 13px;border:1px solid var(--line);border-radius:5px;background:#fbfcfa;color:var(--ink);outline:none}.quote-input:focus{border-color:var(--green-600);box-shadow:0 0 0 3px rgba(47,125,80,.12)}textarea.quote-input{min-height:110px;resize:vertical}.quote-error{display:flex;align-items:center;gap:6px;margin-top:7px;color:#b74719;font-size:13px}
      .service-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.service-option{min-height:94px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;padding:14px;border:1px solid var(--line);border-radius:5px;background:white;color:var(--ink);cursor:pointer;text-align:left}.service-option.active{border-color:var(--green-600);background:var(--green-100)}.service-option svg{color:var(--green-700)}.service-option span{font-size:13px;font-weight:700}
      .choice-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.choice{padding:12px;border:1px solid var(--line);border-radius:5px;background:white;cursor:pointer}.choice.active{border-color:var(--green-600);background:var(--green-100);font-weight:700}
      .upload-box{display:flex;align-items:center;gap:15px;padding:18px;border:1px dashed #afbbb3;background:#fbfcfa;cursor:pointer}.upload-box img{width:64px;height:64px;object-fit:cover}.upload-box strong{display:block}.upload-box span{color:var(--muted);font-size:13px}.upload-remove{margin-left:auto;border:0;background:transparent;color:#a43e22;cursor:pointer}.quote-submit{width:100%;margin-top:8px}.privacy-note{display:flex;gap:8px;margin-top:15px;color:var(--muted);font-size:12px}.submit-error{margin-top:14px;padding:12px;background:var(--orange-soft);color:#873b20}
      @media(max-width:900px){.quote-layout{grid-template-columns:1fr}.quote-aside{position:static}.service-grid{grid-template-columns:1fr 1fr}}
      @media(max-width:620px){.quote-hero{padding:62px 0 46px}.quote-form{padding:22px}.quote-grid,.choice-grid{grid-template-columns:1fr}.service-grid{grid-template-columns:1fr 1fr}.service-option{min-height:86px}}
    `}</style>
    <section className="quote-hero"><div className="site-container quote-hero__inner"><span className="site-kicker">Consultation request</span><h1>{isTh?"บอกเราว่าคุณสนใจเรื่องอะไร แล้วเริ่มจากข้อมูลที่มี":"Tell us what you need and start with the information you have"}</h1><p>{isTh?"ไม่จำเป็นต้องรู้พื้นที่หลังคาหรือสเปกอุปกรณ์ ทีมงานจะติดต่อกลับเพื่อถามข้อมูลที่จำเป็นในขั้นถัดไป":"Exact roof area or equipment specifications are not required. Our team will follow up with the next relevant questions."}</p></div></section>
    <section className="site-section site-section--soft"><div className="site-container quote-layout"><aside className="quote-aside"><h2>{isTh?"ก่อนส่งข้อมูล":"Before you submit"}</h2><p>{isTh?"แบบฟอร์มนี้รองรับทั้งโครงการพลังงานและการสอบถามผลิตภัณฑ์":"This form supports both energy projects and product enquiries."}</p><ul><li><Check size={17}/>{isTh?"กรอกเฉพาะข้อมูลที่ทราบ":"Provide only what you know"}</li><li><Check size={17}/>{isTh?"แนบบิลค่าไฟได้หากเป็นงานโซลาร์":"Attach a bill for solar enquiries"}</li><li><Check size={17}/>{isTh?"ข้อมูลจะใช้เพื่อการติดต่อกลับและประเมินเบื้องต้น":"Information is used for follow-up and initial assessment"}</li></ul></aside>
      <form className="quote-form" onSubmit={submit} noValidate><h2>{isTh?"ข้อมูลสำหรับติดต่อกลับ":"Contact details"}</h2><p>{isTh?"ช่องที่มีเครื่องหมาย * จำเป็นต่อการติดต่อเบื้องต้น":"Fields marked * are required for the initial follow-up."}</p>
        <div className="quote-grid"><Field label={isTh?"ชื่อ-นามสกุล":"Full name"} required error={errors.name}><input className="quote-input" value={form.name} onChange={(e)=>update("name",e.target.value)} autoComplete="name"/></Field><Field label={isTh?"เบอร์โทรศัพท์":"Phone number"} required error={errors.phone}><input className="quote-input" value={form.phone} onChange={(e)=>update("phone",e.target.value)} inputMode="tel" autoComplete="tel"/></Field></div>
        <Field label={isTh?"เรื่องที่สนใจ":"Enquiry type"} required error={errors.service}><div className="service-grid">{services[lang].map(([id,label,Icon])=><button className={`service-option ${form.service===id?"active":""}`} type="button" key={id} onClick={()=>update("service",id)}><Icon size={21}/><span>{label}</span></button>)}</div></Field>
        <Field label={isTh?"จังหวัด / พื้นที่โครงการ":"Province / project area"}><input className="quote-input" value={form.province} onChange={(e)=>update("province",e.target.value)} placeholder={isTh?"เช่น ชลบุรี":"e.g. Chonburi"}/></Field>
        {isEnergy&&<><div className="quote-grid"><Field label={isTh?"ค่าไฟเฉลี่ยต่อเดือน (บาท)":"Average monthly bill (THB)"} required error={errors.bill}><input className="quote-input" type="number" min="0" inputMode="numeric" value={form.bill} onChange={(e)=>update("bill",e.target.value)}/></Field><Field label={isTh?"ระบบไฟ (ถ้าทราบ)":"Electrical phase (if known)"}><select className="quote-input" value={form.phase} onChange={(e)=>update("phase",e.target.value)}><option value="">{isTh?"ยังไม่ทราบ":"Not sure"}</option><option value="single">1 {isTh?"เฟส":"phase"}</option><option value="three">3 {isTh?"เฟส":"phase"}</option></select></Field></div><Field label={isTh?"ช่วงเวลาที่ใช้ไฟสูงสุด":"When is electricity use highest?"} required error={errors.usage}><div className="choice-grid">{[["day",isTh?"กลางวัน":"Daytime"],["mixed",isTh?"ทั้งวันและกลางคืน":"Day and night"],["night",isTh?"กลางคืน":"Nighttime"]].map(([id,label])=><button className={`choice ${form.usage===id?"active":""}`} type="button" key={id} onClick={()=>update("usage",label)}>{label}</button>)}</div></Field></>}
        <Field label={isTh?"รายละเอียดเพิ่มเติม":"Additional details"}><textarea className="quote-input" value={form.note} onChange={(e)=>update("note",e.target.value)} placeholder={isTh?"เช่น เป้าหมายของโครงการ จำนวนอาคาร หรือผลิตภัณฑ์ที่สนใจ":"Project goals, number of buildings, or product of interest"}/></Field>
        <Field label={isTh?"แนบรูปบิลค่าไฟ (ไม่บังคับ)":"Attach bill image (optional)"} hint={isTh?"JPG, PNG, WebP หรือ HEIC ขนาดไม่เกิน 5 MB":"JPG, PNG, WebP, or HEIC up to 5 MB"} error={errors.file}><input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" hidden onChange={(e)=>chooseFile(e.target.files?.[0])}/><div className="upload-box" role="button" tabIndex={0} onClick={()=>fileRef.current?.click()} onKeyDown={(e)=>e.key==="Enter"&&fileRef.current?.click()}>{preview?<img src={preview} alt="Bill preview"/>:<Upload size={26}/>}<div><strong>{file?file.name:(isTh?"เลือกไฟล์รูปภาพ":"Choose image")}</strong><span>{file?`${(file.size/1024/1024).toFixed(2)} MB`:(isTh?"คลิกเพื่อเลือกไฟล์":"Click to select a file")}</span></div>{file&&<button className="upload-remove" type="button" aria-label="Remove file" onClick={(e)=>{e.stopPropagation();setFile(null);setPreview("");}}><Trash2 size={19}/></button>}</div></Field>
        <button className="site-btn site-btn--orange quote-submit" disabled={submitting}>{submitting?<><Loader2 size={18}/>{isTh?"กำลังส่ง...":"Sending..."}</>:<>{isTh?"ส่งข้อมูลให้ทีมงาน":"Send to the team"}<ArrowRight size={17}/></>}</button><div className="privacy-note"><ShieldCheck size={15}/><span>{isTh?"ข้อมูลนี้ใช้เพื่อการติดต่อกลับและประเมินคำขอของคุณเท่านั้น":"This information is used only to follow up and assess your request."}</span></div>{submitError&&<div className="submit-error">{submitError}</div>}
      </form></div></section>
  </PageShell>;
}
