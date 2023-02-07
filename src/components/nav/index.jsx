import { useState,useContext } from 'react'
import './index.scss'
import { AppLink, AppSpan, AppText, CustomContainer, FlexColumn, FlexRow } from '../../style'
import Logo from '../../assets/img/whatsapptv-logo.png'
import { Link,useNavigate } from 'react-router-dom'
import {VscSignIn} from 'react-icons/vsc'
import {AiOutlinePlus} from 'react-icons/ai'
import UserContext from '../../provider/state-manager/userProvider'
import { limitTextCharacter } from '../../utils/helpers'
import {TfiAngleDown} from 'react-icons/tfi'

const Nav = () => {
  const [checked,setChecked] = useState(false)
 const {user:{profile}, logout} = useContext(UserContext)
 const navigate = useNavigate()

const handleListClick = () => {
  !profile?.token ? navigate('/signin') : navigate('/add-listing')
 }
 const handleLogout = () => {
 logout()
 }
  return (
    <FlexRow
      justifyContent="space-between"
      topPadding="2"
      leftPadding="2"
      rightPadding="2"
      bottomPadding="2"
      bgColor="#fff"
      style={{ position: "fixed", height: "10rem", zIndex: "30" }}
    >
      <div className="nav__icon">
        <input
          type="checkbox"
          className={`navigation__checkbox`}
          id="navi-toggle"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="navi-toggle" className={`navigation__button`}>
          <span className={`navigation__icon`}>&nbsp;</span>
        </label>
      </div>
      <CustomContainer className="logo--container">
        <img src={Logo} alt="" className="logo" />
      </CustomContainer>

      <ul className={`nav__items ${checked && "active"}`}>
        {profile?.isAdmin && (
          <li className="nav__item" onClick={() => setChecked(false)}>
            <Link to="view-listing">View Listings</Link>
          </li>
        )}

        <li className="nav__item" onClick={() => setChecked(false)}>
          <Link to="/">Home</Link>
        </li>
        <li className="nav__item" onClick={() => setChecked(false)}>
          <Link>Influencer</Link>
        </li>
        <li className="nav__item" onClick={() => setChecked(false)}>
          <Link>Blog</Link>
        </li>
        <li className="nav__item">
          {profile?.email ? (
            <AppText
              color="rgba(0,0,0,.7)"
              textSize="1.8"
              fontWeight="500"
              className="email"
            >
              {limitTextCharacter(profile?.email)} <TfiAngleDown size={20} />
              <FlexColumn className="dropdown">
                {/* <AppSpan
                  color="rgba(0,0,0,.4)"
                  textSize="2"
                  fontWeight="500"
                  topPadding="2"
                  leftPadding="2"
                  bottomPadding="2"
                  rightPadding="2"
                  cursor="pointer"
                  className="dropdown-item"
                >
                  Settings
                </AppSpan> */}
                <AppSpan
                  color="rgba(0,0,0,.4)"
                  textSize="1.6"
                  fontWeight="500"
                  leftPadding="2"
                  bottomPadding="2"
                  rightPadding="2"
                  cursor="pointer"
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Sign Out
                </AppSpan>
              </FlexColumn>
            </AppText>
          ) : (
            <Link to="/signin">
              <VscSignIn style={{ paddingTop: "5px" }} /> Sign In
            </Link>
          )}
        </li>
      </ul>
      <AppLink
        decoration="none"
        color="#fff"
        align="center"
        style={{
          width: "30rem",
          backgroundColor: "#4ade80",
          borderRadius: "7px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        topPadding="1.5"
        leftPadding="1.5"
        rightPadding="1.5"
        bottomPadding="1.5"
        className="add-listing"
        onClick={handleListClick}
      >
        <AiOutlinePlus size={20} />
        Add Listing
      </AppLink>
      <AppLink
        decoration="none"
        color="#fff"
        align="center"
        style={{
          backgroundColor: "#4ade80",
          borderRadius: "7px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        topPadding="1.5"
        leftPadding="1.5"
        rightPadding="1.5"
        bottomPadding="1.5"
        className="add-listing-phone"
        onClick={handleListClick}
      >
        <AiOutlinePlus size={20} />
      </AppLink>
    </FlexRow>
  );
}

export default Nav
