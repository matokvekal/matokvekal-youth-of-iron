import Image from 'next/image';
import React, { useMemo, ReactNode, useEffect, useState } from 'react';
import { cn } from 'utils/cn';

interface ProgressGaugeProps {
  oldProgress: number;
  progress: number;
  hidePercent?: boolean;
  children?: ReactNode;
}

const calculateRotation = (gapFactor: number): number => {
  const gapAngle = 360 * (1 - gapFactor);
  const rotationToCenterGap = gapAngle / 2;
  const rotationToSixOClock = 90;
  return rotationToCenterGap + rotationToSixOClock;
};

const ProgressGauge: React.FC<ProgressGaugeProps> = ({
  oldProgress,
  progress,
  hidePercent = false,
  children: label,
}) => {
  const stroke = 8;
  const radius = 120;
  const normalizedRadius = radius - stroke * 2;
  const fullCircumference = useMemo(() => normalizedRadius * 2 * Math.PI, [normalizedRadius]);
  const gapFactor = 0.7;
  const rotation = calculateRotation(gapFactor);
  const percentSymbol = hidePercent ? '' : '%';

  const [strokeDashoffset, setStrokeDashoffset] = useState<number>(
    fullCircumference * (1 - (oldProgress / 100) * gapFactor),
  );
  const [displayedProgress, setDisplayedProgress] = useState(oldProgress);

  useEffect(() => {
    const targetOffset = fullCircumference * (1 - (progress / 100) * gapFactor);
    setStrokeDashoffset(targetOffset);

    let start: number | null = null;
    const duration = 1000; // animation duration in ms
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const diff = progress - oldProgress;
      const currentProgress = oldProgress + (elapsed / duration) * diff;
      setDisplayedProgress(Math.min(currentProgress, progress));
      if (currentProgress < progress) {
        requestAnimationFrame(animateProgress);
      }
    };
    requestAnimationFrame(animateProgress);
  }, [progress, oldProgress, fullCircumference, gapFactor]);

  const isProgressFull = Math.round(displayedProgress) === 100;

  return (
    <div className='relative flex items-center justify-center'>
      <svg className='block' height={radius * 2} width={radius * 2}>
        <circle
          className='stroke-haze-200'
          strokeDasharray={`${fullCircumference * gapFactor} ${fullCircumference}`}
          strokeDashoffset={0}
          strokeWidth={stroke}
          strokeLinecap='round'
          fill='transparent'
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(${rotation} ${radius} ${radius})`}
        />
        <circle
          className='gauge-value  stroke-cyan-500 transition-all duration-1000 ease-in-out'
          strokeDasharray={`${fullCircumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={stroke}
          strokeLinecap='round'
          fill='transparent'
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(${rotation} ${radius} ${radius})`}
        />
      </svg>
      <style>{`
        .gauge-value {
          transition: stroke-dashoffset 1s cubic-bezier(0.87, 0, 0.13, 1);
        }
      `}</style>
      <div className=' absolute -mt-6 flex flex-col items-center justify-center gap-0 text-center'>
        <Image src='/glowing_star_3d.png' alt='Glowing star emoji' height={54} width={54} />
        <span
          className={cn({
            'text-3xl font-semibold': !isProgressFull,
            'text-4xl font-bold text-amber-400': isProgressFull,
          })}
        >
          {Math.round(displayedProgress) + percentSymbol}
        </span>
        {label && <span className='text-sm text-muted-foreground'>{label}</span>}
      </div>
    </div>
  );
};

export default ProgressGauge;
