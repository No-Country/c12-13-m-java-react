import { useAppSelector } from "@/redux/hooks";
import { frontUrl } from "@/data/config";
import { toast } from "sonner";
import { toastSuccess } from "@/utils/toastStyles";
export default function SpaceInvite() {
  const { currentSpace } = useAppSelector((state) => state.client.spaces.spaces);
  //localhost:3000/client/joinspace?spaceName=NoCountry&spaceId=64a9cfaab7cbe175e2fc439e&accessCode=1234
  const invitationLink = `${frontUrl}client/joinspace?spaceName=${currentSpace?.name}&spaceId=${currentSpace?.id}&accessCode=${currentSpace?.accessCode}`;

  const handleShare = async () => {
    //copiamos el link al portapapeles
    await navigator.clipboard.writeText(invitationLink);
  toast.success("Link copiado al portapapeles", toastSuccess);
  };

  return (
    <>
      <div>
        <h1 className="titulo-3 font-medium">Invitar a un amigo</h1>
        <p className="bodyText">
          Comparte este link con tus amigos para que puedan unirse a tu espacio
        </p>
        <button className="primaryButton mt-4" onClick={handleShare}>
          Copiar link
        </button>
      </div>
    </>
  );
}
