"use client"

import { authGuard, revalidate, revalidateAll } from '@/app/actions';
import authApi from '@/lib/api/AuthApi';
import useAuth from '@/lib/states/auth/useAuth';
import { useAlerts } from '@/lib/states/useAlerts';
import { useSidebar } from '@/lib/states/useSidebar';
import { MenuRounded } from '@mui/icons-material';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import DeskRoundedIcon from '@mui/icons-material/DeskRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, IconButton, Link, List, MenuItem, Stack, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme, useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { Logo } from './Logo';
import { defaulColor, useThemeState } from '@/lib/states/useThemeState';
import Cookie from '@/lib/Cookie';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Organization } from '@/abstractions/Organization';
import pulsarApi from '@/lib/api/PulsarApi';
import { LoadingButton } from '@mui/lab';

const drawerWidth = 240;

interface MiniDrawerProps {
  readonly children: React.ReactNode
  readonly organization?: Organization
  readonly organizations: Organization[]
}

export function MiniDrawer(props: MiniDrawerProps) {
  const { setColor } = useThemeState()

  const [openAddOrganization, setOpenAddOrganization] = React.useState(false)
  const [organization, setOrganization] = React.useState<Organization | undefined>(props.organization)

  React.useEffect(() => {
    setColor(organization?.settings?.color ?? defaulColor)
  }, [organization])

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

  const handleOrganizationChange = async (organization?: Organization) => {
    setOrganization(organization)
    await Cookie.set('organization-id', organization?.id ?? '')
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
              <Stack
                direction="column"
                sx={{
                  "& > .divider": {
                    marginTop: -1,
                    transition: theme => theme.transitions.create(['margin-top'])
                  },
                  "&:hover > .divider": {
                    marginTop: 1,
                  },
                  "& > button": {
                    opacity: 0,
                    pointerEvents: 'none',
                    transform: 'translateY(-12px)',
                    transition: theme => theme.transitions.create(['transform', 'opacity'])
                  },
                  "&:hover > button": {
                    opacity: 1,
                    pointerEvents: 'all',
                    transform: 'translateY(0px)',
                  }
                }}
              >
                <Stack
                  direction="row"
                >
                  <TextField
                    select
                    fullWidth
                    label='Organizzazione'
                    variant='outlined'
                    size='small'
                    onChange={(e) => handleOrganizationChange(props.organizations.find(o => o.id === e.target.value))}
                    value={organization?.id}
                  >
                    {props.organizations.map((option) => (
                      <MenuItem 
                        key={option.id} 
                        value={option.id}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 18,
                              height: 18,
                              borderRadius: 1,
                              background: option.settings?.color,
                            }}
                          />
                          <Typography>
                            {option.name}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </TextField> 
                </Stack>
                <Link
                  component="button"
                  variant='caption'
                  textAlign="left"
                  onClick={() => setOpenAddOrganization(true)}
                >
                  Aggiungi organizzazione
                </Link>
                <Divider
                  className="divider"
                  sx={{ 
                    marginBottom: 2
                  }}
                />
              </Stack>

              <DrawerItem
                href='/crm'
                text='CRM'
                icon={<PeopleRoundedIcon/>}
              />
              <DrawerItem
                href='/desks'
                text='Scrivanie'
                icon={<DeskRoundedIcon/>}
              />
              <DrawerItem
                href='/ndas'
                text='Ufficio (NDA)'
                icon={<ApartmentRoundedIcon/>}
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
          {props.children}
        </Box>
      </Box>

      <AddOrganizationDialog
        open={openAddOrganization}
        onClose={() => setOpenAddOrganization(false)}
      />

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



interface AddOrganizationDialogProps {
  readonly open: boolean
  readonly onClose: () => void
}

function AddOrganizationDialog(props: AddOrganizationDialogProps) {
  const { open: openAlert } = useAlerts()
  const [loading, setLoading] = React.useState(false)
  const [organization, setOrganization] = React.useState<Organization>({
    id: '',
    name: '',
    settings: { color: '' }
  })

  const disableSubmit = !organization.name || !organization.settings?.color

  const handleChange = <T extends keyof Organization>(key: T, value: Organization[T]) => {
    setOrganization({
      ...organization,
      [key]: value
    })
  }

  const handleSettings = <T extends keyof NonNullable<Organization['settings']>>(key: T, value: NonNullable<Organization['settings']>[T]) => {
    setOrganization({
      ...organization,
      settings: {
        ...organization.settings,
        [key]: value
      } as any
    })
  }

  const handleClose = () => {
    setOrganization({
      id: '',
      name: '',
      settings: { color: '' }
    })
    props.onClose()
  }

  const handleCreate = () => {
    setLoading(true)
    pulsarApi
      .organizations
      .create(organization)
      .then(() => openAlert({
        severity: 'success',
        message: 'Organizzazione creata con successo'
      }))
      .catch(() => openAlert({
        severity: 'error',
        message: 'Errore durante la creazione dell\'organizzazione'
      }))
      .finally(() => {
        setLoading(false)
        handleClose()
        revalidate('*')
      })
  }

  return (
    <Dialog
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleCreate()
      }}
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle>
        Aggiungi organizzazione
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="column"
          spacing={2}
        >
          <TextField
            fullWidth
            label='Nome'
            variant='outlined'
            size='small'
            value={organization.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <Stack
            direction="row"
            spacing={1}
          >
            <TextField
              fullWidth
              label='Colore'
              variant='outlined'
              size='small'
              value={organization.settings?.color}
              onChange={(e) => handleSettings('color', e.target.value)}
            />
            <Box
              sx={{
                minWidth: 40,
                height: 40,
                borderRadius: 1,
                boxShadow: theme => theme.shadows[1],
                border: theme => `1px solid ${theme.palette.divider}`,
                background: organization.settings?.color,
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant='outlined'
          onClick={handleClose}          
        >
          Chiudi
        </Button>
        <LoadingButton
          fullWidth
          disabled={disableSubmit}
          variant='contained'
          type='submit'
          loading={loading}
        >
          Aggiungi
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

function ThemeSwitcher() {
  const { mode, setMode } = useThemeState()

  return (
    <IconButton
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
    >
      {
        mode === 'light' ? (
          <DarkModeRoundedIcon/>
        ) : (
          <LightModeRoundedIcon/>
        )
      }
    </IconButton>
  )
}