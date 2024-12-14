'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Alert, CircularProgress } from '@mui/material'

import type { AppDispatch, RootState } from '@store/store'
import { fetchAllArticles } from '@store/slices/articleSlice'

const DashboardAnalytics = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, loading, error } = useSelector((state: RootState) => state.articles)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAllArticles())
  }, [dispatch])

  const handleDetail = (id: string) => {
    router.push(`/articles/${id}`)
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center'>
        <Alert severity='error'>Data not found!</Alert>
      </div>
    )
  }

  return (
    <Grid container spacing={12}>
      {articles &&
        articles.map(res => {
          return (
            <Grid item xs={12} md={3} key={res.id}>
              <Card onClick={() => handleDetail(res.id)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant='h5'>{res?.title}</Typography>
                  <Typography>{res?.content}</Typography>

                  <Typography variant='body2' className='mt-5 text-right'>
                    Created by {res?.user?.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
    </Grid>
  )
}

export default DashboardAnalytics
