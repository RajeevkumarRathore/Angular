import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
  ) { }

  ngOnInit(): void {
    
 
  }

  actionFn() {
    this.snackBarRef.dismissWithAction();
  }

}

interface SnackbarData {
  title: string;
  message: string;
  action?: string;
  type: 'snackbar-success' | 'snackbar-error' |  'snackbar-info' |  'snackbar-warning';
}
