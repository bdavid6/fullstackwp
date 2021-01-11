import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Building } from 'src/app/core/interfaces/building';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuildingService } from 'src/app/core/services/building.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {

  public addBuildingForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddBuildingComponent>,
    private ns: NotificationService,
    private as: AuthService,
    public bs: BuildingService,
  ) {
    this.addBuildingForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addBuilding(form: FormGroup): void {
    if(form.valid) {
      this.bs.addBuilding(<Building>form.value);
      this.ns.show("Épület hozzáadva");
      this.dialogRef.close();
      this.addBuildingForm.reset();
    } else {
      this.ns.show("Nem sikerült hozzáadni");
    }
    this.bs.getBuildings();
  }

}
