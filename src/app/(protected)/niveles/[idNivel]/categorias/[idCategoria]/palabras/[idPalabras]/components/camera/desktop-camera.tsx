import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { Card, CardContent } from "@/components/ui/card";

export default function DesktopCamera() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<handpose.HandPose | null>(null);
  const [gestureModel, setGestureModel] = useState<tf.LayersModel | null>(null);
  const framesBuffer = useRef<number[][]>([]); // Buffer de frames para procesar en el modelo de gestos

  useEffect(() => {
    const loadModels = async () => {
      try {
        // Cargar modelo de HandPose
        const handModel = await handpose.load();
        setModel(handModel);
        console.log('Modelo de HandPose cargado.');

        // Cargar modelo de gestos
        const loadedGestureModel = await tf.loadLayersModel('http://localhost:3000/web_model/model.json');
        console.log('Modelo de gestos cargado:', loadedGestureModel);
        setGestureModel(loadedGestureModel);
      } catch (error) {
        console.error("Error al cargar los modelos:", error);
      }
    };
    loadModels();
  }, []);

  const detect = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4 &&
      model
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const hands = await model.estimateHands(video);
        if (hands.length > 0) {
          console.log('Se detecta mano:', hands);

          // Inicializamos un array para los keypoints combinados de ambas manos
          let combinedKeypoints: number[] = [];

          if (hands.length === 2) {
            // Si hay dos manos detectadas, combinar los keypoints de ambas
            combinedKeypoints = hands[0].landmarks.flat().concat(hands[1].landmarks.flat());
          } else {
            // Si hay solo una mano, duplicar los keypoints para llegar a 126
            combinedKeypoints = hands[0].landmarks.flat().concat(hands[0].landmarks.flat());
          }

          // Añadir los keypoints actuales al buffer de frames
          framesBuffer.current.push(combinedKeypoints);

          // Si ya tenemos suficientes frames en el buffer, podemos hacer la predicción
          if (framesBuffer.current.length >= 20) {
            // Tomar los últimos 20 frames para la predicción
            const inputFrames = framesBuffer.current.slice(-20);

            try {
              // Crear el tensor con la forma (1, 20, 126)
              const tensor = tf.tensor3d([inputFrames], [1, 20, 126]);
              const prediction = gestureModel?.predict(tensor) as tf.Tensor;
              const predictionData = await prediction.array();
              console.log('Predicción:', predictionData);

              // Limpia tensores para evitar fugas de memoria
              tensor.dispose();
              prediction.dispose();

              // Vaciar el buffer de frames
              framesBuffer.current = [];
            } catch (error) {
              console.error("Error al realizar la predicción:", error);
            }
          }

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
  );
}
