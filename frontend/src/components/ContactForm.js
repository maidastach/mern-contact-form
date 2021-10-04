import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Mail } from '@mui/icons-material';
import { Copyright } from './Copyright';
import { useState } from 'react';
import { isNotEmpty, validateEmail, numberCheck, messageHasLength } from '../utils';
import axios from 'axios';

const theme = createTheme();


const ContactForm = () =>
{
  const [form, setForm] = useState({ fname: '', email: '', telephone: '', city: '', message: '' })
  const [errors, setErrors] = useState({ })
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => 
  {
    let temp = {}

    temp.fname = isNotEmpty(form.fname) ? '' : 'Name is Required'
    temp.email = validateEmail(form.email) ? '' : 'Incorrect format email'
    temp.telephone = numberCheck(form.telephone) ? '' : 'Mobile not valid'
    temp.city = isNotEmpty(form.city) ? '' : 'City is Required'
    temp.message = messageHasLength(form.message) ? '' : 'Mesage is required or too short'

    setErrors({...temp})

    return Object.values(temp).every(value => value === '')
  }

  const handleOnChange = event =>
  {
    const field = event.target.name
    setForm({...form, [field]: event.target.value})

    if(field === 'fname' | field === 'city')
      setErrors({...errors, [field]: isNotEmpty(event.target.value) ? '' : 'Name is Required'})
    else if(field === 'email')
      setErrors({...errors, [field]: validateEmail(event.target.value) ? '' : 'Incorrect format email'})
    else if(field === 'telephone')
      setErrors({...errors, [field]: numberCheck(event.target.value) ? '' : 'Mobile not valid'})
    else if(field === 'message')
      setErrors({...errors, [field]: messageHasLength(event.target.value) ? '' : 'Mesage is required or too short'})
  }


  const handleSubmit = async(event) =>
  {
    event.preventDefault()
    setIsLoading(true)
    if(validate())
    {
      try
      {
        const response = await axios.post('/api/contact', form)
        if(response.status === 200)
        {
          window.alert(`${response.data.message}, check console for the response`)
          setIsLoading(false)
          setForm({ fname: '', email: '', telephone: '', city: '', message: '' })
        }
        console.log(response)
      }
      catch (error)
      {
          window.alert(`${error}, check console for the error`)
          console.log(error);
          setIsLoading(false)
        }
    }
    else
    setIsLoading(false)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Mail />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Form
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...(errors.fname && {error: true, helperText: errors.fname})}
                  {...(!errors.fname && {error: null, helperText: '', color:'success'})}
                  autoComplete="fname"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="Full Name"
                  autoFocus
                  value={form.fname}
                  onChange={handleOnChange}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...(errors.email && {error: true, helperText: errors.email})}
                  {...(!errors.email && {error: null, helperText: '', color:'success'})}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleOnChange}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...(!errors.telephone && {error: null, helperText: '', color:'success'})}
                  {...(errors.telephone && {error: true, helperText: errors.telephone})}
                  required
                  fullWidth
                  id="telephone"
                  label="Mobile Number"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleOnChange}
                  autoComplete="telephone"
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...(!errors.city && {error: null, helperText: '', color:'success'})}
                  {...(errors.city && {error: true, helperText: errors.city})}
                  autoComplete="city"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={form.city}
                  onChange={handleOnChange}
                  disabled={isLoading}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  {...(!errors.message && {error: null, helperText: '', color:'success'})}
                  {...(errors.message && {error: true, helperText: errors.message})}
                  fullWidth
                  multiline
                  rows={8}
                  name="message"
                  label="Message"
                  type="message"
                  value={form.message}
                  id="message"
                  onChange={handleOnChange}
                  autoComplete="message"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
               {isLoading ? 'Loading...' : 'Submit'}
            </Button>
 
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default ContactForm;