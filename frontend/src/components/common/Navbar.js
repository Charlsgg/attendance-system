import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../context/authContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  // ... rest of the component
}