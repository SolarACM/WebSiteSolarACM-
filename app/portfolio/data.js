// ─── ข้อมูลผลงาน ─────────────────────────────────────────────
// วิธีเพิ่มผลงานใหม่:
// 1. เพิ่ม object ใหม่ใน array ด้านล่าง
// 2. วางรูปภาพไว้ที่ public/portfolio/project-XX.jpg
// 3. ถ้ายังไม่มีรูป ให้ใส่ image: "" — จะแสดง gradient placeholder แทน

export const projects = [
  {
    id: 1,
    title: "บ้านพักอาศัย คุณสมชาย",
    capacity: 10,
    type: "residential",
    province: "กรุงเทพมหานคร",
    year: 2024,
    image: "/portfolio/project-01.jpg",
    description:
      "ติดตั้งระบบโซลาร์ On-Grid ขนาด 10 kWp บนหลังคาบ้านเดี่ยว 2 ชั้น ย่านพระราม 9 ลดค่าไฟได้กว่า 85% ต่อเดือน",
    highlights: ["ลดค่าไฟ 85%", "คืนทุนภายใน 5.5 ปี", "แผง LONGi 400W จำนวน 25 แผ่น"],
  },
  {
    id: 2,
    title: "บ้านพักอาศัย คุณวนิดา",
    capacity: 8,
    type: "residential",
    province: "เชียงใหม่",
    year: 2023,
    image: "/portfolio/project-02.jpg",
    description:
      "ระบบโซลาร์ Hybrid 8 kWp พร้อมแบตเตอรี่สำรองไฟ ติดตั้งบนหลังคากระเบื้อง ลดการพึ่งพาไฟฟ้าจากกริดได้กว่า 75%",
    highlights: ["ลดค่าไฟ 75%", "สำรองไฟได้ 6 ชั่วโมง", "คืนทุนภายใน 6 ปี"],
  },
  {
    id: 3,
    title: "ทาวน์โฮม คุณประยุทธ",
    capacity: 5,
    type: "residential",
    province: "สมุทรปราการ",
    year: 2024,
    image: "/portfolio/project-03.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 5 kWp สำหรับทาวน์โฮม 3 ชั้น เหมาะสำหรับครอบครัวขนาดกลาง ลดค่าไฟจากเดือนละ 3,500 เหลือไม่ถึง 500 บาท",
    highlights: ["ลดค่าไฟ 86%", "ติดตั้งเสร็จใน 1 วัน", "แผง Risen 400W จำนวน 12 แผ่น"],
  },
  {
    id: 4,
    title: "บ้านเดี่ยว คุณสุนิสา",
    capacity: 12,
    type: "residential",
    province: "ขอนแก่น",
    year: 2023,
    image: "/portfolio/project-04.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 12 kWp สำหรับบ้านเดี่ยวขนาดใหญ่ มีพื้นที่หลังคาเพียงพอ ใช้ Huawei Inverter สำหรับการติดตามพลังงานผ่านแอปพลิเคชัน",
    highlights: ["ลดค่าไฟ 88%", "Monitor ผ่านแอป", "คืนทุนภายใน 5 ปี"],
  },
  {
    id: 5,
    title: "บ้านพักอาศัย คุณภูมิ",
    capacity: 6,
    type: "residential",
    province: "ภูเก็ต",
    year: 2024,
    image: "/portfolio/project-05.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 6 kWp บนหลังคาบ้านพักตากอากาศ รับแสงแดดได้ดีเยี่ยม เนื่องจากภูเก็ตมีค่า Solar Irradiance สูงที่สุดในไทย",
    highlights: ["ผลผลิตไฟฟ้าสูงสุด", "ลดค่าไฟ 80%", "แผง LONGi 400W จำนวน 15 แผ่น"],
  },
  {
    id: 6,
    title: "บ้านพักอาศัย คุณณัฐ",
    capacity: 8,
    type: "residential",
    province: "นนทบุรี",
    year: 2022,
    image: "/portfolio/project-06.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 8 kWp ติดตั้งบนหลังคาเมทัลชีท ใช้อินเวอร์เตอร์ Deye รุ่น Hybrid รองรับการขยายเพิ่มแบตเตอรี่ในอนาคต",
    highlights: ["Hybrid Ready", "ลดค่าไฟ 78%", "รับประกัน 30 ปี"],
  },
  {
    id: 7,
    title: "โรงงาน ABC Manufacturing",
    capacity: 120,
    type: "industrial",
    province: "ระยอง",
    year: 2024,
    image: "/portfolio/project-07.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 120 kWp สำหรับโรงงานผลิตชิ้นส่วนยานยนต์ ติดตั้งบนหลังคาโรงงาน Steel Structure ลดต้นทุนพลังงานได้ 60%",
    highlights: ["ลดค่าไฟ 60%", "คืนทุนภายใน 4.5 ปี", "Huawei Smart PV Solution"],
  },
  {
    id: 8,
    title: "อาคารสำนักงาน XYZ Tower",
    capacity: 50,
    type: "industrial",
    province: "กรุงเทพมหานคร",
    year: 2023,
    image: "/portfolio/project-08.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 50 kWp สำหรับอาคารสำนักงาน 8 ชั้น ติดตั้งบนดาดฟ้าพร้อมระบบ Monitoring แบบ Real-time",
    highlights: ["ลดค่าไฟ 45%", "LEED Credit", "Real-time Monitoring"],
  },
  {
    id: 9,
    title: "โรงงานแปรรูปอาหาร สมาร์ทฟู้ด",
    capacity: 200,
    type: "industrial",
    province: "นครปฐม",
    year: 2024,
    image: "/portfolio/project-09.jpg",
    description:
      "ระบบโซลาร์ขนาด 200 kWp สำหรับโรงงานแปรรูปอาหาร ลดต้นทุนการผลิต ติดตั้งบนหลังคาพื้นที่ขนาดใหญ่ ใช้แผง Sungrow 3-Phase Inverter ระบบ Industrial Grade",
    highlights: ["ลดค่าไฟ 65%", "คืนทุนภายใน 4 ปี", "Sungrow Industrial Inverter"],
  },
  {
    id: 10,
    title: "ห้างสรรพสินค้า ซันพลาซ่า",
    capacity: 80,
    type: "industrial",
    province: "ชลบุรี",
    year: 2023,
    image: "/portfolio/project-10.jpg",
    description:
      "ระบบโซลาร์ On-Grid ขนาด 80 kWp สำหรับห้างสรรพสินค้า 3 ชั้น ติดตั้งบนดาดฟ้า ลดค่าไฟแอร์และไฟแสงสว่างได้อย่างมีนัยสำคัญ",
    highlights: ["ลดค่าไฟ 50%", "Green Building", "คืนทุนภายใน 5 ปี"],
  },
  {
    id: 11,
    title: "โรงแรม ซีบรีซ รีสอร์ท",
    capacity: 60,
    type: "industrial",
    province: "พัทยา",
    year: 2024,
    image: "/portfolio/project-11.jpg",
    description:
      "ระบบโซลาร์ขนาด 60 kWp สำหรับโรงแรมขนาด 80 ห้อง ลดต้นทุนพลังงานซึ่งเป็นค่าใช้จ่ายหลักของธุรกิจโรงแรม ปรับภาพลักษณ์ให้เป็น Eco-Friendly",
    highlights: ["ลดค่าไฟ 55%", "Eco-Friendly Brand", "คืนทุนภายใน 5 ปี"],
  },
  {
    id: 12,
    title: "บ้านพักอาศัย + BESS คุณมานะ",
    capacity: 10,
    type: "bess",
    province: "กรุงเทพมหานคร",
    year: 2024,
    image: "/portfolio/project-12.jpg",
    description:
      "ระบบ Solar + BESS ขนาด 10 kWp + แบตเตอรี่ BYD 20 kWh สำหรับบ้านพักอาศัย สามารถสำรองไฟได้ตลอดคืน ไม่ต้องพึ่งกริดในช่วงค่ำ",
    highlights: ["สำรองไฟ 8-10 ชั่วโมง", "BYD LiFePO4 Battery", "อิสระจากกริด 95%"],
  },
  {
    id: 13,
    title: "ระบบ BESS โรงงาน เพาเวอร์เทค",
    capacity: 100,
    type: "bess",
    province: "ปทุมธานี",
    year: 2024,
    image: "/portfolio/project-13.jpg",
    description:
      "ระบบ Solar + BESS ขนาด 100 kWp + แบตเตอรี่ 200 kWh สำหรับโรงงาน Peak Shaving ลด Demand Charge ในช่วงเวลา Peak ได้กว่า 70%",
    highlights: ["Peak Shaving 70%", "คืนทุนภายใน 5 ปี", "Deye Hybrid 3-Phase"],
  },
  {
    id: 14,
    title: "โครงการ EPC โซลาร์ฟาร์ม",
    capacity: 500,
    type: "epc",
    province: "สระบุรี",
    year: 2023,
    image: "/portfolio/project-14.jpg",
    description:
      "โครงการ EPC ขนาด 500 kWp สำหรับโครงการโซลาร์ฟาร์มเชิงพาณิชย์ บริหารงานทั้งโครงการตั้งแต่ Design, Procurement จนถึง Commissioning",
    highlights: ["EPC ครบวงจร", "แล้วเสร็จตามกำหนด", "ได้รับมาตรฐาน MEA/PEA"],
  },
  {
    id: 15,
    title: "Solar Farm อุดรธานี",
    capacity: 1000,
    type: "epc",
    province: "อุดรธานี",
    year: 2024,
    image: "/portfolio/project-15.jpg",
    description:
      "โครงการ EPC Solar Farm ขนาด 1 MWp เชื่อมต่อกริด MEA ใช้แผง LONGi Hi-MO 6 พร้อม Sungrow Central Inverter บริหารโครงการครบวงจรโดยทีม Solar ACM",
    highlights: ["1 MWp Utility Scale", "LONGi + Sungrow", "COD ตรงตามสัญญา"],
  },
];

export const typeLabels = {
  residential: "บ้านพักอาศัย",
  industrial: "ธุรกิจ/อุตสาหกรรม",
  bess: "ระบบกักเก็บพลังงาน",
  epc: "EPC / Solar Farm",
};

export const typeColors = {
  residential: "#2D7D46",
  industrial: "#1a5e8a",
  bess: "#7B3FA0",
  epc: "#E8630A",
};
