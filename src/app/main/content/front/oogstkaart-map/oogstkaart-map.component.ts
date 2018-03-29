import { HttpClient } from '@angular/common/http';
import { OogstKaartItem } from './../../../../models/models';
import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-oogstkaart-map',
  templateUrl: './oogstkaart-map.component.html',
  styleUrls: ['./oogstkaart-map.component.scss']
})

export class OogstkaartMapComponent implements OnInit {

  oogstkaartitems: OogstKaartItem[]

  zoom = 7

  link = 'http://10.211.55.3:45455/api/Oogstkaart/mapview'

  constructor(
    private fuseConfig: FuseConfigService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.http.get<OogstKaartItem[]>(this.link).subscribe(res => {
      this.oogstkaartitems = res;
    })


  }

  ngOnInit() {
  }

  opendialog() {
    this.dialog.open(Mapitem);

  }
}

@Component({ 
  selector: 'mapitem'
  , template: 'Hello {{name}}!' })
export class Mapitem {
  name: string = 'World';
}
