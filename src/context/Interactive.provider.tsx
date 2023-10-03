import { useCallback, useState } from "react";
import { interactiveContext } from "./Interactive.context";
export const InteractiveProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [isVisibleSignInDialog, setIsVisibleSignInDialog] = useState(false);
  const [isVisibleBookDialog, setIsVisibleBookDialog] = useState(false);

  const handleOpenSignInDialog = () => setIsVisibleSignInDialog(true);

  const handleCloseSignInDialog = () => setIsVisibleSignInDialog(false);

  const handleOpenBookDialog = () => setIsVisibleBookDialog(true);

  const handleCloseBookDialog = () => setIsVisibleBookDialog(false);

  return (
    <interactiveContext.Provider
      value={{
        handleCloseSignInDialog,
        handleOpenSignInDialog,
        isVisibleSignInDialog,
        handleCloseBookDialog,
        handleOpenBookDialog,
        isVisibleBookDialog,
      }}
    >
      {children}
    </interactiveContext.Provider>
  );
};
