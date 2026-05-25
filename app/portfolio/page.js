"use client";
import { useState } from "react";
import Link from "next/link";
import { Sun, Zap, MapPin, Calendar, X, ChevronLeft, ChevronRight, CheckCircle, ArrowRight, Home, Building2, Battery, Globe, MessageCircle } from "lucide-react";
import { projects, typeLabels, typeColors } from "./data";

const C = {
  green: "#2D7D46",
  greenLight: "#4CAF72",
  greenPale: "#E8F5EE",
  orange: "#E8630A",
  orangeLight: "#FF8C3A",
  orangePale: "#FFF0E6",
  dark: "#F9FCF9",
  darkCard: "#FFFFFF",
  midDark: "#F0F4F1",
  text: "#14241B",
  textMuted: "#5C6B61",
  border: "rgba(0,0,0,0.08)",
};

const typeGradients = {
  residential: "linear-gradient(135deg, #2D7D46, #4CAF72)",
  industrial: "linear-gradient(135deg, #1a5e8a, #2e86c1)",
  bess: "linear-gradient(135deg, #7B3FA0, #a569bd)",
  epc: "linear-gradient(135deg, #E8630A, #FF8C3A)",
};

const typeIcons = {
  residential: Home,
  industrial: Building2,
  bess: Battery,
  epc: Globe,
};

const filters = [
  { key: "all", label: "ทั้งหมด" },
  { key: "residential", label: "บ้านพักอาศัย" },
  { key: "industrial", label: "ธุรกิจ/อุตสาหกรรม" },
  { key: "bess", label: "BESS" },
  { key: "epc", label: "EPC" },
];

function ProjectCardImage({ src, type, title }) {
  const [errored, setErrored] = useState(false);
  const TypeIcon = typeIcons[type] || Sun;

  if (errored || !src) {
    return (
      <div style={{
        width: "100%", paddingBottom: "66%", position: "relative",
        background: typeGradients[type],
        borderRadius: "12px 12px 0 0", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 10,
        }}>
          <TypeIcon size={44} color="rgba(255,255,255,0.55)" />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500, textAlign: "center", padding: "0 16px" }}>{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", paddingBottom: "66%", position: "relative", borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
      <img
        src={src}
        alt={title}
        onError={() => setErrored(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  const color = typeColors[project.type];

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.darkCard,
        border: `1px solid ${hovered ? color + "60" : C.border}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 40px ${color}22` : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ position: "relative" }}>
        <ProjectCardImage src={project.image} type={project.type} title={project.title} />
        {/* Type badge */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: color, color: "white",
          padding: "4px 10px", borderRadius: 20,
          fontSize: 11, fontWeight: 600,
        }}>
          {typeLabels[project.type]}
        </div>
        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "opacity 0.2s",
          }}>
            <div style={{
              background: "white", color: C.text,
              padding: "8px 18px", borderRadius: 8,
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>
              ดูรายละเอียด <ArrowRight size={14} />
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{
          color: C.text, fontSize: 15.5, fontWeight: 600, margin: "0 0 12px",
          lineHeight: 1.4, minHeight: 42,
        }}>
          {project.title}
        </h3>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            color, fontSize: 13.5, fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum" 1, "lnum" 1',
          }}>
            <Zap size={13} color={color} />
            {project.capacity.toLocaleString()} kWp
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: C.textMuted, fontSize: 13 }}>
            <MapPin size={12} />
            {project.province}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 5, color: C.textMuted, fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}>
            <Calendar size={12} />
            {project.year}
          </div>
        </div>
      </div>
    </div>
  );
}

function LightboxImage({ src, type, title }) {
  const [errored, setErrored] = useState(false);
  const TypeIcon = typeIcons[type] || Sun;

  if (errored || !src) {
    return (
      <div style={{
        width: "100%", paddingBottom: "56%", position: "relative",
        background: typeGradients[type], borderRadius: 12, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 12,
        }}>
          <TypeIcon size={64} color="rgba(255,255,255,0.5)" />
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: 500 }}>{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", paddingBottom: "56%", position: "relative", borderRadius: 12, overflow: "hidden" }}>
      <img
        src={src}
        alt={title}
        onError={() => setErrored(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

function Lightbox({ project, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const color = typeColors[project.type];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.darkCard, borderRadius: 20, width: "100%", maxWidth: 760,
          maxHeight: "90vh", overflow: "auto",
          boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative" }}>
          <LightboxImage src={project.image} type={project.type} title={project.title} />
          {/* Close */}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(0,0,0,0.6)", border: "none",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={18} color="white" />
          </button>
          {/* Prev */}
          {hasPrev && (
            <button onClick={onPrev} style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChevronLeft size={20} color="white" />
            </button>
          )}
          {/* Next */}
          {hasNext && (
            <button onClick={onNext} style={{
              position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChevronRight size={20} color="white" />
            </button>
          )}
          {/* Type badge */}
          <div style={{
            position: "absolute", bottom: 14, left: 14,
            background: color, color: "white",
            padding: "5px 12px", borderRadius: 20,
            fontSize: 12, fontWeight: 600,
          }}>
            {typeLabels[project.type]}
          </div>
        </div>

        {/* Details */}
        <div style={{ padding: "24px 28px 28px" }}>
          <h2 style={{ color: C.text, fontSize: 22, fontWeight: 700, margin: "0 0 14px", fontFamily: "'Playfair Display', serif" }}>
            {project.title}
          </h2>

          {/* Meta row */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 18 }}>
            {[
              { icon: Zap, label: `${project.capacity.toLocaleString()} kWp`, color, numeric: true },
              { icon: MapPin, label: project.province, color: C.textMuted, numeric: false },
              { icon: Calendar, label: `ปี ${project.year}`, color: C.textMuted, numeric: true },
            ].map(({ icon: Icon, label, color: ic, numeric }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 6,
                color: ic, fontSize: 14, fontWeight: 600,
                ...(numeric && {
                  fontVariantNumeric: "tabular-nums",
                  fontFeatureSettings: '"tnum" 1, "lnum" 1',
                }),
              }}>
                <Icon size={15} color={ic} /> {label}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: C.border, marginBottom: 18 }} />

          {/* Description */}
          <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.8, margin: "0 0 20px" }}>
            {project.description}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 10 }}>ไฮไลท์โครงการ</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {project.highlights.map(h => (
                <div key={h} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: `${color}12`, border: `1px solid ${color}30`,
                  borderRadius: 8, padding: "6px 12px",
                  color, fontSize: 13, fontWeight: 500,
                }}>
                  <CheckCircle size={13} color={color} /> {h}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href="/quote" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
            color: "white", padding: "12px 24px", borderRadius: 10,
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            boxShadow: `0 6px 24px ${C.orange}40`,
          }}>
            <MessageCircle size={16} /> ขอรับใบเสนอราคาฟรี
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter(p => p.type === activeFilter);

  const counts = Object.fromEntries(
    ["residential", "industrial", "bess", "epc"].map(k => [k, projects.filter(p => p.type === k).length])
  );

  const totalKwp = projects.reduce((s, p) => s + p.capacity, 0);

  function openLightbox(project) {
    const idx = filtered.findIndex(p => p.id === project.id);
    setSelectedIndex(idx);
  }

  function closeLightbox() { setSelectedIndex(null); }
  function goPrev() { setSelectedIndex(i => Math.max(0, i - 1)); }
  function goNext() { setSelectedIndex(i => Math.min(filtered.length - 1, i + 1)); }

  return (
    <div style={{ background: C.dark, minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}</style>

      {/* ─── Navbar ──────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(45,125,70,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "0 2rem",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <img src="/Logo SolarACM.png" alt="Solar ACM Logo" style={{ height: 40, width: "auto", objectFit: "contain" }} />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontWeight: 700, fontSize: 17, color: "white" }}>Solar ACM</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Systems Corporation</div>
            </div>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/#solutions" style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>บริการ</Link>
            <Link href="/portfolio" style={{ color: "white", fontSize: 14, fontWeight: 600, textDecoration: "none", borderBottom: "2px solid #FF8C3A", paddingBottom: 2 }}>ผลงาน</Link>
            <Link href="/quote" style={{
              background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
              color: "white", padding: "9px 18px", borderRadius: 8,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
            }}>
              ขอใบเสนอราคา
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero Banner ─────────────────────────────────────── */}
      <section style={{
        padding: "64px 2rem 56px",
        background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${C.green}14 0%, transparent 70%), ${C.dark}`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: `${C.orange}15`, border: `1px solid ${C.orange}30`,
            borderRadius: 20, padding: "5px 14px",
            color: C.orangeLight, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20,
          }}>
            <Sun size={12} /> ผลงานของเรา
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700,
            color: C.text, margin: "0 0 16px", lineHeight: 1.2,
          }}>
            โครงการที่เราภาคภูมิใจ
          </h1>
          <p style={{ color: C.textMuted, fontSize: 17, lineHeight: 1.8, margin: 0 }}>
            ผลงานการติดตั้งโซลาร์เซลล์ภายใต้เครือข่าย Spring Marketing Networking<br />
            ครอบคลุมโรงงานอุตสาหกรรมและอาคารพาณิชย์ทั่วประเทศไทย
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
          {[
            { value: `${projects.length}+`, label: "โครงการทั้งหมด" },
            { value: `${(totalKwp / 1000).toFixed(2)} MWp`, label: "กำลังผลิตรวม" },
            { value: `${new Set(projects.map(p => p.province)).size} จังหวัด`, label: "ครอบคลุมทั่วไทย" },
          ].map(({ value, label }) => (
            <div key={label} style={{
              background: C.darkCard, border: `1px solid ${C.border}`,
              borderRadius: 12, padding: "16px 28px", textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
              <div style={{
                color: C.green, fontWeight: 700, fontSize: 26, lineHeight: 1,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontVariantNumeric: "tabular-nums",
                fontFeatureSettings: '"tnum" 1, "lnum" 1',
                letterSpacing: "-0.01em",
              }}>{value}</div>
              <div style={{ color: C.textMuted, fontSize: 13, marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Filter Tabs (ซ่อนหมวดที่ count = 0 เพื่อให้ดูสะอาด) ──── */}
      <div style={{ padding: "0 2rem", background: C.dark, position: "sticky", top: 72, zIndex: 90, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", paddingBottom: 1 }}>
          {filters.filter(({ key }) => key === "all" || (counts[key] || 0) > 0).map(({ key, label }) => {
            const count = key === "all" ? projects.length : counts[key] || 0;
            const active = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                style={{
                  padding: "14px 18px", border: "none", cursor: "pointer",
                  background: "transparent", fontSize: 14, fontWeight: active ? 600 : 400,
                  color: active ? C.green : C.textMuted,
                  borderBottom: active ? `2px solid ${C.green}` : "2px solid transparent",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                {label}
                <span style={{
                  marginLeft: 6,
                  background: active ? `${C.green}18` : C.midDark,
                  color: active ? C.green : C.textMuted,
                  borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Grid ────────────────────────────────────────────── */}
      <section style={{ padding: "48px 2rem 80px", maxWidth: 1280, margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.textMuted }}>ไม่มีผลงานในหมวดนี้</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}>
            {filtered.map(project => (
              <ProjectCard key={project.id} project={project} onClick={openLightbox} />
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div style={{
          marginTop: 64,
          background: `linear-gradient(135deg, ${C.green}18, ${C.orange}10)`,
          border: `1px solid ${C.green}25`, borderRadius: 20,
          padding: "40px 48px", textAlign: "center",
        }}>
          <div style={{ color: C.greenLight, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            สนใจติดตั้งโซลาร์เซลล์?
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 3vw, 2rem)", color: C.text,
            margin: "0 0 12px",
          }}>
            ให้เราดูแลโครงการของคุณ
          </h2>
          <p style={{ color: C.textMuted, fontSize: 15, margin: "0 0 28px", lineHeight: 1.7 }}>
            ทีมงาน Solar ACM พร้อมให้คำปรึกษาและออกแบบระบบโซลาร์เซลล์ที่เหมาะกับคุณโดยเฉพาะ
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quote" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${C.orange}, ${C.orangeLight})`,
              color: "white", padding: "13px 28px", borderRadius: 10,
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              boxShadow: `0 8px 28px ${C.orange}40`,
            }}>
              <MessageCircle size={17} /> ขอรับใบเสนอราคาฟรี
            </Link>
            <Link href="/#calculator" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: C.darkCard, border: `1px solid ${C.border}`,
              color: C.text, padding: "13px 28px", borderRadius: 10,
              fontSize: 15, fontWeight: 500, textDecoration: "none",
            }}>
              คำนวณความคุ้มค่า <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Lightbox ────────────────────────────────────────── */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <Lightbox
          project={filtered[selectedIndex]}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filtered.length - 1}
        />
      )}
    </div>
  );
}
