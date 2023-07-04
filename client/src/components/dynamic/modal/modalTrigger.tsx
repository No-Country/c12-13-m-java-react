import React, { useState } from "react";
import { ModalBase } from "@/components";

type ModalTriggerProps = {
  children: React.ReactNode;
  triggerText: string;
  buttonType?: "primaryButton" | "secondaryButton" | "terceryButton";
};

export default function ModalTrigger({
  children,
  triggerText,
  buttonType,
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className={`${buttonType} whitespace-nowrap`}
        onClick={() => setIsOpen(true)}
      >
        {triggerText}
      </button>
      <ModalBase isOpen={isOpen} close={() => setIsOpen(false)} position="bottom-right">
        {children}
      </ModalBase>
    </div>
  );
}
