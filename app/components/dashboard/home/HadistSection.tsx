"use client"
import { useGetHadistRandomQuery } from "@/app/lib/redux/api/myquranApi";

function HadistSection() {
  const { data, isLoading } = useGetHadistRandomQuery();

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-xl  mb-4">
      <p className="text-right text-2xl font-semibold text-gray-800 mb-2">
        {data.data.arab}
      </p>
      <p className="text-sm text-gray-600 italic">{data.data.id}</p>
      <p className="text-xs text-gray-500 mt-2">
        (HR: {data.info.perawi.name})
      </p>
    </div>
  );
}

export default HadistSection;
