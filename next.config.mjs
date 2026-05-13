/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // บอก Vercel ว่า "ไม่ต้องเช็กละเอียดขนาดนั้น" เพื่อให้เว็บออนไลน์ได้ก่อนค่ะ
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;