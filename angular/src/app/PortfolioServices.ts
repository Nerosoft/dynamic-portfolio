import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class PortfolioServices {
  IP = 'https://us-central1-nero-soft.cloudfunctions.net/abdo/'
  constructor(public http: HttpClient) {
  }


  servGet(url: string, callback) {
    let smartphone: any = [];
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http
      .get(url, { headers: headers }).pipe(map(data => {
        callback(data)

      })).subscribe(data => data);


  }

  servPost(url: string, formData, callback, that) {
    let smartphone: any = [];
    let headers = new HttpHeaders();
    // headers.append('Content-type','application/json');
    //console.log("Content-Type", formData)
    return this.http.post<any>(url, formData
      //   {
      //     headers: {
      //   "Content-Type":'multipart/form-data'
      // }
      // params: {
      //   clientFilename: formData.name,
      //   mimeType: formData.type
      // }
      //}
    ).subscribe(
      (res) => callback(res, that),
      (err) => console.log(err)
    );




  }


  servPostJson(api: string, data,callback) {
    let smartphone: any = [];
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    //console.log("Content-Type", formData)
    return this.http.post<any>(this.IP + api,data ,{headers}).subscribe(
      (res) => callback(res),
      (err) => callback(err)
    )
  }


  servPostImage(api: string, formData, callback ) {
    return this.http.post<any>(this.IP + api,formData,{
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      (events) => callback(events),
      (err) => callback(err)
    );




  }



}





    // fetch('https://api.ipify.org/?format=json').
    // then(result=>result.json()).
    // then(data=> console.log('aaaaaaa',data.ip))