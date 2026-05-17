// SEO metadata สำหรับหน้า /quote
export const metadata = {
  title: "ขอใบเสนอราคาโซลาร์เซลล์ฟรี | Solar ACM Systems",
  description:
    "ขอใบเสนอราคาติดตั้งโซลาร์เซลล์ฟรี รับใบเสนอราคาภายใน 24 ชั่วโมง สำหรับบ้าน ธุรกิจ อุตสาหกรรม BESS และเครือข่าย EPC โดยทีมที่ปรึกษามืออาชีพ",
  keywords: [
    "ขอใบเสนอราคาโซลาร์",
    "ติดตั้งโซลาร์เซลล์ราคา",
    "ใบเสนอราคาโซลาร์ฟรี",
    "Solar Quote Thailand",
    "ปรึกษาโซลาร์เซลล์",
    "Free Solar Quote",
  ],
  openGraph: {
    title: "ขอใบเสนอราคาโซลาร์เซลล์ฟรี | Solar ACM Systems",
    description:
      "รับใบเสนอราคาฟรีภายใน 24 ชั่วโมง พร้อมคำแนะนำจากผู้เชี่ยวชาญ ไม่มีค่าใช้จ่ายและไม่มีข้อผูกมัด",
    url: "https://web-site-solar-acm.vercel.app/quote",
    images: [
      {
        url: "/Logo SolarACM.png",
        width: 1200,
        height: 630,
        alt: "Request Free Solar Quote Thailand",
      },
    ],
  },
  alternates: {
    canonical: "/quote",
  },
};

export default function QuoteLayout({ children }) {
  return children;
}
