"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Globe2, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";

const CONTACT = {
  phoneDisplay: "095-309-5196",
  phone: "0953095196",
  email: "mon-attention@hotmail.com",
  line: "Monarrattana",
};

const navigation = {
  th: [
    ["/residential", "บ้านพักอาศัย"],
    ["/industrial", "ธุรกิจและโรงงาน"],
    ["/bess", "BESS"],
    ["/products", "ผลิตภัณฑ์"],
    ["/portfolio", "ผลงาน"],
  ],
  en: [
    ["/residential", "Residential"],
    ["/industrial", "Business & Industry"],
    ["/bess", "BESS"],
    ["/products", "Products"],
    ["/portfolio", "Portfolio"],
  ],
};

function RouteScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const frame = window.requestAnimationFrame(() => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export function SiteHeader({ lang = "th", setLang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const switchLanguage = () => {
    const next = lang === "th" ? "en" : "th";
    document.documentElement.lang = next;
    setLang?.(next);
    try {
      window.localStorage?.setItem("solar-acm-language", next);
    } catch {
      // Language switching must still work when storage is blocked.
    }
  };
  const quoteLabel = lang === "th" ? "ขอคำปรึกษา" : "Consult us";

  return (
    <header className="site-header">
      <div className="site-container site-header__inner">
        <Link href="/" className="site-brand" aria-label="Solar ACM homepage" scroll>
          <span className="site-brand__mark">
            <Image src="/Logo SolarACM.png" alt="" width={48} height={48} priority />
          </span>
          <span className="site-brand__copy">
            <strong>Solar ACM</strong>
            <small>Systems Corporation</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation[lang].map(([href, label]) => (
            <Link className={pathname === href ? "is-active" : ""} href={href} key={href} scroll>
              {label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="lang-switch" onClick={switchLanguage} aria-label="Switch language">
            <Globe2 size={15} /> {lang === "th" ? "EN" : "TH"}
          </button>
          <Link href="/quote" className="site-btn site-btn--light header-quote" scroll>
            {quoteLabel}<ArrowRight size={15} />
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation[lang].map(([href, label]) => (
            <Link href={href} key={href} scroll onClick={() => setOpen(false)}>{label}<ArrowRight size={15} /></Link>
          ))}
          <Link href="/about" scroll onClick={() => setOpen(false)}>{lang === "th" ? "เกี่ยวกับเรา" : "About"}<ArrowRight size={15} /></Link>
          <Link href="/contact" scroll onClick={() => setOpen(false)}>{lang === "th" ? "ติดต่อ" : "Contact"}<ArrowRight size={15} /></Link>
          <Link href="/quote" className="site-btn" scroll onClick={() => setOpen(false)}>{quoteLabel}</Link>
        </nav>
      )}
    </header>
  );
}

export function VisualHero({ image, imageAlt = "", kicker, title, lead, children, imagePosition = "center" }) {
  return (
    <section className="visual-hero">
      <Image
        className="visual-hero__image"
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: imagePosition }}
      />
      <div className="visual-hero__shade" />
      <div className="site-container visual-hero__inner">
        <div className="visual-hero__content">
          <span className="site-kicker site-kicker--light">{kicker}</span>
          <h1>{title}</h1>
          {lead && <p>{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ lang = "th" }) {
  const isTh = lang === "th";
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div>
          <Link href="/" className="site-brand" scroll>
            <span className="site-brand__mark"><Image src="/Logo SolarACM.png" alt="" width={48} height={48} /></span>
            <span className="site-brand__copy"><strong>Solar ACM</strong><small>Systems Corporation</small></span>
          </Link>
          <p>{isTh
            ? "ที่ปรึกษาโครงการพลังงานสะอาด ช่วยวางแผน ประสานงาน และคัดเลือกโซลูชันตามการใช้งานจริง"
            : "Clean-energy project consultancy for planning, coordination, and solution selection based on real needs."}</p>
        </div>
        <div>
          <h3>{isTh ? "โซลูชัน" : "Solutions"}</h3>
          <div className="site-footer__links">
            <Link href="/residential" scroll>Residential Solar</Link>
            <Link href="/industrial" scroll>Commercial & Industrial</Link>
            <Link href="/bess" scroll>Battery Energy Storage</Link>
            <Link href="/epc" scroll>EPC Coordination</Link>
          </div>
        </div>
        <div>
          <h3>{isTh ? "บริษัท" : "Company"}</h3>
          <div className="site-footer__links">
            <Link href="/products" scroll>{isTh ? "ผลิตภัณฑ์" : "Products"}</Link>
            <Link href="/portfolio" scroll>{isTh ? "ผลงาน" : "Portfolio"}</Link>
            <Link href="/about" scroll>{isTh ? "เกี่ยวกับเรา" : "About"}</Link>
            <Link href="/contact" scroll>{isTh ? "ติดต่อ" : "Contact"}</Link>
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
        <span>{isTh ? "ข้อมูลสินค้าและโครงการอ้างอิงเอกสารที่ได้รับ" : "Product and project information follows supplied documentation."}</span>
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
      <MessageCircle size={23} />
    </a>
  );
}

export function PageShell({ children, lang, setLang }) {
  useEffect(() => {
    let saved = null;
    try {
      saved = window.localStorage?.getItem("solar-acm-language");
    } catch {
      // Keep the page default when storage is unavailable.
    }
    if ((saved === "th" || saved === "en") && saved !== lang) setLang?.(saved);
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <>
      <RouteScrollManager />
      <SiteHeader lang={lang} setLang={setLang} />
      <main>{children}</main>
      <SiteFooter lang={lang} />
      <FloatingLine />
    </>
  );
}

export { CONTACT };
