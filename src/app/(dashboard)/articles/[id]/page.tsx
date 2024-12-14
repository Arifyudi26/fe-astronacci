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
import InputAdornment from '@mui/material/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import type { RootState, AppDispatch } from '@store/store'
import Form from '@components/Form'
import { fetchArticleDetail } from '@store/slices/articleSlice'

const initialValues = {
  content: '',
  id: '',
  createdAt: '',
  updatedAt: '',
  title: ''
}

function UserDetail() {
  const dispatch = useDispatch<AppDispatch>()

  const articleDetail = useSelector((state: RootState) => state.articles.articleDetail)
  const loading = useSelector((state: RootState) => state.articles.loading)

  const { id } = useParams()
  const userId = Array.isArray(id) ? id[0] : id

  useEffect(() => {
    dispatch(fetchArticleDetail(userId))
  }, [userId])

  const formik = useFormik({
    initialValues: articleDetail || initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values: any) => {
      console.log(values)
      alert('This function is not active yet (article)')
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
              <TextField
                fullWidth
                rows={4}
                multiline
                label='Content'
                placeholder='Content...'
                name='content'
                value={formik.values.content}
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
