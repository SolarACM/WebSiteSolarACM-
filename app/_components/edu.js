"use client";
// ─── Shared Educational Landing Components ─────────────────────
// ใช้ร่วมกันทั้ง 4 หน้า: residential / industrial / bess / epc
// ไม่มีอิโมจิ — ใช้ Lucide icons + Next.js Image เท่านั้น
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight, CheckCircle } from "lucide-react";

const C = {
  green: "#2D7D46", greenLight: "#4CAF72", greenPale: "#E8F5EE",
  orange: "#E8630A", orangeLight: "#FF8C3A", orangePale: "#FFF0E6",
  dark: "#F9FCF9", card: "#FFFFFF", midDark: "#F0F4F1",
  text: "#14241B", textMuted: "#5C6B61", border: "rgba(0,0,0,0.08)",
};

/* ── Section heading (shared) ── */
function SectionHead({ tag, title, desc }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <div style={{ color: C.greenLight, fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{tag}</div>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: C.text, marginBottom: 16 }}>{title}</h2>
      {desc && <p style={{ color: C.textMuted, fontSize: 17, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{desc}</p>}
    </div>
  );
}

/* ── 1. QUICK STATS (under hero buttons) ── */
export function QuickStats({ stats, accent = C.green }) {
  return (
    <div className="edu-stats" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 48 }}>
      {stats.map(({ icon: Icon, value, label }, i) => (
        <div key={i} style={{
          flex: "1 1 180px", minWidth: 160, display: "flex", alignItems: "center", gap: 14,
          background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "16px 18px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        }}>
          <div style={{ width: 46, height: 46, borderRadius: 11, flexShrink: 0, background: `${accent}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={23} color={accent} />
          </div>
          <div style={{ lineHeight: 1.25 }}>
            <div style={{ fontWeight: 800, fontSize: 20, color: C.text, fontFeatureSettings: '"tnum" 1' }}>{value}</div>
            <div style={{ fontSize: 12.5, color: C.textMuted }}>{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 2. UNDERSTANDING — Apple-style alternating image/text ── */
export function UnderstandSection({ tag, title, desc, blocks, accent = C.green }) {
  return (
    <section style={{ padding: "100px 2rem", background: C.dark }}>
      <style>{`
        .edu-row { display:flex; gap:56px; align-items:center; margin-bottom:80px; }
        .edu-row:last-child { margin-bottom:0; }
        .edu-row.rev { flex-direction:row-reverse; }
        .edu-col { flex:1; min-width:0; }
        .edu-media { position:relative; width:100%; aspect-ratio:4/3; border-radius:20px; overflow:hidden; box-shadow:0 24px 60px rgba(20,36,27,0.16); }
        @media (max-width: 860px) {
          .edu-row, .edu-row.rev { flex-direction:column; gap:28px; margin-bottom:56px; }
          .edu-media { aspect-ratio:16/10; }
        }
      `}</style>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead tag={tag} title={title} desc={desc} />
        {blocks.map((b, i) => (
          <div key={i} className={`edu-row ${i % 2 === 1 ? "rev" : ""}`}>
            <div className="edu-col">
              <div className="edu-media">
                <Image src={b.img} alt={b.alt} fill sizes="(max-width:860px) 100vw, 540px" style={{ objectFit: "cover" }} />
              </div>
            </div>
            <div className="edu-col">
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: `${accent}15`, color: accent, fontWeight: 800, fontSize: 16, marginBottom: 18 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)", color: C.text, marginBottom: 16, lineHeight: 1.3 }}>{b.title}</h3>
              <p style={{ color: C.textMuted, fontSize: 16, lineHeight: 1.85, marginBottom: b.points ? 20 : 0 }}>{b.body}</p>
              {b.points && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {b.points.map((p, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle size={19} color={accent} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: C.text, fontSize: 15, lineHeight: 1.6 }}>{p}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 3. FAQ ACCORDION ── */
export function FAQAccordion({ tag, title, desc, items, accent = C.green }) {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ padding: "100px 2rem", background: C.midDark }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <SectionHead tag={tag} title={title} desc={desc} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: C.card, border: `1px solid ${isOpen ? `${accent}55` : C.border}`,
                borderRadius: 14, overflow: "hidden", transition: "border-color 0.25s",
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 16, padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
                  }}>
                  <span style={{ color: C.text, fontWeight: 600, fontSize: 16, lineHeight: 1.45 }}>{it.q}</span>
                  <span style={{
                    flexShrink: 0, width: 30, height: 30, borderRadius: 8, background: isOpen ? accent : `${accent}15`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "all 0.3s",
                  }}>
                    <ChevronDown size={18} color={isOpen ? "white" : accent} />
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0,
                  transition: "max-height 0.35s ease, opacity 0.3s", overflow: "hidden",
                }}>
                  <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.8, padding: "0 24px 22px" }}>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 4. RELATED PROJECTS ── */
export function RelatedProjects({ tag, title, desc, images, viewAllLabel, accent = C.green }) {
  return (
    <section style={{ padding: "100px 2rem", background: C.dark }}>
      <style>{`
        .edu-proj-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        @media (max-width: 860px) { .edu-proj-grid { grid-template-columns:1fr; } }
      `}</style>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead tag={tag} title={title} desc={desc} />
        <div className="edu-proj-grid">
          {images.map((src, i) => (
            <div key={i} style={{
              position: "relative", width: "100%", aspectRatio: "4/3", borderRadius: 16, overflow: "hidden",
              border: `1px solid ${C.border}`, boxShadow: "0 12px 32px rgba(20,36,27,0.10)",
            }}>
              <Image src={src} alt={`Solar project ${i + 1}`} fill sizes="(max-width:860px) 100vw, 360px" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link href="/portfolio" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `linear-gradient(135deg, ${accent}, ${accent === C.green ? C.greenLight : C.orangeLight})`,
            color: "white", padding: "14px 30px", borderRadius: 10, fontSize: 15, fontWeight: 600,
            textDecoration: "none", boxShadow: `0 8px 28px ${accent}40`,
          }}>
            {viewAllLabel} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
