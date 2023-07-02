import React, { useState } from "react";
import { ModalBase } from "@/components";

type ModalTriggerProps = {
  triggerText: string;
  confirmText: string;
  triggerColor?: string;
  triggerClass?: string;
  confirmParagraph: string;
  trueAction: () => void;
  mustConfirm?: boolean;
};

export default function ConfirmationModal({
  confirmText,
  confirmParagraph,
  triggerText,
  triggerClass = "rounded-md  px-4 py-2 text-white",
  triggerColor = "bg-blue-500",
  mustConfirm = true,
  trueAction,
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrueAction = () => {
    trueAction();
    setIsOpen(false);
  };

  const handleTrigger = () => {
    if (mustConfirm) {
        setIsOpen(true);
    } else {
        trueAction();
    }
    };

  return (
    <div>
      <button
        className={`${triggerClass} ${triggerColor}`}
        onClick={handleTrigger}
      >
        {triggerText}
      </button>
      <ModalBase isOpen={isOpen} close={() => setIsOpen(false)} position="center-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-medium">{confirmText}</h3>
          <p className="text-gray-800">{confirmParagraph}</p>

          <div className="flex gap-5">
            <button
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
              onClick={handleTrueAction}
            >
              Confirmar
            </button>
            <button
              className="rounded-md bg-red-700 px-4 py-2 text-white"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </ModalBase>
    </div>
  );
}
