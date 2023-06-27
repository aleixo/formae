import { Button } from "@mui/material";
import { useState } from "react";
import { Fragment, TComponent } from "@form-builder/engine";
const Table = ({
  id,
  title,
  row,
  baseCellName,
  onChange,
  value = [],
  keyValuePair,
}) => {
  const [state, dispatch] = useState<any[]>(
    Array.isArray(value)
      ? Array.from(value, (row) => row)
      : Object.keys(value).map((key) => ({ key: key, value: value[key] }))
  );
  const buildRowComponent = (component: TComponent, rowIndex: number) => {
    const firstPathPart = keyValuePair
      ? baseCellName
      : `${baseCellName}[${rowIndex}]`;
    return {
      ...component,
      name: component.name
        ? `${firstPathPart}.${component.name}`
        : `${firstPathPart}`,
    };
  };
  console.log(value, state);
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
            onData={(d) => {
              onChange(d);
              console.log("ONDATA");
            }}
          />
          <Button
            onClick={() => {
              dispatch(state.filter((item, index) => index !== i));
              onChange({ ...state, [key]: undefined });
            }}
          >
            Remove
          </Button>
        </>
      ))}
      <Button
        onClick={() => {
          //onChange(state);
          dispatch([...state, row]);
        }}
      >
        Add
      </Button>
    </div>
  );
};

export { Table };
