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
import { DynamicColumn } from '../../models/common/dynamic-column';
import { Pagination } from '../../models/common/pagination';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() columns: DynamicColumn[] = [];
  @Input() title: string = '';

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

  ngOnInit() {
    this.setupFilterPredicate();
    this.initFilterForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      'none',
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
      if (col.type === 'number') {
        group[col.key + '_range'] = new FormGroup({
          min: new FormControl(''),
          max: new FormControl(''),
        });
      } else if (col.type === 'date') {
        group[col.key + '_range'] = new FormGroup({
          start: new FormControl(''),
          end: new FormControl(''),
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
      if (col.type === 'number') {
        combinedFilters[col.key] = {
          from: formValues[col.key + '_range']?.min,
          to: formValues[col.key + '_range']?.max,
        };
      } else if (col.type === 'date') {
        combinedFilters[col.key] = {
          from: formValues[col.key + '_range']?.start,
          to: formValues[col.key + '_range']?.end,
        };
      }
    });
    // Emit filter and pagination info
    this.getAll.emit({
      filter: combinedFilters,
      pageNumber: this.paginator?.pageIndex === 0 ? 1 : this.paginator?.pageIndex,
      pageSize: this.paginator?.pageSize ?? 5,
    });
  }

  setupFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filters = JSON.parse(filter);
      return this.columns.every((col) => {
        if (!col.visible) return true;
        const key = col.key,
          type = col.type,
          value = data[key];
        if (type === 'text')
          return value
            ?.toLowerCase()
            .includes(filters[key]?.toLowerCase() || '');
        if (type === 'bool')
          return filters[key] === '' || value === filters[key];
        if (type === 'number') {
          const range = filters[key];
          return (
            (!range.min || value >= +range.min) &&
            (!range.max || value <= +range.max)
          );
        }
        if (type === 'date') {
          const range = filters[key],
            date = new Date(value);
          return (
            (!range.min || date >= new Date(range.min)) &&
            (!range.max || date <= new Date(range.max))
          );
        }
        return true;
      });
    };
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
    this.add.emit();
  }
}