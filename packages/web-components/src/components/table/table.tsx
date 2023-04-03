import { Fragment } from "@form-builder/engine";
import { Button, Grid } from "@mui/material";
import { useState } from "react";

const Table = ({ title, row, baseCellName, id, value = [] }) => {
  const [state, dispatch] = useState<any[]>(Array.from(value, (row) => row));

  return (
    <div>
      <h3>{title}</h3>
      <Grid container spacing={2}>
        {state.map((_, i) => (
          <Grid item xs={6} key={i}>
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
            />
          </Grid>
        ))}
      </Grid>
      <Button onClick={() => dispatch([...state, row])}>Add</Button>
    </div>
  );
};

export { Table };
