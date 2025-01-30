import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("🚀 Session establishment route hit");

    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    const data = await request.json();
    console.log("📌 Received auth data:", {
      hasAccessToken: !!data.access_token,
      hasRefreshToken: !!data.refresh_token,
      expiresIn: data.expires_in,
    });

    const { access_token, refresh_token } = data;

    // Set the session using the tokens
    const { data: sessionData, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      console.error("❌ Failed to set session:", error);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.log(
      "✅ Session established for user:",
      sessionData.session?.user?.id
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Session establishment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
