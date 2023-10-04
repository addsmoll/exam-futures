import {IFutures} from "./futures.interface";

export interface ISeries {
  id: any;
  series: number;
  min: number;
  max: number;
  label: string;
  values: IFutures[];

}

export interface IResultSeries {
  min: number;
  max: number;
}
