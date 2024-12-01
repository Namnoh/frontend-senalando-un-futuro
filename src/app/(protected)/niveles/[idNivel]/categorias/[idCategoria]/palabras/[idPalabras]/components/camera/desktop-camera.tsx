'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Holistic } from '@mediapipe/holistic';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import Webcam from 'react-webcam';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MODEL_FRAMES = 20;
const MIN_LENGTH_FRAMES = 15;
const MARGIN_FRAME = 1;
const DELAY_FRAMES = 3;
const THRESHOLD = 0.8;

export default function GestureRecognizer() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gestureModel, setGestureModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const kpSeq = useRef<number[][]>([]);
  const countFrame = useRef<number>(0);
  const fixFrames = useRef<number>(0);
  const recording = useRef<boolean>(false);
  const [sentence, setSentence] = useState<string[]>([]);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel('/web_model/model.json');
        setGestureModel(model);
        setIsModelLoaded(true);
        console.log('Modelo cargado correctamente');
      } catch (error) {
        console.error("Error al cargar modelo:", error);
      }
    };
    loadModel();
  }, []);

  // Implementación de linspace
  function linspace(start: number, stop: number, num: number): number[] {
    const arr = [];
    const step = (stop - start) / (num - 1);

    for (let i = 0; i < num; i++) {
      arr.push(start + step * i);
    }

    return arr;
  }

  const interpolateKeypoints = useCallback(
    (keypoints: number[][], targetLength: number = MODEL_FRAMES): number[][] => {
      const currentLength = keypoints.length;
      if (currentLength === targetLength) return keypoints;

      const indices = linspace(0, currentLength - 1, targetLength);
      const interpolatedKeypoints: number[][] = [];

      for (const i of indices) {
        const lowerIdx = Math.floor(i);
        const upperIdx = Math.ceil(i);
        const weight = i - lowerIdx;

        if (lowerIdx === upperIdx) {
          interpolatedKeypoints.push([...keypoints[lowerIdx]]);
        } else {
          const interpolatedPoint = keypoints[lowerIdx].map(
            (value, idx) =>
              (1 - weight) * value + weight * keypoints[upperIdx][idx]
          );
          interpolatedKeypoints.push(interpolatedPoint);
        }
      }

      return interpolatedKeypoints;
    },
    []
  );

  const normalizeKeypoints = useCallback(
    (keypoints: number[][], targetLength: number = MODEL_FRAMES): number[][] => {
      const currentLength = keypoints.length;

      if (currentLength < targetLength) {
        return interpolateKeypoints(keypoints, targetLength);
      } else if (currentLength > targetLength) {
        const step = currentLength / targetLength;
        const indices = Array.from({ length: targetLength }, (_, i) =>
          Math.floor(i * step)
        );
        const selectedKeypoints = indices.map((idx) => keypoints[idx]);
        return selectedKeypoints;
      } else {
        return keypoints;
      }
    },
    [interpolateKeypoints]
  );

  const thereHand = useCallback((results: any): boolean => {
    return !!(results.leftHandLandmarks || results.rightHandLandmarks);
  }, []);

  const mediapipeDetection = useCallback(async (image: HTMLVideoElement, holistic: Holistic) => {
    await holistic.send({ image });
  }, []);

  const extractKeypoints = useCallback((results: any): number[] => {
    const leftHand = results.leftHandLandmarks
      ? results.leftHandLandmarks.flatMap((landmark: any) => [landmark.x, landmark.y, landmark.z])
      : Array(21 * 3).fill(0);
    const rightHand = results.rightHandLandmarks
      ? results.rightHandLandmarks.flatMap((landmark: any) => [landmark.x, landmark.y, landmark.z])
      : Array(21 * 3).fill(0);
    return [...leftHand, ...rightHand];
  }, []);

  const predictGesture = useCallback(async (kpNormalized: number[][]) => {
    if (!gestureModel) {
      console.log('El modelo aún no está cargado');
      return;
    }

    // Asegurarse de que los keypoints estén en el formato correcto
    const inputTensor = tf.tensor(kpNormalized).expandDims(0);
    try {
      const prediction = gestureModel.predict(inputTensor) as tf.Tensor;
      const predictionData = await prediction.array() as number[][];

      const confidences = predictionData[0];
      const maxConfidence = Math.max(...confidences);
      const maxIndex = confidences.indexOf(maxConfidence);

      // Tus gestos personalizados
      const gestures = ["A", "B", "C", "BIEN", "BUENOS DÍAS", "COMO ESTÁS", "HOLA", "MAL"];

      // Mostrar el porcentaje de precisión para cada gesto
      gestures.forEach((gesture, index) => {
        console.log(`${gesture}: ${(confidences[index] * 100).toFixed(2)}%`);
      });

      if (maxConfidence > THRESHOLD) {
        const predictedGesture = gestures[maxIndex];
        setPrediction(predictedGesture);
        setSentence((prevSentence) => [predictedGesture, ...prevSentence]);

        // Si deseas convertir texto a voz
        // textToSpeech(predictedGesture);
      } else {
        setPrediction('');
      }
    } catch (error) {
      console.error("Error durante la predicción:", error);
    } finally {
      inputTensor.dispose();
    }
  }, [gestureModel]);

  const onResults = useCallback((results: any) => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext('2d');

      if (canvasCtx) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        // Dibujar las manos
        if (results.leftHandLandmarks) {
          drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, { color: '#CC0000', lineWidth: 5 });
          drawLandmarks(canvasCtx, results.leftHandLandmarks, { color: '#00FF00', lineWidth: 2 });
        }

        if (results.rightHandLandmarks) {
          drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, { color: '#00CC00', lineWidth: 5 });
          drawLandmarks(canvasCtx, results.rightHandLandmarks, { color: '#FF0000', lineWidth: 2 });
        }

        canvasCtx.restore();
      }
    }

    if (thereHand(results) || recording.current) {
      recording.current = false;
      countFrame.current += 1;

      if (countFrame.current > MARGIN_FRAME) {
        const kpFrame = extractKeypoints(results);
        kpSeq.current.push(kpFrame);
      }

      setIsCapturing(true);
    } else {
      if (countFrame.current >= MIN_LENGTH_FRAMES + MARGIN_FRAME) {
        fixFrames.current += 1;

        if (fixFrames.current < DELAY_FRAMES) {
          recording.current = true;
          return;
        }

        const kpSequence = kpSeq.current.slice(0, -(MARGIN_FRAME + DELAY_FRAMES));
        const kpNormalized = normalizeKeypoints(kpSequence, MODEL_FRAMES);

        predictGesture(kpNormalized);
      }

      recording.current = false;
      fixFrames.current = 0;
      countFrame.current = 0;
      kpSeq.current = [];
      setIsCapturing(false);
    }
  }, [extractKeypoints, normalizeKeypoints, predictGesture, thereHand]);

  useEffect(() => {
    if (!isModelLoaded) return;

    const holistic = new Holistic({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
      }
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: true,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    holistic.onResults(onResults);

    if (webcamRef.current && webcamRef.current.video) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (webcamRef.current && webcamRef.current.video) {
            await mediapipeDetection(webcamRef.current.video, holistic);
          }
        },
        width: 640,
        height: 480
      });
      camera.start();
    }

    return () => {
      holistic.close();
    };
  }, [isModelLoaded, mediapipeDetection, onResults]);

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
            width={640}
            height={480}
          />
          <div className="absolute top-4 left-4 z-30">
            <Badge variant={isCapturing ? "default" : "secondary"}>
              {isCapturing ? 'Capturando...' : 'Esperando gesto...'}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 z-30 bg-white bg-opacity-75 p-2 rounded">
            <span className="font-semibold">Predicción:</span> {prediction || 'Ninguna'}
          </div>
          <div className="absolute bottom-4 right-4 z-30 bg-white bg-opacity-75 p-2 rounded">
            <span className="font-semibold">Frase:</span> {sentence.join(' ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
