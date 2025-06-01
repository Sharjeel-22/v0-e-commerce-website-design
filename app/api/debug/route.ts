import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/db"

export async function GET() {
  try {
    // Check environment variables
    const hasDbUrl = !!process.env.TURSO_DATABASE_URL
    const hasAuthToken = !!process.env.TURSO_AUTH_TOKEN

    // Test database connection
    const dbConnected = await testDatabaseConnection()

    return NextResponse.json({
      environment: {
        TURSO_DATABASE_URL: hasDbUrl ? "✅ Present" : "❌ Missing",
        TURSO_AUTH_TOKEN: hasAuthToken ? "✅ Present" : "❌ Missing",
      },
      database: {
        connection: dbConnected ? "✅ Connected" : "❌ Failed",
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Debug check failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
