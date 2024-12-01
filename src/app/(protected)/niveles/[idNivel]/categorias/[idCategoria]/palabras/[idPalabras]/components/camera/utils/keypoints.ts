export function interpolateKeypoints(keypoints: number[][], targetLength: number = 20): number[][] {
    const currentLength = keypoints.length
    if (currentLength === targetLength) {
        return keypoints
    }
    const indices = Array.from({ length: targetLength }, (_, i) => i * (currentLength - 1) / (targetLength - 1))
    const interpolatedKeypoints: number[][] = []
    for (const i of indices) {
        const lowerIdx = Math.floor(i)
        const upperIdx = Math.ceil(i)
        const weight = i - lowerIdx
        if (lowerIdx === upperIdx) {
            interpolatedKeypoints.push(keypoints[lowerIdx])
        } else {
            const interpolatedPoint = keypoints[lowerIdx].map((value, index) => 
                (1 - weight) * value + weight * keypoints[upperIdx][index]
            )
            interpolatedKeypoints.push(interpolatedPoint)
        }
    }
    return interpolatedKeypoints
}  

export function normalizeKeypoints(keypoints: number[][], targetLength: number = 20): number[][] {
    if (keypoints.length === 0) {
        return [];
    }

    const numKeypoints = keypoints.length;
    const normalizedKeypoints: number[][] = [];

    for (let i = 0; i < numKeypoints; i++) {
        const keypoint = keypoints[i];
        const normalizedKeypoint = keypoint.map((coord) => coord / targetLength);
        normalizedKeypoints.push(normalizedKeypoint);
    }

    return normalizedKeypoints;
}