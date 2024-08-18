import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SkeletonChat() {
  return (
    <div className="flex flex-col w-full gap-2 mt-4">
      <Skeleton className="w-8/12 h-4" />
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-9/12 h-4" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    </div>
  );
}
