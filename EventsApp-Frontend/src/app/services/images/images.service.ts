import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UploadFile } from 'src/app/interfaces/upload-file';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<UploadFile[]> {
    return this.http.get<UploadFile[]>(`${this.baseApiUrl}/api/FileUploads`);
  }

  getImagebyName(fileName: string): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(
      this.baseApiUrl + `/api/FileUploads/${fileName}`,
      options
    );
  }
}
