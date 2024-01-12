"use client"

import { authGuard } from '@/app/actions';
import authApi from '@/lib/api/AuthApi';
import useAuth from '@/lib/states/auth/useAuth';
import { useAlerts } from '@/lib/states/useAlerts';
import { MenuRounded } from '@mui/icons-material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { AppBar, CircularProgress, Divider, Drawer, IconButton, List, Stack, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Logo } from './Logo';
import { useSidebar } from '@/lib/states/useSidebar';

const drawerWidth = 240;

export function MiniDrawer({ children }: { children: React.ReactNode }) {
  const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const { 
    open: openSidebar, 
    close: closeSidebar, 
    isOpen 
  } = useSidebar()  

  const [loading, setLoading] = React.useState(false)
  const { open: openAlert } = useAlerts()
  const { getDecodedAccessToken } = useAuth()
  const router = useRouter()

  const logout = () => {
    setLoading(true)
    authApi
      .logout()
      .then(handleSuccess)
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  const handleSuccess = () => {
    openAlert({
      severity: 'success',
      message: 'Logout effettuato con successo'
    })

    authGuard({
      redirect: '/login'
    })
  }

  const handleError = () => {
    openAlert({
      severity: 'error',
      message: 'Errore durante il logout'
    })
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      
      <Drawer 
        open={!isSm && isOpen}
        onClose={() => closeSidebar()}
        variant={isSm ? 'permanent' : 'temporary'}
        sx={{ width: drawerWidth }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{ height: '100%' }}
        >
          <Stack
            direction="column"
          >
            <Logo
              onClick={() => router.push('/')}
            />
            <List
              sx={{ paddingInline: 2 }}
            >
              <DrawerItem
                href='/templates'
                text='Template'
                icon={<DashboardRoundedIcon/>}
              />
              <DrawerItem
                href='/senders'
                text='Mittenti'
                icon={<PeopleAltRoundedIcon/>}
              />
              <DrawerItem
                href='/apps'
                text='Apps'
                icon={<AppsRoundedIcon/>}
              />
              <DrawerItem
                href='/recurring'
                text='Mail ricorrenti'
                icon={<EventRepeatRoundedIcon/>}
              />
              <DrawerItem
                href='/history'
                text='Storico'
                icon={<AccessTimeRoundedIcon/>}
              />
            </List>
          </Stack>
          <Stack
            direction="column"
            spacing={1}
            sx={{ 
              paddingInline: 2,
              paddingBlock: 1,
            }}
          >
            <Divider/>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Stack
                direction="column"
                spacing={0.5}
                sx={{
                  width: 'calc(100% - 56px)'
                }}
              >
                <Tooltip
                  title={getDecodedAccessToken()?.name}
                >
                  <Typography
                    variant='body1'
                    fontWeight={600}
                    color='text.primary'
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {getDecodedAccessToken()?.name}
                  </Typography>
                </Tooltip>
                <Tooltip
                  title={getDecodedAccessToken()?.email}
                >
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {getDecodedAccessToken()?.email}
                  </Typography>
                </Tooltip>
              </Stack>
              <Box
                position="relative"
              >
                {
                  loading && (
                    <CircularProgress
                      sx={{
                        position: 'absolute',
                      }}
                    />
                  )
                }
                <IconButton
                  onClick={() => logout()}
                >
                  <LogoutRoundedIcon/>
                </IconButton>
              </Box>
            </Stack>
            
          </Stack>
        </Stack>
        
      </Drawer>

      {
        !isSm && (
          <AppBar>
            <Stack
              direction="row"
              justifyContent="flex-start"
              sx={{
                width: '100%',
              }}
            >
              <IconButton
                onClick={() => openSidebar()}
              >
                <MenuRounded/>
              </IconButton>
            </Stack>
          </AppBar>
        )
      }

      <Box
        component="main"
        sx={{
          height: '100%',
          width: {
            xs: '100%',
            sm: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Box
          sx={{
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}


interface DrawerItemProps {
  readonly text: string
  readonly icon: React.ReactNode
  readonly href: string
}

function DrawerItem(props: DrawerItemProps) {
  const pathname = usePathname()
  const { close } = useSidebar()
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))

  const isActive = pathname.includes(props.href)

  return (
    <Tooltip
      title={props.text}
      placement="right"
    >
      <ListItem
        sx={{ display: 'block', marginBottom: 1.5 }}
      >
        <ListItemButton
          selected={isActive}
          component={Link}
          href={props.href}
          onClick={() => !mdUp && close()}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 1.5,
              justifyContent: 'center',
            }}
          >
            {props.icon}
          </ListItemIcon>
          <ListItemText
            primary={props.text}
          />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  )
}