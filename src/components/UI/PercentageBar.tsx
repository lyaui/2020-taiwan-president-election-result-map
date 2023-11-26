'use client';

import { Transition } from '@headlessui/react';

interface PercentageBar {
  height: number | string;
  showValue?: boolean;
  groups: {
    color: string;
    value: number;
  }[];
}

function PercentageBar({
  height = 8,
  showValue = false,
  groups = [],
}: PercentageBar) {
  const totalValue = groups.reduce((_acc, _cur) => _acc + _cur.value, 0);
  return (
    <Transition
      appear={true}
      show={true}
      enter='transition-opacity duration-50'
      enterFrom='opacity-0'
      enterTo='opacity-100'
    >
      <div
        className='w-full flex overflow-hidden rounded-[50px] bg-gray-200'
        style={{ height }}
      >
        {totalValue > 0 &&
          groups.map((_item) => {
            const percent = _item.value / totalValue;
            return (
              <span
                key={_item.color}
                className={`!text-white ${_item.color} text-center caption hover:brightness-110 c-transition`}
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
    </Transition>
  );
}

export default PercentageBar;
