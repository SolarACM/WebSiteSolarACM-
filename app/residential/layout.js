// ไฟล์นี้ใส่ใน app/residential/layout.js
export const metadata = {
  title: "ที่ปรึกษาโซลาร์สำหรับบ้านพักอาศัย",
  description:
    "ประเมินระบบโซลาร์สำหรับบ้านจากบิลค่าไฟ พฤติกรรมการใช้ไฟ และข้อจำกัดของพื้นที่ พร้อมประสานผู้เชี่ยวชาญที่เหมาะกับหน้างาน",
  keywords: [
    "โซลาร์เซลล์บ้าน",
    "ติดตั้งโซลาร์บ้าน",
    "โซลาร์รูฟท็อป",
    "Solar Rooftop Residential",
    "โซลาร์เซลล์ราคา",
    "ลดค่าไฟบ้าน",
    "Longi Solar Panel",
    "Huawei Inverter",
  ],
  openGraph: {
    title: "โซลาร์เซลล์บ้าน | Solar ACM Systems",
    description:
      "ประเมินแนวทางระบบโซลาร์จากข้อมูลการใช้ไฟและสภาพพื้นที่จริง",
    url: "https://web-site-solar-acm.vercel.app/residential",
    images: [
      {
        url: "/images/residential/res-1.jpg",
        width: 1200,
        height: 630,
        alt: "Residential Solar Installation Thailand",
      },
    ],
  },
  alternates: {
    canonical: "/residential",
  },
};

export default function ResidentialLayout({ children }) {
  return children;
}
