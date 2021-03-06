import { AuthService } from './../../../../../auth/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material';
import { OogstkaartService } from '../oogstkaart.service';
import { OogstKaartItem, Weight, LocationOogstKaartItem } from '../../../../../models/models';
import { HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-oogstkaartform',
  templateUrl: './oogstkaartform.component.html',
  styleUrls: ['./oogstkaartform.component.scss']
})

export class OogstkaartformComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  matHorizontalStepper: MatHorizontalStepper;


  oogstkaartID: number;
  zoom: number = 7
  postsucces: boolean = false;
  err;

  avatarpreviewurl

  selectedlocation = {
    lat: null,
    lng: null,
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  color = 'primary';
  mode = 'determinate';
  value = 50;

  @ViewChild('stepper') stepper: MatStepper;
  location

  buttondisabled : boolean = false;
  
  public progress: number;
  public message: string;




  constructor(private _formBuilder: FormBuilder, private oogstkaartservice: OogstkaartService, private http : HttpClient, private auth: AuthService) {
  
  }

  ngOnInit() {
   

    this.secondFormGroup = this._formBuilder.group({
      omschrijving: ['', Validators.required],
      jansenserie: ['', Validators.required],
      coating: ['', Validators.required],
      glassamenstelling: ['', Validators.required],
      afmetingen: ['', Validators.required],
      weight: ['', Validators.required],
      vraagPrijsPerEenheid: ['', Validators.required],
      vraagPrijsTotaal: ['', Validators.required],
      status: ['', Validators.required],
      artikelnaam:  ['', Validators.required],
      categorie: ['', Validators.required],
      metric: ['', Validators.required],
      transportInbegrepen: ['', Validators.required],
      hoeveelheid: ['', Validators.required],
      concept: ['', Validators.required],


    });

    this.thirdFormGroup = this._formBuilder.group({
      productimage: null,
    });




  }

  postartikel() {

    let item: OogstKaartItem = new OogstKaartItem;
    item.weight = new Weight;
    item.hoeveelheid = this.secondFormGroup.value.hoeveelheid;
    item.omschrijving = this.secondFormGroup.value.omschrijving;
    item.artikelnaam = this.secondFormGroup.value.artikelnaam;
    item.jansenserie = this.secondFormGroup.value.jansenserie;
    item.coating = this.secondFormGroup.value.coating;
    item.category = this.secondFormGroup.value.categorie;
    item.concept = this.secondFormGroup.value.concept;
    item.glassamenstelling = this.secondFormGroup.value.glassamenstelling;
    item.afmetingen = this.secondFormGroup.value.afmetingen;
    item.weight.weightX = this.secondFormGroup.value.weight;
    item.weight.metric = this.secondFormGroup.value.metric;
    item.vraagPrijsPerEenheid = this.secondFormGroup.value.vraagPrijsPerEenheid;
    item.vraagPrijsTotaal = this.secondFormGroup.value.vraagPrijsTotaal;
    item.status = this.secondFormGroup.value.status;
    item.transportInbegrepen = this.secondFormGroup.value.transportInbegrepen;

    if(this.buttondisabled == false){
      this.buttondisabled = true;
      this.oogstkaartservice.postOogstkaartItem(item).subscribe(res => {
        this.oogstkaartID = res;
        console.log(this.oogstkaartID)
        this.postsucces = true;
        this.stepper.next();
        
        
      },
        err => {
  
          this.buttondisabled = false;
          this.err = err;
          this.postsucces = false;
          this.stepper.selectedIndex = 3;
        }, () => {
          this.buttondisabled = false;
        })
    }

    

  }

  postLocation() {

    let location: LocationOogstKaartItem = new LocationOogstKaartItem();
    location.latitude = this.selectedlocation.lat;
    location.longtitude = this.selectedlocation.lng;

    this.oogstkaartservice.PostLocation(this.oogstkaartID, location).subscribe(res => {
      this.stepper.next();
    }, err => {
      this.deleteItem(this.oogstkaartID);
      this.err = err;
      this.postsucces = false;
      this.stepper.selectedIndex = 4;
    })
  }

  getlocation($event) {
    this.selectedlocation.lat = $event.coords.lat;
    this.selectedlocation.lng = $event.coords.lng;
  }

  nextstep() {
    this.stepper.next();
  }

  uploadavatar(event){


    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
       this.oogstkaartservice.PostProductPhoto(file, this.oogstkaartID).subscribe( res => {
         this.stepper.next();
       }, err => {
         this.deleteItem(this.oogstkaartID);
       })
      };
    }

  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `http://10.211.55.3:45455/api/Oogstkaart/oogstkaartavatar/` +  this.oogstkaartID, formData, {
      reportProgress: true,
      headers : this.auth.getAuthorizationHeaders()
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.stepper.next();
    });
  }

  private deleteItem(id : number){
    console.log("item removed")
    this.oogstkaartservice.DeleteItem(id).subscribe( res => {
      this.postsucces = false;
      this.stepper.selectedIndex = 3;
    });
   
  }


}
