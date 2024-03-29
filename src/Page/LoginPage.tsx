import {
  Box,
  Container,
  TextField,
  Button,
  Grid,
  CssBaseline,
  Avatar,
  Typography,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import { UserModel } from "../types/UserModel";
import { useAuthContext } from "../context/Auth.context";
import { LoginDialogForm } from "../components/SignInDialogForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormEvent, useEffect, useState } from "react";

export const LoginPage = () => {
  const [blockButton, setBlockButton] = useState(false);
  const { signUp, user } = useAuthContext();
  const { form, handleOnChange, clearForm } = useForm<Omit<UserModel, "id">>({
    email: "",
    password: "",
    fullname: "",
  });

  useEffect(() => {
    if (user) clearForm();
  }, [user]);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBlockButton(true);
    await signUp(form);
    setBlockButton(false);
  };

  return (
    <>
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
            Registro
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nombre completo"
                  name="fullname"
                  autoComplete="family-name"
                  value={form.fullname}
                  onChange={handleOnChange}
                />
              </Grid>
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
              sx={{ mt: 3, mb: 2 }}
              disabled={blockButton}
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Container>
      <LoginDialogForm />
    </>
  );
};
