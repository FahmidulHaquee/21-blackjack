import { useEffect, useState } from "react";

import { Backdrop, Button, CircularProgress, Dialog } from "@mui/material";

function Game() {
  const [game, setGame] = useState(false);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center">
      
      {loading ? <CircularProgress /> : <h1>Game</h1>}
      

    </div>
  );
}

export default Game;
