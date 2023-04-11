import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleLogin } from 'react-google-login'
import LockOutlined from '@mui/icons-material/LockOutlined';
import useStyles from './styles'
import Input from './Input';
import Icon from './Icon';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth'
import { AUTH } from '../../constants/actionTypes';

const initalState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => { 
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initalState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const start = async () => {
            await gapi.client.init({
                clientId: '169496463165-5qnlfmtqn9l997ugr8ld7sb3m4p7a66b.apps.googleusercontent.com',
                scope: 'email',
            });
        }
        
        gapi.load('client:auth2', start);
    }, [isSignup]);
    
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData, navigate))
        } else {
            dispatch(signIn(formData, navigate))
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH , data: { result, token }})
            navigate('/posts')
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In Was Unsuccessful ');
    };

    return (
        <Container component='main' maxWidth='xs' >
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar} >
                    <LockOutlined />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button className={classes.submit} type='submit' fullWidth variant='contained' color='primary' >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='169496463165-5qnlfmtqn9l997ugr8ld7sb3m4p7a66b.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained' >
                                Sign In With Google
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        variant='contained'
                    />
                    <Grid container justifyContent='flex-end' >
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
};

export default Auth