import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Parameter } from "../interfaces/parameter.interface";
import { Observable, tap } from "rxjs";
import { ResponseComunicationTelnet } from "../models/response-comunication-telnet";

@Injectable({
    providedIn: 'root'
})
export class ComunicationTelnetService {
    API: string = 'https://localhost:7067/api';
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    public doAComunicationTelnet(stringMontada: string): Observable<ResponseComunicationTelnet> {
        return this.httpClient.post<ResponseComunicationTelnet>(`${this.API}/Devices`, { stringMontada });
    }
}