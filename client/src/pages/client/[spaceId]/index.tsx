import { useRouter } from "next/router";
import { Main, Image } from "@/components";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
    SpaceProps,
    RoomsProps,
    MembersProps,
    TasksProps,
  } from "@/utils/types/client/spaces";
import {getRooms} from "@/redux/slices/client/spaces";
import { useEffect } from "react";

export default function Space() {
  const router = useRouter();
  const { spaceId } = router.query;
    const { rooms } = useAppSelector((state) => state.client.spaces);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRooms(spaceId as string));
        console.log("spaceId", spaceId);
    }, [spaceId]);

  return (
    <Main>
      <section className="h-screen bg-gray-100 px-[136px] py-[60px] ">
        <h1 className="text-2xl font-medium">Tus rooms</h1>
        <div className="mt-7 grid grid-cols-3 gap-4">
          {Array.isArray(rooms) && rooms.map((item: RoomsProps) => (
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
  );
}
