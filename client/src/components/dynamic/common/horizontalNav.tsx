import { Popover, VerticalNav } from "@/components";
import Link from "next/link";

type VerticalNavProps = {
  items: any[];
};

export default function HorizontalNav({ items }: VerticalNavProps) {
  return (
    <nav className="flex gap-8">
      {items.map((item, index) => (
        <>
          {item.hasPopover ? (
            <Popover childrenTrigger={item.childrenTrigger}>
              <VerticalNav items={item.itemsNav} />
            </Popover>
          ) : (
            <Link href={item.href} className="text-white">
              {item.name}
            </Link>
          )}
        </>
      ))}
    </nav>
  );
}
