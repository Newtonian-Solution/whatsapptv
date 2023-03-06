import "./index.scss";
import { useState,useContext } from "react";
import {
  AppLink,
 
  AppText,
  CustomContainer,
  FlexRow,
  Form,
  FormGroup,
  AppLabel,
  Button,
  RoundImageContainer
} from "../../app-styles";
import ApiContext from "../../../provider/API/call-service";
import axios from "axios";
import UserContext from "../../../provider/state-manager/userProvider";
import VisibilityContext from "../../../provider/state-manager/visibilityProvider";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
const AddListing = () => {
    const [checked, setChecked] = useState(false)
    const navigate = useNavigate()
    const [listing, setListing] = useState({title:"", number:"", link:"", email:"", description:""})
   const [selectedFile, setSelectedFile] = useState();
   const [previewUrl, setPreviewUrl] = useState(null)
    const {API} = useContext(ApiContext)
    const {user} = useContext(UserContext)
    const {loader,notifier}  = useContext(VisibilityContext)


function onImageChange(e) {
  setSelectedFile(e.target.files[0])
  setPreviewUrl(URL.createObjectURL(e.target.files[0]))
}

    async function handleSubmit(e) {
        e.preventDefault();
        if(!listing.title || !listing.description || !listing.number || !listing.link || !selectedFile) return notifier.show('Please Fill in all required document!', 'Error', 'error')
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("number", listing.number);
        formData.append("link", listing.link);
        formData.append("description", listing.description);
        formData.append("email", listing.email);
        formData.append("title", listing.title);

      try {
         loader(true);
         const response = await axios.post(
           "https://watv-backend.onrender.com/api/v1",
           formData,
           {
             headers: {
               "Content-Type": "multipart/form-data",
               Authorization: `Bearer ${user.token}`,
             },
           }
         )
         loader(false)
         if(response.status === 200) {
          notifier.show('Sucessfully Added a TV', 'Success', 'success')
          setListing({...listing, title:'', description:'', number:'',link:''})
          setSelectedFile()
          setPreviewUrl('')

          return true
         }
       

      }
      catch(err) {
    loader(false);
    console.log(err)
    notifier.show(err?.response?.data || err.message, 'Error', 'error')
      }
    
     



    }
  return (
    <CustomContainer leftPadding="8" topPadding="10" rightPadding="5">
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
      <AppText textSize="5" color="rgba(0,0,0,.7)" fontWeight="500">
        Add Details
      </AppText>
      <CustomContainer width="8" height=".2" bgColor="orange"></CustomContainer>

      <Form topMargin="7" onSubmit={handleSubmit}>
        <CustomContainer>
          <AppText color="rgba(0,0,0,.4)" fontWeight="500" bottomMargin="2">
            IMAGES (OPTIONAL)
          </AppText>
          <CustomContainer>
            {previewUrl && (
              <RoundImageContainer size="20" bottomMargin="2">
                <img src={previewUrl} width="100%" height="100%" />
              </RoundImageContainer>
            )}

            <label htmlFor="img-upload" className="img-label">
              Select Image
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageChange}
              className="img-upload"
              id="img-upload"
              name="img-upload"
            />
          </CustomContainer>
        </CustomContainer>
        <FormGroup
          borderColor="rgba(0,0,0,.2)"
          inputColor="rgba(0,0,0,.5)"
          labelColor="rgba(0,0,0,.4)"
        >
          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            value={listing.title}
            onChange={(e) => setListing({ ...listing, title: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          borderColor="rgba(0,0,0,.2)"
          inputColor="rgba(0,0,0,.5)"
          labelColor="rgba(0,0,0,.4)"
        >
          <label htmlFor="tvNumber">TV NUMBER(OPTIONAL)</label>
          <input
            type="text"
            value={listing.number}
            onChange={(e) => setListing({ ...listing, number: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          borderColor="rgba(0,0,0,.2)"
          inputColor="rgba(0,0,0,.5)"
          labelColor="rgba(0,0,0,.4)"
        >
          <label htmlFor="tvLink">WHATSAPP TV LINK</label>
          <input
            type="text"
            value={listing.link}
            onChange={(e) => setListing({ ...listing, link: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          borderColor="rgba(0,0,0,.2)"
          inputColor="rgba(0,0,0,.5)"
          labelColor="rgba(0,0,0,.4)"
        >
          <label htmlFor="tvEmail">EMAIL ADDRESS</label>
          <input
            type="email"
            value={listing.email}
            onChange={(e) => setListing({ ...listing, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup
          borderColor="rgba(0,0,0,.2)"
          inputColor="rgba(0,0,0,.5)"
          labelColor="rgba(0,0,0,.4)"
        >
          <label htmlFor="tvDescription">DESCRIPTION</label>
          <textarea
            name="tvDescription"
            id="tvDescription"
            cols="30"
            rows="10"
            value={listing.description}
            onChange={(e) =>
              setListing({ ...listing, description: e.target.value })
            }
          ></textarea>
        </FormGroup>
        <FlexRow justifyContent="flex-start">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onChange={(e) => setChecked(e.target.checked)}
          />
          <AppLabel
            color="rgba(0,0,0,.7)"
            textSize="2"
            fontWeight="500"
            htmlFor="terms"
          >
            &nbsp; I agree to the
            <AppLink
              color="blue"
              decoration="none"
              textSize="2"
              fontWeight="500"
            >
              &nbsp;terms and conditions
            </AppLink>
          </AppLabel>
        </FlexRow>
        <Button
          bgColor="#FCD34D"
          fontWeight="600"
          topMargin="3"
          disabled={!checked}
          hoverBgColor="#fbbf24"
          hoverColor="#fff"
          type="submit"
        >
          Submit Listing
        </Button>
      </Form>
    </CustomContainer>
  );
};
export default AddListing;
