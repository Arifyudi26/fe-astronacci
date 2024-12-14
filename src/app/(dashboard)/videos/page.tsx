'use client'
import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, CircularProgress } from '@mui/material'

import type { AppDispatch, RootState } from '@store/store'
import { fetchAllVideos } from '@store/slices/videoSlice'

const DashboardAnalytics = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { videos, loading, error } = useSelector((state: RootState) => state.videos)
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchAllVideos())
  }, [dispatch])

  const handleDetail = (id: string) => {
    router.push(`/videos/${id}`)
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
      {videos &&
        videos.map(res => {
          return (
            <Grid item xs={12} md={3} key={res.id}>
              <Card onClick={() => handleDetail(res.id)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant='h5'>{res?.title}</Typography>
                  <div className='mt-4 group'>
                    <iframe
                      className='transition-all duration-300 group-hover:w-full group-hover:h-[calc(315px*1.5)] w-[100%] h-[315px]'
                      src={res?.url}
                      title='YouTube video player'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      referrerPolicy='strict-origin-when-cross-origin'
                      allowFullScreen
                    ></iframe>
                  </div>
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
