import { Results } from '@mediapipe/holistic'

export function thereHand(results: Results): boolean {
    return results.leftHandLandmarks?.length > 0 || results.rightHandLandmarks?.length > 0
}

export function extractKeypoints(results: Results): number[] {
    // const pose = results.poseLandmarks?.flatMap(lm => [lm.x, lm.y, lm.z, lm.visibility]) ?? Array(33 * 4).fill(0)
    // const face = results.faceLandmarks?.flatMap(lm => [lm.x, lm.y, lm.z]) ?? Array(468 * 3).fill(0)
    const lh = results.leftHandLandmarks?.flatMap(lm => [lm.x, lm.y, lm.z]) ?? Array(21 * 3).fill(0)
    const rh = results.rightHandLandmarks?.flatMap(lm => [lm.x, lm.y, lm.z]) ?? Array(21 * 3).fill(0)
    
    // Ensure all values are numbers
    return [...lh, ...rh].map(val => typeof val === 'number' ? val : 0)
}