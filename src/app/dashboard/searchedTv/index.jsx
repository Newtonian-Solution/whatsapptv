import "./index.scss";
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CustomContainer,
  FlexRow,
  ScreenTitle,
  FlexColumn,
  AppLink,
  AppText,
  AppSpan,
} from "../../app-styles";
import UserContext from "../../../provider/state-manager/userProvider";
import ApiContext from "../../../provider/API/call-service";
import { formatDate } from "../../../utils/helpers";
import { BsArrowLeft, BsFillPatchCheckFill } from "react-icons/bs";

const SearchTv = () => {
  const params = useParams();
  const {
    user: { allListing },
  } = useContext(UserContext);
  const { API } = useContext(ApiContext);
  const navigate = useNavigate();

  useEffect(() => {
     API.fetchAllListing();
  }, []);
  return (
    <CustomContainer topPadding="10" style={{ minHeight: "100vh" }}>
      <BsArrowLeft
        style={{
          position: "absolute",
          top: "11rem",
          left: "2rem",
          cursor: "pointer",
        }}
        size={20}
        onClick={() => navigate(-1)}
      />
      <ScreenTitle
        color="rgba(0,0,0,.7)"
        align="center"
        textSize="4"
        fontWeight="500"
      >
        You searched for: {params.search}
      </ScreenTitle>
      <CustomContainer leftMargin='2'>
        <AppText color="rgba(0,0,0,.6)" textSize="1.7" fontWeight='400'>
          Here are the lists of TVs with "{params.search}" keywords:
        </AppText>
      </CustomContainer>
      <FlexRow wrap="wrap" gap="2" topMargin="4">
        {allListing
          .filter((list) =>
            list.title.toLowerCase().includes(params.search.toLowerCase())
          )
          .map((list) => (
            <CustomContainer
              width="35"
              borderColor="#4ade80"
              radius="1"
              key={list.key}
            >
              <CustomContainer width="35" height="20">
                <img src={list.image} alt="" width="100%" height="100%" />
              </CustomContainer>

              <FlexColumn
                style={{ width: "100%" }}
                leftPadding="2"
                rightPadding="2"
                topMargin="2"
                alignItems="flex-start"
                gap="1"
                bottomPadding="2"
              >
                <AppText textSize="2" color="rgba(0,0,0,.7)">
                  {list.title.toUpperCase()}
                </AppText>
                {list.category === 0 ? (
                  <AppText
                    topPadding=".5"
                    leftPadding="2"
                    rightPadding="2"
                    bottomPadding=".5"
                    fontWeight="400"
                    bgColor="orange"
                    radius="2"
                    bottomMargin="2"
                    color="rgba(0,0,0,.5)"
                  >
                    Pending{" "}
                  </AppText>
                ) : list.category === 1 ? (
                  <AppText
                    topPadding=".5"
                    leftPadding="2"
                    rightPadding="2"
                    bottomPadding=".5"
                    fontWeight="400"
                    bgColor="rgba(0,0,0,.2)"
                    radius="2"
                    bottomMargin="2"
                    color="rgba(0,0,0,.5)"
                  >
                    Legit TV
                  </AppText>
                ) : list.category === 2 ? (
                  <AppText
                    topPadding=".5"
                    leftPadding="2"
                    rightPadding="2"
                    bottomPadding=".5"
                    fontWeight="400"
                    bgColor="red"
                    radius="2"
                    bottomMargin="2"
                    color="rgba(0,0,0,.5)"
                  >
                    Scam TV
                  </AppText>
                ) : (
                  <CustomContainer>
                    <AppText
                      topPadding=".5"
                      leftPadding="2"
                      rightPadding="2"
                      bottomPadding=".5"
                      fontWeight="400"
                      bgColor="rgba(0,0,0,.2)"
                      radius="2"
                      bottomMargin="2"
                      color="rgba(0,0,0,.5)"
                    >
                      Legit TV
                    </AppText>
                    <BsFillPatchCheckFill
                      color="#4ade80"
                      size={20}
                      style={{ marginLeft: "1rem" }}
                    />
                  </CustomContainer>
                )}

                <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="500">
                  Added on: {formatDate(list.dateCreated)}
                </AppText>
                <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="600">
                  TV Number:{" "}
                  <AppSpan
                    color="rgba(0,0,0,.6)"
                    fontWeight="500"
                    textSize="1.7"
                  >
                    {list.number}
                  </AppSpan>
                  <CustomContainer>
                    <AppSpan
                      color="rgba(0,0,0,.7)"
                      textSize="1.7"
                      fontWeight="600"
                    >
                      Whatsapp TV Link:{" "}
                    </AppSpan>
                    <AppLink decoration="none" fontWeight="500" href={list.link}>
                      {list.link}
                    </AppLink>
                  </CustomContainer>
                  <AppText
                    color="rgba(0,0,0,.7)"
                    textSize="1.7"
                    fontWeight="600"
                  >
                    Email Address:{" "}
                    <AppSpan
                      color="rgba(0,0,0,.7)"
                      fontWeight="500"
                      textSize="1.5"
                    >
                      {list.email}
                    </AppSpan>
                  </AppText>
                </AppText>
              </FlexColumn>
            </CustomContainer>
          ))}
      </FlexRow>
    </CustomContainer>
  );
};
export default SearchTv;
