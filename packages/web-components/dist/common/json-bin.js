var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HEADER_X_MASTER_KEY = "$2b$10$hubyJQ7z9hhlrplspGd4guozMPF9VsIUwLWi12IoiDAwvw9M9Kgr.";
const fetchBins = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch("https://api.jsonbin.io/v3/c/63189bdee13e6063dc9ebbcd/bins", {
        headers: new Headers({
            "X-Master-Key": HEADER_X_MASTER_KEY,
        }),
        method: "GET",
    })
        .then((res) => res.json())
        .catch(console.warn);
});
const readBin = (binId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        headers: new Headers({
            "X-Master-Key": HEADER_X_MASTER_KEY,
        }),
        method: "GET",
    })
        .then((res) => res.json())
        .catch(console.warn);
});
const createBin = (schema, name) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch("https://api.jsonbin.io/v3/b", {
        headers: new Headers({
            "Content-Type": "application/json",
            "X-Master-Key": HEADER_X_MASTER_KEY,
            "X-Collection-Id": "63189bdee13e6063dc9ebbcd",
            "X-Bin-Name": name,
        }),
        method: "POST",
        body: JSON.stringify(schema),
    })
        .then((res) => res.json())
        .catch(console.warn);
});
const updateBin = (schema, binId) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        headers: new Headers({
            "X-Master-Key": HEADER_X_MASTER_KEY,
            "Content-Type": "application/json",
        }),
        method: "PUT",
        body: JSON.stringify(schema),
    })
        .then((res) => res.json())
        .catch(console.warn);
});
const deleteBin = (binId) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        headers: new Headers({
            "X-Master-Key": HEADER_X_MASTER_KEY,
            "Content-Type": "application/json",
        }),
        method: "DELETE",
    })
        .then((res) => res.json())
        .catch(console.warn);
});
export { deleteBin, updateBin, fetchBins, createBin, readBin };
//# sourceMappingURL=json-bin.js.map