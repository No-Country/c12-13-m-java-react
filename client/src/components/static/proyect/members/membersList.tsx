import { Image } from "@/components";
import { MembersProps } from "@/utils/types/client/spaces";

type MembersListProps = {
  members: MembersProps[];
};

export default function MembersList({ members }: MembersListProps) {
  return (
    <div className="mt-2 flex ml-[15px] ">
      {Array.isArray(members) && members.map((member: MembersProps) => (
        <Image
          key={member.id}
          src={member.profileImage}
          alt="MemberProfile"
          layout="fill"
          width="w-[30px]"
          height="w-[30px]"
          aspectRatio="aspect-[1/1]"
          rounded="rounded-[20px]"
          containerClassName="ml-[-15px]"
        />
      ))}
    </div>
  );
}
