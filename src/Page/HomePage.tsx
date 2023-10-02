import { Button, Container } from "@mui/material"
import { RegisterBookForm } from "../components/RegisterBookForm"
import { CustomTable } from "../components/CustomTable"
import { ToastContainer } from "react-toastify"
import { BOOKS_ACTIONS_CREATE, BOOK_TABLE_COLUMNS } from "../data/BookTable"
import { useStoreContext } from "../context/Store.context"
import { useCallback } from "react"

export const HomePage = () => {
    const { books, handleOpenDialog, deleteBook } = useStoreContext();

    const handleDeleteBook = useCallback(async (id: string) => {
        const dataDeleted = await deleteBook(id);
        alert(dataDeleted.message);
        return;
    }, []);

    const actions = BOOKS_ACTIONS_CREATE(handleDeleteBook);

    return (
        <Container maxWidth="lg">
            <RegisterBookForm />
            <Button variant="contained" style={{ marginTop: 5, marginBottom: 5 }} onClick={handleOpenDialog}>Agregar Libro</Button>
            <CustomTable columns={BOOK_TABLE_COLUMNS} rows={books} actions={actions} />
            <ToastContainer />
        </Container>
    )
}