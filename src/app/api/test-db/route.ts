import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const envCheck = {
    hasBetterAuthSecret: !!process.env.BETTER_AUTH_SECRET,
    hasBetterAuthUrl: !!process.env.BETTER_AUTH_URL,
    hasBetterAuthDbUrl: !!process.env.BETTER_AUTH_DB_URL,
    nodeEnv: process.env.NODE_ENV,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
  };

  try {
    const directUri =
      "mongodb://mahi24235001_db_user:ERuLMxUBpxYP01Ft@ac-4k3kkb3-shard-00-00.shcpuau.mongodb.net:27017,ac-4k3kkb3-shard-00-01.shcpuau.mongodb.net:27017,ac-4k3kkb3-shard-00-02.shcpuau.mongodb.net:27017/?ssl=true&replicaSet=atlas-10u5y4-shard-0&authSource=admin&appName=First";

    const client = new MongoClient(directUri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const ping = await client.db("bazardor_db").command({ ping: 1 });
    await client.close();

    return NextResponse.json({
      status: "ok",
      envCheck,
      ping,
      authObjectKeys: Object.keys(auth),
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      {
        status: "error",
        envCheck,
        message: error?.message || String(err),
        stack: error?.stack,
      },
      { status: 500 }
    );
  }
}
