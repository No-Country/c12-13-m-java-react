import React, { useState, useEffect } from "react";
import { ModalBase, CircularLoader } from "@/components";
import { createPortal } from "react-dom";

type ModalTriggerProps = {
  children: React.ReactNode;
  triggerText: string;
  buttonType?: "primaryButton" | "secondaryButton" | "terceryButton";
  alwaysOpen?: boolean;
  alwaysOpenCloser?: () => void;
  classname?: string;
  loading?: boolean;
  manualClose?: boolean;
};

export default function ModalTrigger({
  children,
  triggerText,
  buttonType,
  classname,
  alwaysOpen = false,
  loading = false,
  manualClose = false,
  alwaysOpenCloser = () => {},
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(alwaysOpen);

  useEffect(() => {
    if (manualClose === true) {
      setIsOpen(false);
    }
  }, [manualClose]);

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
          <>
            <div className={`z-0 ${loading && "opacity-0"}`}>{children}</div>
            {loading && (
              <div className="absolute left-0 rounded-[20px] top-0 flex h-full w-full items-center justify-center gap-3 bg-white ">
                <CircularLoader />
                <div>
                  <p className="subtitulo">Procesando</p>
                </div>
              </div>
            )}
          </>
        </ModalBase>,
        document.body
      )}
    </div>
  );
}
