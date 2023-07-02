import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Main, Image } from "@/components";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { session } = useAppSelector((state) => state.authSession);
  const { spaces, currentRoom, currentSpace, rooms } = useAppSelector(
    (state) => state.client.spaces
  );
  const { currentPage } = useAppSelector((state) => state.system.pagination);
  const router = useRouter();
  console.log(router);

  const lastPath = router.asPath.split("/").pop();
  console.log(lastPath);

  const navData = [
    {
      name: "Espacios",
      path: "/client",
      linkPath: "/client",
    },
    {
      name: "Rooms",
      path: "/client/[spaceId]",
      linkPath: "/client/" + currentSpace?.id,
    },
    {
      name: "Configuracion",
      path: "/client/[spaceId]/settings",
      linkPath: "/client/" + currentSpace?.id + "/settings",
    },
  ];

  return (
    <aside className="flex h-screen w-full flex-col gap-6  bg-white px-9 py-9">
      <div className="flex flex-col items-center gap-2">
        {navData.map((item, index) => (
          <div
            onClick={() => router.push(item.linkPath)}
            key={index}
            className={`flex items-center gap-2 ${
              router.pathname === item.path ? "bg-blue-500 text-white" : ""
            }`}
          >
            <p className="text-gray-900">{item.name}</p>
          </div>
        ))}
      </div>
      <hr className="w-full border-gray-300" />
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-blue-900"
        onClick={() => router.push("/client/" + currentSpace.id)}
        >De {currentSpace.name} </h3>
        {rooms.map((item, index) => (
          <div
            onClick={() =>
              router.push(/client/ + currentSpace.id + "/" + item.id)
            }
            key={index}
            className={`flex items-center gap-2 ${
              lastPath === item.id ? "bg-blue-500 text-white" : ""
            }`}
          >
            <p className="text-gray-900">{item.name}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
