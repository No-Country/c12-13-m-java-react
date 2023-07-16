import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

function Logo({ type }: any) {
  const router = useRouter();
  const { auth } = useAppSelector((state) => state.authSession);

  return (
    <ReactSVG
      onClick={() => router.push(auth.isLogged ? "/client" : "/")}
      src={type === "white" ? "/icon/logo-white.svg" : "/icon/logo.svg"}
      className="aspect-[98/30] h-[30px] w-[98px] cursor-pointer fill-current text-white lg:text-black"
    />
  );
}

type SidebarProps = {
  type: "client" | "account";
};

export default function Sidebar({ type }: SidebarProps) {
  const router = useRouter();
  const lastPath = router.asPath.split("/").pop();
  const { currentSpace, userIsAdminOfCurrentSpace } = useAppSelector(
    (state) => state?.client?.spaces.spaces
  );

  const { rooms } = useAppSelector((state) => state?.client?.spaces?.rooms);

  const { session } = useAppSelector((state) => state?.authSession);

  const spaceNavData = [
    {
      name: "Espacios",
      path: "/client",
      linkPath: "/client",
      visible: true,
      icon: "/icon/sidebar/espacios.svg",
    },
    {
      name: "Cuenta",
      path: "/client/account",
      linkPath: "/client/account",
      visible: true,
      icon: "/icon/sidebar/cuenta.svg",


    },
    {
      name: "Rooms",
      path: "/client/[spaceId]",
      linkPath: "/client/" + currentSpace?.id,
      visible: true,
      icon: "/icon/sidebar/rooms.svg",
    },
    {
      name: "Configuracion",
      path: "/client/[spaceId]/settings",
      linkPath: "/client/" + currentSpace?.id + "/settings",
      visible: userIsAdminOfCurrentSpace,
      icon: "/icon/sidebar/config.svg",
    },
    {
      name: "Miembros",
      path: "/client/[spaceId]/members",
      linkPath: "/client/" + currentSpace?.id + "/members",
      visible: true,
      icon: "/icon/sidebar/miembros.svg",
    },
    {
      name: "Archivos",
      path: "/client/[spaceId]/files",
      linkPath: "/client/" + currentSpace?.id + "/files",
      visible: true,
      icon: "/icon/sidebar/archivos.svg",
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
    <>
      <aside className="sidebar hidden bg-white lg:flex">
        <div className="sidebarInner">
          <Logo type="normal" />

          <div className="mt-8 flex flex-col items-start justify-start gap-8">
            <VerticalMenu
              title={type === "client" ? "GENERAL" : "CUENTA"}
              data={
                type === "client" ? spaceNavData.slice(0, 2) : accountNavData
              }
              hasLogo={true}
              isRooms={false}
            />
            {type === "client" && (
              <>
                <VerticalMenu
                  title={currentSpace?.name?.toUpperCase()}
                  data={spaceNavData.slice(2, 6)}
                  hasLogo={true}
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
      <div className="sidebarMobile seccion1-x fixed bottom-[0px] left-0 right-0 z-[10]  bg-white shadow-lg lg:hidden">
        <div className="flex items-center justify-between gap-2 py-3">
          {spaceNavData
            .slice(2,6)
            .map((item: any, index: any) => (
              <>
                <BottomBarItem
                  data={item}
                  hasLogo={true}
                  title={item.name}
                  isRooms={false}
                />
              </>
            ))}
        </div>
      </div>
    </>
  );
}

type BottomBarItemProps = {
  data: any;
  hasLogo: boolean;
  title: string;
  isRooms?: boolean;
};

function BottomBarItem({ data, hasLogo, title, isRooms }: BottomBarItemProps) {
  const router = useRouter();
  const { currentSpace } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

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
    {
      data.visible && (
    
      <div
        className="flex flex-col items-center justify-center gap-1"
        onClick={() => handleClick(data)}
      >
        <ReactSVG
          src={!hasLogo ? "/icon/default-sm.svg" : data.icon}
          className={`fill-current  ${
            colorChangeCondition(data)
              ? "rounded-full bg-blue-50 px-5 py-2 text-blue-700"
              : "px-5 py-2 text-black"
          }`}
        />
        <p
          className={`smalltext ${
            colorChangeCondition(data) ? "text-blue-700" : "text-black"
          }`}
        >
          {data.name}
        </p>
      </div>
      )
    }
    </>
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
  const { currentSpace } = useAppSelector(
    (state) => state?.client?.spaces?.spaces
  );

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
      <div className="flex flex-col items-start gap-4 ">
        <p className="smalltext font-medium text-blue-700">{title}</p>
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
