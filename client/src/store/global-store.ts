import { makeAutoObservable } from "mobx";
import { IUser } from "../types/types";

class GlobalStore {
  authenticatedUser: IUser | null = null;
  pageTitle = "";
  selectedMenuItemId: string = "0";

  constructor() {
    makeAutoObservable(this);
  }

  setPageTitle(title: string) {
    this.pageTitle = title;
  }

  setAuthenticatedUser(user: IUser) {
    this.authenticatedUser = user;
  }

  setSelectedMenuItemId(id: string) {
    this.selectedMenuItemId = id;
  }
}

const globalStore = new GlobalStore();
export default globalStore;
