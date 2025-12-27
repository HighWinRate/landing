'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = '/blog' }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath;
    }
    return `${basePath}/page/${page}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link href={getPageUrl(currentPage - 1)}>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          // Show first page, last page, current page, and pages around current
          const showPage =
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1);

          if (!showPage) {
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-2">
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <Link key={page} href={getPageUrl(page)}>
              <Button
                variant={page === currentPage ? 'default' : 'outline'}
                size="sm"
              >
                {page}
              </Button>
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link href={getPageUrl(currentPage + 1)}>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

