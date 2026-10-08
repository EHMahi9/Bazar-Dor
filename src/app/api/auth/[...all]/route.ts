import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export const GET = async (req: NextRequest) => {
  try {
    return await handlers.GET(req);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Auth GET error:", error);
    return NextResponse.json(
      { error: error?.message || String(err), stack: error?.stack },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    return await handlers.POST(req);
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: error?.message || String(err), stack: error?.stack },
      { status: 500 }
    );
  }
};