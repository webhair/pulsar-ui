interface DashboardLayoutProps {
  readonly children: React.ReactNode;
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div>
      {props.children}
    </div>
  )
}
