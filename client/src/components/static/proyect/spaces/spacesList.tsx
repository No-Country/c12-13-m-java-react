import { useRouter } from "next/router";
import { SpaceProps } from "@/utils/types/client/spaces";
import { useAppSelector } from "@/redux/hooks";
import { SpaceItem, ListTopArea, SpaceCreateForm } from "@/components";

export default function SpacesList() {
  const router = useRouter();
  const { spaces } = useAppSelector((state) => state.client.spaces.spaces);

  const handleClick = (spaceId: string, settings = false) => {
    const path = `/client/${spaceId}${settings ? "/settings" : ""}`;
    router.push(path);
  };

  return (
    <section className="listContainer2">
      <ListTopArea
        title="Mis espacios"
        description="Organiza tus proyectos"
        buttonText="Crear nuevo espacio"
        triggerIsAdmin={false}
        triggerContent={<SpaceCreateForm />}
      />
      <div className="gridContainer xl:grid-cols-4">
        {Array.isArray(spaces) &&
          spaces.map((item: SpaceProps) => (
            <SpaceItem
              item={item}
              handleClick={handleClick}
              handleClickConfig={handleClick}
            />
          ))}
      </div>
    </section>
  );
}
