// ไฟล์นี้ใส่ใน app/robots.js (ระดับเดียวกับ page.js หน้าหลัก)
// Next.js จะสร้าง /robots.txt อัตโนมัติ

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: "https://web-site-solar-acm.vercel.app/sitemap.xml",
    host: "https://web-site-solar-acm.vercel.app",
  };
}
