import { TSchema } from "@form-builder/engine";
declare const fetchBins: () => Promise<any>;
declare const readBin: (binId: string) => Promise<any>;
declare const createBin: (schema: TSchema, name: string) => Promise<any>;
declare const updateBin: (schema: unknown, binId: string) => Promise<any>;
declare const deleteBin: (binId: string) => Promise<any>;
export { deleteBin, updateBin, fetchBins, createBin, readBin };
