// Defines generic structural types like ApiResponse<T> and PaginationParams.
export interface ApiResponse<T> {
    /** The actual payload returned by the server */
    data: T;
    /** Indicates if the request was processed successfully */
    success: boolean;
    /** Optional success or informational message from the server */
    message?: string;
    /** Optional error message if success is false */
    error?: string;
}
// interface was chosen to allow API responses to be augmented with domain-specific metadata via declaration merging.

/**
 * Metadata for paginated data sets
 */
export type PaginationMeta = {
    /** The current page number (starting from 1) */
    page: number;
    /** Number of items requested per page */
    pageSize: number;
    /** Total number of items available across all pages */
    total: number;
};
// type was chosen as this represents a static data shape for calculation, not a primary entity.

/**
 * Specialized response shape for lists that require pagination
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    /** Metadata describing the current slice of data and total count */
    pagination: PaginationMeta;
}
// interface was chosen to utilize its native extension capabilities from ApiResponse.

/**
 * State container for managing asynchronous operations in the UI
 */
export interface AsyncState<T> {
    /** The data being fetched or null if not yet available */
    data: T | null;
    /** Boolean flag indicating an active network request */
    isLoading: boolean;
    /** Human-readable error message if the operation failed */
    error: string | null;
}
// interface was chosen to allow different modules to add state properties like 'isRefetching' or 'lastUpdated'.