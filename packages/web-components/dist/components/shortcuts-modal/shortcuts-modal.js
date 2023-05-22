import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, Box, Typography } from "@mui/material";
import { useCms } from "../../contexts/cms.context";
import { useEffect, useState } from "react";
import { ECMSActions } from "../../contexts/cms.reducer";
const ShortcutsModal = ({ open, onClose }) => {
    const [openModal, setOpenModal] = useState(open);
    const cms = useCms();
    useEffect(() => {
        setOpenModal(open);
    }, [open]);
    useEffect(() => {
        const keyUpCb = (e) => {
            if (e.key === "Escape") {
                cms.dispatch({
                    type: ECMSActions.SET_SELECTED_COMPONENT,
                    payload: {
                        component: undefined,
                    },
                });
            }
        };
        document.addEventListener("keydown", keyUpCb);
        return () => {
            document.removeEventListener("keydown", keyUpCb);
        };
    }, [cms]);
    return (_jsx(Modal, Object.assign({ open: openModal, onClose: onClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: _jsxs(Box, Object.assign({ sx: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
                maxHeight: "50%",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                overflow: "auto",
            } }, { children: [_jsx(Typography, Object.assign({ id: "modal-modal-title", variant: "h4", component: "h2" }, { children: "HotKeys" })), _jsx("ol", Object.assign({ style: {
                        marginTop: "2rem",
                        padding: "0px",
                    } }, { children: [
                        {
                            description: "Unselect component",
                            keys: ["Esc"],
                        },
                    ].map((item) => (_jsxs("div", Object.assign({ style: {
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        } }, { children: [_jsx(Typography, Object.assign({ variant: "h6", component: "h4" }, { children: item.description })), item.keys.map((key, i) => (_jsxs("div", Object.assign({ style: {
                                    backgroundColor: "#f7f8f8",
                                    padding: "0.5rem",
                                    borderRadius: "10%",
                                } }, { children: [_jsx("p", { children: key }), i >= item.keys.length ? _jsx("p", { children: "+" }) : _jsx(_Fragment, {})] }), key)))] }), item.description))) }))] })) })));
};
export { ShortcutsModal };
//# sourceMappingURL=shortcuts-modal.js.map