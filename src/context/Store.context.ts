import { createContext, useContext } from "react";
import { BookModel } from "../types/BookModel";

export const storeContext = createContext({
  books: [] as Array<BookModel>,
  addBook: async (data: Omit<BookModel, "id">) =>
    Promise.resolve({
      ok: true,
      message: "init method",
    }),

  deleteBook: async (bookId: string) =>
    Promise.resolve({
      ok: true,
      message: "init method",
    }),

  handleCloseDialog: () => {},
  handleOpenDialog: () => {},
  dialogVisible: true
});

export const useStoreContext = () => useContext(storeContext);
