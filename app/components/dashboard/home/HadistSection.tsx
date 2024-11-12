"use client";
import { useGetHadistRandomQuery } from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";

function HadistSection() {
  const { data, isLoading } = useGetHadistRandomQuery();

  if (isLoading || !data) {
    return (
      <div className="p-4 bg-white shadow-md rounded-md">
        <Skeleton className="bg-green-300 w-full h-48 sm:h-64 rounded-md" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md mb-4 sm:mb-0 max-w-lg">
      <p className="text-right text-2xl font-semibold text-gray-800 mb-4 leading-snug">
        {data.data.arab}
      </p>
      <p className="text-base text-gray-600 italic mb-2">{data.data.id}</p>
      <p className="text-sm text-gray-500 mt-4">
        (HR: {data.info.perawi.name})
      </p>
    </div>
  );
}

export default HadistSection;
