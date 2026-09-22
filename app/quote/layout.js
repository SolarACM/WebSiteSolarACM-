// SEO metadata สำหรับหน้า /quote
export const metadata = {
  title: "ขอคำปรึกษาโครงการพลังงานและผลิตภัณฑ์ | Solar ACM",
  description:
    "ส่งข้อมูลเพื่อขอคำปรึกษาเรื่องโซลาร์ BESS การประสานงาน EPC หุ่นยนต์ทำความสะอาดแผง Kolchar และผลิตภัณฑ์ FIRESAVE",
  keywords: [
    "ขอใบเสนอราคาโซลาร์",
    "ติดตั้งโซลาร์เซลล์ราคา",
    "ใบเสนอราคาโซลาร์ฟรี",
    "Solar Quote Thailand",
    "ปรึกษาโซลาร์เซลล์",
    "Free Solar Quote",
  ],
  openGraph: {
    title: "ขอคำปรึกษาโครงการพลังงานและผลิตภัณฑ์ | Solar ACM",
    description:
      "เริ่มต้นจากข้อมูลที่คุณมี เพื่อให้ทีม Solar ACM ติดต่อกลับและประเมินคำขอเบื้องต้น",
    url: "https://web-site-solar-acm.vercel.app/quote",
    images: [
      {
        url: "/Logo SolarACM.png",
        width: 1200,
        height: 630,
        alt: "Solar ACM consultation request",
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
