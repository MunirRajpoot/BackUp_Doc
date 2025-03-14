"use client"
import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Nav>
            <Logo>Brand</Logo>
            <MenuIcon onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </MenuIcon>
            <NavLinks isOpen={isOpen}>
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">About</NavLink>
                <NavLink href="#">Services</NavLink>
                <NavLink href="#">Contact</NavLink>
            </NavLinks>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #2c3e50;
  color: white;
  position: relative;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
`;

const MenuIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")}; // ✅ Use $isOpen instead of isOpen
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background: #34495e;
    width: 200px;
    padding: 1rem;
    border-radius: 10px;
  }
`;


const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s;

  &:hover {
    color: #f39c12;
  }
`;
