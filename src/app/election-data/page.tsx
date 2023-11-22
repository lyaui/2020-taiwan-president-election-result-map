import Navbar from '@/components/layout/Navbar';
import Map from '@/components/Map/index';

function ElectionDataPage() {
  return (
    <div>
      <Navbar />
      <main className='flex mt-[65px]'>
        <Map />
        <article className='h-[calc(100vh-65px)] px-12 py-8 overflow-auto '></article>
      </main>
    </div>
  );
}

export default ElectionDataPage;
