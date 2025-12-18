import React, { useMemo } from 'react';
import './Pagination.css';

const ELLIPSIS = '…';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const createPaginationItems = ({ page, totalPages, siblingCount, boundaryCount }) => {
  const totalNumbers = siblingCount * 2 + 1 + boundaryCount * 2;
  const totalBlocks = totalNumbers + 2;

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const startPages = Array.from({ length: boundaryCount }, (_, idx) => idx + 1);
  const endPages = Array.from({ length: boundaryCount }, (_, idx) => totalPages - boundaryCount + 1 + idx);

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    totalPages - boundaryCount - 1
  );

  const items = [...startPages];

  if (siblingsStart > boundaryCount + 2) {
    items.push(ELLIPSIS);
  } else if (boundaryCount + 1 < totalPages - boundaryCount) {
    items.push(boundaryCount + 1);
  }

  for (let pageNumber = siblingsStart; pageNumber <= siblingsEnd; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    items.push(ELLIPSIS);
  } else if (totalPages - boundaryCount > boundaryCount) {
    items.push(totalPages - boundaryCount);
  }

  items.push(...endPages);
  return items;
};

const Pagination = ({
  page = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  className = '',
}) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const safePage = clamp(Number(page) || 1, 1, safeTotalPages);

  const items = useMemo(
    () =>
      createPaginationItems({
        page: safePage,
        totalPages: safeTotalPages,
        siblingCount: Math.max(0, Number(siblingCount) || 0),
        boundaryCount: Math.max(0, Number(boundaryCount) || 0),
      }),
    [safePage, safeTotalPages, siblingCount, boundaryCount]
  );

  const goTo = (nextPage) => {
    if (!onPageChange) return;
    const clamped = clamp(nextPage, 1, safeTotalPages);
    if (clamped !== safePage) onPageChange(clamped);
  };

  return (
    <nav className={`pagination ${className}`.trim()} aria-label="Pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            type="button"
            className="pagination__btn pagination__btn--nav"
            onClick={() => goTo(safePage - 1)}
            disabled={safePage <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>
        </li>

        {items.map((item, idx) => {
          if (item === ELLIPSIS) {
            return (
              <li key={`ellipsis-${idx}`} className="pagination__item pagination__ellipsis" aria-hidden="true">
                {ELLIPSIS}
              </li>
            );
          }

          const isActive = item === safePage;

          return (
            <li key={item} className="pagination__item">
              <button
                type="button"
                className={`pagination__btn ${isActive ? 'pagination__btn--active' : ''}`.trim()}
                onClick={() => goTo(item)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${item}`}
              >
                {item}
              </button>
            </li>
          );
        })}

        <li className="pagination__item">
          <button
            type="button"
            className="pagination__btn pagination__btn--nav"
            onClick={() => goTo(safePage + 1)}
            disabled={safePage >= safeTotalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

