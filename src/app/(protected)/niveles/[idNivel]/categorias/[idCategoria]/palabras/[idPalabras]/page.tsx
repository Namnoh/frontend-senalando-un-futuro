'use client'

import React, { useRef, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Repeat } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function CameraAndVideoPage() {
  const webcamRef = useRef<Webcam>(null)
  const playerRef = useRef<ReactPlayer>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [playbackRate, setPlaybackRate] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlaybackRateChange = useCallback((value: number[]) => {
    const newRate = value[0]
    setPlaybackRate(newRate)
  }, [])

  const handleVideoUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value)
  }, [])

  const loadVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      setIsPlaying(true)
    }
  }, [])

  const replayVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      setIsPlaying(true)
    }
  }, [])

  return (
    <div>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 md:justify-evenly lg:flex-wrap h-[80vh]'>
        <div className="ml-[10px] lg:max-w-[50%] flex flex-col text-center justify-center items-center">
          <Card className='m-2'>
            <CardContent>
              <div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="text"
                    placeholder="URL Video"
                    value={videoUrl}
                    onChange={handleVideoUrlChange}
                    
                  />
                  <Button onClick={loadVideo} className="w-[100vh] sm:w-auto">Temporal boton</Button>
                </div>
                <div className="aspect-video m-3 repeat-infinite">
                  <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    width="100%"
                    height="50vh"
                    playbackRate={playbackRate}
                    playing={isPlaying}
                    onReady={() => console.log('Video ready')}
                    onError={(e) => console.error('Error loading video:', e)}
                    onEnded={() => setIsPlaying(false)}

                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className='m-3'>
            <label htmlFor="playback-rate" className="block text-sm font-medium mb-2">
              Velocidad de reproducción: {playbackRate.toFixed(2)}x
            </label>
            <Slider
              id="playback-rate"
              min={0.25}
              max={2}
              step={0.25}
              value={[playbackRate]}
              onValueChange={handlePlaybackRateChange}/>
          </div>
          <Button onClick={replayVideo} className="flex items-center gap-2">
            <Repeat className="w-4 h-4" />
            Volver a reproducir
          </Button>

        </div>
        
        <div>
          <Card>
            <CardContent>
              <div className="aspect-video mb-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>            
      </div>
      <div className='flex justify-center m-7'>
        <Carousel className="w-full max-w-sm items-center justify-center">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

    </div>
  )
}