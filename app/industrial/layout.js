// ไฟล์นี้ใส่ใน app/industrial/layout.js
export const metadata = {
  title: "ที่ปรึกษาโซลาร์สำหรับธุรกิจและโรงงาน",
  description:
    "วางแนวทางโครงการโซลาร์สำหรับธุรกิจและโรงงานจากข้อมูลโหลด เวลาเดินเครื่อง โครงสร้าง และเป้าหมายการลงทุน",
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
      "วางแนวทางโครงการโซลาร์จากข้อมูลโหลดและข้อจำกัดของพื้นที่จริง",
    url: "https://web-site-solar-acm.vercel.app/industrial",
    images: [
      {
        url: "/images/industrial/ind-1.jpg",
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
