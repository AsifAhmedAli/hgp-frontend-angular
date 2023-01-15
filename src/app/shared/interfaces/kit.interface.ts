import {Kit, KitCompare} from './kits.interface';

export interface KitResponse {
  status: boolean;
  message: string;
  result: Kit[];
}

export interface KitCompareResponse {
  status: boolean;
  message: string;
  compare: KitCompare;
}






