import { cn } from '@/utils';
import StatisticsLayout from '@/components/layout/StatisticsLayout';

function LineText({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mb-1 h-[15px] animate-pulse rounded bg-gray-200',
        className
      )}
    />
  );
}

function Loading() {
  const generateLines = (num: number, className?: string) => {
    return Array(num)
      .fill(null)
      .map((_, _index) => <LineText key={_index} className={className} />);
  };

  return (
    <main className="mt-[65px] 2xl:flex">
      {/* map */}
      <article className="h-[150px] w-full shrink-0 overflow-auto bg-gray-400 2xl:h-[calc(100vh-65px)] 2xl:w-[500px]"></article>

      {/* statistics */}
      <StatisticsLayout>
        {/* info */}
        <section>
          <div className="mb-2 h-[42px] w-[220px] animate-pulse rounded bg-background" />
          <div className="h-[15px] w-[300px] animate-pulse rounded bg-gray-200" />
        </section>

        {/* overview */}
        <section className="flex flex-col gap-4 rounded-xl bg-gray-200 px-4 py-6">
          <div className="h-[42px] w-[300px] animate-pulse rounded bg-gray-100" />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="flex flex-col gap-5 rounded-xl bg-white p-4 xs:px-6 xs:py-[30px]">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-10">
                {Array(3)
                  .fill(null)
                  .map((_, _index) => (
                    <div key={_index} className="flex gap-3">
                      <div className="h-[48px] w-[48px] shrink-0 animate-pulse rounded-2xl bg-gray-200" />
                      <div className="flex w-full flex-col gap-3">
                        {generateLines(3)}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="h-[15px] animate-pulse rounded-xl bg-gray-200" />
            </div>

            <div className="flex items-center gap-8 rounded-xl bg-white p-4 xs:gap-10 xs:px-6 xs:py-[30px]">
              <div className="h-[125px] w-[125px] animate-pulse rounded-full bg-gray-200" />
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 xs:grid-cols-2 md:gap-x-10">
                {Array(4)
                  .fill(null)
                  .map((_, _index) => (
                    <div
                      key={_index}
                      className="flex min-w-[120px] flex-col gap-0.5 md:min-w-[140px]"
                    >
                      <div className="h-[40px] animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* party result */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array(2)
            .fill(null)
            .map((_, _index) => (
              <div
                key={_index}
                className="rounded-xl border-[1px] border-line px-4 py-6"
              >
                <div className="mb-10 mr-20 h-[42px] animate-pulse rounded bg-gray-200" />
                <div className="flex flex-col gap-4">{generateLines(6)}</div>
              </div>
            ))}
        </section>

        {/* area result */}
        <section className="flex flex-col gap-2 py-4">
          <div className="mb-5 h-[42px] w-[220px] animate-pulse rounded bg-gray-200" />
          <div className="mb-3 h-[35px] animate-pulse rounded bg-gray-200" />
          {generateLines(10)}
        </section>
      </StatisticsLayout>
    </main>
  );
}

export default Loading;
