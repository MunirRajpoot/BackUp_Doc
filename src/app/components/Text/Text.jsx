import React from "react";
import styled from "styled-components";

const Text = ({ children, size, weight, color, margin, padding, align, transform, lineHeight, spacing, gradient }) => {
    return (
        <TextStyling
            size={size}
            weight={weight}
            color={color}
            margin={margin}
            padding={padding}
            align={align}
            transform={transform}
            lineHeight={lineHeight}
            spacing={spacing}
            gradient={gradient}
        >
            {children}
        </TextStyling>
    );
};

export default Text;

const TextStyling = styled.p`
  font-size: ${(props) => props.size || "1rem"};
  font-weight: ${(props) => props.weight || "normal"};
  color: ${(props) => (props.gradient ? "transparent" : props.color || "black")};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  text-align: ${(props) => props.align || "left"};
  text-transform: ${(props) => props.transform || "none"};
  line-height: ${(props) => props.lineHeight || "1.5"};
  letter-spacing: ${(props) => props.spacing || "0"};

  /* Apply gradient only if props.gradient is provided */
  ${(props) =>
    props.gradient &&
    `
      background: ${props.gradient};
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
  `}
`;
