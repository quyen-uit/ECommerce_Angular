import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Color } from 'src/app/shared/models/color';
import { ColorParams } from 'src/app/shared/params/colorParams';
import { ColorService } from 'src/app/shared/services/color-service'
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent {
  @ViewChild(MatSort) sort!: MatSort;
  colors: Color[] = [];
  columnsToDisplay = ['id', 'name', 'hexCode', 'actions'];
  private colorParams: ColorParams = new ColorParams();
  searchControl: FormControl = new FormControl();
  searchValueBefore: string = "";
  dataSource: MatTableDataSource<Color> = new MatTableDataSource<Color>();

  constructor(private ColorService: ColorService, private router: Router, private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.loadcolors();
  }

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (this.searchValueBefore != value) {
        this.colorParams.search = value;
        this.loadcolors();
      }
    });

    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.colorParams.sort = `${sortState.active}_${sortState.direction}`;
      this.loadcolors();
    });
  }

  loadcolors(): void {
    this.ColorService.getColors(this.colorParams).subscribe((data: Color[]) => {
      this.dataSource = new MatTableDataSource(data);
      // this.dataSource.sort = this.sort;
      this.searchValueBefore = this.colorParams.search;
    });
  }

  createColor(): void {
    this.router.navigate(['admin/color/create']);
  }

  editColor(id: number): void {
    this.router.navigate([`admin/color/${id}`]);
  }

  deleteColor(id: number): void {
    this.sweetAlertService.confirm('Do you really want to delete this color?').then((result) => {
      if (result) {
        this.ColorService.deleteColor(id).subscribe({
          next: () => {
            this.sweetAlertService.success('Color deleted successfully');
            this.loadcolors();
          },
          error: () => {
            this.sweetAlertService.error('Failed to delete color');
          }
        })
      }
    });
  }

  onEnterKeyUp(event: Event): void {
    this.colorParams.search = (event.target as HTMLInputElement).value;
    this.loadcolors();
  }

}
