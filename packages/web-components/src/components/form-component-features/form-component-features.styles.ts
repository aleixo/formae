import styled from "styled-components";
import { Form } from "@form-builder/engine";

const FormFullWidth = styled(Form)`
  width: 100%;
`;

const FeatureContainer = styled.div`
  padding: 1rem;
`;

const ComponentFeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export { FeatureContainer, ComponentFeaturesContainer, FormFullWidth };
