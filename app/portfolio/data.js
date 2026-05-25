// ─── ข้อมูลผลงาน Spring Marketing Networking ─────────────────────
// คัดเฉพาะโครงการที่ติดตั้งภายใต้เครือข่ายของเรา
// ไม่เปิดเผยชื่อลูกค้า/ผู้รับเหมา — บอกเฉพาะประเภทธุรกิจ จังหวัด และขนาด

export const projects = [
  {
    id: 1,
    title: "โรงงานอุตสาหกรรม จ.สระบุรี",
    capacity: 92.8,
    type: "industrial",
    province: "สระบุรี",
    year: 2021,
    image: "/portfolio/project-01.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป On-Grid ขนาด 92.8 kWp ติดตั้งบนหลังคาโรงงานในจังหวัดสระบุรี รูปแบบ PPA ลูกค้าไม่ต้องลงทุน เริ่มจ่ายไฟเข้าระบบเดือนสิงหาคม 2564",
    highlights: ["PPA Project", "COD ส.ค. 2564", "92.8 kWp"],
  },
  {
    id: 2,
    title: "โรงงานอุตสาหกรรม จ.ชลบุรี",
    capacity: 162,
    type: "industrial",
    province: "ชลบุรี",
    year: 2021,
    image: "/portfolio/project-02.jpg",
    description:
      "ระบบโซลาร์รูฟท็อปขนาด 162 kWp สำหรับโรงงานในเขตอุตสาหกรรมจังหวัดชลบุรี รูปแบบสัญญา PPA ลูกค้าไม่ต้องลงทุน จ่ายไฟเข้าระบบเดือนสิงหาคม 2564",
    highlights: ["PPA Project", "COD ส.ค. 2564", "162 kWp"],
  },
  {
    id: 3,
    title: "โรงงานอุตสาหกรรมการผลิต จ.สมุทรปราการ",
    capacity: 928.8,
    type: "industrial",
    province: "สมุทรปราการ",
    year: 2022,
    image: "/portfolio/project-03.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป EPC ขนาด 928.8 kWp สำหรับโรงงานอุตสาหกรรมในเขตจังหวัดสมุทรปราการ ออกแบบ จัดหาวัสดุ และติดตั้งครบวงจร แล้วเสร็จเดือนมีนาคม 2565",
    highlights: ["EPC ครบวงจร", "COD มี.ค. 2565", "928.8 kWp"],
  },
  {
    id: 4,
    title: "โรงงานผลิตเฟอร์นิเจอร์ Knock-down จ.สมุทรสาคร",
    capacity: 525,
    type: "industrial",
    province: "สมุทรสาคร",
    year: 2022,
    image: "/portfolio/project-04.jpg",
    description:
      "ระบบโซลาร์รูฟท็อปขนาด 525 kWp สำหรับโรงงานผลิตเฟอร์นิเจอร์แบบ Knock-down จาก Particle Board และ MDF (เตียง ตู้ โต๊ะคอม) ส่งออก 20+ ประเทศทั่วโลก รูปแบบ PPA จ่ายไฟเข้าระบบมิถุนายน 2565",
    highlights: ["PPA Project", "ส่งออก 20+ ประเทศ", "525 kWp"],
  },
  {
    id: 5,
    title: "โรงงานผลิตเม็ดสีพลาสติก/Masterbatch จ.สมุทรปราการ",
    capacity: 697.1,
    type: "industrial",
    province: "สมุทรปราการ",
    year: 2022,
    image: "/portfolio/project-05.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป EPC ขนาด 697.1 kWp สำหรับโรงงานผลิตเม็ดสีพลาสติก Masterbatch และ Compound คุณภาพมาตรฐาน ISO 9001/14001 ติดตั้งครบวงจรแล้วเสร็จธันวาคม 2565",
    highlights: ["EPC ครบวงจร", "ISO 9001/14001", "697.1 kWp"],
  },
  {
    id: 6,
    title: "โรงงานและคลังสินค้าขนาดใหญ่",
    capacity: 778.8,
    type: "industrial",
    province: "ภาคกลาง",
    year: 2023,
    image: "/portfolio/project-06.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป EPC ขนาด 778.8 kWp สำหรับโรงงานและคลังสินค้าขนาดใหญ่ในเขตอุตสาหกรรม มุมสูงแสดงการติดตั้งครบวงจรบนหลังคาโรงงาน Steel Structure",
    highlights: ["EPC ครบวงจร", "Industrial Warehouse", "778.8 kWp"],
  },
  {
    id: 7,
    title: "โรงงานผลิต Wax และอุปกรณ์ศิลปะ จ.นนทบุรี",
    capacity: 839.3,
    type: "industrial",
    province: "นนทบุรี",
    year: 2023,
    image: "/portfolio/project-07.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป EPC ขนาด 839.3 kWp สำหรับโรงงานผลิตเทียน PE Wax และผลิตภัณฑ์ Arts & Crafts สำหรับเด็ก ส่งออก 80+ ประเทศ ผ่านมาตรฐาน ISO 9001 และ ASTM D-4236",
    highlights: ["EPC ครบวงจร", "ส่งออก 80+ ประเทศ", "839.3 kWp"],
  },
  {
    id: 8,
    title: "โรงงานผลิตท่อเหล็กไร้รอยต่อ (Seamless Steel Tube) จ.ระยอง",
    capacity: 959.2,
    type: "industrial",
    province: "ระยอง",
    year: 2023,
    image: "/portfolio/project-08.jpg",
    description:
      "ระบบโซลาร์รูฟท็อปขนาด 959.2 kWp สำหรับโรงงานผลิตท่อเหล็กไร้รอยต่อ (Seamless Carbon & Alloy Steel Pipe) มาตรฐาน API 5L / API 5CT / ISO 9001 กำลังการผลิต 60,000 ตัน/ปี ส่งออกทั่วโลก",
    highlights: ["Heavy Industry", "API/ISO Certified", "959.2 kWp"],
  },
  {
    id: 9,
    title: "ห้องเย็นและคลังสินค้าอาหารแช่แข็ง จ.สมุทรสาคร",
    capacity: 856.8,
    type: "industrial",
    province: "สมุทรสาคร",
    year: 2023,
    image: "/portfolio/project-09.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป EPC ขนาด 856.8 kWp สำหรับห้องเย็นและคลังสินค้าอาหารแช่แข็ง/Logistics ตอบโจทย์โหลดของระบบทำความเย็นที่ใช้ไฟตลอด 24 ชั่วโมง",
    highlights: ["Cold Storage", "ลด Demand ตลอด 24ชม.", "856.8 kWp"],
  },
  {
    id: 10,
    title: "โรงงานผลิตแป้งข้าว/เส้นหมี่/ก๋วยเตี๋ยว จ.นครปฐม",
    capacity: 973,
    type: "industrial",
    province: "นครปฐม",
    year: 2023,
    image: "/portfolio/project-10.jpg",
    description:
      "ระบบโซลาร์รูฟท็อป EPC ขนาด 973 kWp สำหรับโรงงานผลิตแป้งข้าวเจ้า แป้งข้าวเหนียว เส้นหมี่ ก๋วยเตี๋ยว และแป้งสำหรับขนม (Food Processing) ก่อตั้งมา 95 ปี ส่งออกทั่วโลก",
    highlights: ["Food Processing", "95+ ปีประสบการณ์", "973 kWp"],
  },
];

export const typeLabels = {
  residential: "บ้านพักอาศัย",
  industrial: "ธุรกิจ / อุตสาหกรรม",
  bess: "ระบบกักเก็บพลังงาน",
  epc: "EPC / Solar Farm",
};

export const typeColors = {
  residential: "#2D7D46",
  industrial: "#1a5e8a",
  bess: "#7B3FA0",
  epc: "#E8630A",
};
