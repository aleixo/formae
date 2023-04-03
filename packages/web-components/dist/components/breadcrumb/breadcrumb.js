import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.grey[100];
    return {
        backgroundColor,
        height: theme.spacing(4),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591
function handleClick(event) {
    event.preventDefault();
}
function BreadCrumb({ paths, onClick, }) {
    return (_jsx("div", Object.assign({ role: "presentation" }, { children: _jsxs(Breadcrumbs, Object.assign({ "aria-label": "breadcrumb" }, { children: [_jsx(StyledBreadcrumb, { component: "a", href: "#", label: "Features", onClick: () => onClick(), icon: _jsx(HomeIcon, { fontSize: "small" }) }), paths.map((path) => (_jsx(StyledBreadcrumb, { component: "a", href: "#", label: path, onClick: () => onClick(path) }, path)))] })) })));
}
export { BreadCrumb };
//# sourceMappingURL=breadcrumb.js.map