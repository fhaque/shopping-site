import { InMemoryDbService } from 'angular-in-memory-web-api';

import { fakeItemsData } from '../api/fake-items-data';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      return { items: fakeItemsData};
    }
  }