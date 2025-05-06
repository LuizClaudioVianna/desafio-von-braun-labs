import { Parameter } from "./parameter.interface"

export interface ICommandItem {
    command: string
    parameters: Parameter[]
  }