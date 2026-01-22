import { NextResponse } from "next/server";

export async function GET() {
  const robots = `
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/admin
Sitemap: https://novy-vector.online/sitemap.xml
  `.trim();

  return new NextResponse(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
