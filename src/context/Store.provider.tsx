import { useState } from "react";
import { useBook } from "../hooks/useBook";
import { storeContext } from "./Store.context";

export const StoreProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { addBook, books, deleteBook } = useBook();
  const [dialogVisible, setDialogVisible] = useState(false);

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
