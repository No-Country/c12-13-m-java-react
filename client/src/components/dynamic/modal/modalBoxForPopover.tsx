type ModalBoxForPopoverProps = {
  children: React.ReactNode;
};

export default function ModalBoxForPopover({
  children,
}: ModalBoxForPopoverProps) {
  return (
    <div
      className=" absolute left-[50%] w-max translate-x-[-50%] "
      id="modalBoxForNav"
    >
      <div className=" mt-3 flex flex-col gap-2 rounded-lg bg-white px-6 py-6 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
