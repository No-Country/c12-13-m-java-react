type AccountSectionProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export default function AccountSection({
  children,
  title,
  description,
}: AccountSectionProps) {
  return (
    <div className="listContainer">
      <div className="flex flex-col items-start justify-center ">
        <h2 className="titulo-3">{title}</h2>
        <p className="bodyText ">{description}</p>
      </div>

      {children}
    </div>
  );
}
