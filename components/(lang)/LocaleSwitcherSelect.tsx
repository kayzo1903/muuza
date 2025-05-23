'use client';

import clsx from 'clsx';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import { usePathname, useRouter } from '@/i18n/routing'


type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  //const params = useParams();

  
  
  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value ;    
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }
  
  
  

  return (
    <label
      className={clsx(
        'relative text-gray-300 font-bold text-xl',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-2"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}