/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect } from 'react'

import { useParams, useRouter } from 'next/navigation'

import Swal from 'sweetalert2'

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
import FormHelperText from '@mui/material/FormHelperText'
import * as Yup from 'yup'

import { fetchUserDetail, updatedhUserDetail } from '@store/slices/userSlice'
import type { RootState, AppDispatch } from '@store/store'
import Form from '@components/Form'

const initialValues = {
  email: '',
  id: '',
  name: '',
  type_membership: '',
  bio: ''
}

const Types = ['type-a', 'type-b', 'type-c']

const FormSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  type_membership: Yup.string().required('Type membership is required'),
  bio: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Bio is required')
})

function UserDetail() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
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
    validationSchema: FormSchema,
    onSubmit: async (values: any) => {
      try {
        await dispatch(updatedhUserDetail(userId, values))
        Swal.fire({
          title: 'Success!',
          text: 'User details updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push('/')
        })
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: (error as Error).message || 'Failed to update user details. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry'
        })
      }
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
                placeholder='John Doe'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={
                  formik.touched.name && typeof formik.errors.name === 'string' ? formik.errors.name : undefined
                }
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  formik.touched.email && typeof formik.errors.email === 'string' ? formik.errors.email : undefined
                }
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
              <FormControl fullWidth error={formik.touched.type_membership && Boolean(formik.errors.type_membership)}>
                <InputLabel>Type Membership</InputLabel>
                <Select
                  required
                  name='type_membership'
                  value={formik.values?.type_membership}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label='Type Membership'
                >
                  <MenuItem value=''>None</MenuItem>
                  {Types.map((res, i) => {
                    return (
                      <MenuItem value={res} key={i} selected={formik.values?.type_membership === res}>
                        {res}
                      </MenuItem>
                    )
                  })}
                </Select>
                {formik.touched.type_membership && typeof formik.errors.type_membership === 'string' && (
                  <FormHelperText>{formik.errors.type_membership}</FormHelperText>
                )}
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
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && typeof formik.errors.bio === 'string' ? formik.errors.bio : undefined}
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
