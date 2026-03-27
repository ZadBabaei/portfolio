import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("github");
  revalidatePath("/");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export const GET = handleRevalidate;
export const POST = handleRevalidate;
