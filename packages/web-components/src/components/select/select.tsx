import { MenuItem, Select as MUISelect } from "@mui/material";

const Select = (
  props: React.ComponentProps<typeof MUISelect> & {
    options: { value: string; label: string; selected?: boolean }[];
  }
) => (
  <MUISelect {...props}>
    {props.options.map((option) => (
      <MenuItem
        key={option.value}
        value={option.value}
        selected={option.selected || props.value === option.value}
      >
        {option.label}
      </MenuItem>
    ))}
  </MUISelect>
);

export { Select };
