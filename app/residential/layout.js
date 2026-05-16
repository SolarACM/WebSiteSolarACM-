// ไฟล์นี้ใส่ใน app/residential/layout.js
export const metadata = {
  title: "โซลาร์เซลล์บ้าน ติดตั้งโซลาร์รูฟท็อป ประหยัดค่าไฟ 70%",
  description:
    "เปลี่ยนหลังคาบ้านให้เป็นโรงไฟฟ้าส่วนตัว ติดตั้งโซลาร์เซลล์บ้านโดยทีมมืออาชีพ ใช้แผง Tier 1 Longi/Risen และ Inverter Huawei/Deye ลดค่าไฟ 50-70% คืนทุน 4-6 ปี รับประกัน 25 ปี",
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
      "เปลี่ยนหลังคาบ้านให้เป็นโรงไฟฟ้าส่วนตัว ประหยัดค่าไฟ 70% คืนทุน 4-6 ปี",
    url: "https://web-site-solar-acm.vercel.app/residential",
    images: [
      {
        url: "/Logo SolarACM.png",
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
