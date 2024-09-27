import React, { ReactNode } from "react";
import styled from "styled-components";
import { AlertTriangle, XCircle, AlertCircle, Info } from "lucide-react";

type InfoType = "error" | "warning" | "info" | "success";

interface InfoBannerProps {
  type?: InfoType;
  title: string;
  message: ReactNode;
}

const InfoBannerContainer = styled.div<{ infoType: InfoType }>`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: ${({ infoType, theme }) => {
    return theme.colors[infoType].light;
  }};
`;

const IconWrapper = styled.div<{ infoType: InfoType }>`
  margin-right: 16px;
  color: ${({ infoType, theme }) => {
    return theme.colors[infoType].main;
  }};
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

 const Title = styled.h3<{ infoType: InfoType }>`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ infoType, theme }) => {
    return theme.colors[infoType].dark;
  }};
`;

export const InfoBannerMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
`;

export const InformationBanner: React.FC<InfoBannerProps> = ({
  type = "error",
  title,
  message,
}) => {
  const getIcon = (errorType: InfoType) => {
    switch (errorType) {
      case "error":
        return <XCircle size={24} />;
      case "warning":
        return <AlertTriangle size={24} />;
      case "info":
        return <Info size={24} />;
      case "success":
        return <AlertCircle size={24} />;
      default:
        return <XCircle size={24} />;
    }
  };

  return (
    <InfoBannerContainer infoType={type} role="alert">
      <IconWrapper infoType={type}>{getIcon(type)}</IconWrapper>
      <ContentWrapper>
        <Title infoType={type}>{title}</Title>
        <InfoBannerMessage>{message}</InfoBannerMessage>
      </ContentWrapper>
    </InfoBannerContainer>
  );
};
