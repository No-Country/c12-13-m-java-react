import { MultiSelect } from "react-multi-select-component";

type MultiSelectProps = {
  options: any[];
  //funcion
  setSelected: (selected: any) => void;
  selected: any;
};

export default function MultiSelectC({
  options,
  selected,
  setSelected,
}: MultiSelectProps) {
  return (
    <MultiSelect
      options={options}
      value={selected}
      onChange={setSelected}
      labelledBy="Select"
    />
  );
}
