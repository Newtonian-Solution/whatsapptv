import { useContext, useEffect, useState } from "react";
import { NotifierContainer } from "./style";
import VisibilityContext from "../../provider/state-manager/visibilityProvider";
import "./index.scss";
import {
  AppText,
  CustomContainer,
  FlexRow,
  Circle,
  AppSpan,
  Button,
} from "../../app/app-styles";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";

export const Notifier = () => {
  const {
    visibility: { notification },
    notifier,
  } = useContext(VisibilityContext);

  var [time, setTime] = useState(null);

  useEffect(() => {
    if (notification.status) {
      time = setTimeout(() => {
        notifier.hide();
      }, 5000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [notification.status]);

  function handleCloseNotifier() {
    notifier.hide();
    clearTimeout(time);
  }

  return (
    <NotifierContainer
      isNotifier={notification.status}
      type={notification.type}
      className="notifier-container"
    >
      <FlexRow justifyContent="flex-start" alignItems="flex-start">
        {notification.type === "success" ? (
          <Circle
            bgColor="#B4E3E1"
            size="5"
            borderWidth="6"
            borderColor="#F0FDF9"
            topMargin="-0.5"
            rightMargin="-0.5"
          >
            <AiOutlineCheckCircle
              style={{ color: "#15B79E", fontSize: "2.5rem" }}
            />
          </Circle>
        ) : (
          <Circle bgColor="#FEF3F2" size="4">
            <AiOutlineCloseCircle
              style={{ color: "#B42318", fontSize: "2.5rem" }}
            />
          </Circle>
        )}
        <CustomContainer width="27.6" leftMargin="1.5" rightMargin="1.5" topMargin='2'>
          <AppText fontWeight="600" color="#101828" textSize='2'>
            {notification.title}  : {" "}
          </AppText>
          <AppText
            textSize="1.8"
            fontWeight="400"
            color="#667085"
            bottomMargin="2"
          >
           {notification.message}
          </AppText>
         
        </CustomContainer>
        <Button
          titleSize="2"
          fontWeight="500"
          width="3.4"
          shadow="none"
          height="3.4"
          radius="0.4"
          bgColor="#ffffff"
          hoverBgColor="#FEF3F2"
          borderColor="none"
          color="#000000"
          hoverColor="#B42318"
          onClick={handleCloseNotifier}
        >
          <RiCloseFill />
        </Button>
      </FlexRow>
    </NotifierContainer>
  );
};
