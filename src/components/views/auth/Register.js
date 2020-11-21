import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as actions from '../../../Redux/Actions/auth';
import { connect } from 'react-redux';
import { ValidatorForm} from 'react-material-ui-form-validator';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="munalink">
        Muna
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  textField: {
    borderRadius: '15px',
    "&:hover, &:focus" :{
      borderColor: "green",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 0px 4px 3px #a29b9b',
    alignItems: 'center',
    padding: '0px 25px 15px 25px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let passwordError = null;
const Register =(props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  
  
//   const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
// const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

// if(strongRegex.test(event.target.value)) {
//   this.setState({ backgroundColor: "#0F9D58" });
// } else if(mediumRegex.test(event.target.value)) {
//   this.setState({ backgroundColor: "#F4B400" });
// } else {
//   this.setState({ backgroundColor: "#DB4437" });
// }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password1){
    alert('password do not match');
    }else{
      let history = props.history;
    props.onAuth(
            email,
            firstname,
            lastname,
            password,
            password1,
            history
        );
  }
  }


  let errorMessage = null;
  if (props.error) {
    alert("trial and error");
    errorMessage = (
          <p>{props.error.message}</p>
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage}
        {props.loading ?
          <Typography component="h3" variant="h5">
          Loading
        </Typography> : 
        
          <ValidatorForm 
          onSubmit={handleSubmit}  className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  type="text"
                  onChange={event => setFirstname(event.target.value)}
                  required
                  id="firstName"
                  label="First Name"
                  
                  value={firstname}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="text"
                  onChange={event => setLastname(event.target.value)}
                  required
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  
                  value={lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={event => setEmail(event.target.value)}
                  required
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  
                  value={email}
                />
              </Grid>
              
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={event => setPassword(event.target.value)}
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    onChange={event => setPassword1(event.target.value)}
                    required
                    name="password1"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password1}
                  />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/auth/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
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
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, firstname, lastname, password, password1, history) => dispatch(actions.authSignup(email, firstname, lastname, password, password1, history)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
