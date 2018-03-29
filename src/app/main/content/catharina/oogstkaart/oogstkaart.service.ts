import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { OogstKaartItem, LocationOogstKaartItem } from '../../../../models/models';

@Injectable()
export class OogstkaartService {

  link = 'http://10.211.55.3:45455/api/Oogstkaart'

  constructor(public http: HttpClient, public auth: AuthService) { }

   

  public GetOogstkaartitems() {
   
    
    return this.http.get<OogstKaartItem[]>(this.link, { headers:  this.auth.getAuthorizationHeaders()});
    

  }
  locationlink = "http://10.211.55.3:45455/api/Oogstkaart/Location"
  adminlink = "http://10.211.55.3:45455/api/Oogstkaart/mapview  "
  public postOogstkaartItem(item: OogstKaartItem){



    return this.http.post<number>( this.link , item,{ headers:  this.auth.getAuthorizationHeaders()});
  }

  /**
   * PostLocation
oogstkaartid : number   */
  public PostLocation(oogstkaartid : number, location: LocationOogstKaartItem) {
    return this.http.post(this.locationlink + "?OogstkaartitemID=" +oogstkaartid, location ,{ headers:  this.auth.getAuthorizationHeaders()} );
  }

  public GetItems(){
    return this.http.get<OogstKaartItem[]>(this.link);
  }

  /**
   * getOogstkaartItem
   */
  public getOogstkaartItem(id: number) {
    return this.http.get<OogstKaartItem>(this.link + '/' + id, { headers:  this.auth.getAuthorizationHeaders()} );
  }

  

}
