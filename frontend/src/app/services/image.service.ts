import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Prediction } from "./Prediction";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http_client: HttpClient) { }

  url: string = "http://127.0.0.1:5000/api/image-upload";

  uploadImage(imageFile: File): Observable<Prediction> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    return this.http_client.post<Prediction>(this.url, formData);
  }
}
