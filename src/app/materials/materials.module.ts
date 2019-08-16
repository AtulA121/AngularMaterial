import { NgModule } from '@angular/core';

import {
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatSidenavModule,
        MatMenuModule,
        MatListModule,
        MatDividerModule,
        MatGridListModule,
        MatExpansionModule,
        MatCardModule,
        MatTabsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule
      } from "@angular/material";
import {MatBadgeModule} from "@angular/material/badge";
import { HttpClient } from '@angular/common/http';

const materials=[
                  MatButtonModule,
                  MatIconModule,
                  MatButtonToggleModule,
                  MatBadgeModule,
                  MatProgressSpinnerModule,
                  MatToolbarModule,
                  MatSidenavModule,
                  MatMenuModule,
                  MatListModule,
                  MatDividerModule,
                  MatGridListModule,
                  MatExpansionModule,
                  MatCardModule,
                  MatTabsModule,
                  MatStepperModule,
                  MatFormFieldModule,
                  MatInputModule,
                  MatSelectModule,
                  MatAutocompleteModule,
                  MatCheckboxModule,
                  MatRadioModule,
                  MatDatepickerModule,
                  MatNativeDateModule,
                  MatTooltipModule,
                  MatSnackBarModule,
                  MatDialogModule,
                  MatTableModule,
                  MatSortModule,
                  MatPaginatorModule
                ];

@NgModule({
  imports: [materials],
  exports : [materials]
})
export class MaterialsModule {

  constructor(private _http : HttpClient)
  {

  }

  getStudentsData()
  {
    return this._http.get<any>("http://localhost:8080/getData");
  }
}
