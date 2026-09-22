import SolutionPage from "../_components/solution-page";

const data = {
  image: "/hero/residential-solar.webp",
  imagePosition: "center 52%",
  th: {
    kicker: "Residential Solar",
    title: "โซลาร์สำหรับบ้าน เริ่มจากพฤติกรรมการใช้ไฟของครอบครัว",
    lead: "ประเมินระบบจากค่าไฟ ช่วงเวลาที่ใช้ไฟ และลักษณะบ้าน เพื่อหาแนวทางที่สมเหตุสมผลก่อนตัดสินใจลงทุน",
    imageAlt: "ระบบโซลาร์บนหลังคาบ้านพักอาศัย",
    imageLabel: "Solar rooftop สำหรับบ้าน",
    imageNote: "ขนาดและรูปแบบระบบขึ้นอยู่กับข้อมูลของแต่ละบ้าน",
    roleTitle: "ช่วยเจ้าของบ้านเปลี่ยนข้อมูลค่าไฟให้เป็นทางเลือกที่เข้าใจง่าย",
    roleLead: "Solar ACM ทำหน้าที่ให้คำปรึกษาเบื้องต้นและประสานผู้เชี่ยวชาญที่เหมาะกับหน้างาน",
    rolePoints: ["อ่านบิลค่าไฟและพฤติกรรมการใช้ไฟ", "เปรียบเทียบ On-Grid กับ Hybrid เมื่อมีเหตุผลรองรับ", "ประสานการสำรวจพื้นที่และข้อเสนอจากเครือข่าย", "ช่วยติดตามข้อมูลและคำถามก่อนตัดสินใจ"],
    roleBoxTitle: "ขอบเขตบทบาท",
    roleBox: "Solar ACM เป็นผู้ให้คำปรึกษาและผู้ประสานโครงการ ผู้ดำเนินการติดตั้งจริงเป็น EPC หรือผู้รับเหมาที่ได้รับการคัดเลือกสำหรับแต่ละงาน",
    featuresTitle: "สามเรื่องที่ควรรู้ก่อนเลือกระบบ",
    features: [["ใช้ไฟช่วงไหน","บ้านที่ใช้ไฟกลางวันและกลางคืนอาจเหมาะกับโครงสร้างระบบต่างกัน"],["ระบบไฟของบ้าน","ข้อมูล 1 เฟสหรือ 3 เฟสมีผลต่อการออกแบบและอุปกรณ์"],["พื้นที่และโครงสร้าง","ต้องสำรวจสภาพหลังคา จุดติดตั้ง และข้อจำกัดหน้างานก่อนสรุปแบบ"]],
    ctaTitle: "ส่งบิลค่าไฟให้เราช่วยดูเป็นจุดเริ่มต้น",
    ctaLead: "ไม่จำเป็นต้องรู้พื้นที่หลังคาเป็นตารางเมตรในขั้นแรก ทีมงานจะช่วยถามข้อมูลที่จำเป็นต่อไป",
  },
  en: {
    kicker: "Residential Solar",
    title: "Home solar should begin with how your household uses electricity",
    lead: "Assess the bill, usage timing, and home conditions before choosing an investment direction.",
    imageAlt: "Residential rooftop solar system",
    imageLabel: "Residential solar rooftop",
    imageNote: "System design depends on each home's actual information",
    roleTitle: "Turn electricity data into understandable options",
    roleLead: "Solar ACM provides initial consultation and coordinates suitable specialists for the site.",
    rolePoints: ["Review bills and usage patterns", "Compare On-Grid and Hybrid where relevant", "Coordinate site surveys and network proposals", "Support questions before a decision"],
    roleBoxTitle: "Our role",
    roleBox: "Solar ACM acts as consultant and project coordinator. Installation is carried out by the EPC or contractor selected for each project.",
    featuresTitle: "Three things to understand first",
    features: [["When power is used","Daytime and nighttime usage can lead to different system choices"],["Electrical phase","Single- or three-phase supply affects equipment and design"],["Site conditions","Roof, installation points, and constraints require a site survey"]],
    ctaTitle: "Start by sharing your electricity bill",
    ctaLead: "You do not need to know the exact roof area at this stage. Our team will guide the next questions.",
  },
};

export default function ResidentialPage() { return <SolutionPage data={data} />; }
