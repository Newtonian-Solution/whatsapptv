import { useState,useContext } from 'react'
import { Button, FlexColumn, FlexRow, FormGroup, ScreenTitle,Form, AppText, AppLink } from '../app-styles'
import './index.scss'
import ApiContext from '../../provider/API/call-service'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [mode, setMode] = useState('login')
   const [input, setInput] = useState({email: "", password:""})
   const {API} = useContext(ApiContext)
   const navigate = useNavigate()

    const handleMode = () => {
        if(mode === 'login') setMode("register")
        else if(mode === 'register') setMode('login')
    }
    const handleSubmit  = async (e) => {
      e.preventDefault();
      console.log('i have run')

      if(!input.email || !input.password) return alert('Please enter all required information!')
     if(mode === 'register') {
     
      const response = await API.signup(input)
      setInput({email:"", password: ""})
      if(response) setMode('login')
      
     } else if (mode === 'login') {
     
    const response = await API.signin(input)
      setInput({email:'', password:''})
     if(response) navigate('/')
     }
    }
  return (
    <FlexRow
      justifyContent="center"
      alignItems="center"
      bgColor="rgba(0,0,0,.9)"
      className="container"
      topPadding='10'

    >
      <FlexColumn
        bgColor="#fff"
        topPadding="4"
        leftPadding="4"
        rightPadding="4"
        bottomPadding="4"
        width="30"
        radius="1"
        className='box--container'
      >
        <ScreenTitle
          color="rgba(0,0,0.8)"
          textSize="3"
          fontWeight="500"
          bottomMargin="2"
        >
          {mode === 'login'? 'Sign In': 'Register'}
        </ScreenTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup borderColor="rgba(0,0,0,.5)" inputColor="rgba(0,0,0,.6)">
            <label className="input--label">EMAIL</label>
            <input type='email' className="formGroup--input" value={input.email} onChange={(e) => setInput({...input, email:e.target.value})} />
          </FormGroup>
          <FormGroup borderColor="rgba(0,0,0,.5)" inputColor="rgba(0,0,0,.6)">
            <label className="input--label">PASSWORD</label>
            <input type="password" className="formGroup--input" value={input.password} onChange={(e) => setInput({...input, password: e.target.value})} />
          </FormGroup>
          <FormGroup>
            <Button
              bgColor="red"
              hoverBgColor="orange"
              fontWeight="500"
              titleSize="1.8"
              type='submit'
            >
              {mode === 'login' ? 'Sign In' : 'Register'}
            </Button>
          </FormGroup>
        </Form>
        <AppText color='#000' textSize='1.7' fontWeight='500'>{mode === 'register'? 'Already have an account?' : "Don't have an account yet?"}</AppText>
        <AppLink textSize='1.7' topMargin='.2' decoration='none' onClick={handleMode}>{mode === 'register'? 'Sign In': 'Register'}</AppLink>       
      </FlexColumn>
    </FlexRow>
  );
}

export default SignIn
