export function AboutSkeleton() {
  return (
    <section className="animate-pulse bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1920px] px-6 sm:px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.75fr)] lg:items-center lg:gap-20">
          <div>
            <div className="h-3 w-44 bg-slate-200" />
            <div className="mt-5 h-12 max-w-xl bg-slate-200 sm:h-16" />
            <div className="mt-3 h-12 max-w-lg bg-slate-200 sm:h-16" />
            <div className="mt-8 max-w-2xl space-y-3">
              <div className="h-4 bg-slate-100" />
              <div className="h-4 bg-slate-100" />
              <div className="h-4 w-4/5 bg-slate-100" />
            </div>
          </div>
          <div className="min-h-[330px] bg-slate-100 sm:min-h-[420px]" />
        </div>
        <div className="mt-16 border-t border-slate-200 pt-12 lg:mt-24 lg:grid lg:grid-cols-[minmax(280px,0.42fr)_minmax(0,1fr)] lg:gap-20 lg:pt-16">
          <div>
            <div className="h-3 w-32 bg-slate-200" />
            <div className="mt-4 h-10 w-56 bg-slate-200" />
          </div>
          <div className="mt-8 space-y-5 lg:mt-0">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-b border-slate-200 pb-5"
              >
                <div className="size-5 bg-slate-200" />
                <div className="h-5 flex-1 bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 bg-[#161616] px-6 py-10 sm:px-10 lg:mt-24 lg:px-14 lg:py-14">
          <div className="h-3 w-44 bg-white/20" />
          <div className="mt-4 h-10 w-72 bg-white/20" />
          <div className="mt-8 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-[#161616] p-5">
                <div className="h-3 w-16 bg-white/20" />
                <div className="mt-3 h-9 w-20 bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
