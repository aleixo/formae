import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function FormDialog({ openText, description }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (_jsxs("div", { children: [_jsx(Button, Object.assign({ type: "button", variant: "outlined", onClick: handleClickOpen }, { children: openText })), _jsxs(Dialog, Object.assign({ open: open, onClose: handleClose }, { children: [_jsx(DialogTitle, { children: "Subscribe" }), _jsxs(DialogContent, { children: [_jsx(DialogContentText, { children: description }), _jsx(TextField, { autoFocus: true, margin: "dense", id: "name", label: "Email Address", type: "email", fullWidth: true, variant: "standard" })] }), _jsxs(DialogActions, { children: [_jsx(Button, Object.assign({ type: "button", onClick: handleClose }, { children: "Cancel" })), _jsx(Button, Object.assign({ type: "button", onClick: handleClose }, { children: "Subscribe" }))] })] }))] }));
}
//# sourceMappingURL=form-dialog.js.map