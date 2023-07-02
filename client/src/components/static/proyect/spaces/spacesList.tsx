import { useRouter } from "next/router";
import { SpaceProps } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
import { SpaceItem } from "@/components";

export default function SpacesList() {
  const router = useRouter();
  const { spaces } = useAppSelector((state) => state.client.spaces);

  const handleClick = (spaceId: string, settings = false) => {
    const path = `/client/${spaceId}${settings ? "/settings" : ""}`;
    router.push(path);
  };

  return (
    <div className="mt-7 grid grid-cols-3 gap-4">
      {Array.isArray(spaces) && spaces.map((item: SpaceProps) => (
        <SpaceItem
          key={item.id}
          item={item}
          handleClick={handleClick}
          handleClickConfig={handleClick}
        />
      ))}
    </div>
  );
}
