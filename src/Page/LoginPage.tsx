import { Box, Container, TextField } from '@mui/material';
import { useForm } from '../hooks/useForm';
import { UserModel } from '../types/UserModel';

export const LoginPage = () => {

    const { form, handleOnChange, clearForm } = useForm<Omit<UserModel, "fullname">>({
        email: "",
        password: ""
    });

    return (
        <Container maxWidth="lg">
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Correo"
                    name="email"
                    value={form.email}
                    onChange={handleOnChange}
                />

                <TextField
                    required
                    id="outlined-required"
                    label="Contraseña"
                    name="password"
                    value={form.password}
                    onChange={handleOnChange}
                />
            </Box>
        </Container>
    )
}