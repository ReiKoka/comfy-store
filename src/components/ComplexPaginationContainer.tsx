import { constructPrevOrNextUrl, constructUrl, OrdersResponse } from "@/utils";
import { useLoaderData, useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

function ComplexPaginationContainer() {
  const { meta } = useLoaderData() as OrdersResponse;
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();

  if (pageCount < 2) return null;

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number;
    isActive: boolean;
  }): React.ReactNode => {
    const url = constructUrl({ pageNumber, search, pathname });
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    );
  };

  const renderPagination = (): React.ReactNode[] => {
    const pages: React.ReactNode[] = [];
    // 1st page
    pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }));
    // 2nd page
    pages.push(constructButton({ pageNumber: 2, isActive: page === 2 }));
    // 3rd page
    pages.push(constructButton({ pageNumber: 3, isActive: page === 3 }));

    // Ellipsis 1
    if (page > 4) {
      pages.push(constructEllipsis("dots-1"));
    }

    // Active page
    if (page !== 1 && page !== 2 && page !== 3 && page !== pageCount)
      pages.push(constructButton({ pageNumber: page, isActive: true }));

    // Ellipsis 2
    if (page < pageCount - 1) {
      pages.push(constructEllipsis("dots-2"));
    }

    // Last page
    pages.push(constructButton({ pageNumber: pageCount, isActive: page === pageCount }));

    return pages;
  };

  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default ComplexPaginationContainer;
