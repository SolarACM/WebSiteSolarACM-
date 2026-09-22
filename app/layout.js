import { Anuphan, Sora } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://web-site-solar-acm.vercel.app"),
  title: {
    default: "Solar ACM Systems | ที่ปรึกษาโครงการพลังงานสะอาด",
    template: "%s | Solar ACM Systems",
  },
  description:
    "ที่ปรึกษาโครงการโซลาร์และพลังงานสะอาดสำหรับบ้าน ธุรกิจ และโรงงาน พร้อมประสานเครือข่าย EPC ระบบกักเก็บพลังงาน และผลิตภัณฑ์ดูแลระบบโซลาร์",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "/",
    siteName: "Solar ACM Systems Corporation",
    title: "Solar ACM Systems | ที่ปรึกษาโครงการพลังงานสะอาด",
    description:
      "วางแผน ประสานงาน และคัดเลือกโซลูชันพลังงานให้เหมาะกับบ้าน ธุรกิจ และโรงงาน",
    images: [{ url: "/portfolio/project-08.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/Logo SolarACM.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#123328",
};

export default function RootLayout({ children }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Solar ACM Systems Corporation",
    url: "https://web-site-solar-acm.vercel.app",
    logo: "https://web-site-solar-acm.vercel.app/Logo%20SolarACM.png",
    telephone: "+66-95-309-5196",
    email: "mon-attention@hotmail.com",
  };

  return (
    <html lang="th" className={`${anuphan.variable} ${sora.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
      </body>
    </html>
  );
}
