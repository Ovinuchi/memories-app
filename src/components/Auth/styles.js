import { makeStyles } from '@mui/styles';
import { deepOrange } from '@mui/material/colors';

export default makeStyles(() => ({
  paper: {
    marginTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
    },
  },
  avatar: {
    margin: '10px',
    backgroundColor: deepOrange,
  },
  form: {
    width: '100%',
    marginTop: '30px',
  },
  submit: {
    margin: '30px 0px 20px',
  },
  googleButton: {
    marginBottom: '20px',
  },
}));