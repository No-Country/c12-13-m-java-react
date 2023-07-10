import React from "react";
import { ModalTrigger } from "@/components";
import { useAppSelector } from "@/redux/hooks";

type ListTopAreaProps = {
  title: string;
  description: string;
  buttonText: string;
  triggerContent?: React.ReactNode;
  controls?: boolean;
  triggerIsAdmin?: boolean;
};

export default function ListTopArea({
  title,
  description,
  buttonText,
  triggerContent,
  controls = true,
  triggerIsAdmin = false,
}: ListTopAreaProps) {
  const { userIsAdminOfCurrentSpace } = useAppSelector( (state) => state.client.spaces);
  return (
    <div className="relative flex w-full items-center justify-between gap-10">
      <div className="flex flex-col items-start justify-center ">
        <h2 className="titulo-3">{title}</h2>
        <p className="bodyText ">{description}</p>
      </div>
      {
        controls && (triggerIsAdmin === userIsAdminOfCurrentSpace) && (
          <ModalTrigger triggerText={buttonText} buttonType="terceryButton" >{triggerContent}</ModalTrigger>
        )
      }
     
    </div>
  );
}
