'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { useDispatch, useSelector } from 'react-redux'

import { register, registerFacebook } from '@store/slices/authSlice'
import type { Mode } from '@core/types'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'
import { useImageVariant } from '@core/hooks/useImageVariant'
import type { AppDispatch, RootState } from '@store/store'

const Register = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfPasswordShown, setIsConfPasswordShown] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [name, setName] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const router = useRouter()

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)
  const handleClickShowConfPassword = () => setIsConfPasswordShown(show => !show)

  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await dispatch(register(email, password, name, confPassword))

      router.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (!document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script')

        script.id = 'facebook-jssdk'
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.async = true
        script.defer = true

        script.onload = () => {
          if (window.FB) {
            window.FB.init({
              appId: process.env.NEXT_PUBLIC_APP_ID,
              cookie: true,
              xfbml: true,
              version: 'v12.0'
            })
          }
        }

        document.body.appendChild(script)
      }
    }

    loadFacebookSDK()
  }, [])

  const handleFacebookRegister = () => {
    if (window.FB) {
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            window.FB.api('/me', { fields: 'id,name,email,picture' }, (profileResponse: any) => {
              if (profileResponse && !profileResponse.error) {
                const accessToken = response.authResponse.accessToken

                try {
                  dispatch<any>(registerFacebook(accessToken))
                  router.push('/login')
                } catch (error) {
                  console.error('Registration failed:', error)
                }
              } else {
                console.error('Error fetching Facebook profile:', profileResponse.error)
              }
            })
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        },
        { scope: 'email,public_profile' }
      )
    } else {
      console.error('Facebook SDK not loaded yet.')
    }
  }

  const handleGoogleLogin = () => {
    router.push('http://localhost:5000/api/auth/google')
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-start mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Adventure starts here 🚀</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'></Typography>
            {error && <Typography color='error'>{error}</Typography>}
            <form noValidate autoComplete='off' onSubmit={e => handleSubmit(e)} className='flex flex-col gap-5'>
              <TextField autoFocus fullWidth label='Username' value={name} onChange={e => setName(e.target.value)} />
              <TextField fullWidth label='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <TextField
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                label='Password'
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                value={confPassword}
                onChange={e => setConfPassword(e.target.value)}
                label='Confirm Password'
                type={isConfPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowConfPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isConfPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              <Button fullWidth variant='contained' type='submit' disabled={loading}>
                {loading ? 'Sign Up...' : 'Sign Up'}
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href='/login' color='primary'>
                  Sign in instead
                </Typography>
              </div>
              <Divider className='gap-3'>Or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook' onClick={handleFacebookRegister}>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-github'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus' onClick={handleGoogleLogin}>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Register
