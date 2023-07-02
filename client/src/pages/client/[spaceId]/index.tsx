import { useRouter } from "next/router";
import { Main, Image, LayoutSpaces } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  SpaceProps,
  RoomsProps,
  MembersProps,
  TasksProps,
} from "@/utils/types/client/spaces";
import { getRooms, getCurrentSpace } from "@/redux/slices/client/spaces";
import { useEffect } from "react";

export default function Space() {
  const router = useRouter();
  const { spaceId } = router.query;
  const { rooms, currentSpace } = useAppSelector(
    (state) => state.client.spaces
  );
console.log(router)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentSpace(spaceId as string));
    dispatch(getRooms(spaceId as string));
    
    console.log("spaceId", spaceId);
  }, [spaceId]);

  return (
    <LayoutSpaces>
    <Main>
      <section className="flex h-screen flex-col gap-5 bg-gray-100 px-[60px] py-[60px] ">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-7">
          <Image
            src={currentSpace.coverImage}
            alt="SpaceCover"
            layout="fill"
            width="w-[80px]"
            height="w-[80px]"
            aspectRatio="aspect-[1/1]"
            rounded="rounded-[20px]"
          />
          <div className="flex w-full flex-row-reverse justify-between">
            <button className="rounded-3xl bg-blue-500 px-4 py-2 text-white">
              Invitar miembros
            </button>
            <div className="">
              <h1 className="text-2xl font-medium">{currentSpace.name}</h1>
              <p className=" text-gray-900">{currentSpace.description}</p>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-medium">Tus rooms</h1>
        <div className=" grid grid-cols-3 gap-4">
          {Array.isArray(rooms) &&
            rooms.map((item: RoomsProps) => (
              <div
                key={item.id}
                className="flex h-auto cursor-pointer flex-col gap-2 rounded-3xl bg-white p-4"
                onClick={() => {
                  router.push(`/client/${spaceId}/${item.id}`);
                }}
              >
                <Image
                  src={item.coverImage}
                  alt="SpaceCover"
                  layout="fill"
                  width="w-[100%]"
                  height="w-[100%]"
                  aspectRatio="aspect-[4/3]"
                  rounded="rounded-[20px]"
                />
                <div>
                  <p>{item.name}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Main>
    </LayoutSpaces>
  );
}
