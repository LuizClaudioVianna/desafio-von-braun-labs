import { inject, Injectable } from "@angular/core";
import { ResponseLogin } from "../models/response-login";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public loginResponse: ResponseLogin | undefined;
    private readonly _httpClient = inject(HttpClient);

    public clear(): void {
        this.loginResponse = undefined;
        localStorage.removeItem('access-token');
    }

    public isAuthenticated(): boolean {
        if (this.loginResponse?.token) {
            localStorage.setItem('access-token', this.loginResponse.token);
        }
        return Boolean(this.loginResponse?.token);
    }
}