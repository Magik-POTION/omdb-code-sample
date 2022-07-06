import { BehaviorSubject } from "rxjs";

class AppStatus {
  public static instance = new AppStatus();

  private _isLoading: BehaviorSubject<boolean>;

  constructor() {
    this._isLoading = new BehaviorSubject<boolean>(false);
  }

  public get isLoading() {
    return this._isLoading.value;
  }

  public set isLoading(value: boolean) {
    this._isLoading.next(value);
  }

  public subscribeToIsLoading(callback: (value: boolean) => void) {
    return this._isLoading.subscribe(callback);
  }
}

export default AppStatus.instance;
