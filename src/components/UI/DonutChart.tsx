'use client';

import { useState, useEffect } from 'react';
import { clearInterval } from 'timers';

interface DonutChartProps {
  size?: number;
  borderWidth?: number;
  color?: string;
  label?: string;
  value: number;
}

function DonutChart({
  size = 125,
  color = '#D4009B',
  label,
  value = 0,
}: DonutChartProps) {
  const [degree, setDegree] = useState(0);

  useEffect(() => {
    if (degree >= value * 100) return;
    const id = setInterval(() => {
      setDegree((current) => current + 1);
    }, 5);

    return () => {
      window.clearInterval(id);
    };
  }, [degree, value]);

  return (
    <div
      className={`relative flex-center rounded-full before:content-[""] before:absolute before:w-[100px] before:h-[100px] before:bg-white before:rounded-full c-transition`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${degree * 3.6}deg,#E2E8F0 0deg)`,
      }}
    >
      <div className='z-10 col-center gap-0.5'>
        {label && <p className='body-small text-text-primary'>{label}</p>}
        <p className='heading-5' style={{ color }}>{`${(value * 100).toFixed(
          2,
        )}%`}</p>
      </div>
    </div>
  );
}

export default DonutChart;
