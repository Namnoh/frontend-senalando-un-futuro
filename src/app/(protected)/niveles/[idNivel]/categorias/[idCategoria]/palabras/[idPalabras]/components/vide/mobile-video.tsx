"use client"

import React, { useRef, useState, useCallback, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Repeat } from "lucide-react"
import { Palabra } from '@/interfaces/palabraInterface'
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function MobileVideo({word}:{word:Palabra}) {
  const playerRef = useRef<ReactPlayer>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [playbackRate, setPlaybackRate] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlaybackRateChange = useCallback((value: number[]) => {
    const newRate = value[0]
    setPlaybackRate(newRate)
  }, [])

  const handleVideoURL = useCallback((url: string) => {
    setVideoUrl(url)
  }, [])

  const replayVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      setIsPlaying(true)
    }
  }, [])

  //useEffect(() => {
  //  handleVideoURL(word.videoPalabra)
  //}, [])

  const videoAvailable = typeof word.videoPalabra === 'string' && word.videoPalabra.toLowerCase().startsWith('http')
  return (
    <div className="my-4">
      <Card>
        <CardContent className='p-3'>
          {videoAvailable ? (
            <>
              <div className="mb-2 aspect-[9/16]">
                <ReactPlayer
                  ref={playerRef}
                  url={word.videoPalabra}
                  width="100%"
                  height="100%"
                  playbackRate={playbackRate}
                  playing={isPlaying}
                  onError={(e) => console.error('Error loading video:', e)}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="playback-rate" className="block text-sm font-medium mb-1">
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
              <Button onClick={replayVideo} className="flex items-center gap-2 w-full">
                <Repeat className="w-4 h-4" />
                Repetir
              </Button>
            </>
          ):(
            <AspectRatio className='my-4'>
              <div className="flex items-center justify-center h-full">
                <p className="text-lg font-medium text-primary-500">Video de referencia no disponible</p>
              </div>
            </AspectRatio>
          )}
        </CardContent>
      </Card>
    </div>
  )
}