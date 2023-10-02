import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";
import {
  Container,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StoreProvider } from "./context/Store.provider";
import { CustomDialog } from "./components/CustomDialog";
import { useEffect } from "react";
import { useForm } from "./hooks/useForm";
import { BookModel, BookState } from "./types/BookModel";

function App() {
  const { form, handleOnChange } = useForm<Omit<BookModel, "id">>({
    author: "",
    publicationDate: dayjs(new Date().toISOString()) as any,
    status: BookState.AVILABLE,
    title: "",
  });

  useEffect(() => console.log(form), [form]);
  // const {books, addBook, deleteBook} = useBook();
  return (
    <StoreProvider>
      <NavBar />
      <Container maxWidth="lg">
        <CustomDialog>
          <DialogTitle id="alert-dialog-title">Registrar Libro</DialogTitle>
          <DialogContent>
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
                label="Titulo"
                name="title"
                value={form.title}
                onChange={handleOnChange}
              />

              <TextField
                required
                id="outlined-required"
                label="Autor"
                name="author"
                value={form.author}
                onChange={handleOnChange}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de publicacion"
                  value={form.publicationDate}
                  onChange={(e) =>
                    handleOnChange({
                      target: {
                        name: "publicationDate",
                        value: dayjs(e).format("DD-MM-YYYY"),
                      },
                    } as any)
                  }
                />
              </LocalizationProvider>

              <FormControl style={{marginTop: 9}}>
                <InputLabel id="labelSelect">Estado del libro</InputLabel>
                <Select
                  labelId="labelSelect"
                  value={form.status}
                  label="Estado del libro"
                  onChange={(e) => {
                    handleOnChange({
                      target: {
                        name: "status",
                        value: e.target.value
                      }
                    } as any)
                  }}
                >
                  <MenuItem value={BookState.AVILABLE}>{BookState.AVILABLE}</MenuItem>
                  <MenuItem value={BookState.DAMAGED}>{BookState.DAMAGED}</MenuItem>
                  <MenuItem value={BookState.LOANED}>{BookState.LOANED}</MenuItem>
                  <MenuItem value={BookState.LOST}>{BookState.LOST}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Disagree</Button>
            <Button>Agree</Button>
          </DialogActions>
        </CustomDialog>
        <ToastContainer />
      </Container>
    </StoreProvider>
  );
}

export default App;
