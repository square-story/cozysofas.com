"use client";

import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";

export function useQueryState<TData>(query: UseQueryResult<TData, Error>) {
  const { isLoading, isFetching, isError, error } = query;

  return {
    isLoading: isLoading || isFetching,
    error: isError ? error : null,
  };
}

export function useGlobalQueryErrorHandler() {
  useEffect(() => {
    const handleError = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection in React Query:", event.reason);
    };

    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);
}

export function ErrorState({  }: { error: Error | null; resetErrorBoundary?: () => void }) {
  // This is a placeholder that will be replaced with a proper implementation
  // after we fix the parsing issues
  return null;
}