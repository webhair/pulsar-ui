import { authGuard } from "../actions";

export default async function Dashboard() {
  authGuard({
    redirect: "/login",
  });

  return (
    "asdg"
  )
}
