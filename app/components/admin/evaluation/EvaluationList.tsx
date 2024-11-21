"use client";

import { useGetAllEvaluationQuery } from "@/app/lib/redux/api/evaluationApi";
import { Suspense } from "react";
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

  return (
    <Suspense>
      <div className="p-4">
        {isLoading && <Skeleton className="w-full h-[600px] bg-black/20" />}
        {isError && (
          <div className="">
            <p className="text-red-500 text-center">Internal Server Error</p>
          </div>
        )}
        {isSuccess && (
          <div>
            <ul className="space-y-2 mb-2">
              {data?.data.map((item: any, index: number) => (
                <li
                  key={index}
                  className="p-2 border rounded shadow-md bg-gray-50 hover:bg-gray-100"
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
    </Suspense>
  );
};

export default EvaluationList;
