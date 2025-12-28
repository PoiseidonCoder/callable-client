import { LucideIcon } from "lucide-react";
import { UrlObject } from "url";

export type PageResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
}[];

export type Pagination = {
  pageNo: number;
  pageSize: number;
};

export type IntroduceCards = {
  name: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}[];
