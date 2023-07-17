import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { ReactSVG } from "react-svg";

type BottomBarItemProps = {
  data: any;
  hasLogo: boolean;
  isRooms?: boolean;
};

export default function BottomBarItem({
  data,
  hasLogo,
  isRooms,
}: BottomBarItemProps) {
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
      {data.visible && (
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
      )}
    </>
  );
}
