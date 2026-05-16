import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://web-site-solar-acm.vercel.app"),

  title: {
    default: "Solar ACM Systems | ที่ปรึกษาโซลาร์เซลล์ครบวงจร อันดับ 1 ของไทย",
    template: "%s | Solar ACM Systems",
  },

  description:
    "ศูนย์รวมที่ปรึกษาและผู้เชี่ยวชาญติดตั้งโซลาร์เซลล์ครบวงจรสำหรับบ้านพักอาศัย ธุรกิจ และอุตสาหกรรม พร้อมระบบกักเก็บพลังงาน BESS และเครือข่ายผู้รับเหมา EPC ที่ผ่านการคัดสรร รับประกัน 25 ปี ประหยัดค่าไฟสูงสุด 70%",

  keywords: [
    "โซลาร์เซลล์",
    "โซลาร์เซลล์บ้าน",
    "โซลาร์เซลล์โรงงาน",
    "ติดตั้งโซลาร์เซลล์",
    "Solar Cell Thailand",
    "Solar Rooftop",
    "BESS",
    "Battery Energy Storage",
    "EPC Solar",
    "Huawei Solar",
    "Longi Solar",
    "Deye Inverter",
    "ระบบกักเก็บพลังงาน",
    "พลังงานสะอาด",
    "ลดค่าไฟ",
    "Solar ACM",
  ],

  authors: [{ name: "Solar ACM Systems Corporation" }],
  creator: "Solar ACM Systems Corporation",
  publisher: "Solar ACM Systems Corporation",

  verification: {
    google: "rSC-5M8IMM-NBJ4NS6YmJBQMdU8BzGpafPdJ9y2FGk8",
  },

  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: "en_US",
    url: "https://web-site-solar-acm.vercel.app",
    siteName: "Solar ACM Systems",
    title: "Solar ACM Systems | ที่ปรึกษาโซลาร์เซลล์ครบวงจร อันดับ 1 ของไทย",
    description:
      "ศูนย์รวมที่ปรึกษาและผู้เชี่ยวชาญติดตั้งโซลาร์เซลล์ครบวงจร ประหยัดค่าไฟสูงสุด 70% คืนทุนเร็ว 4-6 ปี รับประกัน 25 ปี",
    images: [
      {
        url: "/Logo SolarACM.png",
        width: 1200,
        height: 630,
        alt: "Solar ACM Systems - Thailand's Leading Solar Consultancy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Solar ACM Systems | ที่ปรึกษาโซลาร์เซลล์ครบวงจร อันดับ 1 ของไทย",
    description:
      "ประหยัดค่าไฟสูงสุด 70% คืนทุนเร็ว 4-6 ปี รับประกัน 25 ปี โดยทีมผู้เชี่ยวชาญ",
    images: ["/Logo SolarACM.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/Logo SolarACM.png",
  },

  category: "Energy & Solar",
};

export const viewport = {
  themeColor: "#2D7D46",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Solar ACM Systems Corporation",
              url: "https://web-site-solar-acm.vercel.app",
              telephone: "+66-95-309-5196",
              email: "mon-attention@hotmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "TH",
                addressLocality: "Bangkok",
              },
              description:
                "Thailand's leading solar consultancy providing residential, commercial and industrial solar installations.",
              areaServed: {
                "@type": "Country",
                name: "Thailand",
              },
              serviceType: [
                "Residential Solar Installation",
                "Commercial Solar Installation",
                "Industrial Solar Installation",
                "Battery Energy Storage System (BESS)",
                "EPC Contractor Network",
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
