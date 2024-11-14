"use client"

import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import { Card, CardContent } from "@/components/ui/card"

export default function DesktopCamera() {
  const webcamRef = useRef<Webcam>(null)

  return (
      <Card className="w-full max-w-4xl">
        <CardContent className='p-6'>
          <div className="aspect-video">
            <Webcam
              audio={false}
              ref={webcamRef}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
  )
}