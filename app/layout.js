import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── SEO metadata (sub-pages override) ────────────────────
export const metadata = {
  metadataBase: new URL("https://web-site-solar-acm.vercel.app"),
  title: {
    default: "Solar ACM Systems | ที่ปรึกษาโซลาร์เซลล์ครบวงจรในไทย",
    template: "%s | Solar ACM Systems",
  },
  description:
    "ที่ปรึกษาและผู้เชี่ยวชาญติดตั้งโซลาร์เซลล์ครบวงจรในไทย สำหรับบ้านพักอาศัย ธุรกิจ อุตสาหกรรม BESS และเครือข่าย EPC ลดค่าไฟ 50-70% คืนทุน 4-6 ปี",
  icons: {
    icon: "/Logo SolarACM.png",
  },
};

// ─── Viewport (Next.js 14+ pattern) — สำคัญสำหรับ mobile responsive
// ทำให้มือถือใช้ width จริงของอุปกรณ์ ไม่ใช่ virtual viewport 980px
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2D7D46",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
