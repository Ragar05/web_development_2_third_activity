import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { CustomDialog } from "./Custom/CustomDialog";
import { useForm } from "../hooks/useForm";
import { UserModel } from "../types/UserModel";
import { useEffect, useState, FormEvent } from 'react';
import { useInteractiveContext } from "../context/Interactive.context";
import { useAuthContext } from "../context/Auth.context";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const LoginDialogForm = () => {
  const [blockButtons, setBlockButtons] = useState(false);

  const { signIn, user } = useAuthContext();
  const { isVisibleSignInDialog, handleCloseSignInDialog } =
    useInteractiveContext();

  const { form, handleOnChange, clearForm } = useForm<
    Omit<UserModel, "fullname" | "id">
  >({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) handleCloseSignInDialog();
  }, [user]);

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBlockButtons(true);
    await signIn(form);
    setBlockButtons(false);
  };
  const handleCancelSignIn = () => {
    clearForm();
    handleCloseSignInDialog();
  }

  return (
    <CustomDialog
      isVisible={isVisibleSignInDialog}
      handleCloseDialog={handleCloseSignInDialog}
    >
      <DialogContent>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignIn}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              disabled={blockButtons}
            >
              Iniciar Sesion
            </Button>
            <Button
              type="button"
              fullWidth
              color="error"
              variant="contained"
              sx={{ mt: 0.1, mb: 2 }}
              onClick={handleCancelSignIn}
              disabled={blockButtons}
            >
             Cancelar
            </Button>
          </Box>
        </Box>
      </Container>
      </DialogContent>
    </CustomDialog>
  );
};
