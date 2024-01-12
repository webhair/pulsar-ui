import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import Image from "next/image";

interface LogoProps {
  readonly onClick?: () => void
}

export function Logo(props: LogoProps) {
  const logo = (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-start"
      alignItems="center"
      sx={{ margin: 2 }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: 1,
          overflow: 'hidden',
          backgroundColor: theme => theme.palette.primary.main,
          width: 32,
          height: 32,
        }}
      >
        <Image
          alt="Logo"
          src="/logo.jpeg"
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Typography
        variant="subtitle1"
        fontWeight={700}
      >
        Notification Center
      </Typography>
    </Stack>
  )

  if(props.onClick) {
    return (
      <ButtonBase
        onClick={props.onClick}
        sx={{ justifyContent: 'flex-start' }}
      >
        {logo}
      </ButtonBase>
    )
  }

  return logo
}