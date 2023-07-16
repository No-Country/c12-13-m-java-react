import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";
import { createPortal } from "react-dom";
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
  const handleClose = () => {
    setIsOpen(false);
    close();
  };


  return (
    <>
      
        <>
          {isOpen && (
            <div className="base fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#00000096]">
        
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

            </div>
          )}
        </>
    </>
  );
}
