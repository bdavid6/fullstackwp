import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuildingService } from '../core/services/building.service';
import { AddBuildingComponent } from './add-building/add-building.component';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {

  constructor(
    public bs: BuildingService,
    public dialog: MatDialog,
  ) {
    bs.getBuildings();
  }

  ngOnInit(): void {
  }

  openAddBuilding(): void {
    const dialogRef = this.dialog.open(AddBuildingComponent, {
      // height: '400px',
      width: '700px',
    });
  }

  deleteBuilding(id: number): void {
    this.bs.deleteBuilding(id);
  }

}
