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
const MARGIN_FRAME = 2;
const DELAY_FRAMES = 2;
const THRESHOLD = 0.7;

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

  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await tf.loadLayersModel('http://localhost:3000/web_model/model.json');
        setGestureModel(model);
        setIsModelLoaded(true);
        console.log('Modelo cargado correctamente');
      } catch (error) {
        console.error("Error al cargar modelo:", error);
      }
    };
    loadModel();
  }, []);

  const interpolateKeypoints = useCallback((keypoints: number[][], targetLength: number = 20): number[][] => {
    const currentLength = keypoints.length;
    if (currentLength === targetLength) return keypoints;
    
    const result: number[][] = [];
    for (let i = 0; i < targetLength; i++) {
      const index = (i * (currentLength - 1)) / (targetLength - 1);
      const lowerIdx = Math.floor(index);
      const upperIdx = Math.ceil(index);
      const weight = index - lowerIdx;
      if (lowerIdx === upperIdx) {
        result.push([...keypoints[lowerIdx]]);
      } else {
        const interpolatedPoint = keypoints[lowerIdx].map((value, idx) => 
          (1 - weight) * value + weight * keypoints[upperIdx][idx]
        );
        result.push(interpolatedPoint);
      }
    }
    return result;
  }, []);

  const normalizeKeypoints = useCallback((keypoints: number[][], targetLength: number = 20): number[][] => {
    const currentLength = keypoints.length;
    if (currentLength < targetLength) {
      return interpolateKeypoints(keypoints, targetLength);
    } else if (currentLength > targetLength) {
      const step = currentLength / targetLength;
      return Array.from({length: targetLength}, (_, i) => 
        keypoints[Math.min(Math.floor(i * step), currentLength - 1)]
      );
    } else {
      return keypoints;
    }
  }, [interpolateKeypoints]);

  const extractKeypoints = useCallback((results: any): number[] => {
    const leftHand = results.leftHandLandmarks ? results.leftHandLandmarks.flat() : Array(21 * 3).fill(0);
    const rightHand = results.rightHandLandmarks ? results.rightHandLandmarks.flat() : Array(21 * 3).fill(0);
    return [...leftHand, ...rightHand];
  }, []);

  const thereHand = useCallback((results: any): boolean => {
    return results.leftHandLandmarks || results.rightHandLandmarks;
  }, []);

  const predictGesture = useCallback(async (kpNormalized: number[][]) => {
    if (!gestureModel) {
      console.log('El modelo aún no está cargado');
      return;
    }
    console.log('GESTURE MODEL: ', gestureModel);
    console.log('____HACIENDO PREDICCIÓN____');
    
    // Ensure we have exactly 20 frames with 126 values each
    const paddedFrames = kpNormalized.slice(0, MODEL_FRAMES).map(frame => 
      frame.concat(Array(126 - frame.length).fill(0))
    );
    while (paddedFrames.length < MODEL_FRAMES) {
      paddedFrames.push(Array(126).fill(0));
    }

    const inputTensor = tf.tensor3d([paddedFrames], [1, MODEL_FRAMES, 126]);
    console.log('Input tensor shape:', inputTensor.shape);
    console.log('Input tensor size:', inputTensor.size);

    const prediction = gestureModel.predict(inputTensor) as tf.Tensor;
    const predictionData = await prediction.array() as number[][];
    console.log("Prediction data:", predictionData);

    const maxIndex = predictionData[0].indexOf(Math.max(...predictionData[0]));
    const maxConfidence = Math.max(...predictionData[0]);
    console.log(`Max confidence: ${maxConfidence}`);
    
    const gestures = ["A", "B", "C", "BIEN", "BUENOS DÍAS", "COMO ESTÁS", "HOLA", "MAL"];
    gestures.forEach((gesture, index) => {
      console.log(`${gesture}: ${predictionData[0][index]}`);
    });
    
    if (maxConfidence > THRESHOLD) {
      setPrediction(gestures[maxIndex]);
      console.log('Predicción:', gestures[maxIndex]);
    } else {
      setPrediction('');
      console.log('Confianza insuficiente para predecir');
    }

    inputTensor.dispose();
    prediction.dispose();
  }, [gestureModel]);

  const onResults = useCallback((results: any) => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext('2d');
      if (canvasCtx) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

        if (results.leftHandLandmarks) {
          drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, { color: '#CC0000', lineWidth: 5 });
          drawLandmarks(canvasCtx, results.leftHandLandmarks, { color: '#00FF00', lineWidth: 0.5 });
        }
        if (results.rightHandLandmarks) {
          drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, { color: '#00CC00', lineWidth: 5 });
          drawLandmarks(canvasCtx, results.rightHandLandmarks, { color: '#FF0000', lineWidth: 0.5 });
        }
        canvasCtx.restore();
      }
    }

    if (thereHand(results) || recording.current) {
      console.log('Se detecta(n) mano(s)');
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
        console.log('Keypoint sequence length:', kpSequence.length);
        console.log('Normalized keypoints shape:', [kpNormalized.length, kpNormalized[0].length]);
        console.log('Se procede a predicción');
        predictGesture(kpNormalized);
      }
      recording.current = false;
      fixFrames.current = 0;
      countFrame.current = 0;
      kpSeq.current = [];
      setIsCapturing(false);
    }
  }, [thereHand, extractKeypoints, normalizeKeypoints, predictGesture]);

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
            await holistic.send({ image: webcamRef.current.video });
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
  }, [isModelLoaded, onResults]);

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
        </div>
      </CardContent>
    </Card>
  );
}