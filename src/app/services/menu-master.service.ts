import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { MenuMaster } from '../models/menu-master';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {
  private static MenuMasterKey: string = 'MenuMasterKey';

  menuMaster: MenuMaster;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  possuiFiltro(): boolean {
    return !!this.localStorageService.getItem(MenuMasterService.MenuMasterKey);
  }

  getFiltro() {
    if(!this.possuiFiltro()) {
      return;
    }
    this.menuMaster = new MenuMaster(this.localStorageService.getItem(MenuMasterService.MenuMasterKey));
    if((!!this.menuMaster.escola && !!this.menuMaster.escola.id) || (!!this.menuMaster.pessoa && !!this.menuMaster.pessoa.id)) return this.menuMaster;
    return;
  }
}
  
