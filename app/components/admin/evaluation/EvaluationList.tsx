"use client";

import { useGetAllEvaluationQuery } from "@/app/lib/redux/api/evaluationApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EvaluationList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const limit = 10;
  const { data, isLoading, isError, isSuccess } = useGetAllEvaluationQuery({
    page,
    limit,
  });
  const totalPages = data?.meta.totalPages || 1;
  useEffect(() => {
    router.replace(`?page=${page}`);
  }, [page, router]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (selectedPage: number) => {
    setPage(selectedPage);
  };

  if (data?.data.length === 0) {
    return (
      <div className="">
        <h1 className="text-center">Belum Ada Evaluasi</h1>
      </div>
    );
  }

  return (
    <div className="p-4">
      {isLoading && <Skeleton className="w-full h-[600px] bg-black/20" />}
      {isError && (
        <div className="">
          <p className="text-red-500 text-center">Internal Server Error</p>
        </div>
      )}
      {isSuccess && (
        <div>
          <ul className="space-y-2 mb-2 ">
            {data?.data.map((item: any, index: number) => (
              <li
                key={index}
                className="p-2 border rounded shadow-md dark:bg-[#303030]"
              >
                <p className="font-bold text-lg">{item.about}</p>
                <p>{item.problem}</p>
              </li>
            ))}
          </ul>
          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePreviousPage}
                  className={`${page === 1 && "cursor-not-allowed"}`}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => handlePageClick(i + 1)}
                    className={`cursor-pointer hover:bg-black/80 hover:text-white ${
                      page == i + 1 && "bg-black text-white"
                    }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={handleNextPage}
                  className={`${page === totalPages && "cursor-not-allowed"}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default EvaluationList;
