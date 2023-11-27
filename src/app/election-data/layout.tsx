import { type ReactElement } from 'react';
import Navbar from '@/components/layout/Navbar';

function layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default layout;
