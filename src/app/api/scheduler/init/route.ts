import { NextResponse } from "next/server";
import { scheduler } from "lib/scheduler";

export async function GET() {
  console.log("[API] GET /api/scheduler/init called");
  console.log("[API] Scheduler started status:", scheduler["started"] ?? "unknown");
  
  return NextResponse.json({
    status: "ok",
    message: "Scheduler initialized",
  });
}
