"use client";
import { useGetHadistRandomQuery } from "@/app/lib/redux/api/myquranApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

function HadistSection() {
  const { data, isLoading } = useGetHadistRandomQuery();
  const { theme } = useTheme();
  if (isLoading || !data) {
    return (
      <div className="rounded-md w-full h-full">
        <Skeleton className="w-full bg-[#303030] h-[400px] rounded-md" />
      </div>
    );
  }

  return (
    <ScrollArea className="w-full h-[400px] rounded-md sm:min-w-[650px] shadow-md overflow-y-auto">
      <div
        className={`${theme === "dark" ? "bg-[#303030]" : ""} `}
      >
        <div className="p-4 h-50 sm:min-h-[350px] h-full">
          <h2 className="text-xl font-semibold">Hadist Arbain Nawawi</h2>
          <div className="mb-2">
            <p className="font-semibold">{data.data.judul}</p>
            <p className="font-semibold">No:{data.data.no}</p>
          </div>
          <p className="text-right text-2xl font-semibold mb-4 leading-snug">
            {data.data.arab}
          </p>
          <p className="text-base italic">{data.data.indo}</p>
        </div>
      </div>
    </ScrollArea>
  );
}

export default HadistSection;
