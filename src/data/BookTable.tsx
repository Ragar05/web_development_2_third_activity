import DeleteIcon from '@mui/icons-material/Delete';
import {
  IconButton,
} from "@mui/material";
import dayjs from 'dayjs';

export const BOOK_TABLE_COLUMNS = [
  { row: "title", title: "Titulo" },
  { row: "author", title: "Autor" },
  {
    row: "publicationDate",
    title: "Fecha de publicacion",
    format: (value: any) => {
      return dayjs(value as any).format("DD-MM-YYYY")
    }
  },
  { row: "status", title: "Estado" }
];

export const BOOKS_ACTIONS_CREATE = (handleDeleteBook: (...args: any[]) => void) => [
  {
    icon: ({ onClick }: { onClick: () => void }) => {
      return (
        <IconButton aria-label="delete" color="error" onClick={onClick}>
          <DeleteIcon />
        </IconButton>
      )
    },
    method: handleDeleteBook
  }
];