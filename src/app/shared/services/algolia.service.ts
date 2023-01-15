import { Injectable } from '@angular/core';
import algoliasearch from "algoliasearch/lite";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlgoliaService {

  client: any
  index: any
  constructor() {
    this.setClient()
  }

  setClient() {
    this.client = algoliasearch(environment.algoliaApplicationId, environment.searchOnlyKey);
    this.index = this.client.initIndex(environment.indexes.default);
  }

  setIndex(index) {
    this.index = this.client.initIndex(index);
  }

  getIndex() {
    return this.index;
  }

}
