import React from 'react'
import { AbsoluteContainer, AppLink, AppText, CustomContainer, FlexColumn, FlexRow } from '../../style'
import Logo from '../../assets/img/whatsapptv-logo.png'
import './index.scss'
const Footer = () => {
  return (
      <CustomContainer
        topPadding="4"
        bottomPadding="4"
        leftPadding="4"
        rightPadding="4"
        borderColor="rgba(0,0,0,.1)"
        topMargin="4"
      >
        <FlexRow justifyContent="space-between" className="flex-container">
          <FlexColumn gap="1" alignItems="flex-start">
            <AppText color="rgba(0,0,0,.4)" textSize="3" fontWeight="600">
              Whatsapptvs
            </AppText>
            <CustomContainer
              width="8"
              height=".2"
              bgColor="orange"
            ></CustomContainer>
            <CustomContainer>
              <img src={Logo} alt="logo" />
            </CustomContainer>
          </FlexColumn>
          <FlexColumn gap="1" alignItems="flex-start">
            <AppText color="rgba(0,0,0,.4)" textSize="3" fontWeight="600">
              Links
            </AppText>
            <CustomContainer
              width="8"
              height=".2"
              bgColor="orange"
            ></CustomContainer>
            <FlexColumn gap="1" alignItems="flex-start">
              <AppLink
                color="rgba(0,0,0,.4)"
                textSize="2"
                decoration="none"
                fontWeight="500"
                hoverColor="orange"
              >
                Home
              </AppLink>
              <AppLink
                color="rgba(0,0,0,.4)"
                textSize="2"
                decoration="none"
                fontWeight="500"
                hoverColor="orange"
              >
                Infleuncers
              </AppLink>
              <AppLink
                color="rgba(0,0,0,.4)"
                textSize="2"
                decoration="none"
                fontWeight="500"
                hoverColor="orange"
              >
                Blog
              </AppLink>
            </FlexColumn>
          </FlexColumn>
        </FlexRow>
      </CustomContainer>
  );
}

export default Footer
