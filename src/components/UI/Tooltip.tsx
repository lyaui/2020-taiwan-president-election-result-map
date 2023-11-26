'use client';

import { type ReactNode } from 'react';
import { Popover, Transition } from '@headlessui/react';

interface Tooltip {
  children: ReactNode;
  label: ReactNode;
  isShowing: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function Tooltip({ children, label, isShowing, onOpen, onClose }: Tooltip) {
  return (
    <Popover>
      <Popover.Button className='w-full focus:outline-0'>
        {children}
      </Popover.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-100 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
        show={isShowing}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
      >
        <Popover.Panel className='absolute z-50 left-1/2 -translate-x-1/2 bg-white p-4 border-[1px] border-line rounded-lg'>
          <div className='inset-0'>{label}</div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Tooltip;
