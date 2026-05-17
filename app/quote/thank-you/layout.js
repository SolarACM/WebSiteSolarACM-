// หน้า Thank You ไม่ต้องให้ Google index — เป็นหน้าหลัง submission เท่านั้น
export const metadata = {
  title: "ขอบคุณสำหรับการขอใบเสนอราคา | Solar ACM Systems",
  description:
    "เราได้รับข้อมูลของคุณเรียบร้อยแล้ว ทีมที่ปรึกษาจะติดต่อกลับภายใน 24 ชั่วโมง",
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
