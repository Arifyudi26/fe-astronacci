/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect } from 'react'

import { useParams } from 'next/navigation'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import type { RootState, AppDispatch } from '@store/store'
import Form from '@components/Form'
import { fetchVideosDetail } from '@store/slices/videoSlice'

const initialValues = {
  id: '',
  title: '',
  url: ''
}

function UserDetail() {
  const dispatch = useDispatch<AppDispatch>()

  const videoDetail = useSelector((state: RootState) => state.videos.videoDetail)
  const loading = useSelector((state: RootState) => state.videos.loading)

  const { id } = useParams()
  const userId = Array.isArray(id) ? id[0] : id

  useEffect(() => {
    dispatch(fetchVideosDetail(userId))
  }, [userId])

  const formik = useFormik({
    initialValues: videoDetail || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: any) => {
      console.log(values)
      alert('This function is not active yet (videos)')
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
                label='Title'
                required
                placeholder='Title'
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <div className='mt-4'>
                <iframe
                  className='transition-all duration-300 group-hover:w-full group-hover:h-[calc(315px*1.5)] w-[100%] h-[315px]'
                  src={formik.values?.url}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  referrerPolicy='strict-origin-when-cross-origin'
                  allowFullScreen
                ></iframe>
              </div>
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
