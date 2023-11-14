import { authGuard } from "../actions";
import PageBox from "./PageBox";

export default async function Protected() {
  authGuard({
    redirect: "/login",
  });

  return (
    <PageBox/>
  )
}
