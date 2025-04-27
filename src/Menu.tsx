import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

interface MenuProps {
 onLogout: () => void;
}

const Menu: React.FC<MenuProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
    <Drawer
      variant="permanent"
      sx={{
        backgroundColor: 'var(--primary-background-color)',
        color: 'var(--primary-text-color)',
      }}
    >
    <List>
      <ListItemButton component={Link} to="#">
        <ListItemText primary="User" />
      </ListItemButton>
      <ListItemButton component={Link} to="/accounts/list">
        <ListItemText primary="Accounts" />
      </ListItemButton>
      <ListItemButton component={Link} to="/accounts/new">
        <ListItemText primary="Create Account" />
      </ListItemButton>
      <ListItemButton component={Link} to="#">
        <ListItemText primary="Transactions" />
      </ListItemButton>
      <ListItemButton>
        <Button variant="contained" onClick={handleLogout} sx={{ width: '100%' }}>
          Logout
        </Button>
      </ListItemButton>
    </List>
    </Drawer>
    </div>
  );
};

export default Menu;
