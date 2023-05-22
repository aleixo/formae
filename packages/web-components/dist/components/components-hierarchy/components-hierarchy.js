import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useCms } from "../../contexts/cms.context";
import { useSchema } from "../../hooks/useSchema";
import * as S from "./components-hierarchy.styles";
const ComponentsHierarchy = () => {
    const schema = useSchema();
    const cms = useCms();
    const render = () => {
        const components = [];
        schema.transverseSchema(cms.state.schema, 0, (component, index, currDepth) => {
            var _a, _b, _c;
            components.push(_jsx(S.Item, Object.assign({ padding: currDepth.toString(), selected: ((_b = (_a = cms.state.selectedComponent) === null || _a === void 0 ? void 0 : _a.component) === null || _b === void 0 ? void 0 : _b.id) ===
                    component[index].id, overed: ((_c = cms.state.overedComponent) === null || _c === void 0 ? void 0 : _c.id) === component[index].id }, { children: _jsxs("p", { children: ["- ", component[index].component, "/", component[index].name] }) })));
        });
        return components;
    };
    return render().map((comp, i) => (_jsx("div", { children: comp }, i)));
};
export { ComponentsHierarchy };
//# sourceMappingURL=components-hierarchy.js.map