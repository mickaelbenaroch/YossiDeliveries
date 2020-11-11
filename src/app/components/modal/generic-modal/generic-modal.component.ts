import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalTypeEnum} from '../../../enums/modal-type.enum';
import { ModalModel} from '../../../models/modalModel';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {

  public typeEnum = ModalTypeEnum;
  public modalModel: ModalModel = new ModalModel();

  constructor(public dialogRef: MatDialogRef<GenericModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericModalComponent) { 
      this.modalModel = this.data.modalModel;
    }

  ngOnInit() {
    // setTimeout(() => {
    //   this.close();
    // }, 5000);
  }

  close(action: boolean): void {
    this.dialogRef.close(action);
  }
}
