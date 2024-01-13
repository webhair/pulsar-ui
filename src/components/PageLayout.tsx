"use client"

import { ArrowBackRounded } from "@mui/icons-material"
import { IconButton, Stack, Typography, Link as MuiLink, Breadcrumbs, Icon } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Link from "next/link";
interface PageLayoutProps {
  readonly children?: React.ReactNode
  readonly title: string
  readonly centerContent?: boolean
  readonly showBackButton?: boolean
  readonly paths?: { name: string, href: string }[]
  readonly onBack?: () => void
}

export function PageLayout(props: PageLayoutProps) {
  const router = useRouter()

  return (
    <Stack
      direction="column"
      alignItems={props.centerContent ? "center" : "unset"}
      spacing={2}
      sx={{ 
        position: 'relative',
        marginTop: { xs: 4, sm: 0 },
      }}
    >
      { props.paths && (<LayoutBreadcrumb paths={props.paths}/>) }
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: "100%" }}
      >
        {
          props.showBackButton &&
          <IconButton
            size="small"
            color="primary"
            onClick={props.onBack ?? router.back}
          >
            <ArrowBackRounded/>
          </IconButton>
        }
        <Typography
          variant="h5"
          fontWeight={600}
        >
          {props.title}
        </Typography>
      </Stack>
      {props.children}
    </Stack>
  )
}

interface LayoutBreadcrumbProps {
  readonly paths: { name: string, href: string }[]
}

function LayoutBreadcrumb(props: LayoutBreadcrumbProps) {
  return (
    <Stack
      sx={{ width: '100%' }}
    >
      <Breadcrumbs separator="›">
        <IconButton
          component={Link}
          href="/"
        >
          <GridViewRoundedIcon/>
        </IconButton>
        {
          props.paths.map((p, i) => {
            const isLast = i === (props.paths.length - 1)

            if(isLast) {
              return (
                <Typography 
                  key={i}
                  color="text.primary"
                >
                  {p.name}
                </Typography>
              )
            }

            return (
              <MuiLink
                key={i} 
                underline="hover" 
                color="inherit" 
                component={Link}
                href={p.href}
              >
                {p.name}
              </MuiLink>
            )
          })
        }
      </Breadcrumbs>
    </Stack>
  )
}