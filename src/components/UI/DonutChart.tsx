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

  useEffect(() => {
    setDegree(0);
  }, [value]);

  return (
    <div
      className={`flex-center c-transition relative rounded-full before:absolute before:h-[100px] before:w-[100px] before:rounded-full before:bg-white before:content-[""]`}
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${degree * 3.6}deg,#E2E8F0 0deg)`,
      }}
    >
      <div className="col-center z-10 gap-0.5">
        {label && <p className="body-small text-text-primary">{label}</p>}
        <p className="heading-5" style={{ color }}>{`${(value * 100).toFixed(
          2
        )}%`}</p>
      </div>
    </div>
  );
}

export default DonutChart;
