import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("Login API called")

    const { email, password } = await request.json()
    console.log("Login attempt for email:", email)

    // Validate input
    if (!email || !password) {
      console.log("Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Authenticate user
    console.log("Attempting to authenticate user...")
    const authResult = await authenticateUser({ email, password })
    console.log("Authentication result:", { success: authResult.success, error: authResult.error })

    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error || "Authentication failed" }, { status: 401 })
    }

    console.log("Login successful for user:", authResult.user?.email)

    // Return user data (excluding password)
    return NextResponse.json({
      success: true,
      user: authResult.user,
    })
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
