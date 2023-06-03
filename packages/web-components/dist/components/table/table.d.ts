/// <reference types="react" />
/**
 *
 * <Fragment
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
 *
 */
declare const Table: ({ title, row, value }: {
    title: any;
    row: any;
    value?: never[] | undefined;
}) => JSX.Element;
export { Table };
