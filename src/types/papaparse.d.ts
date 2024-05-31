declare module 'papaparse' {
    export type PapaParseResult<T> = {
        data: T[];
        errors: any[];
        meta: {
            delimiter: string;
            linebreak: string;
            aborted: boolean;
            truncated: boolean;
            cursor: number;
        };
    };

    export type UnparseConfig = {
        quotes?: boolean | boolean[];
        quoteChar?: string;
        escapeChar?: string;
        delimiter?: string;
        header?: boolean;
        newline?: string;
        skipEmptyLines?: boolean | 'greedy';
        columns?: string[];
    };

    export function parse<T>(csvString: string, config?: any): PapaParseResult<T>;
    export function unparse(data: any, config?: UnparseConfig): string;
}
