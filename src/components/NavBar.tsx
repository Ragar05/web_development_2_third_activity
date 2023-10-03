import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuthContext } from "../context/Auth.context";
import { useInteractiveContext } from "../context/Interactive.context";

const NavBar = () => {
  const { user, logOut } = useAuthContext();
  const { handleOpenSignInDialog } = useInteractiveContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Biblioteca
          </Typography>
          {!user && (
            <Button color="inherit" onClick={() => handleOpenSignInDialog()}>
              Iniciar Sesion
            </Button>
          )}
          {user && (
            <>
              <Typography variant="button" component="div" sx={{ flexGrow: 1 }}>
                Bienvenido {user.fullname}
              </Typography>
              <Button color="inherit" onClick={() => logOut()}>
                Cerrar Sesion
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
