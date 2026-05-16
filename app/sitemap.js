// ไฟล์นี้ใส่ใน app/sitemap.js (ระดับเดียวกับ page.js หน้าหลัก)
// Next.js จะสร้าง /sitemap.xml อัตโนมัติให้ Google crawl

export default function sitemap() {
  const baseUrl = "https://web-site-solar-acm.vercel.app";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/residential`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industrial`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bess`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/epc`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
