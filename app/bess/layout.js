// ไฟล์นี้ใส่ใน app/bess/layout.js
export const metadata = {
  title: "ระบบกักเก็บพลังงาน BESS แบตเตอรี่ลิเธียม ใช้ไฟ 24 ชม.",
  description:
    "ติดตั้งระบบกักเก็บพลังงาน Battery Energy Storage System (BESS) ด้วยแบตเตอรี่ LFP จาก BYD และ Deye เก็บไฟฟ้าส่วนเกินจากโซลาร์ ใช้ได้ตลอด 24 ชม. ประหยัดค่าไฟ 80% แบ็คอัพไฟฉุกเฉิน",
  keywords: [
    "BESS",
    "Battery Energy Storage System",
    "ระบบกักเก็บพลังงาน",
    "แบตเตอรี่โซลาร์",
    "BYD Battery",
    "Deye Hybrid",
    "Solar Battery Thailand",
    "Off-Grid System",
    "Hybrid Inverter",
  ],
  openGraph: {
    title: "ระบบกักเก็บพลังงาน BESS | Solar ACM Systems",
    description:
      "เก็บพลังงานไว้ใช้เมื่อต้องการ ประหยัดค่าไฟ 80% แบ็คอัพไฟอัตโนมัติ พร้อมระบบไฮบริดอัจฉริยะ",
    url: "https://web-site-solar-acm.vercel.app/bess",
    images: [
      {
        url: "/Logo SolarACM.png",
        width: 1200,
        height: 630,
        alt: "Battery Energy Storage System BESS Thailand",
      },
    ],
  },
  alternates: {
    canonical: "/bess",
  },
};

export default function BESSLayout({ children }) {
  return children;
}
