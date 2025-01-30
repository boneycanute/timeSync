// app/api/auth/store-tokens/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("🚀 Store tokens API route hit");

    const cookieStore = await cookies(); // No need to await
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore, // Pass the cookieStore directly
    });

    const data = await request.json();
    console.log("📌 Received tokens:", {
      hasAccessToken: !!data.access_token,
      hasProviderToken: !!data.provider_token,
      hasRefreshToken: !!data.provider_refresh_token,
      expiresIn: data.expires_in,
    });

    const { access_token, provider_token, provider_refresh_token, expires_in } =
      data;

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("❌ Failed to get session:", sessionError);
      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    console.log("📌 Session status:", {
      hasSession: !!session,
      userId: session?.user?.id,
    });

    if (session?.user?.id) {
      try {
        const { error: updateError } = await supabase
          .from("users")
          .update({
            google_access_token: provider_token,
            google_refresh_token: provider_refresh_token,
            google_token_expires_at: new Date(
              Date.now() + Number(expires_in) * 1000
            ).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", session.user.id);

        if (updateError) {
          console.error("❌ Failed to update user:", updateError);
          throw updateError;
        }

        console.log("✅ Successfully stored tokens for user:", session.user.id);
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error("❌ Database error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    } else {
      console.error("❌ No user session found");
      return NextResponse.json({ error: "No session" }, { status: 401 });
    }
  } catch (error) {
    console.error("❌ Store tokens error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
