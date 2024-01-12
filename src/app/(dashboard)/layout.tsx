import { MiniDrawer } from "@/components/MiniDrawer";
import { ReactNode } from "react";
import { authGuard } from "../actions";

interface LayoutProps {
  readonly children: ReactNode
}

export default function Layout(props: LayoutProps) {
  authGuard({
    redirect: '/login',
  })
  
  return (
    <MiniDrawer>
      {props.children}
    </MiniDrawer>
  )
}