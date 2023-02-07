import { useContext, useEffect, useState } from "react";
import ApiContext from "../../../provider/API/call-service";
import UserContext from "../../../provider/state-manager/userProvider";
import {
  AppText,
  CustomContainer,
  AppSpan,
  FlexRow,
  FlexColumn,
  AppLink,
  AbsoluteContainer,
  Button,
} from "../../app-styles";
import "./index.scss";
import { formatDate } from "../../../utils/helpers";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const ViewListing = () => {
  const { API } = useContext(ApiContext);
  const navigate = useNavigate()
  const {
    user: { allListing },
  } = useContext(UserContext);
  const [drop, setDrop] = useState({});
  const [categoryClicked, setCategoryClicked] = useState({
    category: 0,
    id: "",
  });
  const [listType, setListType] = useState("");
  const [newListing, setnewListing] = useState(allListing);

  useEffect(() => {
    API.fetchAllListing();
  }, []);

  useEffect(() => {
    if (listType === "legit") {
      setnewListing(allListing.filter((list) => list.category === 1));
    } else if (listType === "scam") {
      setnewListing(allListing.filter((list) => list.category === 2));
    } else if (listType === "recommended") {
      setnewListing(allListing.filter((list) => list.category === 3));
    } else if (listType === "all-listing") {
      setnewListing(allListing);
    }
  }, [listType]);

  useEffect(() => {
    if (categoryClicked.category) {
      API.updateCategory(categoryClicked.category, categoryClicked.id);
      //window.location.reload()
    }
  }, [categoryClicked.category]);
  const handleCategory = (value) => {
    const category =
      value === 0
        ? "Pending"
        : value === 1
        ? "Legit TV"
        : value === 2
        ? "Scam TV"
        : "Recommended";

    return category;
  };
  function handleDelete(payload) {
    API.deleteTV(payload);
  }
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
      <CustomContainer leftMargin="8" topMargin='1' bottomMargin="2">
        <select
          name="listType"
          id="listType"
          className="list-select"
          onChange={(e) => setListType(e.target.value)}
          value={listType}
        >
          <option>Select Listing</option>
          <option value="all-listing">All Listing</option>
          <option value="scam">Scam TVs</option>
          <option value="legit">Legit TVs</option>
          <option value="recommended">Recommended TVs</option>
        </select>
      </CustomContainer>

      {/* {!allListing && (
        <FlexRow>
          <AppText color="rgba(0,0,0,.7)" textSize="5">
            Network Error
          </AppText>
        </FlexRow>
      )} */}
      <FlexRow gap="4" wrap="wrap">
        {newListing.map((list) => (
          <CustomContainer
            key={list.id}
            width="35"
            borderColor="#4ade80"
            radius="1"
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
              <Button
                bgColor="red"
                height="3"
                radius="20"
                width="10"
                style={{ position: "absolute", top: "0", left: "18rem" }}
                onClick={() => handleDelete(list.id)}
              >
                Delete
              </Button>
              <BsThreeDots
                size={20}
                style={{ position: "absolute", right: "1rem", top: "1rem" }}
                onClick={() => setDrop({ ...drop, [list.id]: !drop[list.id] })}
              />
              {drop[list.id] && (
                <AbsoluteContainer
                  width="15rem"
                  bgColor="#fff"
                  style={{
                    boxShadow: "0 10px 20px rgba(0,0,0,.2)",
                    padding: "1rem",
                  }}
                  top="4"
                  right="2"
                >
                  <FlexColumn gap="1">
                    <AppText
                      color="rgba(0,0,0,.6)"
                      textSize="1.5"
                      hoverColor="orange"
                      cursor="pointer"
                      onClick={() =>
                        setCategoryClicked({
                          ...categoryClicked,
                          category: 1,
                          id: list.id,
                        })
                      }
                    >
                      Add to Legit
                    </AppText>
                    <AppText
                      color="rgba(0,0,0,.6)"
                      textSize="1.5"
                      hoverColor="orange"
                      cursor="pointer"
                      onClick={() =>
                        setCategoryClicked({
                          ...categoryClicked,
                          category: 2,
                          id: list.id,
                        })
                      }
                    >
                      Add to Scam
                    </AppText>
                    <AppText
                      color="rgba(0,0,0,.6)"
                      textSize="1.5"
                      hoverColor="orange"
                      cursor="pointer"
                      onClick={() =>
                        setCategoryClicked({
                          ...categoryClicked,
                          category: 3,
                          id: list.id,
                        })
                      }
                    >
                      Add to Recommended
                    </AppText>
                  </FlexColumn>
                </AbsoluteContainer>
              )}

              <AppText
                topPadding=".5"
                leftPadding="2"
                rightPadding="2"
                bottomPadding=".5"
                fontWeight="400"
                bgColor={
                  list.category === 0
                    ? "orange"
                    : list.category === 1
                    ? "#4ade80"
                    : list.category === 2
                    ? "red"
                    : "gray"
                }
                radius="2"
                bottomMargin="2"
              >
                {handleCategory(list.category)}
              </AppText>
              <AppText textSize="2" color="rgba(0,0,0,.7)">
                {list.title.toUpperCase()}
              </AppText>
              <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="500">
                Added on: {formatDate(list.dateCreated)}
              </AppText>
              <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="600">
                TV Number:{" "}
                <AppSpan color="rgba(0,0,0,.6)" fontWeight="500" textSize="1.7">
                  {list.number}
                </AppSpan>
                <CustomContainer>
                  <AppSpan
                    color="rgba(0,0,0,.7)"
                    textSize="1.7"
                    fontWeight="600"
                    href={list.link}
                  >
                    Whatsapp TV Link:{" "}
                  </AppSpan>
                  <AppLink decoration="none" fontWeight="500">
                    {list.link}
                  </AppLink>
                </CustomContainer>
                <AppText color="rgba(0,0,0,.7)" textSize="1.7" fontWeight="600">
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

export default ViewListing;
