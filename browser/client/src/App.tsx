import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";

import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGitHubRedirect = () => {
    window.open("https://github.com/FahmidulHaquee/21-blackjack", "_blank");
  }

  const handleStartGame = () => {
    setOpen(false);
  }

  const renderDialog = () => {
    return (
      <Dialog open={open}>
        <DialogTitle className="text-center">21 Blackjack</DialogTitle>
        <DialogContent>Play Blackjack in your browser!</DialogContent>
        <DialogActions className="flex flex-row flex-nowrap justify-around items-center content-between w-full">
          <Button className="flex" variant="contained" color="primary" onClick={handleStartGame}>
            Start
          </Button>
          <Button className="flex" variant="contained" color="secondary">
            Tutorial
          </Button>
          <Fab className="flex" variant="extended" size="medium" onClick={handleGitHubRedirect}>
            <GitHubIcon />
          </Fab>
        </DialogActions>
      </Dialog>
    );
  };

  const renderBackground = () => {
    return (
      <div className="bg-black fixed inset-0 z-0">
        <div className="bg-black opacity-50 absolute inset-0 z-0"></div>
        <div className="bg-black opacity-25 absolute inset-0 z-0"></div>
        <div className="bg-black opacity-50 absolute inset-0 z-0"></div>
        <div className="bg-black opacity-75 absolute inset-0 z-0"></div>
      </div>
    );
  }

  return (
    <main>
      <div className="App">
      {loading ? (
        <CircularProgress />
      ) : (
        renderDialog()
      )}
    </div>
      {renderBackground()}
    </main>
    
  );
}

export default App;
