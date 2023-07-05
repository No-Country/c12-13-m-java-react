import {
  Main,
  Image,
  LayoutSpaces,
  ConfirmationModal,
  ModalTrigger,
  MembersSpaceList,
  SpaceInfoCard,
  HeroSpaceArea,
  ListTopArea,
  Hr,
  TextToInput,
} from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  MembersProps,
  SpaceProps,
  RoomsProps,
} from "@/utils/types/client/spaces";
import { useState, useEffect } from "react";
import Head from "next/head";
import NextImage from "next/image";
import { getCurrentRoom } from "@/redux/slices/client/spaces";

export default function SpaceSettings() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces);

  return (
    <>
      <Head>
        <title>Configuracion del espacio | Spaces</title>
      </Head>
      <LayoutSpaces type="client">
        <HeroSpaceArea
          current={currentSpace}
          type="space"
          triggerText="Editar espacio"
        >
          <EditSpace />
        </HeroSpaceArea>
        <Hr hasPadding={false} />
        <section className=" flex flex-col gap-6">
          <ListTopArea
            title="Miembros"
            description="Administra los miembros de tu espacio"
            buttonText="Invitar a un amigo"
            controls={false}
          />
          <MembersSpaceList members={currentSpace.members} adminZone={true} />
        </section>
      </LayoutSpaces>
    </>
  );
}

function EditSpace() {
  const dispatch = useAppDispatch();
  //Datos que se muestran en el modal al principio
  const { currentSpace } = useAppSelector((state) => state.client.spaces);
  const { currentRoom: currentRoomRedux } = useAppSelector(
    (state) => state.client.spaces
  );

  //Datos para identificar el room seleccionado
  const [selectedRoom, setSelectedRoom] =
    useState<RoomsProps>(currentRoomRedux);

  //Datos que luego se enviaran al backend
  const [spaceData, setSpaceData] = useState<SpaceProps>(currentSpace);
  const [roomData, setRoomData] = useState<RoomsProps>(currentRoomRedux);

  //Index para saber que modal mostrar
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setSpaceData(currentSpace);
  }, [currentSpace]);

  useEffect(() => {
    dispatch(getCurrentRoom(selectedRoom.id));
  }, [selectedRoom]);

  const handleSave = () => {
    console.log(spaceData, roomData)
  };

  const sheetComponents = [
    <SheetSpace
      spaceData={spaceData}
      setSpaceData={setSpaceData}
      setIndex={setIndex}
    />,
    <SheetRooms
      spaceData={spaceData}
      setSpaceData={setSpaceData}
      setIndex={setIndex}
      setCurrentRoom={setSelectedRoom}
    />,
    <SheetCurrentRoom
      currentRoom={roomData}
      setCurrentRoom={setRoomData}
      setIndex={setIndex}
    />,
  ];

  return (
    <div className="max-w[50vw] flex w-[50vw]  flex-col gap-4 ">
      <h1 className="titulo-3 font-medium">Editar espacio</h1>
      {sheetComponents[index]}
      {index > 0 ? (
        <button
          onClick={() => setIndex(index - 1)}
          className="secondaryButton mt-4"
        >
          Volver
        </button>
      ) : (
        <button onClick={() => handleSave()} className="primaryButton mt-4">
          Guardar
        </button>
      )}
    </div>
  );
}

type SheetSpaceProps = {
  spaceData: SpaceProps;
  setSpaceData: (spaceData: SpaceProps) => void;
  setIndex: (index: number) => void;
};

function SheetSpace({ spaceData, setSpaceData, setIndex }: SheetSpaceProps) {
  return (
    <div className="flex gap-10 ">
      <div className="flex max-w-[30vw] flex-col gap-4 ">
        <TextToInput
          text={spaceData.name}
          setResultText={(text) => setSpaceData({ ...spaceData, name: text })}
          title="Nombre"
          inputTag="input"
        />
        <TextToInput
          text={spaceData.description}
          setResultText={(text) =>
            setSpaceData({ ...spaceData, description: text })
          }
          inputTag="textarea"
          title="Descripcion"
        />
        <div>
          <p className="bodyText text-blue-700">Rooms</p>
          <p className="bodyText ">
            Tu espacio cuenta con {spaceData.rooms.length} rooms
          </p>
          <button
            className="terceryButton mt-2 text-sm"
            onClick={() => setIndex(1)}
          >
            Editar rooms
          </button>
        </div>
      </div>
      <div className="flex max-w-[30vw] flex-col gap-4">
        <TextToInput
          text={spaceData.coverImage}
          setResultText={(text) =>
            setSpaceData({ ...spaceData, coverImage: text })
          }
          inputTag="image"
          title="Portada"
        />
      </div>
    </div>
  );
}

type SheetRoomsProps = {
  spaceData: SpaceProps;
  setSpaceData: (spaceData: SpaceProps) => void;
  setIndex: (index: number) => void;
  setCurrentRoom: (room: any) => void;
};
function SheetRooms({
  spaceData,
  setSpaceData,
  setIndex,
  setCurrentRoom,
}: SheetRoomsProps) {
  const handleClick = (room: any) => {
    setCurrentRoom(room);
    setIndex(2);
  };

  return (
    <div className="grid grid-cols-2">
      {spaceData.rooms.map((room, index) => (
        <div onClick={() => handleClick(room)}>{room.name}</div>
      ))}
    </div>
  );
}

type SheetCurrentRoomProps = {
  currentRoom: RoomsProps;
  setCurrentRoom: (room: any) => void;
  setIndex: (index: number) => void;
};

function SheetCurrentRoom({
  currentRoom,
  setCurrentRoom,
  setIndex,
}: SheetCurrentRoomProps) {
  return (
    <div className="flex gap-10 ">
      <div className="flex max-w-[30vw] flex-col gap-4 ">
        <TextToInput
          text={currentRoom.name}
          setResultText={(text) =>
            setCurrentRoom({ ...currentRoom, name: text })
          }
          title="Nombre"
          inputTag="input"
        />
        <TextToInput
          text={currentRoom.description}
          setResultText={(text) =>
            setCurrentRoom({ ...currentRoom, description: text })
          }
          inputTag="textarea"
          title="Descripcion"
        />
      </div>
      <div className="flex max-w-[30vw] flex-col gap-4">
        <TextToInput
          text={currentRoom.coverImage}
          setResultText={(text) =>
            setCurrentRoom({ ...currentRoom, coverImage: text })
          }
          inputTag="image"
          title="Portada"
        />
      </div>
    </div>
  );
}
