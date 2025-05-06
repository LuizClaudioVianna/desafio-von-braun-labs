import { IMensagem } from "./message.interface";
import { INovoIntervalo } from "./novoIntervalo.interface";
import { IRgb } from "./rgb.interface";
import { IStatus } from "./status.interface";
import { Temperatura } from "./temperatura.interface";
import { IUnidade } from "./unidade.interface";

export interface Properties {
    temperatura?: Temperatura;
    unidade?: IUnidade;
    mensagem?: IMensagem;
    novo_intervalo?: INovoIntervalo;
    status?: IStatus;
    rgb?: IRgb;
  }