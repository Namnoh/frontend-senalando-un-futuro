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
import { normalizeGestureWord } from '@/lib/utils';
import { Palabra } from '@/interfaces/palabraInterface';
import { InfoCapsule } from '@/components/customUI/InfoCapsule';
import {
  MODEL_FRAMES,
  MIN_LENGTH_FRAMES,
  MARGIN_FRAME,
  DELAY_FRAMES,
  THRESHOLD,
  MAX_DISTANCE,
  HIGH_ACCURACY,
  MEDIUM_ACCURACY,
  GESTURES
} from '@/lib/constants';


interface MobileCameraProps {
  word: Palabra;
  isSuccessTry: () => void;
}

export default function MobileCamera({ word, isSuccessTry }: MobileCameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<Camera | null>(null);
  const holisticRef = useRef<Holistic | null>(null); // Usamos useRef para mantener Holistic
  const [gestureModel, setGestureModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const kpSeq = useRef<number[][]>([]);
  const countFrame = useRef<number>(0);
  const fixFrames = useRef<number>(0);
  const recording = useRef<boolean>(false);
  // const [sentence, setSentence] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isHolisticReady, setIsHolisticReady] = useState(false);

  // Efecto para manejar la visibilidad de la página
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Estado para controlar el muteo con persistencia
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedMuted = localStorage.getItem('isMuted');
      return storedMuted === 'true';
    }
    return false;
  });

  // Referencia para mantener el valor actual de isMuted
  const isMutedRef = useRef(isMuted);

  // Sincronizar la referencia con el estado isMuted
  useEffect(() => {
    isMutedRef.current = isMuted;
    localStorage.setItem('isMuted', isMuted.toString());
  }, [isMuted]);

  // Carga de los promedios de keypoints
  const [expectedKeypointsMap, setExpectedKeypointsMap] = useState<{ [gesture: string]: number[][] }>({});

  // Cargar el archivo JSON con los keypoints esperados
  useEffect(() => {
    fetch('/all_averages.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar all_averages.json');
        }
        return response.json();
      })
      .then(data => {
        setExpectedKeypointsMap(data);
      })
      .catch(error => {
        console.error('Error al cargar all_averages.json:', error);
      });
  }, []);

  // Cargar el modelo de TensorFlow lite
  useEffect(() => {
    const loadTfliteModel = async () => {
      try {
        await tf.setBackend('webgl');
        await tf.ready();
        const model = await tf.loadLayersModel('/webModel/model.json');
        setGestureModel(model);
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error al cargar modelo TFLite:", error);
      }
    };
    loadTfliteModel();
  }, []);

  // Función para generar números equidistantes (linspace)
  function linspace(start: number, stop: number, num: number): number[] {
    const arr = [];
    const step = (stop - start) / (num - 1);

    for (let i = 0; i < num; i++) {
      arr.push(start + step * i);
    }

    return arr;
  }

  // Interpolación de keypoints para normalizar la secuencia
  const interpolateKeypoints = useCallback(
    (keypoints: number[][], targetLength: number = MODEL_FRAMES): number[][] => {
      const currentLength = keypoints.length;
      
      // Si no hay keypoints, retorna vacío para evitar errores
      if (currentLength === 0) {
        return [];
      }
  
      if (currentLength === targetLength) return keypoints;
  
      const indices = linspace(0, currentLength - 1, targetLength);
      const interpolatedKeypoints: number[][] = [];
  
      for (const i of indices) {
        const lowerIdx = Math.floor(i);
        const upperIdx = Math.ceil(i);
        const weight = i - lowerIdx;
  
        // Verifica también aquí que lowerIdx y upperIdx no estén fuera de rango
        if (lowerIdx < 0 || lowerIdx >= currentLength || upperIdx < 0 || upperIdx >= currentLength) {
          // Si se da este caso, significa que no hay suficientes puntos. Retorna lo que tengas.
          return keypoints;
        }
  
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

  // Normalización de keypoints para asegurar la longitud deseada
  const normalizeKeypoints = useCallback(
    (keypoints: number[][], targetLength: number = MODEL_FRAMES): number[][] => {
      if (!keypoints || keypoints.length === 0 ) {
        throw new Error("Keypoints is undefined or empty");
      }

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

  // Función para reflejar los keypoints de la mano izquierda
  const flipHandLandmarks = (landmarks: any[]): any[] => {
    return landmarks.map(landmark => ({
      ...landmark,
      x: 1 - landmark.x, // Invertir la coordenada X
    }));
  };

  // Extraer keypoints de los resultados de Mediapipe
  const extractKeypoints = useCallback((results: any): number[] => {
    let leftHand = Array(21 * 3).fill(0);
    let rightHand = Array(21 * 3).fill(0);

    if (results.rightHandLandmarks && !results.leftHandLandmarks) {
      // Solo se detecta la mano derecha
      rightHand = results.rightHandLandmarks.flatMap(
        (landmark: any) => [landmark.x, landmark.y, landmark.z]
      );
    } else if (results.leftHandLandmarks && !results.rightHandLandmarks) {
      // Solo se detecta la mano izquierda
      const flippedLandmarks = flipHandLandmarks(results.leftHandLandmarks);
      rightHand = flippedLandmarks.flatMap(
        (landmark: any) => [landmark.x, landmark.y, landmark.z]
      );
    } else if (results.leftHandLandmarks && results.rightHandLandmarks) {
      // Se detectan ambas manos
      leftHand = results.leftHandLandmarks.flatMap(
        (landmark: any) => [landmark.x, landmark.y, landmark.z]
      );
      rightHand = results.rightHandLandmarks.flatMap(
        (landmark: any) => [landmark.x, landmark.y, landmark.z]
      );
    }

    return [...leftHand, ...rightHand];
  }, []);

  // Verificar si hay manos detectadas
  const thereHand = useCallback((results: any): boolean => {
    return !!(results.leftHandLandmarks || results.rightHandLandmarks);
  }, []);

  // Función para enviar la imagen a Mediapipe Holistic
  const mediapipeDetection = useCallback(async (image: HTMLVideoElement) => {
    if (!holisticRef.current) {
      console.warn('Holistic no está inicializado.');
      return;
    }

    await holisticRef.current.send({ image });
  }, []);

  // Calcular la distancia promedio entre las secuencias de keypoints
  const calculateAverageDistance = (userKeypoints: number[][], expectedKeypoints: number[][]): number => {
    let totalDistance = 0;
    let count = 0;

    for (let i = 0; i < userKeypoints.length; i++) {
      const userFrame = userKeypoints[i];
      const expectedFrame = expectedKeypoints[i];

      for (let j = 0; j < userFrame.length; j++) {
        const diff = userFrame[j] - expectedFrame[j];
        totalDistance += Math.abs(diff);
        count += 1;
      }
    }

    return totalDistance / count;
  };

  // Función de síntesis de voz utilizando la referencia
  const speak = useCallback((text: string) => {
    if (isMutedRef.current) {
      return; // No hacer nada si está muteado
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Detener cualquier discurso en curso
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-MX'; // Establecer el idioma a español
      utterance.rate = 1; // Velocidad (0.1 a 10)
      utterance.pitch = 2; // Tono (0 a 2)
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('La síntesis de voz no está soportada en este navegador.');
    }
  }, []);

  // Función para predecir el gesto
  const predictGesture = useCallback(async (kpNormalized: number[][]) => {
    if (!gestureModel) {
      return;
    }

    const inputTensor = tf.tensor(kpNormalized).expandDims(0);
    try {
      const prediction = gestureModel.predict(inputTensor) as tf.Tensor;
      const predictionData = await prediction.array() as number[][];
      const confidences = predictionData[0];
      const maxConfidence = Math.max(...confidences);
      const maxIndex = confidences.indexOf(maxConfidence); 

      if (maxConfidence > THRESHOLD) {
        const predictedGestureKey = Object.keys(GESTURES)[maxIndex];
        const predictedGestureValue = Object.values(GESTURES)[maxIndex];
        setPrediction(predictedGestureKey);

        if (predictedGestureValue.toLowerCase() != word.nombrePalabra.toLowerCase()) {
          setFeedback(`Seña Incorrecta`);
          return;
        };

        // Llamar a la función de síntesis de voz
        speak(predictedGestureValue);

        // Obtener la secuencia de keypoints esperada (usando toLowerCase para coincidir con JSON)
        const expectedKeypoints = expectedKeypointsMap[normalizeGestureWord(predictedGestureKey)];

        if (expectedKeypoints) {
          // Normalizar los keypoints esperados
          const expectedKpNormalized = normalizeKeypoints(expectedKeypoints, MODEL_FRAMES);

          // Comparar las secuencias
          const averageDistance = calculateAverageDistance(kpNormalized, expectedKpNormalized);

          // Calcular el porcentaje de precisión
          const accuracy = Math.max(0, (1 - (averageDistance / MAX_DISTANCE)) * 100);
          const accuracyRounded = Math.round(accuracy);

          // Generar el mensaje de retroalimentación
          let feedbackMessage = `Precisión: ${accuracyRounded}%`;

          if (accuracy >= HIGH_ACCURACY) {
            isSuccessTry();
            feedbackMessage += ' - Excelente ejecución de la seña.';
          } else if (accuracy >= MEDIUM_ACCURACY) {
            feedbackMessage += ' - Buena seña, pero puede mejorar.';
          } else {
            feedbackMessage += ' - Intenta mejorar la posición de tus manos.';
          }

          setFeedback(feedbackMessage);
        } else {
          setFeedback('No hay referencia para este gesto.');
        }

      } else {
        setPrediction('');
        setFeedback('No se reconoció la seña. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error("Error durante la predicción:", error);
    } finally {
      inputTensor.dispose();
    }
  }, [ gestureModel, normalizeKeypoints, speak, expectedKeypointsMap, word.nombrePalabra, isSuccessTry]);

  // Función para manejar los resultados de Mediapipe
  const onResults = useCallback((results: any) => {
    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      canvasElement.width = canvasElement.offsetWidth;
      canvasElement.height = canvasElement.offsetHeight;
      const canvasCtx = canvasElement.getContext('2d');

      if (canvasCtx) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

        // Dibujar las manos tal como son detectadas, sin invertir
        if (results.leftHandLandmarks) {
          drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, { color: '#bcdfd2', lineWidth: 3 });
          drawLandmarks(canvasCtx, results.leftHandLandmarks, { color: '#009c62', lineWidth: 1, radius: 3.5 });
        }

        if (results.rightHandLandmarks) {
          drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, { color: '#d0afde', lineWidth: 3 });
          drawLandmarks(canvasCtx, results.rightHandLandmarks, { color: '#660093', lineWidth: 1, radius: 3.5 });
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

  // Inicializar Mediapipe Holistic y la cámara
  useEffect(() => {
    if (!isModelLoaded) return;

    const initializeHolistic = async () => {
      if (holisticRef.current) return; // Evitar inicialización múltiple

      const holistic = new Holistic({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
      });

      holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        refineFaceLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      holistic.onResults(onResults);

      try {
        await holistic.initialize();
        setIsHolisticReady(true);
        holisticRef.current = holistic;

        if (webcamRef.current && webcamRef.current.video) {
          const camera = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              if (holisticRef.current && webcamRef.current && webcamRef.current.video) {
                await holisticRef.current.send({ image: webcamRef.current.video });
              }
            },
          });
          cameraRef.current = camera;
          if (isPageVisible) {
            camera.start();
          }
        }
      } catch (error) {
        console.error("Error initializing Holistic:", error);
        setIsHolisticReady(false);
      }
    };

    initializeHolistic();

    return () => {
      setIsHolisticReady(false);
      if (holisticRef.current) {
        holisticRef.current.close();
        holisticRef.current = null;
      }
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
    };
  }, [isModelLoaded]);

  useEffect(() => {
    if (cameraRef.current) {
      if (isPageVisible && isHolisticReady) {
        cameraRef.current.start();
      } else {
        cameraRef.current.stop();
      }
    }
  }, [isPageVisible, isHolisticReady]);

  return (
    <div className="my-4">
      <Card className="w-full">
        <CardContent className='p-3'>
          <div className="relative aspect-[9/12]">
            <Webcam
              audio={false}
              ref={webcamRef}
              className="w-full h-full object-cover rounded-lg"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              // width={640}
              // height={480}
            />
            <div className="absolute top-4 left-4 z-30">
              <Badge variant={isCapturing ? "secondary" : "default"} className='text-sm text-black'>
                {isPageVisible && isHolisticReady ? (isCapturing ? 'Capturando...' : 'Esperando gesto...') : 'Cámara desactivada'}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 z-30">
              <button
                onClick={() => setIsMuted(prev => !prev)}
                className="flex items-center px-2 py-1 bg-background rounded hover:bg-gray-400 hover:text-white focus:outline-none"
                aria-label={isMuted ? "Unmute Voice" : "Mute Voice"} // Accesibilidad
              >
                {isMuted ? (
                  <>
                    {/* Icono de Unmute */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-volume-x h-5 w-5"
                    >
                      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                      <line x1="22" y1="9" x2="16" y2="15" />
                      <line x1="16" y1="9" x2="22" y2="15" />
                    </svg>
                  </>
                ) : (
                  <>
                    {/* Icono de Mute */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-volume-2 h-5 w-5"
                    >
                      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                      <path d="M16 9a5 5 0 0 1 0 6" />
                      <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                    </svg>
                  </>
                )}
              </button>
            </div>
            <div className='absolute bottom-4 right-4 z-30'>
            <InfoCapsule message={`Consejos:
              1. Asegurate de tener una correcta iluminacón, la falta de esta podria afectar en como se detecta la seña y dar un mal resultado.
              2. El proceso de detección empieza a contar desde que se detecta la mano hasta que la mano es retirada de la vista de la camara. 
              (En caso de señas estaticas se recomienda estar a lo menos 3 segundos de detección para que detecte correctamente)
              3. Para que el intento se concidere correcto debe contar con un porcentaje de aprobación igual o sobre el 85%.
              4. Se recomienda contar con una distancia prudente en la cual se pueda visualizar completamente desde el pecho hasta la cabeza.
              5. Se recomienda estar centrado y realizar las señas de forma precisa, no muy rapido ni muy lento.`}>
            </InfoCapsule>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="bg-white text-black p-2 rounded text-center">
        <span className="font-semibold">Retroalimentación:</span> {feedback || 'Ninguna'}
      </div>
    </div>
  )
}