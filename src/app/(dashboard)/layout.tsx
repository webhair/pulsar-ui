import { MiniDrawer } from "@/components/MiniDrawer";
import { ReactNode } from "react";
import { authGuard } from "../actions";
import Cookie from '@/lib/Cookie';
import pulsarApi from "@/lib/api/PulsarApi";

interface LayoutProps {
  readonly children: ReactNode
}

export default async function Layout(props: LayoutProps) {
  authGuard({
    redirect: '/login',
  })

  const organization = await Cookie.get('organization-id')
  const res = await pulsarApi.organizations.load()

  return (
    <MiniDrawer
      organization={res.organizations.find(org => org.id === organization)}
      organizations={res.organizations}
    >
      {props.children}
    </MiniDrawer>
  )
}