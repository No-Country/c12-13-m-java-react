type HrProps = {
  hasPadding?: boolean;
  classname?: string;
};

export default function Hr({ hasPadding = false, classname }: HrProps) {
    return(
        <section className={hasPadding ? `seccion1-x pt-2 w-full ${classname} ` : `w-full pt-2 ${classname}`}>
        <hr className="hr1" />
      </section>
    )
}