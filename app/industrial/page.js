import SolutionPage from "../_components/solution-page";

const data = {
  image: "/images/industrial/ind-1.jpg",
  th: {
    kicker: "Commercial & Industrial",
    title: "โซลาร์สำหรับธุรกิจและโรงงาน ที่ต้องคุยด้วยข้อมูลการดำเนินงานจริง",
    lead: "โหลดไฟฟ้า เวลาเดินเครื่อง โครงสร้างหลังคา และเป้าหมายทางธุรกิจ ล้วนมีผลต่อความคุ้มค่าและขอบเขตโครงการ",
    imageAlt: "ระบบโซลาร์บนหลังคาโรงงานอุตสาหกรรม",
    imageLabel: "Industrial solar rooftop",
    imageNote: "การออกแบบต้องอ้างอิงข้อมูลโหลดและสภาพพื้นที่จริง",
    roleTitle: "ช่วยจัดโจทย์ให้พร้อมก่อนเข้าสู่การออกแบบและเสนอราคา",
    roleLead: "เราช่วยรวบรวมความต้องการและประสานข้อมูลระหว่างเจ้าของโครงการกับเครือข่าย EPC",
    rolePoints: ["วิเคราะห์บิลและช่วงเวลาเดินเครื่อง", "กำหนดกรอบการเปรียบเทียบข้อเสนอ", "ประสานสำรวจโครงสร้างและระบบไฟฟ้า", "ช่วยติดตามข้อมูลโครงการและการสื่อสาร"],
    roleBoxTitle: "ขอบเขตบทบาท",
    roleBox: "Solar ACM ไม่อ้างเป็น EPC ของทุกโครงการ เราทำหน้าที่ที่ปรึกษาและผู้ประสาน โดยผู้ดำเนินงานจริงต้องระบุแยกตามสัญญาแต่ละโครงการ",
    featuresTitle: "ข้อมูลที่มีผลต่อการตัดสินใจ",
    features: [["Load profile","รูปแบบโหลดกลางวันและวันทำงานมีผลต่อพลังงานที่ใช้ได้จริง"],["โครงสร้างและงานไฟฟ้า","หลังคา จุดเชื่อมต่อ และข้อจำกัดหน้างานต้องตรวจสอบก่อน"],["รูปแบบการลงทุน","งบลงทุนและเงื่อนไขทางธุรกิจต้องถูกพิจารณาควบคู่กับเทคนิค"]],
    ctaTitle: "คุยกับทีมงานก่อนจัดทำขอบเขตโครงการ",
    ctaLead: "ส่งบิลค่าไฟและข้อมูลการเดินเครื่องเบื้องต้น เพื่อเตรียมคำถามสำหรับการสำรวจไซต์",
  },
  en: {
    kicker: "Commercial & Industrial",
    title: "Business and factory solar built around real operating data",
    lead: "Load, operating hours, roof structure, and business objectives all shape project value and scope.",
    imageAlt: "Industrial rooftop solar system",
    imageLabel: "Industrial solar rooftop",
    imageNote: "Design should follow real load and site information",
    roleTitle: "Prepare a clear brief before design and quotation",
    roleLead: "We help organize requirements and coordinate information between owners and EPC partners.",
    rolePoints: ["Review bills and operating hours", "Define a fair comparison framework", "Coordinate structural and electrical surveys", "Support project information flow"],
    roleBoxTitle: "Our role",
    roleBox: "Solar ACM does not present itself as EPC for every project. We act as consultant and coordinator; the executing party is identified per contract.",
    featuresTitle: "Information that affects the decision",
    features: [["Load profile","Daytime and operating-day loads affect usable solar energy"],["Structure and electrical works","Roof, interconnection, and site constraints need verification"],["Investment model","Commercial terms and technical direction should be evaluated together"]],
    ctaTitle: "Talk to us before defining project scope",
    ctaLead: "Share bills and basic operating information to prepare for a site survey.",
  },
};

export default function IndustrialPage() { return <SolutionPage data={data} />; }
