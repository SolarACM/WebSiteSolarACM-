import SolutionPage from "../_components/solution-page";

const data = {
  image: "/hero/bess-industrial.webp",
  imagePosition: "center 50%",
  th: {
    kicker: "Battery Energy Storage",
    title: "ระบบกักเก็บพลังงานควรเริ่มจากโจทย์ ไม่ใช่เริ่มจากขนาดแบตเตอรี่",
    lead: "BESS และ Hybrid เหมาะกับบางรูปแบบการใช้ไฟ การสำรองพลังงาน และการบริหารโหลด จึงควรศึกษาข้อมูลก่อนเลือกอุปกรณ์",
    imageAlt: "ระบบกักเก็บพลังงานด้วยแบตเตอรี่",
    imageLabel: "Battery Energy Storage System",
    imageNote: "ต้องประเมินตามโหลด เป้าหมาย และเงื่อนไขของพื้นที่",
    roleTitle: "ช่วยตั้งคำถามและประสานการศึกษาแนวทางระบบ",
    roleLead: "เราช่วยรวบรวมเป้าหมายการใช้งานและประสานผู้เชี่ยวชาญเพื่อศึกษาความเหมาะสม",
    rolePoints: ["ระบุเป้าหมาย เช่น สำรองไฟหรือใช้พลังงานช่วงกลางคืน", "ตรวจพฤติกรรมโหลดและระบบเดิม", "เปรียบเทียบ Hybrid กับโครงสร้างอื่น", "ประสานข้อมูลด้านอุปกรณ์และการติดตั้ง"],
    roleBoxTitle: "ข้อมูลสำคัญ",
    roleBox: "ประโยชน์และความคุ้มค่าของแบตเตอรี่แตกต่างกันมากตามหน้างาน เว็บไซต์จึงไม่แสดงตัวเลขประหยัดหรือระยะคืนทุนแบบเหมารวม",
    featuresTitle: "โจทย์ที่ควรตอบก่อนออกแบบ",
    features: [["ต้องการแก้ปัญหาอะไร","สำรองไฟ ลดพีค หรือเพิ่มการใช้พลังงานโซลาร์ให้มากขึ้น"],["โหลดสำคัญอยู่ช่วงไหน","กำลังไฟและระยะเวลาของโหลดสำคัญเป็นข้อมูลหลัก"],["ข้อจำกัดของพื้นที่","ตำแหน่งติดตั้ง ระบบป้องกัน และการระบายอากาศต้องพิจารณา"]],
    ctaTitle: "เริ่มประเมินความเหมาะสมของ BESS",
    ctaLead: "ส่งข้อมูลโหลด เป้าหมาย และระบบที่มีอยู่ เพื่อให้ทีมงานช่วยจัดคำถามสำหรับการศึกษาต่อ",
  },
  en: {
    kicker: "Battery Energy Storage",
    title: "Energy storage should start with the problem, not the battery size",
    lead: "BESS and Hybrid fit specific usage, backup, and load-management needs and should be studied before equipment selection.",
    imageAlt: "Battery energy storage system",
    imageLabel: "Battery Energy Storage System",
    imageNote: "Assessment depends on load, objectives, and site conditions",
    roleTitle: "Frame the right questions and coordinate the study",
    roleLead: "We organize use-case objectives and coordinate specialists for feasibility assessment.",
    rolePoints: ["Define backup, night-use, or peak-management goals", "Review load behavior and existing systems", "Compare Hybrid with other architectures", "Coordinate equipment and installation information"],
    roleBoxTitle: "Important context",
    roleBox: "Battery value varies greatly by site, so this website does not publish generic savings or payback claims.",
    featuresTitle: "Questions to answer before design",
    features: [["What problem should it solve?","Backup, peak reduction, or greater solar utilization"],["When are critical loads active?","Power and required duration are core inputs"],["What are the site constraints?","Location, protection, and ventilation must be considered"]],
    ctaTitle: "Begin a BESS suitability assessment",
    ctaLead: "Share load information, objectives, and existing system details for the next study steps.",
  },
};

export default function BessPage() { return <SolutionPage data={data} />; }
