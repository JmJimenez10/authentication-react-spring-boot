export interface IPaginationInfo {
    page: number;
    size: number;
    totalPages?: number;
    totalElements?: number;
    filters?: Record<string, string | number | boolean>;
    sort?: OrderBy;
  }
  
  export class PaginationInfo implements IPaginationInfo {
    page: number;
    size: number;
    totalPages?: number;
    totalElements?: number;
    filters?: Record<string, string | number | boolean>;
    sort?: OrderBy;
  
    constructor(
      page: number = 0,
      size: number = 10,
      totalPages?: number,
      totalElements?: number,
      filters?: Record<string, string | number | boolean>,
      sort?: OrderBy
    ) {
      this.page = page;
      this.size = size;
      this.totalPages = totalPages;
      this.totalElements = totalElements;
      this.filters = filters ?? {};
      this.sort = sort;
    }
  }
  
  export type OrderBy = {
    field: string;
    order: "asc" | "desc";
  };
  