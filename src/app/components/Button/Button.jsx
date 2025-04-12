import React from 'react';
import styled from 'styled-components';

const Button = ({
    text,
    bgColor,
    gradient,
    color,
    fontSize,
    height,
    width,
    borderRadius,
    padding,
    margin,
    hoverBgColor,
    hoverGradient,
    hoverColor,
    icon
}) => {
    return (
        <ButtonWrapper
            bgColor={bgColor}
            gradient={gradient}
            color={color}
            fontSize={fontSize}
            height={height}
            width={width}
            borderRadius={borderRadius}
            padding={padding}
            margin={margin}
            hoverBgColor={hoverBgColor}
            hoverGradient={hoverGradient}
            hoverColor={hoverColor}
        >
            {icon && <span className="icon">{icon}</span>}
            {text}
        </ButtonWrapper>
    );
};

export default Button;

const ButtonWrapper = styled.button`
    background: ${(props) =>
        props.gradient ? `linear-gradient(${props.gradient})` : props.bgColor || "#007bff"};
    color: ${(props) => props.color || "white"};
    font-size: ${(props) => props.fontSize || "1rem"};
    height: ${(props) => props.height || "40px"};
    width: ${(props) => props.width || "100px"};
    border-radius: ${(props) => props.borderRadius || "5px"};
    padding: ${(props) => props.padding || "5px 10px"};
    margin: ${(props) => props.margin || "0"};
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: all 0.3s ease;

    &:hover {
        background: ${(props) =>
        props.hoverGradient ? `linear-gradient(${props.hoverGradient})` : props.hoverBgColor || "#00d4ff"};
        color: ${(props) => props.hoverColor || "white"};
    }

    .icon {
        display: flex;
        align-items: center;
    }
`;
