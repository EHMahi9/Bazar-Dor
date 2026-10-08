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
      { message: error?.message || String(err), code: "INTERNAL_ERROR" },
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
    let message = error?.message || "Internal authentication error";
    if (
      message.includes("SSL alert number 80") ||
      message.includes("ServerSelectionError") ||
      message.includes("ECONNREFUSED")
    ) {
      message =
        "ডাটাবেস সংযোগ ব্যর্থ হয়েছে। MongoDB Atlas Network Access-এ 0.0.0.0/0 whitelist করা আছে কিনা নিশ্চিত করুন।";
    }
    return NextResponse.json(
      { message, code: "AUTH_ERROR", details: error?.message },
      { status: 500 }
    );
  }
};