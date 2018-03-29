import { OogstKaartItem } from './../../../../../models/models';
import { OogstkaartService } from './../oogstkaart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  oogstkaartitem: OogstKaartItem;

  constructor(private OogstkaartService: OogstkaartService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.route.params.subscribe(data => {

      this.OogstkaartService.getOogstkaartItem(data['id']).subscribe(res => {

        this.oogstkaartitem = res;
      }, err => {
        this.snackBar.open("Geen product gevonden", "", {
          duration: 2000
        }); this.router.navigate(["catharina/oostkaart"])
      })
    })

  }

}
