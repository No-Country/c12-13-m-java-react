import * as React from "react";
import Image from "next/image";

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
          <div className="base fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#00000096]  p-[28px] sm:p-[30px]  md:p-[40px] lg:p-[60px] xl:p-[100px]">
            <div className="relative  flex  max-h-[85vh] w-full p-[28px]   rounded-[20px] bg-white sm:p-[30px] md:p-[40px]">
              <Image
                src="/icon/cross.svg"
                alt="close"
                width={16}
                height={16}
                onClick={handleClose}
                className="absolute right-4 top-4 cursor-pointer"
              />
              <div className="flex w-full flex-grow justify-center">
                {children}
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
