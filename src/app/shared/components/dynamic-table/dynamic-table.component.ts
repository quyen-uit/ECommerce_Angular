import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Pagination } from '../../models/common/pagination';
import BaseParams from '../../params/baseParams';
import { Router } from '@angular/router';
import { DynamicColumn } from '../../models/common/dynamicColumn';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() columns: DynamicColumn[] = [];
  @Input() title: string = '';
  @Input() editRoute: string = '';
  @Input() addRoute: string = '';

  private _pagination!: Pagination<any>;

  @Input()
  set pagination(value: Pagination<any> | undefined) {
    if (value) {
      this._pagination = value;
      this.dataSource.data = value.data;
      this.paginator.length = value.pageCount;
    }
  }

  get pagination(): Pagination<any> {
    return this._pagination;
  }

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() getAll = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  filterForm!: FormGroup;
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router: Router) { }
  ngOnInit() {
    this.initFilterForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFiltersFromForm();

    this.paginator.page.subscribe(() => {
      this.applyFiltersFromForm();
    });
  }

  get visibleColumns() {
    return [
      'select',
      ...this.columns.filter((c) => c.visible).map((c) => c.key),
    ];
  }

  get visibleFilterColumns() {
    return [
      'search',
      ...this.columns
        .filter((c) => c.visible)
        .map((c) => (c.filterable ? c.key + '_filter' : 'none')),
    ];
  }

  updateData(items: any[]) {
    this.dataSource.data = items;
  }

  initFilterForm() {
    const group: any = {};
    this.columns.forEach((col) => {
      if (
        col.type === 'text' ||
        col.type === 'bool' ||
        col.type === 'options'
      ) {
        group[col.key] = new FormControl('');
      } else if (col.type === 'number' || col.type === 'date') {
        group[col.key] = new FormGroup({
          from: new FormControl(''),
          to: new FormControl(''),
        });
      }
    });
    this.filterForm = new FormGroup(group);
    // this.filterForm.valueChanges.subscribe(() => this.applyFiltersFromForm());
  }

  applyFiltersFromForm() {
    const formValues = this.filterForm.value;
    const combinedFilters: any = {};
    this.columns.forEach((col) => {
      if (
        col.type === 'text' ||
        col.type === 'bool' ||
        col.type === 'options'
      ) {
        combinedFilters[col.key] = formValues[col.key];
      } else if (col.type === 'number') {
        combinedFilters[col.key] = {
          from:
            formValues[col.key].from !== '' ? +formValues[col.key].from : null,
          to: formValues[col.key].to !== '' ? +formValues[col.key].to : null,
        };
      } else if (col.type === 'date') {
        combinedFilters[col.key] = {
          from: formValues[col.key].from,
          to: formValues[col.key].to,
        };
      }
    });
    // Emit filter and pagination info
    this.getAll.emit({
      filter: combinedFilters,
      pageNumber:
        this.paginator?.pageIndex === 0 ? 1 : this.paginator?.pageIndex,
      pageSize: this.paginator?.pageSize ?? 5,
    });
  }

  toggleColumnVisibility(columnKey: string) {
    const col = this.columns.find((c) => c.key === columnKey);
    if (col) col.visible = !col.visible;
  }

  toggleRow(row: any) {
    this.selection.toggle(row);
  }

  toggleAllRows(event: any) {
    event.checked
      ? this.selection.select(...this.dataSource.filteredData)
      : this.selection.clear();
  }

  isAllSelected() {
    return (
      this.selection.selected.length === this.dataSource.filteredData.length
    );
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onAdd() {
    if (this.addRoute) this.router.navigate([this.addRoute]);
  }
  onRowDoubleClick(row: any) {
    if (this.editRoute) this.router.navigate([this.editRoute, row.id]);
  }
}
