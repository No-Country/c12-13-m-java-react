import { useRouter } from "next/router";
import { SpaceProps } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
import { SpaceItem } from "@/components";

export default function SpacesList() {
  const router = useRouter();
  const { spaces } = useAppSelector((state) => state.client.spaces.spaces);

  const handleClick = (spaceId: string, settings = false) => {
    const path = `/client/${spaceId}${settings ? "/settings" : ""}`;
    router.push(path);
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      {Array.isArray(spaces) && spaces.map((item: SpaceProps) => (
        <SpaceItem
          item={item}
          handleClick={handleClick}
          handleClickConfig={handleClick}
        />
      ))}
    </div>
  );
}
