import OMDBMovie from "./OMDBMovie";

export default interface OMDBResponse {
  Response: "True" | "False";
  totalResults?: number;
  Search?: Array<OMDBMovie>;
  Error?: string;
}
