"use client";
import { useGetHadistRandomQuery } from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";

function HadistSection() {
  const { data, isLoading } = useGetHadistRandomQuery();

  if (isLoading || !data) {
    return (
      <div className="rounded-md">
        <Skeleton className="bg-green-300 w-[300px] sm:min-w-[750px] md:min-w-[850px] h-50 sm:min-h-[350px] rounded-md" />
      </div>
    );
  }

  return (
    <div className="mb-4 sm:mb-0 w-[300px] sm:min-w-[750px] md:min-w-[850px] h-50 sm:min-h-[350px]">
      <div className="mb-2">
        <p className="font-semibold">{data.data.judul}</p>
        <p className="font-semibold">No:{data.data.no}</p>
      </div>
      <p className="text-right text-2xl font-semibold text-gray-800 mb-4 leading-snug">
        {data.data.arab}
      </p>
      <p className="text-base text-gray-600 italic mb-2">{data.data.indo}</p>
    </div>
  );
}

export default HadistSection;
