import { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Dialog open={true}>
        <div>Dialog</div>
      <header className="App-header">
          21 Blackjack
      </header>
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" color="primary">
            Start Game
          </Button>
        )}
      </div>
      </Dialog>
    </div>
  );
}

export default App;