// ไฟล์นี้ใส่ใน app/epc/layout.js
export const metadata = {
  title: "เครือข่ายผู้รับเหมา EPC โซลาร์ที่ผ่านการคัดสรร",
  description:
    "เข้าถึงเครือข่ายผู้รับเหมา EPC โซลาร์เซลล์ที่ผ่านการคัดเกรดมาตรฐาน ตรวจสอบใบอนุญาต ผลงาน 20+ โครงการ ประกันภัยครบ รีวิว 4.0+ ดาว รับใบเสนอราคาจาก 3-5 ผู้รับเหมาเพื่อเปรียบเทียบ",
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
      "เครือข่ายผู้รับเหมาที่ผ่านการคัดสรร ตรวจสอบครบทุกด้าน รับใบเสนอราคาเปรียบเทียบ 3-5 ราย",
    url: "https://web-site-solar-acm.vercel.app/epc",
    images: [
      {
        url: "/Logo SolarACM.png",
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
