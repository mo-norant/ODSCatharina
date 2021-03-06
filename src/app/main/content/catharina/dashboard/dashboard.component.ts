import { AuthService } from './../../../../auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class DashboardComponent implements OnInit {

  name

  constructor(private auth: AuthService) {

    this.auth.getUserInfo().subscribe(res => {
      this.name = res;
    })
   

  }
  ngOnInit() {
  }

}
