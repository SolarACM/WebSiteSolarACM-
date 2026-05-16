// ไฟล์นี้ใส่ใน app/industrial/layout.js
export const metadata = {
  title: "โซลาร์เซลล์โรงงาน อุตสาหกรรม ลดต้นทุน 40-60%",
  description:
    "ติดตั้งโซลาร์เซลล์สำหรับโรงงานและอาคารพาณิชย์ ระบบขนาดใหญ่ด้วยอุปกรณ์เกรดอุตสาหกรรม Tier 1 รับประกันประสิทธิภาพ ลดต้นทุนไฟฟ้า 40-60% คืนทุน 3-5 ปี ติดตามผลแบบเรียลไทม์ 24/7",
  keywords: [
    "โซลาร์เซลล์โรงงาน",
    "โซลาร์อุตสาหกรรม",
    "Commercial Solar",
    "Industrial Solar Thailand",
    "Solar Factory",
    "ลดต้นทุนพลังงาน",
    "Solar EPC Commercial",
    "Sungrow Inverter",
  ],
  openGraph: {
    title: "โซลาร์เซลล์โรงงาน & อาคารพาณิชย์ | Solar ACM Systems",
    description:
      "ระบบโซลาร์ขนาดใหญ่สำหรับธุรกิจ ลดต้นทุน 40-60% คืนทุน 3-5 ปี รับประกันประสิทธิภาพ",
    url: "https://web-site-solar-acm.vercel.app/industrial",
    images: [
      {
        url: "/Logo SolarACM.png",
        width: 1200,
        height: 630,
        alt: "Commercial Industrial Solar Installation Thailand",
      },
    ],
  },
  alternates: {
    canonical: "/industrial",
  },
};

export default function IndustrialLayout({ children }) {
  return children;
}
