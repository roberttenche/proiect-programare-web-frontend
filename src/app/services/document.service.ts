import { Injectable } from '@angular/core';
import { Chat } from '../models/chat.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly documents_url = 'http://localhost:8080/documents'


  constructor(private http: HttpClient) { }
  
  async addDocument(file : File) : Promise<number>{

    let fd = new FormData

    fd.append('file', file)

    return firstValueFrom(
      this.http.post<number>(this.documents_url, fd)
    )

  }

  async getDocument(docId : number) : Promise<HttpResponse<Blob>>{
    return firstValueFrom(
      this.http.get(this.documents_url + "/" + docId.toString(),
      {
        observe: 'response',
        responseType: 'blob'
      })
    )

  }

}
