import { ICommandItem } from "./command-item.interface";
import { IFormat } from "./format.interface";

export interface ICommand {
    operation: string;
    description: string;
    command: ICommandItem
    result: string;
    format: IFormat;
    parameters: string[];
  }