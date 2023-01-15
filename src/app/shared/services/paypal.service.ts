import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {payPal} from '../functions/project.function';

interface PaypalTokenResponse {
  access_token: string;
  app_id: string;
  expires_in: number;
  nonce: string;
  scope: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private httpClient: HttpClient;
  accessToken: string;

  constructor(
    private handler: HttpBackend
  ) {
    this.httpClient = new HttpClient(handler);
  }

  generateAccessToken(): void {
    const formData = 'grant_type=client_credentials';
    this.httpClient.post<PaypalTokenResponse>(payPal('oauth2/token', 'v1'), formData, {headers: this.getBasicAuthorization()}).subscribe(
      response => this.accessToken = response.access_token
    );
  }
  getBasicAuthorization(): HttpHeaders {
    const basic = btoa(`${environment.paypal.id}:${environment.paypal.secret}`);
    return new HttpHeaders({Authorization: `Basic ${basic}`, 'Content-Type': 'application/x-www-form-urlencoded'});
  }
  createOrder(): Observable<any> {
    const formData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: 'PUHF',
          amount: {
            currency_code: 'USD',
            value: '100.00'
          }
        }
      ],
      application_context: {
        return_url: '',
        cancel_url: ''
      }
    };
    return this.httpClient.post(payPal('checkout/orders'), formData, {headers: this.getHeaders()});
  }
  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      accept: 'application/json',
      'accept-language': 'en_US',
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
  }
}
