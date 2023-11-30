'use client';

import { useState } from 'react';
import { Transition } from '@headlessui/react';

import { cn, numberWithCommas } from '@/utils/index';
import Tooltip from '@/components/UI/Tooltip';

interface Group {
  label: string;
  color: string;
  value: number;
}

interface PercentageBar {
  height: number | string;
  showValue?: boolean;
  groups: Group[];
}

function StatisticsPanel({ groups }: { groups: Group[] }) {
  const total = groups.reduce((_acc, _cur) => _acc + _cur.value || 0, 0);
  return (
    <ul className='relative flex w-[230px] flex-col gap-2.5'>
      {groups.map((_cand) => {
        const percent = ((_cand.value / total) * 100).toFixed(0) + '%';
        return (
          <li key={_cand.label} className='flex justify-between'>
            <p className='flex items-center gap-2'>
              <span
                className={cn(
                  'block h-[12px] w-[12px] rounded-full',
                  _cand.color
                )}
              />
              {_cand.label}
            </p>
            <p>{`${numberWithCommas(_cand.value)} 票 (${percent}) `}</p>
          </li>
        );
      })}
    </ul>
  );
}

function PercentageBar({
  height = 8,
  showValue = false,
  groups = [],
}: PercentageBar) {
  const [isShowing, setIsShowing] = useState(false);
  const totalValue = groups.reduce((_acc, _cur) => _acc + _cur.value, 0);

  const handleShowTooltip = () => setIsShowing(true);
  const handleHideTooltip = () => setIsShowing(false);

  return (
    <div className={cn('relative', { 'z-50': isShowing })}>
      <Tooltip
        isShowing={isShowing}
        onOpen={handleShowTooltip}
        onClose={handleHideTooltip}
        label={<StatisticsPanel groups={groups} />}
      >
        <Transition
          appear={true}
          show={true}
          enter='transition-opacity duration-75'
          enterFrom='opacity-0'
          enterTo='opacity-100'
        >
          <div
            className='cursor-default py-2'
            onMouseEnter={handleShowTooltip}
            onMouseLeave={handleHideTooltip}
          >
            <div
              className='flex w-full overflow-hidden rounded-[50px] bg-gray-200'
              style={{ height }}
            >
              {totalValue > 0 &&
                groups.map((_item) => {
                  const percent = _item.value / totalValue;
                  return (
                    <span
                      key={_item.color}
                      className={cn(
                        'caption c-transition text-center !text-white hover:brightness-110',
                        _item.color
                      )}
                      style={{
                        width: percent * 100 + '%',
                        lineHeight: height + 'px',
                      }}
                    >
                      {showValue && `${(percent * 100).toFixed(0)}%`}
                    </span>
                  );
                })}
            </div>
          </div>
        </Transition>
      </Tooltip>
    </div>
  );
}

export default PercentageBar;
