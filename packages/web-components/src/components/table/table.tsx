import { Button } from "@mui/material";
import { useState } from "react";
import { Fragment } from "@form-builder/engine";
const Table = ({ id, title, row, baseCellName, onChange, value = [] }) => {
  const [state, dispatch] = useState<any[]>(Array.from(value, (row) => row));

  return (
    <div>
      <h3>{title}</h3>
      {state.map((_, i) => (
        <Fragment
          key={i}
          components={row}
          id={id}
          onComponent={(component) => ({
            ...component,
            name: component.name
              ? `${baseCellName}[${i}].${component.name}`
              : `${baseCellName}[${i}]`,
          })}
          onData={onChange}
        />
      ))}
      <Button onClick={() => dispatch([...state, row])}>Add</Button>
    </div>
  );
};

export { Table };
