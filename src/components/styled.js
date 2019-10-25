import styled from "styled-components";

/* Styling for Map component: */

const BORDER_STYLE = `0.1rem solid black`;
const STROKE_COLOR = "#fff";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: nowrap row;
  @media (max-width: 800px) {
    flex-flow: nowrap column;
  }
`;

export const Output = styled.div`
  padding-right: 1rem;
  flex: 1 1 0;
  flex-grow: 1;
  @media (max-width: 800px) {
    padding-right: 0;
    padding-bottom: 1rem;
    border-right: none;
    border-bottom: 0.2rem solid ${BORDER_STYLE};
  }
`;

export const MapWrapper = styled.div`
  padding-left: 1rem;
  flex: 1 1 auto;
  flex-grow: 2;
  @media (max-width: 800px) {
    padding-left: 0;
    padding-top: 1rem;
  }
  svg {
    stroke: ${STROKE_COLOR};
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    path {
      :focus {
        outline: 0;
      }
    }
  }
`;
