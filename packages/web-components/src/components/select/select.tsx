import { MenuItem, Select } from "@mui/material";

const FormSelect = (
  props: React.ComponentProps<typeof Select> & {
    options: { value: string; label: string; selected?: boolean }[];
  }
) => (
  <Select autoWidth={true} fullWidth={true} {...props}>
    {props.options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

export { FormSelect };
