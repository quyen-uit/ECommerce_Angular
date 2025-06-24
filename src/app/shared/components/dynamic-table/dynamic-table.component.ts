import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DynamicColumn } from '../../models/common/dynamic-column';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];
  @Input() columns: DynamicColumn[] = [];
  @Input() loading = false;
  @Input() title = '';

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  dataSource = new MatTableDataSource<any>();
  filters: { [key: string]: any } = {};
  rangeFilters: { [key: string]: { min?: any; max?: any } } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.data = this.data;
    this.setupFilterPredicate();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get visibleColumns() {
    return this.columns.filter(c => c.visible).map(c => c.key);
  }

  get visibleFilterColumns() {
    return this.columns.filter(c => c.visible && c.type !== 'action').map(c => c.key + '_filter');
  }

  applyFilter(value: any, column: string) {
    this.filters[column] = value;
    this.updateFilter();
  }

  applyRangeFilter(column: string, bound: 'min' | 'max', value: any) {
    if (!this.rangeFilters[column]) this.rangeFilters[column] = {};
    this.rangeFilters[column][bound] = value;
    this.updateFilter();
  }

  updateFilter() {
    const combinedFilters: any = {};
    this.columns.forEach(col => {
      if (col.type === 'number' || col.type === 'date') {
        combinedFilters[col.key] = this.rangeFilters[col.key] || {};
      } else {
        combinedFilters[col.key] = this.filters[col.key] || '';
      }
    });
    this.dataSource.filter = JSON.stringify(combinedFilters);
  }

  setupFilterPredicate() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filters = JSON.parse(filter);
      return this.columns.every(col => {
        if (!col.visible || col.type === 'action') return true;
        const key = col.key;
        const type = col.type;
        const value = data[key];

        if (type === 'text') {
          return value?.toLowerCase().includes(filters[key]?.toLowerCase() || '');
        }

        if (type === 'bool') {
          return filters[key] === '' || value === filters[key];
        }

        if (type === 'number') {
          const range = filters[key];
          return (!range.min || value >= +range.min) && (!range.max || value <= +range.max);
        }

        if (type === 'date') {
          const range = filters[key];
          const date = new Date(value);
          return (!range.min || date >= new Date(range.min)) && (!range.max || date <= new Date(range.max));
        }

        return true;
      });
    };
  }

  toggleColumnVisibility(columnKey: string) {
    const col = this.columns.find(c => c.key === columnKey);
    if (col) col.visible = !col.visible;
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