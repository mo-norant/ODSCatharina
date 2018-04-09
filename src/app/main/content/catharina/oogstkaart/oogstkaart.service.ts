import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { OogstKaartItem, LocationOogstKaartItem } from '../../../../models/models';

@Injectable()
export class OogstkaartService {

  link = 'http://10.211.55.3:45455/api/Oogstkaart'

  constructor(public http: HttpClient, public auth: AuthService) { }



  public GetOogstkaartitems() {


    return this.http.get<OogstKaartItem[]>(this.link, { headers: this.auth.getAuthorizationHeaders() });


  }
  locationlink = "http://10.211.55.3:45455/api/Oogstkaart/Location"
  adminlink = "http://10.211.55.3:45455/api/Oogstkaart/mapvi/api/Oogstkaart/productstatusew"
  public postOogstkaartItem(item: OogstKaartItem) {



    return this.http.post<number>(this.link, item, { headers: this.auth.getAuthorizationHeaders() });
  }

  /**
   * PostLocation
oogstkaartid : number   */
  public PostLocation(oogstkaartid: number, location: LocationOogstKaartItem) {
    return this.http.post(this.locationlink + "?OogstkaartitemID=" + oogstkaartid, location, { headers: this.auth.getAuthorizationHeaders() });
  }

  public GetItems() {
    return this.http.get<OogstKaartItem[]>(this.link);
  }

  /**
   * getOogstkaartItem
   */
  public getOogstkaartItem(id: number) {
    return this.http.get<OogstKaartItem>(this.link + '/' + id, { headers: this.auth.getAuthorizationHeaders() });
  }

  public PostSetStatusProduct(id: number) {
    return this.http.post('http://10.211.55.3:45455/api/Oogstkaart/productstatus/' + id, {}, { headers: this.auth.getAuthorizationHeaders() })
  }

  /**
   * DeleteItem
   */
  public DeleteItem(id: number) {
    return this.http.delete<OogstKaartItem>(this.link + '/' + id, { headers: this.auth.getAuthorizationHeaders() });
  }

  /**
   * PostFile
   */
  public PostProductPhoto(file: File, id: number) {
    let formData: FormData = new FormData();
    formData.append('uploadFile', file);

    let headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.auth.getToken().access_token);
   // headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json')

    return this.http.post("http://10.211.55.3:45455/api/Oogstkaart/oogstkaartavatar/"+id, formData,{headers:headers});

  }



}
