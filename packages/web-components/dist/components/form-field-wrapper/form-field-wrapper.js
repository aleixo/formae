import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownward, ArrowUpward, ControlPoint, Delete, } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useCms } from "../../contexts/cms.context";
import { ECMSActions } from "../../contexts/cms.reducer";
import { useSchema } from "../../hooks/useSchema";
const PreviewContainer = ({ children, onDragStart, onDrop, component, }) => {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const cms = useCms();
    const schema = useSchema();
    const isOvering = cms.state.overedComponent && cms.state.overedComponent.id === component.id;
    const color = isOvering ? "green" : "red";
    const isSelected = cms.state.selectedComponent &&
        cms.state.selectedComponent.id === component.id;
    return (_jsxs("div", Object.assign({ draggable: true, style: {
            position: "relative",
            opacity: isSelected || isDraggingOver ? 0.9 : 1,
            outlineStyle: "dashed",
            outlineWidth: isSelected || isOvering || isDraggingOver ? "1px" : 0,
            outlineColor: color,
            minHeight: "20px",
        }, onDragLeave: (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, onMouseMove: (e) => {
            e.stopPropagation();
            e.preventDefault();
            cms.dispatch({
                type: ECMSActions.SET_OVERED_COMPONENT,
                payload: { component },
            });
        }, onDragOver: (e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsDraggingOver(true);
            cms.dispatch({
                type: ECMSActions.SET_OVERED_COMPONENT,
                payload: { component },
            });
        }, onDragStart: (event) => {
            event.stopPropagation();
            onDragStart && onDragStart();
        }, onDrop: (event) => {
            event.stopPropagation();
            onDrop && onDrop();
        }, onClick: (e) => {
            e.stopPropagation();
            cms.dispatch({
                type: ECMSActions.SET_SELECTED_COMPONENT,
                payload: { component },
            });
        }, onMouseOver: () => {
            cms.dispatch({
                type: ECMSActions.SET_OVERED_COMPONENT,
                payload: { component },
            });
        }, onMouseLeave: () => {
            cms.dispatch({
                type: ECMSActions.SET_OVERED_COMPONENT,
                payload: { component: undefined },
            });
        } }, { children: [(isSelected || isOvering) && (_jsxs("div", { children: [_jsx("div", { style: {
                            position: "absolute",
                            bottom: "16px",
                            zIndex: 20,
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            textAlign: "center",
                        } }), _jsxs("div", Object.assign({ style: {
                            position: "absolute",
                            zIndex: 20,
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        } }, { children: [_jsx("p", Object.assign({ style: {
                                    padding: "6px",
                                    backgroundColor: color,
                                } }, { children: component.component })), _jsxs(Box, Object.assign({ sx: { backgroundColor: color } }, { children: [_jsx(IconButton, Object.assign({ onClick: (e) => {
                                            console.log("DELETE");
                                            e.stopPropagation();
                                            e.preventDefault();
                                            cms.dispatch({
                                                type: ECMSActions.SET_BUILDER_SCHEMA,
                                                payload: {
                                                    schema: schema.remove(cms.state.schema, 0, component),
                                                },
                                            });
                                        } }, { children: _jsx(Delete, {}) })), _jsx(IconButton, Object.assign({ onClick: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            cms.dispatch({
                                                type: ECMSActions.SET_BUILDER_SCHEMA,
                                                payload: {
                                                    schema: schema.moveUp(cms.state.schema, component),
                                                },
                                            });
                                        } }, { children: _jsx(ArrowUpward, {}) })), _jsx(IconButton, Object.assign({ onClick: (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            cms.dispatch({
                                                type: ECMSActions.SET_BUILDER_SCHEMA,
                                                payload: {
                                                    schema: schema.moveDown(cms.state.schema, component),
                                                },
                                            });
                                        } }, { children: _jsx(ArrowDownward, {}) })), _jsx(IconButton, Object.assign({ onClick: (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            cms.dispatch({
                                                type: ECMSActions.SET_BUILDER_SCHEMA,
                                                payload: {
                                                    schema: schema.addToFormStep(cms.state.schema, schema.cloneComponent(component)),
                                                },
                                            });
                                        } }, { children: _jsx(ControlPoint, {}) }))] }))] }))] })), children] })));
};
export { PreviewContainer };
//# sourceMappingURL=form-field-wrapper.js.map