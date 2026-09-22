// หน้า Thank You ไม่ต้องให้ Google index — เป็นหน้าหลัง submission เท่านั้น
export const metadata = {
  title: "ได้รับข้อมูลแล้ว | Solar ACM",
  description:
    "Solar ACM ได้รับข้อมูลของคุณแล้ว และจะตรวจสอบเพื่อประสานงานในขั้นตอนถัดไป",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
  alternates: {
    canonical: "/quote/thank-you",
  },
};

export default function ThankYouLayout({ children }) {
  return children;
}
