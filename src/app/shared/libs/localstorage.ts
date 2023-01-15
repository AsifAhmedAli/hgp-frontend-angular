import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser} from '@angular/common';

const KEY_PREFIX = 'hgp';

@Injectable()
export class LocalStorage {
  public localStorage: any;

  constructor(@Inject(PLATFORM_ID) private platformId) {
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage) {
        throw new Error('Current browser does not support Local Storage');
      }
      this.localStorage = localStorage;
    }
  }

  private generateStorageKey(key: string): string {
    return `${KEY_PREFIX}_${key}`;
  }

  public set(key: string, value: string): void {
    const storageKey = this.generateStorageKey(key);
    this.localStorage[storageKey] = value;
  }

  public get(key: string): string {
    const storageKey = this.generateStorageKey(key);
    return this.localStorage[storageKey] || false;
  }

  public setArray(key: string, values: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const storageKey = this.generateStorageKey(key);
      this.localStorage[storageKey] = JSON.stringify(values);
    }
  }

  public getArray(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const storageKey = this.generateStorageKey(key);
      return JSON.parse(this.localStorage[storageKey] || '[]');
    }
  }

  public setObject(key: string, value: any): void {
    const storageKey = this.generateStorageKey(key);
    this.localStorage[storageKey] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const storageKey = this.generateStorageKey(key);
      return JSON.parse(this.localStorage[storageKey] || '{}');
    }
  }

  public remove(key: string): any {
    const storageKey = this.generateStorageKey(key);
    this.localStorage.removeItem(storageKey);
  }
}
