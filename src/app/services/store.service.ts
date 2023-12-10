import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/cart';


const STORE_BASE_URL = 'https://fakestoreapi.com'

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient:HttpClient) { }


  getAllProducts(limit:number, sort:string): Observable<Array<Item>> {
    return this.httpClient.get<Array<Item>>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    );
  }
}
