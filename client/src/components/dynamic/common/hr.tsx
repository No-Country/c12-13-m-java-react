type HrProps = {
  hasPadding?: boolean;
};

export default function Hr({ hasPadding = false }: HrProps) {
    return(
        <section className={hasPadding ? "seccion1-x" : ""}>
        <hr className="hr1" />
      </section>
    )
}