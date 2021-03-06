import { HttpClient } from '@angular/common/http';
import { OogstKaartItem } from './../../../../models/models';
import { Component, Inject, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import * as _ from "lodash";
import { ItemviewComponent } from './itemview/itemview.component';



@Component({
  selector: 'app-oogstkaart-map',
  templateUrl: './oogstkaart-map.component.html',
  styleUrls: ['./oogstkaart-map.component.scss']
})

export class OogstkaartMapComponent implements OnInit {

  oogstkaartitems: OogstKaartItem[]

  zoom = 7
  itemsloading : boolean

  link = 'http://10.211.55.3:45455/api/Oogstkaart/mapview';

  filters = {
    categorie: [
      { jansenprofiel: false },
      { constructieprofiel: false },
      { deur: false },
      { raam: false },
      { geveldeel: false },
      { overige: false }
    ]
  }

  icons: [
    { constructieprofiel: "/path" },
    { jansenprofiel: "/path" },
    { deur: "/path" },
    { raam: "/path" },
    { geveldeel: "/path" },
    { overige: "/path" }
  ]

  filtersid: string[] = [];

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

  }

  ngOnInit() {

    this.http.get<OogstKaartItem[]>(this.link).subscribe(res => {
      this.oogstkaartitems = res;
      this.activatefilters(res);
      this.itemsloading = true;
    }, err => {
      this.itemsloading = true;
    })

  }

  opendialog(item: OogstKaartItem): void {

    
    let dialogRef = this.dialog.open(ItemviewComponent, {
      data: { item: item }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  filtertoggle($event) {

    console.log($event)

    if ($event.source.id in this.oogstkaartitems) {
    }

   


  }

  activatefilters(oogstkaartitems: OogstKaartItem[]) {

    oogstkaartitems.forEach(element => {
      this.filtersid.push(element.category);
    });

    this.filtersid = _.uniq(this.filtersid);

    this.filtersid.forEach(element => {
      this.filters.categorie[element] = true;
    });


  }





}

