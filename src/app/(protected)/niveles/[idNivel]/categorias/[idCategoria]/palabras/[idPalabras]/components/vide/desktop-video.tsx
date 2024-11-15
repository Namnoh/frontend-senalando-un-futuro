"use client"

import React, { useRef, useState, useCallback, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Repeat } from "lucide-react"
import { Palabra } from '@/interfaces/palabraInterface'

export default function DesktopVideo({word}: {word:Palabra}) {
  const playerRef = useRef<ReactPlayer>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [playbackRate, setPlaybackRate] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlaybackRateChange = useCallback((value: number[]) => {
    const newRate = value[0]
    setPlaybackRate(newRate)
  }, [])

  const handleVideoURL = useCallback((url:string) => {
    setVideoUrl(url)
  }, [])

  const replayVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      setIsPlaying(true)
    }
  }, [])

  useEffect(() => {
    handleVideoURL(word.videoPalabra)
  }, [])

  return (
    <div className="h-full">
      <Card className="h-full w-full max-w-3xl mx-auto">
        <CardContent className='h-full flex flex-col items-center p-5'>
          <div className="flex-grow mb-4">
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              width="100%"
              height="100%"
              playbackRate={playbackRate}
              playing={isPlaying}
              onReady={() => console.log('Video ready')}
              onError={(e) => console.error('Error loading video:', e)}
              onEnded={() => setIsPlaying(false)}
            />
          </div>
          <div className='flex justify-between w-full'>
            <div className="mb-4">
              <label htmlFor="playback-rate" className="block text-sm font-medium mb-2">
                Velocidad: {playbackRate.toFixed(2)}x
              </label>
              <Slider
                id="playback-rate"
                min={0.25}
                max={2}
                step={0.25}
                value={[playbackRate]}
                onValueChange={handlePlaybackRateChange}
              />
            </div>
            <Button onClick={replayVideo} className="flex items-center gap-2">
              <Repeat className="w-4 h-4" />
              Repetir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}