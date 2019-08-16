import { Component, ViewChild } from '@angular/core';
import { MaterialsModule } from './materials/materials.module';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { MatSnackBar, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatSort,{static: true}) sort : MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator : MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  title = 'AngularMaterial';
  public progressValue=0;
  public opened=true;
  public btnState="Close";
  public btnStatus=false;
  public array: any;
  public selectedValue : string;  
  public itemArray : string[]=["atul","a121","a1n1","a1s1","n1a1","shankar","sagar","sarthak","tanmay","akansha","umesh"];
  public itemObject=[{
    name : "atul",
  },{
    name : "a121"
  }];

  //set min and max date
  minDate=new Date();
  maxDate=new Date(2019,7,10);

  //prevent to select saturday and sunday
  dateFilter = (date)=>{
    const   day=date.getDay();
    return day!=0 && day!=6;
  }

  myFormControl=new FormControl();

  filterOption : Observable<string[]>;

  constructor(private materialsModule : MaterialsModule,private snack : MatSnackBar,private dialog : MatDialog)
  {
    console.log("constructor...");
  }

  ngOnInit()
  {
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
    
    console.log("init...");
    console.log("started..."+this.progressValue);
    let that=this;
    let timer=setInterval(function(){
      if(that.progressValue>=100)
      {
        console.log("timer cleared..."+that.progressValue);
        clearInterval(timer);
      }
      that.startSpinner(that);
    },100);

    this.materialsModule.getStudentsData().subscribe((data)=>{
      console.log("response : ",data);
      this.array=data;
    },(error)=>{
      console.log("error : "+error);
    });

    //filter purpose
    this.filterOption=this.myFormControl.valueChanges.pipe(startWith(""),map(value=>this.filter(value)));

  }

  private filter(value: string):string[] {
    const filterValue=value.toLowerCase();
    return this.itemArray.filter(option=>option.toLowerCase().includes(filterValue));
  }

  startSpinnerIs()
  {
    console.log("startSpinner...");
  }

  startSpinner(that)
  {
    console.log("that...");
    this.progressValue=parseInt(that.progressValue)+10;
  }

  openedState(state)
  {
    console.log("opened : "+state);
    this.btnState="Close";
  }

  closedState(state)
  {
    console.log("state : "+state);
    this.btnState="Open";
  }

  chageTab(index)
  {
    console.log("tab index : "+index);
  }

  displayFn(obj)
  {
    return obj ? obj.name : null;
  }

  openSnackBar(message:any,action:any)
  {
    let snackRef=this.snack.open(message,action,{duration:2000});
    snackRef.afterDismissed().subscribe(()=>{
      console.log("dismissed...");
    })

    snackRef.onAction().subscribe(()=>{
      console.log("action...");
    })
  }

  openCustomSnackBar()
  {
    this.snack.openFromComponent(CustomSnackBarComponent,{duration:2000});
  }

  openDialog()
  {
    console.log("openDialog...");
    let dialogRef=this.dialog.open(DialogComponentComponent,{data : {name : "atul pisal"}});
    dialogRef.afterClosed().subscribe((result)=>{
      console.log("result : "+result);
      console.log(`result : ${result}`);
    });
  }

  getData(data)
  {
    console.log("data : ",data);
  }

  applyFilter(filterValue : string)
  {
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }

}

// for Snackbar
@Component({
  selector : "custom-snackbar",
  template : "<span style='color:warn'>Custom snackbar</span>"
})

export class CustomSnackBarComponent
{

}