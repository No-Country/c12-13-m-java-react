import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

type SidebarProps = {
  type: "client" | "account";
};

export default function Sidebar({ type }: SidebarProps) {
  const router = useRouter();
  const lastPath = router.asPath.split("/").pop();
  const { currentSpace, userIsAdminOfCurrentSpace } = useAppSelector(
    (state) => state?.client?.spaces.spaces
  );

  const {rooms} = useAppSelector((state) => state?.client?.spaces?.rooms);

  const { session } = useAppSelector((state) => state?.authSession);

  const spaceNavData = [
    {
      name: "Espacios",
      path: "/client",
      linkPath: "/client",
      visible: true,
    },
    {
      name: "Rooms",
      path: "/client/[spaceId]",
      linkPath: "/client/" + currentSpace?.id,
      visible: true,
    },
    {
      name: "Configuracion",
      path: "/client/[spaceId]/settings",
      linkPath: "/client/" + currentSpace?.id + "/settings",
      visible: userIsAdminOfCurrentSpace,
    },
    {
      name: "Miembros",
      path: "/client/[spaceId]/members",
      linkPath: "/client/" + currentSpace?.id + "/members",
      visible: true,
    },
    {
      name: "Archivos",
      path: "/client/[spaceId]/files",
      linkPath: "/client/" + currentSpace?.id + "/files",
      visible: true,
    },
  ];

  const accountNavData = [
    {
      name: "Personal",
      path: "/client/account",
      linkPath: "/client/account",
      visible: true,
    },
    {
      name: "Seguridad",
      path: "/client/account/security",
      linkPath: "/client/account/security",
      visible: true,
    },
    {
      name: "Pagos",
      path: "/client/account/payments",
      linkPath: "/client/account/payments",
      visible: true,
    },
    {
      name: "Sesiones",
      path: "/client/account/sessions",
      linkPath: "/client/account/sessions",
      visible: true,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarInner">
        <div className="flex flex-col items-start justify-start gap-8">
          <VerticalMenu
            title={type === "client" ? "GENERAL" : "CUENTA"}
            data={type === "client" ? spaceNavData.slice(0, 1) : accountNavData}
            hasLogo={false}
            isRooms={false}
          />
          {type === "client" && (
            <>
              <VerticalMenu
                title={currentSpace?.name?.toUpperCase()}
                data={spaceNavData.slice(1, 5)}
                hasLogo={false}
                isRooms={false}
              />
              <VerticalMenu
                title="ROOMS"
                data={currentSpace?.rooms}
                hasLogo={false}
                isRooms={true}
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

type VerticalMenuProps = {
  data: any;
  hasLogo: boolean;
  title: string;
  isRooms?: boolean;
};

function VerticalMenu({ data, hasLogo, title, isRooms }: VerticalMenuProps) {
  const router = useRouter();
  const { currentSpace } = useAppSelector((state) => state?.client?.spaces?.spaces);

  const handleClick = (item: any) => {
    if (isRooms) {
      router.push("/client/" + currentSpace?.id + "/" + item.id);
    } else {
      router.push(item.linkPath);
    }
  };

  const colorChangeCondition = (item: any) => {
    if (isRooms) {
      return router.asPath === "/client/" + currentSpace?.id + "/" + item.id;
    } else {
      return router.pathname === item.path;
    }
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <p className="smalltext font-medium text-[#7B7C7D]">{title}</p>
        {Array.isArray(data) &&
          data.map((item: any, index: any) => (
            <>
              {(item.visible || isRooms) && (
                <div
                  onClick={() => handleClick(item)}
                  key={index}
                  className="flex items-start gap-2"
                >
                  <ReactSVG
                    src={!hasLogo ? "/icon/default.svg" : item.icon}
                    className={`h-6 w-6 fill-current ${
                      colorChangeCondition(item)
                        ? "text-blue-700"
                        : "text-black"
                    }`}
                  />
                  <p
                    className={`${
                      colorChangeCondition(item)
                        ? "text-blue-700"
                        : "text-black"
                    }`}
                  >
                    {item.name}
                  </p>
                </div>
              )}
            </>
          ))}
      </div>
    </>
  );
}
