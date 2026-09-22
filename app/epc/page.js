import SolutionPage from "../_components/solution-page";

const data = {
  image: "/images/epc/epc-1.jpg",
  th: {
    kicker: "EPC Coordination",
    title: "ประสานเครือข่าย EPC ให้เหมาะกับขนาดงาน พื้นที่ และขอบเขตโครงการ",
    lead: "Solar ACM ช่วยเจ้าของโครงการจัดข้อมูลและประสานผู้ดำเนินงาน โดยแยกบทบาทของที่ปรึกษาและ EPC อย่างชัดเจน",
    imageAlt: "ทีมงานโครงการโซลาร์และเครือข่าย EPC",
    imageLabel: "Project & EPC coordination",
    imageNote: "ผู้ดำเนินการจริงต้องระบุในข้อเสนอและสัญญาของแต่ละโครงการ",
    roleTitle: "ลดความคลุมเครือก่อนเริ่มคุยเรื่องราคา",
    roleLead: "เราช่วยทำให้ขอบเขตและความต้องการของเจ้าของโครงการชัดขึ้น ก่อนประสานเครือข่ายที่เหมาะสม",
    rolePoints: ["จัดข้อมูลเบื้องต้นและวัตถุประสงค์โครงการ", "ช่วยกำหนดหัวข้อเปรียบเทียบข้อเสนอ", "ประสานนัดหมายและข้อมูลสำรวจไซต์", "แยกบทบาทและผู้รับผิดชอบให้ตรวจสอบได้"],
    roleBoxTitle: "ความโปร่งใสของบทบาท",
    roleBox: "Solar ACM เป็นผู้ประสานและที่ปรึกษา ไม่ควรถูกเข้าใจว่าเป็นผู้ติดตั้งทุกโครงการ ชื่อ EPC ผู้ดำเนินงานจะต้องยืนยันเป็นรายโครงการ",
    featuresTitle: "สิ่งที่ช่วยให้เปรียบเทียบ EPC ได้ดีขึ้น",
    features: [["ขอบเขตงานเดียวกัน","ข้อเสนอควรอ้างอิงขอบเขตและสมมติฐานชุดเดียวกัน"],["อุปกรณ์และการรับประกัน","ควรอ่านเงื่อนไขและผู้รับผิดชอบ ไม่ดูเฉพาะชื่อแบรนด์"],["เอกสารและการส่งมอบ","แบบ งานอนุญาต ทดสอบ และเอกสารหลังจบงานต้องถูกระบุ"]],
    ctaTitle: "มีโครงการและต้องการช่วยจัดโจทย์?",
    ctaLead: "ส่งข้อมูลเบื้องต้นเพื่อให้เราช่วยจัดประเด็นก่อนประสานเครือข่ายที่เหมาะสม",
  },
  en: {
    kicker: "EPC Coordination",
    title: "Coordinate EPC partners around project scale, location, and scope",
    lead: "Solar ACM helps owners organize information and coordinate delivery partners while keeping consultant and EPC roles clear.",
    imageAlt: "Solar project team and EPC network",
    imageLabel: "Project & EPC coordination",
    imageNote: "The executing party must be named in each project proposal and contract",
    roleTitle: "Reduce ambiguity before comparing price",
    roleLead: "We clarify owner requirements and scope before coordinating relevant network partners.",
    rolePoints: ["Organize project objectives and inputs", "Define quotation comparison topics", "Coordinate surveys and information", "Make roles and responsibilities traceable"],
    roleBoxTitle: "Role transparency",
    roleBox: "Solar ACM is a consultant and coordinator, not automatically the installer for every project. The executing EPC must be confirmed project by project.",
    featuresTitle: "What improves EPC comparison",
    features: [["Shared scope","Proposals should follow the same scope and assumptions"],["Equipment and warranty","Review responsible parties and terms, not only brand names"],["Documentation and handover","Design, permits, testing, and handover documents should be defined"]],
    ctaTitle: "Need help structuring a project brief?",
    ctaLead: "Share the basics so we can organize the brief before coordinating suitable partners.",
  },
};

export default function EpcPage() { return <SolutionPage data={data} />; }
