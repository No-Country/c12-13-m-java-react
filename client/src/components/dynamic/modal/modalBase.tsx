import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";

import { alpha, styled } from "@mui/material/styles";
type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  close: () => void;
  position: "center-center" | "bottom-right";
};

export default function ModalBase({
  isOpen,
  children,
  close,
  position,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleCloseTrue = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  //center-center es horizontal y vertical

  const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
      position: "fixed",
      bottom: position.includes("bottom" || "center") ? "0" : "",
      left: position.includes("left" || "center") ? "0" : "",
      right: position.includes("right" || "center") ? "0" : "",
      top: position.includes("top" || "center") ? "0" : "",

      padding: "40px",
      borderRadius: "20px",
      maxWidth: "85vw",
      maxHeight: "85vh",
      width: "max-content",
      height: "auto",
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.01)",
      margin: position === "center-center" ? "0" : "40px",
      // Otros estilos necesarios
    },
  }));

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          bottom: 0,
          position: "absolute",
        }}
      >
        <Image
          src="/icon/cross.svg"
          alt="close"
          width={16}
          height={16}
          onClick={handleClose}
          className="cursor-pointer absolute top-4 right-4"
        />

        {children}
      </StyledDialog>
    </div>
  );
}
