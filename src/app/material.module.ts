import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatListModule, MatIconModule,
   MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule } from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatListModule,
    MatIconModule, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatListModule,
    MatIconModule, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule ],
})
export class MaterialModule {

}
