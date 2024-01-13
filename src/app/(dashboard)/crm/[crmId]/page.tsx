import { PageLayout } from "@/components/PageLayout";
import CrmDetailClientPage from "./page-client";

export default function CrmDetailPage() {
  const crm = {
    name: 'Jacopo Zanti'
  }

  return (
    <PageLayout
      title={crm.name}
      paths={[
        { name: 'CRM', href: '/crm' }
      ]}
    >
      <CrmDetailClientPage />
    </PageLayout>
  )
}