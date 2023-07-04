import React, { useState } from "react";
import { ModalBase } from "@/components";

type ModalTriggerProps = {
  children: React.ReactNode;
  triggerText: string;
};

export default function ModalTrigger({
  children,
  triggerText,
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="terceryButton whitespace-nowrap"
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
