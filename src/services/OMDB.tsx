import axios, { Axios, AxiosRequestConfig } from "axios";
import OMDBDataReturnTypes from "../enums/OMDBDataReturnTypes";
import OMDBTypes from "../enums/OMDBTypes";
import OMDBResponse from "../interfaces/OMDBResponse";

class OMDB {
  public static instance = new OMDB();

  public readonly API_KEY = "36d23a5";
  public readonly REQUEST_URL = "https://www.omdbapi.com/";
  public readonly POSTER_URL = "https://img.omdbapi.com/";

  private readonly dataAxios: Axios;
  private readonly posterAxios: Axios;

  constructor() {
    // Singleton Restriction
    if (OMDB.instance)
      throw new Error("Only one instance of OMDB can be instantiated");

    this.dataAxios = axios.create({
      baseURL: this.REQUEST_URL,
      params: {
        apikey: this.API_KEY,
      },
    });

    this.posterAxios = axios.create({
      baseURL: this.POSTER_URL,
    });
  }

  /**
   * Sends a search data request
   * @param params object containing url parameters.
   *
   * s: Search parameter
   * y: year of movie
   * r: return data type
   * page: page of result
   * callback: JSONP callback name
   * v: api version
   */
  async searchForMovie(
    s: string,
    params?: {
      y?: number;
      r?: OMDBDataReturnTypes;
      page?: number;
      callback?: string;
      v?: number;
    }
  ) {
    let config: AxiosRequestConfig = {
      params: {
        s: s,
        type: OMDBTypes.movie,
        ...params,
      },
    };

    const response = await this.dataAxios.get<OMDBResponse>("", config);
    const data: OMDBResponse = response.data;

    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  }
}

export default OMDB.instance;
