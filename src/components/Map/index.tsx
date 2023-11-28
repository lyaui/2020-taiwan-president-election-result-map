import Image from 'next/image';
import oopsImg from 'public/assets/images/oops.png';

function Map() {
  return (
    <article className='w-[500px] h-[calc(100vh-65px)] p-5 bg-gray-400 overflow-auto shrink-0'>
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
