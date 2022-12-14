import { sortData } from "./utils";
import { expect, describe, test } from 'vitest'

const data = [
    { created_at: "2022-11-20T10:00:00.000Z" },
    { created_at: "2022-12-01T10:00:00.000Z" },
    { created_at: "2022-11-15T10:00:00.000Z" }
];


describe('sorting', ()=>{
    test("sorting data in ascending order", ()=>{
        expect(sortData(0, data)).toEqual([
            { created_at: "2022-11-15T10:00:00.000Z" },
            { created_at: "2022-11-20T10:00:00.000Z" },
            { created_at: "2022-12-01T10:00:00.000Z" }
        ]);
    })

    test("sorting data in descending order", ()=>{
        expect(sortData(1, data)).toEqual([
            { created_at: "2022-12-01T10:00:00.000Z" },
            { created_at: "2022-11-20T10:00:00.000Z" },
            { created_at: "2022-11-15T10:00:00.000Z" }
        ]);
    })


})
