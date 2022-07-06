import { BehaviorSubject } from "rxjs";
import OMDBMovie from "../interfaces/OMDBMovie";

class MoviesManager {
  public static instance = new MoviesManager();

  private _movies: BehaviorSubject<OMDBMovie[]>;

  constructor() {
    this._movies = new BehaviorSubject<OMDBMovie[]>([]);
  }

  public get movies() {
    return this._movies.value;
  }

  public set movies(data: OMDBMovie[]) {
    this._movies.next(data);
  }

  public subscribeToMovies(callBack: (value: OMDBMovie[]) => void) {
    return this._movies.subscribe((movies) => {
      callBack(movies);
    });
  }

}

export default MoviesManager.instance;
