'use client';

import { Fragment, type ReactNode } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

import { cn } from '@/utils';

interface SelectorProps<T extends ReactNode> {
  label?: string;
  width?: number | string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  disabled?: boolean;
}

function Selector<T extends ReactNode>({
  label,
  width = 'auto',
  value,
  options,
  onChange,
  disabled = false,
}: SelectorProps<T>) {
  const buttonText =
    options.find((_option) => _option.value === value)?.label || value;

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className='flex items-center gap-3'>
          {label && (
            <Listbox.Label className='heading-6'>{label}</Listbox.Label>
          )}
          <div className='relative'>
            <Listbox.Button
              className={cn(
                'flex items-center justify-between rounded-[500px] bg-background px-4 py-[8.5px]',
                disabled ? 'text-gray-600' : 'text-text-primary'
              )}
              style={{ width }}
            >
              {buttonText}
              <ChevronDownIcon
                className={cn('w-[12px]', { 'c-transition -rotate-180': open })}
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute top-10 z-10 max-h-[475px] w-[130px] overflow-scroll rounded-lg border-[1px] border-line bg-white py-2 text-text-primary xs:w-[185px]'>
                {options.map((_option) => (
                  <Listbox.Option
                    key={_option.label}
                    value={_option.value}
                    className='c-transition cursor-pointer px-4 py-2 hover:bg-hover'
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
  );
}

export default Selector;
