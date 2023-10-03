import { Dialog, DialogProps } from "@mui/material";

export const CustomDialog = ({
  children,
  handleCloseDialog,
  isVisible,
}: {
  children: JSX.Element | JSX.Element[];
  handleCloseDialog: () => void;
  isVisible: boolean;
}) => {
  const handleCloseCustomDialog: DialogProps["onClose"] = (_, reason) => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
      return;
    handleCloseDialog();
  };

  return (
    <Dialog
      open={isVisible}
      onClose={handleCloseCustomDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown={false}
    >
      {children}
    </Dialog>
  );
};
