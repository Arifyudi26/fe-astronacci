/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

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

import { setCookie } from 'nookies'

import type { Mode } from '@core/types'

import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'
import { useImageVariant } from '@core/hooks/useImageVariant'
import { login, loginFacebook, loginSuccess } from '@store/slices/authSlice'
import type { RootState } from '@store/store'

declare global {
  interface Window {
    FB: any
  }
}

const Login = ({ mode }: { mode: Mode }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const dispatch = useDispatch()

  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await dispatch<any>(login(email, password))
      router.push('/')
    } catch (error) {
      console.log(error)
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

  const handleFacebookLogin = () => {
    if (window.FB) {
      window.FB.login(
        (response: any) => {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken

            handleLogin(accessToken)
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

  const handleLogin = async (accessToken: string) => {
    await dispatch<any>(loginFacebook(accessToken))
    router.push('/')
  }

  const handleGoogleLogin = () => {
    router.push('http://localhost:5000/api/auth/google')
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const user = urlParams.get('user')

    if (token && user) {
      const handleLoginSuccess = async () => {
        try {
          if (user) {
            const parsedUser = JSON.parse(user)

            dispatch(loginSuccess(parsedUser))
          } else {
            console.warn('No user data found in URL parameters')
          }

          if (token) {
            setCookie(null, 'token', token, {
              maxAge: 7 * 24 * 60 * 60,
              path: '/'
            })
          } else {
            console.warn('No token found in URL parameters')
          }

          router.push('/')
          window.close()
        } catch (error) {
          console.error('Error handling login success:', error)
        }
      }

      handleLoginSuccess()
    }
  }, [router])

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>Welcome 👋🏻</Typography>
            </div>
            {error && <Typography color='error'>{error}</Typography>}
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <TextField autoFocus fullWidth label='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <TextField
                fullWidth
                value={password}
                onChange={e => setPassword(e.target.value)}
                label='Password'
                id='outlined-adornment-password'
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
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit' disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook' onClick={handleFacebookLogin}>
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

export default Login
