"use client";

import styled from "styled-components";
import Text from "./components/Text/Text.jsx";
import Button from "./components/Button/Button.jsx";
import { CiPlay1 } from "react-icons/ci";
import Image from "next/image.js";

export default function Home() {
  return (
    <HomePage className="container">
      <ContentWrapper>
        <TextBox>
          <Text size="3rem" color="#FFFFFF" weight="bold" align="center">
            Get precise results
            <Break />
            effortlessly with
          </Text>
          <Text size="3rem" gradient="linear-gradient(to right, #0067FF, #A5C9FF)" weight="bold" align="center">
            Dentovate
          </Text>
          <TextDescription>
            <Text align="center" size="1rem" color="#FFFFFF">
              Empowering dentists to provide trustworthy care, enhance patient understanding, and increase retention through AI-supported diagnostics.
            </Text>
          </TextDescription>
          <ButtonWrapper>
            <Button text="Get Started" width="8rem" gradient="45deg, #0067FF, #003E99" />
            <Button text="See Demo" width="8rem" gradient="45deg, #0067FF, #003E99" icon={<CiPlay1 />} />
          </ButtonWrapper>
        </TextBox>
        <AppointmentBox className="row">
          <ImageBox className="col-lg-6">
            <Image src="/images/app_img.png" alt="app-img" height={400} width={300} />
          </ImageBox>
          <AppointmentText className="col-lg-6">
            <Text color="#FFFFFF">Appointment</Text>
            <Text color="#0067FF" size="2rem" weight="bold" padding="20px 0px 10px 0px">Meet Our Specialist
              This Doctor Meeting</Text>
            <Text color="#FFFFFF" padding="5px 0px">We are privileged to work with hundreds of future-thinking medial, including many of the world’s top hardware, software, and brands, feel safe and comfortable in establishing.</Text>

            <Button text="Book Now" bgColor="#0067FF" margin="20px 0px" width="7rem" />
          </AppointmentText>

        </AppointmentBox>

        {/* Cards */}
        <CardsBox>
<Cardswrapper></Cardswrapper>
        </CardsBox>
      </ContentWrapper>
    </HomePage>
  );
}

const HomePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  text-align: center;
`;

const TextBox = styled.div`
  margin-top: 30px;
`;

const TextDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: auto;
  padding: 15px 20px;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const AppointmentBox = styled.div`
  margin-top: 50px;

`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
 
`;
const AppointmentText = styled.div`
    padding: 10px 80px;
`;
const Break = styled.br`

`;

const CardsBox = styled.div`

`;
const Cardswrapper = styled.div`

`;