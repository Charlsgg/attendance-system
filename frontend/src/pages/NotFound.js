import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Typography variant="h4">404 - Page Not Found</Typography>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </Container>
  );
}
