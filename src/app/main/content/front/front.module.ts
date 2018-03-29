import { FuseNavigationModule } from './../../../../@fuse/components/navigation/navigation.module';
import { FuseConfigService } from '@fuse/services/config.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanderComponent } from 'app/main/content/front/lander/lander.component';
import { Route, RouterModule } from '@angular/router';
import { FuseSharedModule } from '../../@fuse/shared.module';
import { MaterialModule } from '../../../material/material.module';
import { FuseToolbarModule } from '../../toolbar/toolbar.module';
import { FuseModule } from '../../@fuse/fuse.module';
import { OogstkaartMapComponent, Mapitem } from './oogstkaart-map/oogstkaart-map.component';
import { AgmCoreModule  } from '@agm/core';


const routes: Route[] = [
  {
    path: '',
    component: LanderComponent,
  },
  {
    path: 'map',
    component: OogstkaartMapComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FuseNavigationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC20RLiyVsvMLncki9JQdKuIpHdBdSXTY0'
    }),
  ],
  
  providers: [],
  declarations: [LanderComponent, OogstkaartMapComponent]
})
export class FrontModule { }
