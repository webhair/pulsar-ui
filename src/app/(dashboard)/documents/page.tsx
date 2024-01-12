import { PageLayout } from "@/components/PageLayout";
import { DocumentsPageContent } from "./DocumentsPageContent";

export default async function DocumentsPage() {
  return (
    <PageLayout
      title="Documenti"
      paths={[
        { name: 'Documenti', href: '/documents' }
      ]}
    >
      <DocumentsPageContent/>
    </PageLayout>
  )
}