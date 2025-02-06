import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private static PlanoAcaoKey: string = 'PlanoAcaoKey';

  constructor() { }

  setItem(value: any): void {
    localStorage.setItem(LocalStorageService.PlanoAcaoKey, JSON.stringify(value));
  }

  getItem<T>(): T | null {
    const value = localStorage.getItem(LocalStorageService.PlanoAcaoKey);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  removeItem(): void {
    localStorage.removeItem(LocalStorageService.PlanoAcaoKey);
  }

  clear(): void {
    localStorage.clear();
  }
}
