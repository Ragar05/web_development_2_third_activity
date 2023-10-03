import { Button, Container } from "@mui/material";
import { RegisterBookForm } from "../components/RegisterBookForm";
import { CustomTable } from "../components/Custom/CustomTable";
import { ToastContainer } from "react-toastify";
import { BOOKS_ACTIONS_CREATE, BOOK_TABLE_COLUMNS } from "../data/BookTable";
import { useStoreContext } from "../context/Store.context";
import { useCallback } from "react";
import { useInteractiveContext } from "../context/Interactive.context";

export const HomePage = () => {
  const { books, deleteBook } = useStoreContext();
  const { handleOpenBookDialog } = useInteractiveContext();

  const handleDeleteBook = useCallback(async (id: string) => {
    const dataDeleted = await deleteBook(id);
    alert(dataDeleted.message);
    return;
  }, []);

  const actions = BOOKS_ACTIONS_CREATE(handleDeleteBook);

  return (
    <Container maxWidth="lg">
      <RegisterBookForm />
      <Button
        variant="contained"
        style={{ marginTop: 5, marginBottom: 5 }}
        onClick={handleOpenBookDialog}
      >
        Agregar Libro
      </Button>
      <CustomTable
        columns={BOOK_TABLE_COLUMNS}
        rows={books}
        actions={actions}
      />
      <ToastContainer />
    </Container>
  );
};
