import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FormGroup = ({ children, title }) => {
    return (_jsxs("div", Object.assign({ style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: 1,
            width: "100%",
        } }, { children: [_jsx("h4", { children: title }), children] })));
};
export { FormGroup };
//# sourceMappingURL=formGroup.js.map