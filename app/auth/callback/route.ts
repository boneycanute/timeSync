// app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    console.log("🚀 Auth callback route hit");
    const url = new URL(request.url);
    console.log("📌 Full callback URL:", request.url);
    console.log("📌 Search params:", Object.fromEntries(url.searchParams));
    console.log("📌 Hash:", url.hash);

    // Create Supabase client
    const cookieStore = await cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    // Exchange code for session if present
    const code = url.searchParams.get("code");
    if (code) {
      console.log("🔄 Processing authorization code");
      const {
        data: { session },
        error,
      } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("❌ Code exchange error:", error);
        throw error;
      }

      console.log("✅ Session established:", {
        userId: session?.user?.id,
        email: session?.user?.email,
      });

      return NextResponse.redirect(`${url.origin}/dashboard`);
    }

    // Handle hash fragment with client-side script
    console.log("🔄 No code found, returning HTML to handle hash fragment");
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>TimeSync - Authenticating...</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background: white;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              color: #334155;
            }
            
            .container {
              text-align: center;
              padding: 2rem;
            }
            
            h1 {
              font-size: 1.5rem;
              margin-bottom: 1rem;
              color: #0f172a;
            }
            
            p {
              font-size: 1.1rem;
              margin-bottom: 2rem;
              color: #64748b;
            }
            
            .loader {
              width: 48px;
              height: 48px;
              border: 5px solid #e2e8f0;
              border-bottom-color: #3b82f6;
              border-radius: 50%;
              margin: 0 auto 1rem;
              animation: rotation 1s linear infinite;
            }
            
            .calendar-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
              animation: bounce 2s infinite;
            }
            
            @keyframes rotation {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            
            .fun-fact {
              max-width: 400px;
              margin: 2rem auto;
              padding: 1rem;
              background: #f8fafc;
              border-radius: 8px;
              font-size: 0.9rem;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="calendar-icon">📅</div>
            <h1>Syncing Your Time...</h1>
            <div class="loader"></div>
            <p>Hang tight while we set up your calendar magic! ✨</p>
            <div class="fun-fact">
              Did you know? The word "calendar" comes from the Latin "kalendae,"
              which was the first day of every Roman month when debts were due.
              Don't worry though - we're just here to help you manage time, not collect debts! 😄
            </div>
          </div>
          <script>
            (async function() {
              try {
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);
                
                if (params.get('access_token')) {
                  // First set the session
                  const sessionResponse = await fetch('/auth/callback/session', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(params))
                  });

                  if (!sessionResponse.ok) {
                    throw new Error('Failed to establish session');
                  }

                  // Then store the tokens
                  const response = await fetch('/api/auth/store-tokens', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(params))
                  });
                  
                  if (response.ok) {
                    window.location.href = '/dashboard';
                  } else {
                    throw new Error('Failed to store tokens');
                  }
                } else {
                  throw new Error('No access token found');
                }
              } catch (error) {
                console.error('Auth error:', error);
                window.location.href = '/auth-error';
              }
            })();
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  } catch (error) {
    console.error("❌ Auth callback error:", error);
    return NextResponse.redirect(`${new URL(request.url).origin}/auth-error`);
  }
}
