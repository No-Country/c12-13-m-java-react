import React, { useState } from "react";
import { ModalBase } from "@/components";
import { createPortal } from "react-dom";

type ModalTriggerProps = {
  children: React.ReactNode;
  triggerText: string;
  buttonType?: "primaryButton" | "secondaryButton" | "terceryButton";
  alwaysOpen?: boolean;
  alwaysOpenCloser?: () => void;
  classname?: string;
};

export default function ModalTrigger({
  children,
  triggerText,
  buttonType,
  classname,
  alwaysOpen = false,
  alwaysOpenCloser = () => {},
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(alwaysOpen);

  const handleClose = () => {
    if (alwaysOpen) {
      alwaysOpenCloser();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {!alwaysOpen && (
        <button
          className={`${buttonType} ${classname} whitespace-nowrap`}
          onClick={() => setIsOpen(true)}
        >
          {triggerText}
        </button>
      )}
      {createPortal(
        <ModalBase
          isOpen={isOpen}
          close={handleClose}
          position="center-center"
          setIsOpen={setIsOpen}
        >
          {children}
        </ModalBase>,
        document.body
      )}
    </div>
  );
}
