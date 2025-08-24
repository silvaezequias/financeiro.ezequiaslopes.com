import { unauthorized } from "next/navigation";

export default async function DashboardPage() {
  unauthorized();

  return <div>Página não foi desenvolvida ainda</div>;
}
