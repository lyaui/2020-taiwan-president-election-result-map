import StatisticsLayout from '@/components/layout/StatisticsLayout';

function Loading() {
  return (
    <main className='2xl:flex mt-[65px]'>
      {/* map */}
      <article className='w-full 2xl:w-[500px] h-[150px] 2xl:h-[calc(100vh-65px)] bg-gray-400 overflow-auto shrink-0'></article>

      {/* statistics */}
      <StatisticsLayout>
        {/* info */}
        <section>
          <div className='h-[42px] w-[220px] bg-background animate-pulse rounded mb-2' />
          <div className='h-[15px] w-[300px] bg-gray-200 rounded animate-pulse' />
        </section>

        {/* overview */}
        <section className='flex flex-col gap-4 bg-gray-200 rounded-xl px-4 py-6'>
          <div className='h-[42px] w-[300px] bg-gray-100 animate-pulse rounded' />
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-5 bg-white p-4 xs:px-6 xs:py-[30px] rounded-xl'>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-10'>
                {Array(3)
                  .fill(null)
                  .map((_, _index) => (
                    <div key={_index} className='flex gap-3'>
                      <div className='w-[48px] h-[48px] shrink-0 bg-gray-200 rounded-2xl animate-pulse' />
                      <div className='w-full flex flex-col gap-3'>
                        <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                        <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                        <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                      </div>
                    </div>
                  ))}
              </div>
              <div className='h-[15px] bg-gray-200 rounded-xl animate-pulse' />
            </div>

            <div className='flex items-center gap-8 xs:gap-10 bg-white p-4 xs:px-6 xs:py-[30px] rounded-xl'>
              <div className='w-[125px] h-[125px] rounded-full bg-gray-200 animate-pulse' />
              <div className='grid grid-cols-1 xs:grid-cols-2 gap-x-5 md:gap-x-10 gap-y-4'>
                {Array(4)
                  .fill(null)
                  .map((_, _index) => (
                    <div
                      key={_index}
                      className='min-w-[120px] md:min-w-[140px] flex flex-col gap-0.5'
                    >
                      <div className='h-[40px] bg-gray-200 rounded animate-pulse' />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* party result */}
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {Array(2)
            .fill(null)
            .map((_, _index) => (
              <div
                key={_index}
                className='border-[1px] border-line px-4 py-6 rounded-xl'
              >
                <div className='h-[42px] mr-20 mb-10 bg-gray-200 animate-pulse rounded' />
                <div className='flex flex-col gap-4'>
                  <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                  <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                  <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                  <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                  <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
                </div>
              </div>
            ))}
        </section>

        {/* area result */}
        <section className='flex flex-col gap-2 py-4'>
          <div className='w-[220px] h-[42px] bg-gray-200 animate-pulse rounded mb-5' />
          <div className='h-[35px] bg-gray-200 animate-pulse rounded' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
          <div className='h-[15px] bg-gray-200 rounded animate-pulse' />
        </section>
      </StatisticsLayout>
    </main>
  );
}

export default Loading;
