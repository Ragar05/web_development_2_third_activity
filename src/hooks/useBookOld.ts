import { useState } from "react";
import { BookModel } from "../types/BookModel";
import { HttpPetitionMock } from "../mocks/HttpPetition.mock";
import { v4 as uuidV4 } from "uuid";
import { HttpResponseModel } from "../types/HttpResponse";

export const useBook = () => {
  const [books, setBooks] = useState<Array<BookModel>>([]);

  const addBook = async (data: Omit<BookModel, "id">) => {
    const bookSaved = new HttpPetitionMock<HttpResponseModel>().run(
      1500,
      () => {
        setBooks((books) => [
          ...books,
          {
            ...data,
            id: uuidV4(),
          },
        ]);

        return {
          ok: true,
          message: "el libro se ha guardado de forma exitosa",
        };
      }
    );

    return bookSaved;
  };

  const deleteBook = async (bookId: string) => {
    const bookDeleted = new HttpPetitionMock<HttpResponseModel>().run(
      1500,
      () => {
        setBooks((books) => [...books.filter((x) => x.id !== bookId)]);

        return {
          ok: true,
          message: "el libro se ha eliminado de forma exitosa",
        };
      }
    );

    return bookDeleted;
  };

  return { books, addBook, deleteBook };
};
