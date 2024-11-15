"use client"

import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { Card, CardContent } from "@/components/ui/card"

export default function DesktopCamera() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [gestureModel, setGestureModel] = useState<tf.LayersModel | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const handModel = await handpose.load();
      setModel(handModel);

      console.log('Carga Modelo')
      const loadedGestureModel = await tf.loadLayersModel(`http://localhost:3000/web_model/model.json`);
      console.log(loadedGestureModel)
      setGestureModel(loadedGestureModel);
    };
    loadModels();
  }, []);

  const detect = async () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      model
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        // Make Detections
        const hands = await model.estimateHands(video);
        if (hands.length > 0) {
          
          // Dibujar en el canvas
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, videoWidth, videoHeight);
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  
            // Dibujar landmarks de la mano
            hands.forEach(hand => {
              hand.landmarks.forEach(landmark => {
                const [x, y] = landmark;
  
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 3 * Math.PI);
                ctx.fillStyle = "red";
                ctx.fill();
              });
            });
          }
  
          console.log('Se detecta mano')
          // Aquí es donde procesarías los puntos de la mano y los pasarías a tu modelo
          const keypoints = hands[0].landmarks.flat();
          console.log(`Keypoints Reales: ${keypoints.length}`)
          // Asegúrate de que los keypoints estén en el formato correcto para tu modelo
          // Rellenar hasta llegar a 2520 elementos
          const paddedKeypoints = [...keypoints];
          while (paddedKeypoints.length < 2520) {
              paddedKeypoints.push(0);  // Agrega ceros
          }
  
          // Divide los puntos en 20 subconjuntos de 126 elementos
          const reshapedKeypoints: number[][] = [];
          for (let i = 0; i < 20; i++) {
              reshapedKeypoints.push(paddedKeypoints.slice(i * 126, (i + 1) * 126));
          }
          // Crea el tensor con la forma (1, 20, 126)
          if (gestureModel) {
              console.log(`KEYPOINTS: ${reshapedKeypoints} - ${reshapedKeypoints.length}`);
              const tensor = tf.tensor3d([reshapedKeypoints], [1, 20, 126]);
  
              // Realiza la predicción
              const prediction = gestureModel.predict(tensor) as tf.Tensor;
              const predictionData = await prediction.array();
              console.log('PostPredict')
              // Limpia los tensores para liberar memoria
              tensor.dispose();
              prediction.dispose();
  
              console.log(`Prediction: ${predictionData}`);
          }
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, 100);
    return () => clearInterval(interval);
  }, [model, gestureModel]);

  return (
      <Card className="w-full max-w-4xl">
        <CardContent className='p-6'>
          <div className="relative aspect-video">
            <Webcam
              audio={false}
              ref={webcamRef}
              className="w-full h-full object-cover rounded-lg"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>
  )
}