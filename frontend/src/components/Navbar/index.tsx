import { firebaseAuth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import LoginModal from '../LoginModal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import styles from './styles/Navbar.module.css';
import useUserStore from '../../store/UserStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { appUser, logoutAppUser } = useUserStore((state) => ({
    appUser: state.appUser,
    logoutAppUser: state.logoutAppUser,
  }));
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        logoutAppUser();
      })
      .catch((error) => {
        console.error(error);
        toast('Logout failed!!');
      });
  };

  return (
    <AppBar position='static' className={styles.container}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters className={styles.toolbar}>
          <Typography variant='h4' className={styles.brand} onClick={() => navigate('/')}>
            plans
          </Typography>

          <Box className={styles.userProfileDetails}>
            {appUser ? (
              <>
                <Tooltip title='Open settings'>
                  <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                    <Avatar alt={appUser.name} src={appUser.photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  className={styles.userProfileMenu}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClick={handleCloseUserMenu}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key='logout' onClick={handleLogout}>
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <LoginModal />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
