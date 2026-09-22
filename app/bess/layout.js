// ไฟล์นี้ใส่ใน app/bess/layout.js
export const metadata = {
  title: "ที่ปรึกษาระบบกักเก็บพลังงาน BESS",
  description:
    "ศึกษาความเหมาะสมของระบบกักเก็บพลังงาน BESS และ Hybrid จากเป้าหมาย โหลดไฟฟ้า และข้อจำกัดของพื้นที่",
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
      "ศึกษาความเหมาะสมของระบบกักเก็บพลังงานจากข้อมูลโหลดและเป้าหมายจริง",
    url: "https://web-site-solar-acm.vercel.app/bess",
    images: [
      {
        url: "/images/bess/bess-1.jpg",
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
