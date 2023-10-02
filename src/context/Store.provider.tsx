import { useState } from "react";
import { useBook } from "../hooks/useBookOld";
import { storeContext } from "./Store.context";

export const StoreProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { addBook, books, deleteBook } = useBook();
  const [dialogVisible, setDialogVisible] = useState(true);

  const handleCloseDialog = () => setDialogVisible(false);

  const handleOpenDialog = () => setDialogVisible(true);

  return (
    <storeContext.Provider
      value={{
        addBook,
        books,
        deleteBook,
        dialogVisible,
        handleCloseDialog,
        handleOpenDialog,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};
