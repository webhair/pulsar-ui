import { PageLayout } from "@/components/PageLayout";
import CrmClientPage from "./page-client";

export default function CrmPage() {
  return (
    <PageLayout
      title="CRM"
      paths={[
        { name: 'CRM', href: '/crm' }
      ]}
    >
      <CrmClientPage />
    </PageLayout>
  )
}