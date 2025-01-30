// app/dashboard/page.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">
        Welcome, {session.user.email}
      </p>
    </div>
  );
}
