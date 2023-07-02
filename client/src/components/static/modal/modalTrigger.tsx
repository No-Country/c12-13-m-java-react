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
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
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
