import React from 'react';
export declare function extractTextFromReactNode(node: React.ReactNode): any;
export declare function descendingComparator<T>(a: T, b: T, orderBy: keyof T): 1 | -1 | 0;
export declare function getComparator<T>(order: string, orderBy: keyof T): (a: T, b: T) => number;
export declare function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number): T[];
export declare function searchStringInReactNode(node: React.ReactNode, searchString: string): boolean;
export declare function sortedValues<T extends object>({ rows, order, orderBy, search, }: {
    rows: T[];
    order?: '' | 'asc' | 'desc';
    orderBy: string;
    search?: string;
}): T[];
