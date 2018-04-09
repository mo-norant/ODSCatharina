import { OogstKaartItem } from './../../../../../models/models';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-itemview',
  templateUrl: './itemview.component.html',
  styleUrls: ['./itemview.component.scss'],
  animations : fuseAnimations

})
export class ItemviewComponent implements OnInit {


    // Card 9
    card9Expanded = false;

  constructor(
    public dialogRef: MatDialogRef<ItemviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  ngOnInit() {
  }

}
