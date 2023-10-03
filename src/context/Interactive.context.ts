import { createContext, useContext } from "react";

type Context = {
  isVisibleBookDialog: boolean;
  handleOpenBookDialog: () => void;
  handleCloseBookDialog: () => void;
  isVisibleSignInDialog: boolean;
  handleOpenSignInDialog: () => void;
  handleCloseSignInDialog: () => void;
};

export const interactiveContext = createContext<Context>({
  handleCloseBookDialog: () => {},
  handleCloseSignInDialog: () => {},
  handleOpenBookDialog: () => {},
  handleOpenSignInDialog: () => {},
  isVisibleBookDialog: false,
  isVisibleSignInDialog: false,
});

export const useInteractiveContext = () => useContext(interactiveContext);
