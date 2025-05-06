import { ICommand } from "./command.interface";

export interface IDevice {
  id: number;
  description: string;
  identifier: string;
  manufacturer: string;
  url: string;
  commands: ICommand[];
  propriedades: any;
}