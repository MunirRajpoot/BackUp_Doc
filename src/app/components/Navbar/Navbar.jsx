"use client"

import React from 'react'
import styled from 'styled-components';
import Link from 'next/link';
import Button from '../Button/Button.jsx';
import Text from '../Text/Text.jsx';
const Navbar = () => {
  return (
    <Header className='container'>
      <Text size="30px" weight="bolder" color="#FFFFFF">
        Dentovate
      </Text>

      <StyledNavbar>
        <NavItem href="/">Home</NavItem>
        <NavItem href="/doctor">Doctor</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact us</NavItem>
        <NavItem href="/started"><Button bgColor="#0067FF" borderRadius="60px" color="white" text="Get started" width="7rem" /></NavItem>
      </StyledNavbar>

      <ButtonWrapper>
        <Button bgColor="transparent" color="white" text="SignIn" hoverBgColor="#0067FF" />
        <Button bgColor="#0067FF" text="SignUp" />
      </ButtonWrapper>
    </Header>
  )
}

export default Navbar;

const Header = styled.header`

     display: flex;
    justify-content: center;
    align-items: center;
    /* padding-top: 15px; */
    padding: 30px 30px;
    margin: auto;
`
  ;
const StyledNavbar = styled.nav`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
border-radius: 50px;
gap: 30px;
padding: 5px 10px 5px 20px;
/* height: 50px; */

background-color: gray;
margin: auto;
`
  ;
const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: white;
  transition: color 0.3s;

  &:hover {
    color: #0067FF;
  }
  `
  ;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`
  ;