export enum BookState {
    LOANED = "PRESTADO",
    DAMAGED = "DANADO",
    LOST = "PERDIDO",
    AVILABLE = "DISPONIBLE"
};


export type BookModel = {
    id: string,
    title: string,
    author: string;
    publicationDate: string;
    status: BookState
};