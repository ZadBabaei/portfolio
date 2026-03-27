import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  const adminPassword = (process.env.ADMIN_PASSWORD || "").trim();

  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not configured on server" },
      { status: 500 }
    );
  }

  if (password.trim() !== adminPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = Buffer.from(`admin:${Date.now()}`).toString("base64");

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 4,
    path: "/",
  });
  return response;
}
