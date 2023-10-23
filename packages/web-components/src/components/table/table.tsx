import { Button } from "@mui/material";
import { useState } from "react";
import { Fragment, TComponent } from "@form-builder/engine";

const Table = ({ id, title, row, baseCellName, onChange, value = [] }) => {
  const [state, dispatch] = useState<any[]>(
    Array.isArray(value)
      ? Array.from(value, (row) => row)
      : Object.keys(value).map((key) => ({ key: key, value: value[key] }))
  );

  const buildRowComponent = (component: TComponent, rowIndex: number) => {
    const firstPathPart = `${baseCellName}[${rowIndex}]`;
    return {
      ...component,
      name: component.name
        ? `${firstPathPart}.${component.name}`
        : `${firstPathPart}`,
    };
  };

  return (
    <div>
      <h3>{title}</h3>
      {state.map((key, i) => (
        <>
          <Fragment
            key={i}
            components={row}
            id={id}
            onComponent={(c) => buildRowComponent(c, i)}
            onData={({ formatted }) => {
              onChange(formatted[baseCellName]);
            }}
          />
          <Button
            type="button"
            onClick={() => {
              dispatch(state.filter((_, index) => index !== i));
              onChange(state.filter((_, index) => index !== i));
            }}
          >
            Remove
          </Button>
        </>
      ))}
      <Button
        type="button"
        onClick={() => {
          dispatch([...state, row]);
        }}
      >
        Add
      </Button>
    </div>
  );
};

export { Table };
