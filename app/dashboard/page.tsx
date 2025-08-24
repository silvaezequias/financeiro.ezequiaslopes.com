import Layout from "@/components/Layout";
import ShortWallet from "@/components/dashboard/ShortWallet";
import Transactions from "@/components/dashboard/Transactions";
import { unauthorized } from "next/navigation";

export default async function DashboardPage() {
  // unauthorized();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ShortWallet />
          </div>
          <div className="lg:col-span-1">
            <Transactions />
          </div>
          <div className="lg:col-span-1">{/* <QuickBillPay /> */}</div>
        </div>

        {/* <BusinessMetrics /> */}
      </div>
    </Layout>
  );
}
