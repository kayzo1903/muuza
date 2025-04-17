import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4 space-y-3">
        <Skeleton className="w-full h-40 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
