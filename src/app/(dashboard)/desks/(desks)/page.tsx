import { PageLayout } from "@/components/PageLayout";
import DeskGridPage from "./page-client";

export default function DesksPage() {
  return (
    <PageLayout
      title="Scrivanie"
      paths={[
        { name: 'desks', href: '/desks' }
      ]}
    >
      <DeskGridPage />
    </PageLayout>
  )
}