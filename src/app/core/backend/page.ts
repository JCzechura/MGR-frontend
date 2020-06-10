interface Sorted {
    sorted: true;
    unsorted: false;
}

interface Unsorted {
    sorted: false;
    unsorted: true;
}

type Sort = {empty: boolean} & (Sorted | Unsorted);

interface Paged {
    paged: true;
    unpaged: false;
}

interface Unpaged {
    paged: false;
    unpaged: true;
}

type Pageable = {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
} & (Paged | Unpaged);

interface First {
    first: true;
    last: false;
}

interface Last {
    first: false;
    last: true;
}

interface NotFirstNotLast {
    first: false;
    last: false;
}

export type Page<T> = {
    content: readonly T[];
    pageable: Pageable;
    /**
     * Total elements in all pages
     */
    totalElements: number;
    totalPages: number;
    /**
     * Page number
     */
    number: number;
    /**
     * Returned page size
     */
    size: number;
    sort: Sort;
    /**
     * Returned page size
     */
    numberOfElements: number;
    empty: boolean;
} & (First | Last | NotFirstNotLast);
