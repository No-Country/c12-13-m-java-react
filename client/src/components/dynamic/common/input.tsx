import { useRouter } from "next/router";

type InputProps = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
  labelClass?: string;
  defaultValue?: string;
  value?: string;
  prefix?: string;
  onChange?: any;
  error?: string|null
  step?: string;
  required?: boolean;
};

export default function Input(props: InputProps) {
  const router = useRouter();
  const className = `${
    router.pathname.startsWith("/admin")
      ? " dark:text-white   dark:placeholder:text-white border-slate-200 dark:border-none dark:bg-customDark-700"
      : "placeholder:text-sm-light placeholder:color-neutral-gray-400   color-neutral-black-950"
  }`;

  return (
    <label
      htmlFor={props.name}
      className={`smalltext flex min-w-0 flex-col gap-1 font-normal ${props.labelClass}`}
    >
      {props.label}
      <input
        defaultValue={props.defaultValue}
        type={props.type}
        step={props.step}
        name={props.name}
        value={props.value}
        prefix={props.prefix}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`${props.className} smalltext rounded-2xl px-4 py-2 ${className}`}
        style={{ borderWidth: "1px" }}
        required={props.required}
      />
      {props.error && (
        <p className="gap-estilo4 smalltext text-red-700 ml-2 flex font-medium dark:text-red-800">
          {props.error}
        </p>
      )}
    </label>
  );
}
