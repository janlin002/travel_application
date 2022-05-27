import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import {
  signin,
  signup,
} from '../../redux/actions/auth';

import useStyles from './styles';
import Input from './input';
import Icon from './icon';

// import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../redux/actionType';

const initialState = {
  firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
};

function Auth() {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useNavigate();
  const [form, setForm] = useState(initialState);

  const classes = useStyles();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // e.targer.name, 會抓tag裡面name的屬性
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  // 顯示密碼
  const handleShowPassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  // 註冊跟登入切換
  const switchMode = () => {
    setIsSignup((prevSignup) => !prevSignup);
  };

  // Google 驗證
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
      // 成功後把頁面導到編輯頁
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = async (error) => {
    console.log(error, 'error');
    // console.log('Google Sign Up Unsuccess, Try Again Later');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input
                name="firstName"
                label="First Name"
                handleChange={handleChange}
                autoFocus
                half
              />
              <Input
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half
              />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          {/* Google驗證 影片(3:17:00) 目前應該是版本問題不能使用 - 2022/05/27 */}
          <GoogleLogin
            clientId="425515751581-ph1n4e6chh7v047f7jrlq6nkm75unsuu.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={
                classes.googleButton
                }
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            plugin_name="網路用戶端 1"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
