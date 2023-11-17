var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Delete, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "@form-builder/engine";
import { FormTextField } from "../textfield/textfield";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
const PageConfigurations = ({ page }) => {
    const { submitForm } = useForm({
        id: "new_page",
        onSubmit: () => __awaiter(void 0, void 0, void 0, function* () {
            //const res = await createBin(
            //  schema.init({ configs: data.formatted.configs }),
            //  data.formatted.configs.name
            //);
            //router.push(`/builder?id=${res.metadata?.id}`);
        }),
    });
    const onRemovePageClick = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        //await deleteBin(router.query.id);
        //router.push(`/builder`);
    }), []);
    return (_jsxs("div", { children: [page && (_jsxs(List, Object.assign({ sx: {
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                } }, { children: [_jsxs(ListItem, { children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { children: _jsx(ImageIcon, {}) }) }), _jsx(ListItemText, { primary: "Name", secondary: page.configs.name })] }), _jsx(Divider, { variant: "inset", component: "li" }), _jsxs(ListItem, { children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { children: _jsx(WorkIcon, {}) }) }), _jsx(ListItemText, { primary: "Url", secondary: page.configs.url })] }), _jsx(Divider, { variant: "inset", component: "li" }), _jsxs(ListItem, { children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { children: _jsx(BeachAccessIcon, {}) }) }), _jsx(ListItemText, { primary: "Vacation", secondary: page.configs.description })] })] }))), _jsxs(Accordion, { children: [_jsxs(AccordionSummary, Object.assign({ expandIcon: _jsx(ExpandMore, {}), id: "new" }, { children: [_jsx(Typography, Object.assign({ sx: { width: "33%", flexShrink: 0 } }, { children: "New/clone" })), _jsx(Typography, Object.assign({ sx: { color: "text.secondary" } }, { children: "Add page or clone this" }))] })), _jsxs(AccordionDetails, { children: [_jsx(FormTextField, { formId: "new_page", label: "Name", name: "configs.name", placeholder: "Page name" }), _jsx(FormTextField, { formId: "new_page", label: "Url", name: "configs.url", placeholder: "Page url" }), _jsx(FormTextField, { formId: "new_page", label: "Description", name: "configs.description", placeholder: "Page description" })] }), _jsx(Button, Object.assign({ onClick: submitForm }, { children: "Add" })), _jsx(Button, Object.assign({ onClick: submitForm }, { children: "Clone this content" }))] }), _jsxs(Accordion, { children: [_jsxs(AccordionSummary, Object.assign({ expandIcon: _jsx(ExpandMore, {}), id: "new" }, { children: [_jsx(Typography, Object.assign({ sx: { width: "33%", flexShrink: 0 } }, { children: "Page details" })), _jsx(Typography, Object.assign({ sx: { color: "text.secondary" } }, { children: "Edit current page details" }))] })), _jsx(AccordionDetails, { children: _jsx(Button, Object.assign({ type: "button", endIcon: _jsx(Delete, {}), variant: "outlined", fullWidth: true, color: "error", onClick: onRemovePageClick }, { children: "REMOVE PAGE" })) })] })] }));
};
export { PageConfigurations };
//# sourceMappingURL=page-configurations.js.map