import { Dialog } from "@mui/material";
import { useStoreContext } from "../context/Store.context";

export const CustomDialog = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { dialogVisible, handleCloseDialog } =
    useStoreContext();
  return (
    <Dialog
      open={dialogVisible}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};
