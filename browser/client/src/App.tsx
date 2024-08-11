import { useState, useEffect } from "react";

import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import Background from "./Background";
import Game from "./components/Game";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [game, setGame] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGitHubRedirect = () => {
    window.open("https://github.com/FahmidulHaquee/21-blackjack", "_blank");
  };

  const handleStartGame = () => {
    setOpen(false);
    setGame(true);
  };

  const renderBackdrop = () => {
    return (
      <Backdrop
      open={true}
      style={{ zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    />
    );
  };

  const renderBackground = () => {
    return <Background />;
  };

  const renderDialog = () => {
    return (
      <Dialog open={open}>
        {loading ? (
          <DialogContent className="flex justify-center">
            <CircularProgress />
          </DialogContent> 
        ) : (
          <>
            <DialogTitle className="text-center">21 Blackjack</DialogTitle>
            <DialogContent>Play Blackjack in your browser!</DialogContent>
            <DialogActions className="flex flex-row flex-nowrap justify-around items-center content-between w-full">
              <Button
                className="flex"
                variant="contained"
                color="primary"
                onClick={handleStartGame}
              >
                Start
              </Button>
              <Button className="flex" variant="contained" color="secondary">
                Tutorial
              </Button>
              <Fab
                className="flex"
                variant="extended"
                size="medium"
                onClick={handleGitHubRedirect}
              >
                <GitHubIcon />
              </Fab>
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  };

  return (
    <main>
      <div className="App">
        {game ? <Game /> : renderDialog()}
      </div>
      {renderBackdrop()}
    </main>
  );
}

export default App;
