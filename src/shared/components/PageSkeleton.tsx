

const PageSkeleton = () => {
  return (
    <div className="w-full p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-slate-200 rounded animate-pulse" />
        <div className="h-24 bg-slate-200 rounded animate-pulse" />
        <div className="h-24 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Chart skeleton */}
      <div className="h-80 bg-slate-200 rounded animate-pulse" />
    </div>
  );
};

export default PageSkeleton;
