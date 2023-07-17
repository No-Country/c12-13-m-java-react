import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hooks";
import { ReactSVG } from "react-svg";

type VerticalMenuProps = {
  data: any;
  hasLogo: boolean;
  title: string;
  isRooms?: boolean;
};

export default function VerticalMenu({
  data,
  hasLogo,
  title,
  isRooms,
}: VerticalMenuProps) {
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
