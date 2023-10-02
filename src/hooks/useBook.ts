import { useEffect, useState } from "react";
import { BookModel } from "../types/BookModel";
import { InMemoryService } from "../services/InMemory.service";
import { HttpPetitionMock } from "../mocks/HttpPetition.mock";
import { v4 as uuidV4 } from "uuid";
import { HttpResponseModel } from "../types/HttpResponse";

const MS_HTTP_MOCK = 1000;

export const useBook = () => {
  const [books, setBooks] = useState<Array<BookModel>>([]);

  useEffect(() => {
    const inMemory = InMemoryService.getInstance();
    const dataBooks = inMemory.getData<Array<BookModel>>("books");
    if (dataBooks && dataBooks.length > 0) {
      setBooks(dataBooks);
    }
  }, []);

  useEffect(() => {
      if(books.length > 0){
        const inMemory = InMemoryService.getInstance();
        inMemory.saveData("books", books);
      }
  }, [books, setBooks]);

  const addBook = async (data: Omit<BookModel, "id">) => {
    const bookSaved = new HttpPetitionMock<HttpResponseModel>().run(
      MS_HTTP_MOCK,
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
      MS_HTTP_MOCK,
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
