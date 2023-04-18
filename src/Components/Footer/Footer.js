import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #0069d9;
  padding: 1rem;
  text-align: center;
  position: relative;
  width: 100%;
  font-family: "Poppins", sans-serif;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 14px;
  color: white;
  word-spacing: px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>Designed & built by Sushant Hire with ❤️</FooterText>
    </FooterWrapper>
  );
};

export default Footer;
