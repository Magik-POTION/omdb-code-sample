import OMDBMovie from "./OMDBMovie";

interface OMDBMmovieResponse extends OMDBMovie {
  Response?: "True" | "False";
  Error?: string;
}

export default OMDBMmovieResponse;
