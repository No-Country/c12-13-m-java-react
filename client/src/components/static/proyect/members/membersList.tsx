import { Image, MemberPicture } from "@/components";
import { MembersProps } from "@/utils/types/client/spaces";

type MembersListProps = {
  members: MembersProps[];
  size: "small" | "medium" | "large";
  pictureHasMargin: boolean;
};

export default function MembersList({
  members,
  size,
  pictureHasMargin = false,
}: MembersListProps) {
  return (
    <div className="ml-[15px] mt-2 ">
      {Array.isArray(members) &&
        members.map((member: MembersProps) => (
          <MemberPicture
            member={member.user}
            size={size}
            hasMargin={pictureHasMargin}
          />
        ))}
    </div>
  );
}
