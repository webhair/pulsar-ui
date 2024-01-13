interface CrmLayoutProps {
  readonly children?: React.ReactNode
  readonly dialogs: React.ReactNode
}

export default function CrmLayout(props: CrmLayoutProps) {
  return (
    <>
      {props.children}
      {props.dialogs}
    </>
  ) 
}