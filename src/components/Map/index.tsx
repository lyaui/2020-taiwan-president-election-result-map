import Image from 'next/image';
import oopsImg from 'public/assets/images/oops.png';

function Map() {
  return (
    <article className='h-[calc(100vh-65px)] w-full shrink-0 overflow-auto bg-gray-400 p-5 2xl:w-[500px]'>
      <Image
        src={oopsImg}
        width={350}
        height={350}
        alt='oooops'
        draggable={false}
      />
    </article>
  );
}

export default Map;
