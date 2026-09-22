// ไฟล์นี้ใส่ใน app/epc/layout.js
export const metadata = {
  title: "การประสานเครือข่าย EPC โครงการโซลาร์",
  description:
    "Solar ACM ช่วยจัดข้อมูลและประสานเครือข่าย EPC ที่เหมาะกับขนาดงาน พื้นที่ และขอบเขตโครงการ โดยแยกบทบาทอย่างชัดเจน",
  keywords: [
    "EPC Contractor",
    "EPC Solar",
    "ผู้รับเหมาโซลาร์",
    "Solar Installer Thailand",
    "EPC Network",
    "ช่างติดตั้งโซลาร์",
    "บริษัทติดตั้งโซลาร์",
    "ใบเสนอราคาโซลาร์",
  ],
  openGraph: {
    title: "เครือข่ายผู้รับเหมา EPC | Solar ACM Systems",
    description:
      "ช่วยจัดข้อมูลและประสานเครือข่าย EPC ตามขอบเขตและความต้องการของโครงการ",
    url: "https://web-site-solar-acm.vercel.app/epc",
    images: [
      {
        url: "/images/epc/epc-1.jpg",
        width: 1200,
        height: 630,
        alt: "EPC Solar Contractor Network Thailand",
      },
    ],
  },
  alternates: {
    canonical: "/epc",
  },
};

export default function EPCLayout({ children }) {
  return children;
}
