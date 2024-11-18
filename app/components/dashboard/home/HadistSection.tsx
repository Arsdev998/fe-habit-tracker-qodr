"use client";
import { useGetHadistRandomQuery } from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  unsplashFoto: {
    urls: { full: string };
  };
}
function HadistSection({ unsplashFoto }: Props) {
  const { data, isLoading } = useGetHadistRandomQuery();
  const backgroundStyle = unsplashFoto
    ? { backgroundImage: `url(${unsplashFoto.urls.full})` }
    : {};

  if (isLoading || !data) {
    return (
      <div className="rounded-md">
        <Skeleton className="bg-black/20 w-[300px] sm:min-w-[650px] md:min-w-[800px] h-50-h-[400px] rounded-md" />
      </div>
    );
  }

  return (
    <div
      style={backgroundStyle}
      className=" text-white rounded-md bg-cover mb-4 sm:mb-0 w-[300px] sm:min-w-[650px] md:min-w-[800px] h-[400px] overflow-y-auto"
    >
      <div className="bg-black bg-opacity-60">
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
    </div>
  );
}

export default HadistSection;
