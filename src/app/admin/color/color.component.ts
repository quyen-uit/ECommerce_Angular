import { Element } from '@angular/compiler';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Color } from 'src/app/shared/models/color';
import { Pagination } from 'src/app/shared/models/pagination';
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnsToDisplay = ['order', 'name', 'hexCode', 'actions'];
  pageSizes = [5, 10, 20];
  dataSource: MatTableDataSource<Color> = new MatTableDataSource<Color>();
  pageLength = 5;

  colors: Color[] = [];
  private colorParams: ColorParams = new ColorParams();

  searchControl: FormControl = new FormControl();
  searchValueBefore: string = "";
  constructor(private colorService: ColorService, private router: Router, private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.loadcolors();
    this.colorParams.pageSize = 5;
    this.colorParams.pageNumber = 1;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      if (this.searchValueBefore != value) {
        this.colorParams.search = value;
        this.search();
      }
    });

    this.sort.sortChange.subscribe((sortState: Sort) => {
      this.colorParams.sort = `${sortState.active}_${sortState.direction}`;
      this.search()
    });

  }

  pageChangeEvent(event: PageEvent) {
    this.colorParams.pageSize = event.pageSize;
    this.colorParams.pageNumber = event.pageIndex + 1;
    this.loadcolors();
  }

  getOrderNumber(index: number): number {
    return (this.colorParams.pageNumber - 1) * this.colorParams.pageSize + index + 1;
  }

  loadcolors(): void {
    this.colorService.getColors(this.colorParams).subscribe((data: Pagination<Color[]>) => {
      this.dataSource = new MatTableDataSource(data.data);
      this.pageLength = data.pageCount;
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
        this.colorService.deleteColor(id).subscribe({
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
    this.search();
  }

  search() {
    this.colorParams.pageNumber = 1;
    this.loadcolors();
    setTimeout(() => { this.paginator.pageIndex = 0; });
  }
}
