import LoginBox from "@/components/LoginBox";
import { Stack } from "@mui/material";

export default async function Login() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
      }}
    >
      <LoginBox/>
    </Stack>
  )
}