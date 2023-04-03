const FormGroup = ({ children, title }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        flex: 1,
        width: "100%",
      }}
    >
      <h4>{title}</h4>
      {children}
    </div>
  );
};

export { FormGroup };
