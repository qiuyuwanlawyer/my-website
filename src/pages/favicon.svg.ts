import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  return new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="16" fill="#10223d"/>
      <circle cx="46" cy="18" r="8" fill="#f5d77b"/>
      <text x="18" y="43" font-size="30" font-family="Arial, sans-serif" font-weight="700" fill="#f6efe2">Q</text>
    </svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml"
      }
    }
  );
};
