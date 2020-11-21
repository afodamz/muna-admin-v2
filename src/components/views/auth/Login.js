import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import * as actions from '../../../Redux/Actions/auth';
import { connect } from 'react-redux';
import { ValidatorForm} from 'react-material-ui-form-validator';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="munalink">
        Muna
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  // main: {
  //   backgroundColor: 'linear-gradient(90deg, rgba(36,14,0,1) 0%, rgba(33,34,3,1) 9%, rgba(9,121,20,1) 29%, rgba(62,28,106,1) 43%, rgba(88,59,138,1) 88%, rgba(0,212,255,1) 100%)',
  //   filter: 'blur(8px)',
  // },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: '0px 0px 4px 3px #a29b9b',
  },
  styleform: {
    boxShadow: '0px 0px 4px 3px #a29b9b',
    alignItems: 'center',
    padding: '0px 25px 15px 25px',
    backgroundColor: 'white'
  },
}));

const Login =(props)=> {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisisble, setpasswordVisisble] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setpasswordVisisble(!passwordVisisble);
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let history = props.history;
    props.onAuth(email, password, history);
  }


  let errorMessage = null;
  if (props.error) {
    alert(props.errorMessage);
    errorMessage = (
          <p>{props.errorMessage}</p>
      );
  }
  
  
  return (

    <Container component="main" maxWidth="xs" >
      <CssBaseline />
        <div className={classes.styleform}>
        {errorMessage}
          {
            props.loading ?
            <Typography component="h3" variant="h5">
            Loading
          </Typography>
            :
          <div className={classes.paper}>
            
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <ValidatorForm 
          onSubmit={handleSubmit}  className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={event => setEmail(event.target.value)}
              required
              value={email}
            />
            <FormControl className={clsx(classes.margin, classes.textField, classes.form)} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={passwordVisisble ? 'text' : 'password'}
              value={password}
              required
              margin="normal"
              fullWidth
              onChange={event => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {passwordVisisble ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              // labelWidth={70}
            />
          </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/auth/passwordreset/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register/">
                  <Typography component="h4" variant="body2">Don't have an account? Sign Up</Typography>
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        
          </div>
          }
        </div>    
      <Box mt={5}>
        <Copyright />
      </Box>   
    </Container>
  );
}



const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        errorMessage: state.errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email, password, history) => dispatch(actions.authLogin(email, password, history)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);