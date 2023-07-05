import React from "react";
import { ModalTrigger } from "@/components";

type ListTopAreaProps = {
  title: string;
  description: string;
  buttonText: string;
  triggerContent?: React.ReactNode;
  controls?: boolean;
};

export default function ListTopArea({
  title,
  description,
  buttonText,
  triggerContent,
  controls = true,
}: ListTopAreaProps) {
  return (
    <div className="relative flex w-full items-center justify-between gap-10">
      <div className="flex flex-col items-start justify-center ">
        <h2 className="titulo-3">{title}</h2>
        <p className="bodyText ">{description}</p>
      </div>
      {
        controls && (
          <ModalTrigger triggerText={buttonText} buttonType="terceryButton" >{triggerContent}</ModalTrigger>
        )
      }
     
    </div>
  );
}
