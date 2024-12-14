/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { fetchUserDetail } from '@store/slices/userSlice'

import type { RootState, AppDispatch } from '@store/store'
import Form from '@components/Form'

const initialValues = {
  email: '',
  id: '',
  name: '',
  type_membership: ''
}

function UserDetail() {
  const dispatch = useDispatch<AppDispatch>()

  const userDetail = useSelector((state: RootState) => state.users.userDetail)
  const loading = useSelector((state: RootState) => state.users.loading)

  const { id } = useParams()
  const userId = Array.isArray(id) ? id[0] : id

  useEffect(() => {
    dispatch(fetchUserDetail(userId))
  }, [userId])

  const formik = useFormik({
    initialValues: userDetail || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: any) => {
      console.log(values)
      alert('This function is not active yet')
    }
  })

  return (
    <Card>
      <CardHeader title='Form' />
      <CardContent>
        <Form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                required
                placeholder='John Doe'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-user-3-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='johndoe@gmail.com'
                required
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-mail-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type Membership</InputLabel>
                <Select
                  required
                  name='type_membership'
                  value={formik.values?.type_membership}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label='Type Membership'
                >
                  <MenuItem value={'type-a'}>Type-a</MenuItem>
                  <MenuItem value={'type-b'}>Type-b</MenuItem>
                  <MenuItem value={'type-c'}>Type-c</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                rows={4}
                multiline
                label='Message'
                placeholder='Bio...'
                name='bio'
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-message-2-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' disabled={loading}>
                {loading ? 'Submit...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
  )
}

export default UserDetail
