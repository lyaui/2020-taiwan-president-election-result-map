'use client';

import { Fragment, type ReactNode } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface SelectorProps<T extends ReactNode> {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

function Selector<T extends ReactNode>({
  label,
  value,
  options,
  onChange,
}: SelectorProps<T>) {
  return (
    <div className=''>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div className='flex items-center gap-3'>
            {label && (
              <Listbox.Label className='heading-6'>{label}</Listbox.Label>
            )}
            <div className='relative'>
              <Listbox.Button className='w-[120px] flex-center text-text-primary gap-8 rounded-[500px] bg-background px-4 py-[8.5px]'>
                {value}
                <ChevronDownIcon
                  className={`w-[16px] ${open && '-rotate-180 c-transition'}`}
                />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute w-[185px] top-10 bg-white border-[1px] border-line rounded-lg py-2 text-text-primary'>
                  {options.map((_option) => (
                    <Listbox.Option
                      key={_option.label}
                      value={_option.value}
                      className='px-4 py-2 cursor-pointer hover:bg-hover c-transition'
                    >
                      {_option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  );
}

export default Selector;
