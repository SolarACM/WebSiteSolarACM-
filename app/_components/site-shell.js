"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe2, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

const CONTACT = {
  phoneDisplay: "095-309-5196",
  phone: "0953095196",
  email: "mon-attention@hotmail.com",
  line: "Monarrattana",
};

const navigation = {
  th: [
    ["/#solutions", "โซลูชันพลังงาน"],
    ["/products", "ผลิตภัณฑ์"],
    ["/portfolio", "ผลงาน"],
    ["/about", "เกี่ยวกับเรา"],
    ["/contact", "ติดต่อ"],
  ],
  en: [
    ["/#solutions", "Energy Solutions"],
    ["/products", "Products"],
    ["/portfolio", "Portfolio"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ],
};

export function SiteHeader({ lang = "th", setLang }) {
  const [open, setOpen] = useState(false);
  const switchLanguage = () => setLang?.(lang === "th" ? "en" : "th");
  const quoteLabel = lang === "th" ? "ขอใบเสนอราคา" : "Request a quote";

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link href="/" className="site-brand" aria-label="Solar ACM homepage">
          <img src="/Logo SolarACM.png" alt="Solar ACM Systems Corporation" />
          <div>
            <strong>Solar ACM</strong>
            <span>Systems Corporation</span>
          </div>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation[lang].map(([href, label]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="lang-switch" onClick={switchLanguage} aria-label="Switch language">
            <Globe2 size={15} /> {lang === "th" ? "EN" : "TH"}
          </button>
          <Link href="/quote" className="site-btn header-quote">{quoteLabel}</Link>
          <button
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation[lang].map(([href, label]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link href="/quote" className="site-btn" onClick={() => setOpen(false)}>{quoteLabel}</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter({ lang = "th" }) {
  const isTh = lang === "th";
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div>
          <Link href="/" className="site-brand">
            <img src="/Logo SolarACM.png" alt="Solar ACM Systems Corporation" />
            <div><strong>Solar ACM</strong><span>Systems Corporation</span></div>
          </Link>
          <p>{isTh
            ? "ที่ปรึกษาโครงการพลังงานสะอาด ช่วยวางแผน ประสานงาน และคัดเลือกโซลูชันให้เหมาะกับการใช้งานจริง"
            : "Clean-energy project consultancy for planning, coordination, and solution selection based on real operating needs."}</p>
        </div>
        <div>
          <h3>{isTh ? "โซลูชัน" : "Solutions"}</h3>
          <div className="site-footer__links">
            <Link href="/residential">Residential Solar</Link>
            <Link href="/industrial">Commercial & Industrial</Link>
            <Link href="/bess">Battery Energy Storage</Link>
            <Link href="/epc">EPC Coordination</Link>
          </div>
        </div>
        <div>
          <h3>{isTh ? "บริษัท" : "Company"}</h3>
          <div className="site-footer__links">
            <Link href="/products">{isTh ? "ผลิตภัณฑ์" : "Products"}</Link>
            <Link href="/portfolio">{isTh ? "ผลงาน" : "Portfolio"}</Link>
            <Link href="/about">{isTh ? "เกี่ยวกับเรา" : "About"}</Link>
            <Link href="/contact">{isTh ? "ติดต่อ" : "Contact"}</Link>
          </div>
        </div>
        <div>
          <h3>{isTh ? "ช่องทางติดต่อ" : "Contact"}</h3>
          <div className="site-footer__links">
            <a href={`tel:${CONTACT.phone}`}><Phone size={15} /> {CONTACT.phoneDisplay}</a>
            <a href={`mailto:${CONTACT.email}`}><Mail size={15} /> {CONTACT.email}</a>
            <a href={`https://line.me/ti/p/~${CONTACT.line}`} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> LINE: {CONTACT.line}
            </a>
          </div>
        </div>
      </div>
      <div className="site-container site-footer__bottom">
        <span>© {new Date().getFullYear()} Solar ACM Systems Corporation</span>
        <span>{isTh ? "ข้อมูลสินค้าและโครงการเป็นไปตามเอกสารที่ได้รับการยืนยัน" : "Product and project information follows verified documentation."}</span>
      </div>
    </footer>
  );
}

export function FloatingLine() {
  return (
    <a
      className="floating-line"
      href={`https://line.me/ti/p/~${CONTACT.line}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Solar ACM on LINE"
      title="LINE: Monarrattana"
    >
      <MessageCircle size={24} />
    </a>
  );
}

export function PageShell({ children, lang, setLang }) {
  return (
    <>
      <SiteHeader lang={lang} setLang={setLang} />
      <main>{children}</main>
      <SiteFooter lang={lang} />
      <FloatingLine />
    </>
  );
}

export { CONTACT };
