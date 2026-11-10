
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardClient from "./DashboardTemp";

export default async function DashboardPage() {
  // Get authentication cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  // If cookie does not exist, redirect to login
  if (!token) {
    redirect("/login");
  }

  // Verify JWT token
  const payload = await verifyToken(token);

  // If token is invalid, redirect to login
  if (!payload || !payload.sub) {
    redirect("/login");
  }

  // Show dashboard only after successful verification
  return <DashboardClient />;
}
