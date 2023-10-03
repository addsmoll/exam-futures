import { InMemoryDbService } from 'angular-in-memory-web-api';
import {FuturesFakeDb} from "./futures/store";


export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
           'futures': FuturesFakeDb.futures,

        };
    }
}
