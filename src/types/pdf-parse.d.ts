declare module 'pdf-parse' {
    interface PDFInfo {
        [key: string]: any;
    }

    interface PDFText {
        text: string;
    }

    interface PDFMeta {
        [key: string]: any;
    }

    interface PDFVersion {
        [key: string]: any;
    }

    interface PDFData {
        numpages: number;
        numrender: number;
        info: PDFInfo;
        metadata: PDFMeta;
        text: string;
        version: PDFVersion;
    }

    interface PDFParseOptions {
        [key: string]: any;
    }

    function pdf(data: Buffer | Uint8Array | ArrayBuffer | string, options?: PDFParseOptions): Promise<PDFData>;

    export = pdf;
}
