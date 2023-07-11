import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";

import { alpha, styled } from "@mui/material/styles";
type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  close: () => void;
  position: "center-center" | "bottom-right";
};

export default function ModalBase({
  isOpen,
  children,
  close,
  setIsOpen,
  position,
}: Props) {
  const handleCloseTrue = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    close();
  };



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
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#00000096]">
          <div className="relative h-max max-h-[85vh] w-max max-w-[80vw] rounded-[20px] bg-white p-[40px]">
            <Image
              src="/icon/cross.svg"
              alt="close"
              width={16}
              height={16}
              onClick={handleClose}
              className="absolute right-4 top-4 cursor-pointer"
            />
            {children}
          </div>
          {/* <StyledDialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          bottom: 0,
          position: "absolute",
        }}
      >


        {children}
      </StyledDialog> */}
        </div>
      )}
    </>
  );
}
