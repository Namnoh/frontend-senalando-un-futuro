"use client"

import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import { Card, CardContent } from "@/components/ui/card"

export default function MobileCamera() {
  const webcamRef = useRef<Webcam>(null)

  return (
    <div className="my-4">
      <Card className="w-full">
        <CardContent className='p-3'>
          <div className="aspect-square">
            <Webcam
              audio={false}
              ref={webcamRef}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}