import dayjs from "dayjs";
import Box from "@mui/material/Box";
import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomDialog } from "./Custom/CustomDialog";
import { useForm } from "../hooks/useForm";
import { BookModel, BookState } from "../types/BookModel";
import { useStoreContext } from "../context/Store.context";
import { useState } from "react";
import { useInteractiveContext } from "../context/Interactive.context";

export const RegisterBookForm = () => {
  const [blockButtons, setBlockButtons] = useState(false);
  const { addBook } = useStoreContext();
  const { isVisibleBookDialog, handleCloseBookDialog } =
    useInteractiveContext();

  const { form, handleOnChange, clearForm } = useForm<Omit<BookModel, "id">>({
    author: "",
    publicationDate: dayjs(new Date().toISOString()) as any,
    status: BookState.AVILABLE,
    title: "",
  });

  const handleAddBook = async () => {
    setBlockButtons(true);

    if (
      form.author === "" &&
      form.publicationDate === "" &&
      form.title === ""
    ) {
      return alert("debe completar el formulario");
    }

    const taskAdded = await addBook({ ...form });

    if (taskAdded.ok) {
      alert(taskAdded.message);
      clearForm();
      handleCancelAddBook();
    }

    setBlockButtons(false);
  };

  const handleCancelAddBook = () => {
    clearForm();
    handleCloseBookDialog();
  };

  return (
    <CustomDialog
      isVisible={isVisibleBookDialog}
      handleCloseDialog={handleCloseBookDialog}
    >
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

          <FormControl style={{ marginTop: 9 }}>
            <InputLabel id="labelSelect">Estado del libro</InputLabel>
            <Select
              labelId="labelSelect"
              value={form.status}
              label="Estado del libro"
              onChange={(e) => {
                handleOnChange({
                  target: {
                    name: "status",
                    value: e.target.value,
                  },
                } as any);
              }}
            >
              <MenuItem value={BookState.AVILABLE}>
                {BookState.AVILABLE}
              </MenuItem>
              <MenuItem value={BookState.DAMAGED}>{BookState.DAMAGED}</MenuItem>
              <MenuItem value={BookState.LOANED}>{BookState.LOANED}</MenuItem>
              <MenuItem value={BookState.LOST}>{BookState.LOST}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={handleCancelAddBook}
          disabled={blockButtons}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleAddBook}
          disabled={blockButtons}
        >
          Agregar
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};
