export interface IDevice {
  id: number;
  description: string;
  identifier: string;
  manufacturer: string;
  url: string;
  commands: ICommand[];
  propriedades: any
}


export interface ICommand {
  command: string;
  operation: string;
  description: string;
  result: string;
  format: IFormat;
  parameters: any;
}

export interface IFormat {
  type: string
  properties: Properties
}

export interface Properties {
  temperatura?: Temperatura
  unidade?: Unidade
  mensagem?: Mensagem
  novo_intervalo?: NovoIntervalo
  status?: Status
  rgb?: Rgb
}

export interface Temperatura {
  type: string
  format: string
}

export interface Unidade {
  type: string
  enum: string[]
}

export interface Mensagem {
  type: string
}

export interface NovoIntervalo {
  type: string
}

export interface Status {
  type: string
  enum: string[]
}

export interface Rgb {
  type: string
  pattern: string
}
