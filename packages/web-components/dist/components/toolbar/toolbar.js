import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/system";
import Select from '@mui/material/Select';
import { FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';
import { Preview, Save, List, AccountTree, Settings } from '@mui/icons-material';
import { Container } from "./toolbar.styles";
const Toolbar = ({ onSaveClick, onPreviewClick, onSettingsClick, onListClick, onHierarchyClick, pages }) => {
    return (_jsxs(Container, { children: [_jsx(Box, Object.assign({ sx: { minWidth: 200 } }, { children: _jsxs(FormControl, Object.assign({ fullWidth: true }, { children: [_jsx(InputLabel, Object.assign({ id: "page-label" }, { children: "Page" })), _jsx(Select, Object.assign({ labelId: "page-label", label: "Page", value: 'router.query.id', fullWidth: true, onChange: () => {
                                //router.push(`/builder?id=${event.target.value}`)
                            } }, { children: Array.isArray(pages) && pages.map((page, i) => (_jsx(MenuItem, Object.assign({ value: page.record }, { children: page.snippetMeta.name }), i))) }))] })) })), _jsx(IconButton, Object.assign({ onClick: onPreviewClick }, { children: _jsx(Preview, {}) })), _jsx(IconButton, Object.assign({ onClick: onHierarchyClick }, { children: _jsx(AccountTree, {}) })), _jsx(IconButton, Object.assign({ onClick: onListClick }, { children: _jsx(List, {}) })), _jsx(IconButton, Object.assign({ onClick: onSettingsClick }, { children: _jsx(Settings, {}) })), _jsx(IconButton, Object.assign({ onClick: onSaveClick }, { children: _jsx(Save, {}) }))] }));
};
export { Toolbar };
//# sourceMappingURL=toolbar.js.map