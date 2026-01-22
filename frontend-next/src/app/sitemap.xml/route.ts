import { NextResponse } from "next/server";

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://novy-vector.online/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://novy-vector.online/privacy-policy</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
