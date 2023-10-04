import { InMemoryDbService } from 'angular-in-memory-web-api';
import {FuturesFakeDb} from "./series";


export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
           'series': FuturesFakeDb.series,
           'futures': FuturesFakeDb.futures,
        };
    }
}
