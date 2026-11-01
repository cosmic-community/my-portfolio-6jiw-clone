export default function Loading() {
  return (
    <div className="container-page py-24">
      <div className="animate-pulse space-y-8">
        <div className="h-3 w-24 rounded-full bg-white/10" />
        <div className="h-12 w-2/3 rounded-2xl bg-white/10" />
        <div className="h-4 w-1/2 rounded-full bg-white/10" />
        <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="aspect-[16/10] w-full rounded-xl bg-white/10" />
              <div className="h-4 w-3/4 rounded-full bg-white/10" />
              <div className="h-3 w-1/2 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}