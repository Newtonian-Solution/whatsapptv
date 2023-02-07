import { useContext, useEffect,useState } from "react";
import UserContext from "../../../provider/state-manager/userProvider";
import {
  AbsoluteContainer,
  AppLink,
  AppSpan,
  AppText,
  Button,
  CustomContainer,
  FlexColumn,
  FlexRow,
  Form,
  FormGroup,
  ScreenTitle,
} from "../../app-styles";
import { BsSearch,BsFillPatchCheckFill } from "react-icons/bs";
import {CgScreen} from 'react-icons/cg'
import {Link,useNavigate } from "react-router-dom";
import {FaTelegram, FaWhatsapp} from 'react-icons/fa'
import "./index.scss";
import { allLegit, allScam,calcDayPassed, formatDate } from "../../../utils/helpers";
import ApiContext from "../../../provider/API/call-service";
const Home = () => {
  const {
    recoverUserData,
    user: { profile, allListing },
  } = useContext(UserContext);
  const {API} = useContext(ApiContext)
  const [search, setSearch] = useState('')
  const [recent, setRecent] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    recoverUserData();
    API.fetchAllListing();
  

  }, []);
  useEffect(() => {
  
      setRecent(
        allListing?.filter((list) => {

          const diff = Math.round(
            Math.abs(new Date() - new Date(list.dateCreated)) /
              (1000 * 60 * 60 * 24)
          );
          return diff <= 1;
        })
      );
  },[allListing])
   console.log(recent);

   const handleSearch = (e) => {
     e.preventDefault();
     navigate(`/searched/${search}`);
   }

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


  
  return (
    <CustomContainer topPadding="10">
      {profile?.isAdmin && (
        <ScreenTitle
          textSize="4"
          color="rgba(0,0,0,.7)"
          fontWeight="500"
          leftMargin="2"
        >
          Welcome Admin!
        </ScreenTitle>
      )}
      <FlexColumn bgColor="#4ade80" className="hero-section" height="50">
        <ScreenTitle
          textSize="5"
          fontWeight="500"
          align="center"
          className="screenTitle"
        >
          Discover and Verify Whatsapp TVs.
        </ScreenTitle>
        <ScreenTitle
          textSize="3"
          fontWeight="400"
          align="center"
          className="screenTitle2"
          bottomMargin="2"
        >
          Nigeria's No. 1 Whatsapp TVs Site
        </ScreenTitle>
        <AbsoluteContainer width="40" bottom="3" className="input-container">
          <Form onSubmit={handleSearch}>
            <FormGroup bgColor="#fff" inputColor="rgba(0,0,0,.7)">
              <input
                type="text"
                className="input-search"
                placeholder="Search for TVs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <BsSearch className="search-icon" />
            </FormGroup>

            <Button
              bgColor="#f87171"
              fontWeight="500"
              width="40"
              shadow="0px 1px 2px rgba(0, 0, 0, 0.05)"
              className="search-btn"
              hoverBgColor="#ef4444"
            >
              Search
            </Button>
          </Form>
        </AbsoluteContainer>
      </FlexColumn>
      <CustomContainer topPadding="3">
        <ScreenTitle
          color="rgba(0,0,0,.7)"
          textSize="4.5"
          align="center"
          fontWeight="500"
        >
          Select An Option Below
        </ScreenTitle>
        <FlexRow topMargin="4" gap="4" wrap="wrap">
          <Link to="/all-legit-tv">
            <CustomContainer
              bgColor="#4ade80"
              width="35"
              topPadding="2"
              leftPadding="3"
              rightPadding="3"
              bottomPadding="2"
              style={{ boxShadow: "0 1rem 2rem rgba(0,0,0,.3)" }}
            >
              <AppText
                topPadding="1"
                leftPadding="2"
                rightPadding="2"
                bottomPadding="1"
                fontWeight="400"
                bgColor="rgba(0,0,0,.2)"
                radius="2"
                bottomMargin="2"
              >
                {allListing && allLegit(allListing)} Listings
              </AppText>
              <AppText textSize="4" align="center">
                LEGIT TV'S
              </AppText>
              <CgScreen className="tv-icon" size={150} color="#fff" />

              <AppText textSize="3" fontWeight="500">
                LEGIT TV
              </AppText>
              <AppText textSize="2" fontWeight="400" topMargin="2">
                Select from our wide range of legit TVs
              </AppText>
            </CustomContainer>
          </Link>
          <Link to="/all-scam-tv">
            <CustomContainer
              bgColor="#ef4444"
              width="35"
              topPadding="2"
              leftPadding="3"
              rightPadding="3"
              bottomPadding="2"
              style={{ boxShadow: "0 1rem 2rem rgba(0,0,0,.3)" }}
            >
              <AppText
                topPadding="1"
                leftPadding="2"
                rightPadding="2"
                bottomPadding="1"
                fontWeight="400"
                bgColor="rgba(0,0,0,.2)"
                radius="2"
                bottomMargin="2"
              >
                {allListing && allScam(allListing)} Listings
              </AppText>
              <AppText textSize="4" align="center">
                SCAM TV'S
              </AppText>
              <CgScreen className="tv-icon" size={150} color="#fff" />
              <AppText textSize="3" fontWeight="500">
                SCAM TV
              </AppText>
              <AppText textSize="2" fontWeight="400" topMargin="2">
                Don't be scammed, check for scam TVs
              </AppText>
            </CustomContainer>
          </Link>
        </FlexRow>
      </CustomContainer>

      <FlexRow wrap="wrap" topMargin="5" gap="2">
        <CustomContainer width="30">
          <Button bgColor="#22d3ee" width="30">
            Join Us On Telegram
          </Button>
          <FaTelegram
            size={20}
            style={{ position: "absolute", left: "2rem", top: "1.2rem" }}
            color="#fff"
          />
        </CustomContainer>

        <Button bgColor="#4ade80" width="30">
          Advertise With Us
        </Button>
        <CustomContainer width="30">
          <AppLink
            color="#fff"
            href="http://Wa.me/+2348114780127?text=teens+media+save+my+name+as"
            target="_blank"
            rel="noopener noreferrer"
            decoration="none"
          >
            <Button bgColor="#22c55e" width="30">
              Chat with us on Whatsapp
            </Button>
          </AppLink>

          <FaWhatsapp
            size={20}
            style={{ position: "absolute", left: "2rem", top: "1.2rem" }}
            color="#fff"
          />
        </CustomContainer>
      </FlexRow>
      <CustomContainer topMargin="5">
        <ScreenTitle
          textSize="5"
          color="rgba(0,0,0,.7)"
          align="center"
          fontWeight="500"
        >
          Recommended TVs...
        </ScreenTitle>
        <FlexRow gap="4" wrap="wrap">
          {allListing
            ?.filter((list) => list.category === 3)
            .map((list) => (
              <CustomContainer
                width="40"
                radius="1"
                style={{ boxShadow: "0 1rem 2rem rgba(0,0,0,.3)" }}
              >
                <CustomContainer width="40" height="20">
                  <img src={list.image} alt="" width="100%" height="100%" />
                </CustomContainer>
                <FlexColumn
                  leftPadding="2"
                  rightPadding="2"
                  topPadding="3"
                  bottomPadding="3"
                  alignItems="flex-start"
                >
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

                  <AppText color="rgba(0,0,0,.7)" textSize="2">
                    {list.title}
                  </AppText>
                  <AppText color="rgba(0,0,0,.3)" textSize="1.5" topMargin="1">
                    {formatDate(list.dateCreated)}
                  </AppText>
                  <AppText
                    color="rgba(0,0,0,.7)"
                    textSize="1.5"
                    topMargin="1"
                    bottomMargin="1"
                  >
                    TV Number:{" "}
                    <AppSpan color="rgba(0,0,0,.5)">{list.number}</AppSpan>
                  </AppText>
                  <AppText
                    color="rgba(0,0,0,.7)"
                    textSize="1.5"
                    topMargin="1"
                    bottomMargin="1"
                  >
                    Whatsapp Tv Link:
                  </AppText>

                  <AppLink
                    decoration="none"
                    textSize="1.5"
                    style={{ lineHeight: "25px" }}
                    href={list.link}
                    target="_blank"
                  >
                    <Button bgColor="#4ade80">Click Here</Button>
                  </AppLink>
                  <AppText color="rgba(0,0,0,.7)" topMargin="1">
                    Email Address:{" "}
                    <AppSpan color="rgba(0,0,0,.5)">{list.email}</AppSpan>
                  </AppText>
                  <CustomContainer topMargin="4">
                    <AppText color="rgba(0,0,0,.7)" textSize="2">
                      VERIFICATION:{" "}
                      <AppSpan color="rgba(0,0,0,.5)" textSize="2">
                        LEGIT
                      </AppSpan>
                    </AppText>
                  </CustomContainer>
                </FlexColumn>
              </CustomContainer>
            ))}
        </FlexRow>
      </CustomContainer>
      <CustomContainer topMargin="5">
        <ScreenTitle
          align="center"
          color="rgba(0,0,0,.7)"
          textSize="5"
          fontWeight="500"
        >
          Most Recent TVs
        </ScreenTitle>
        <FlexRow wrap="wrap" gap="2" topMargin="3">
          {recent?.map((list) => (
            <CustomContainer
              width="40"
              radius="1"
              style={{ boxShadow: "0 1rem 1.5rem rgba(0,0,0,.2)" }}
            >
              <CustomContainer width="40" height="20">
                <img src={list.image} alt="" width="100%" height="100%" />
              </CustomContainer>
              <FlexColumn
                leftPadding="2"
                rightPadding="2"
                topPadding="3"
                bottomPadding="3"
                alignItems="flex-start"
              >
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
                  color="#fff"
                >
                  {handleCategory(list.category)}
                </AppText>
                <AppText color="rgba(0,0,0,.7)" textSize="2">
                  {list.title}
                </AppText>
                <AppText color="rgba(0,0,0,.3)" textSize="1.5" topMargin="1">
                  {formatDate(list.dateCreated)}
                </AppText>
                <AppText
                  color="rgba(0,0,0,.7)"
                  textSize="1.5"
                  topMargin="1"
                  bottomMargin="1"
                >
                  TV Number:{" "}
                  <AppSpan color="rgba(0,0,0,.5)">{list.number}</AppSpan>
                </AppText>
                <AppText
                  color="rgba(0,0,0,.7)"
                  textSize="1.5"
                  topMargin="1"
                  bottomMargin="1"
                >
                  Whatsapp Tv Link:
                </AppText>

                <AppLink
                  decoration="none"
                  textSize="1.5"
                  style={{ lineHeight: "25px" }}
                  href={list.link}
                  target="_blank"
                  fontWeight="500"
                >
                <Button bgColor='#4ade80'>Click Here</Button>
                </AppLink>
                <AppText color="rgba(0,0,0,.7)" topMargin="1">
                  Email Address:{" "}
                  <AppSpan color="rgba(0,0,0,.5)">{list.email}</AppSpan>
                </AppText>
              </FlexColumn>
            </CustomContainer>
          ))}
        </FlexRow>
      </CustomContainer>
    </CustomContainer>
  );
};

export default Home;
