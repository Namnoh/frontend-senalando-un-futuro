import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface ProgressCircleProps {
    progress: number
    colorClasses: {
        progress: string
        trailColor: string
    }
    isLocked: boolean
    }

export function ProgressCircle({ progress, colorClasses, isLocked }: ProgressCircleProps) {
    return (
        <div className="absolute top-4 right-4 w-20 h-20 z-10">
            <CircularProgressbar 
                value={progress}
                text={isLocked ? '' : `${progress}%`}
                styles={buildStyles({
                textSize: '24px',
                pathColor: colorClasses.progress,
                textColor: colorClasses.progress,
                trailColor: colorClasses.trailColor
                })}
            />
        </div>
    )
}