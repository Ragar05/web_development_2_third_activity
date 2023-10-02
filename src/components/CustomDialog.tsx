import { Dialog, DialogProps } from "@mui/material";
import { useStoreContext } from "../context/Store.context";

export const CustomDialog = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { dialogVisible, handleCloseDialog } =
    useStoreContext();

  const handleCloseCustomDialog: DialogProps["onClose"] = (_, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
    handleCloseDialog();
  }

  return (
    <Dialog
      open={dialogVisible}
      onClose={handleCloseCustomDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown={false}
    >
      {children}
    </Dialog>
  );
};
