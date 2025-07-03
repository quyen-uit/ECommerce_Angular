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
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Pagination } from '../../models/common/pagination';
import BaseParams from '../../params/baseParams';
import { Router } from '@angular/router';
import { DynamicColumn } from '../../models/common/dynamicColumn';
import { TranslateService } from '@ngx-translate/core';
import { toSnakeCase } from '../../helpers/string.helper';
@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  private _pagination!: Pagination<any>;
  @Input() columns: DynamicColumn[] = [];
  @Input() title: string = '';
  @Input() editRoute: string = '';
  @Input()
  set pagination(value: Pagination<any> | undefined) {
    if (value) {
      this._pagination = value;
      this.dataSource.data = value.data;
      this.paginator.length = value.pageCount;
      this.paginator.pageSize = value.pageSize;
    }
  }

  get pagination(): Pagination<any> {
    return this._pagination;
  }

  get selectedIds(): number[] {
    return this.selection.selected.map((item) => item.id);
  }

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() getAll = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();
  filterForm!: FormGroup;
  selection = new SelectionModel<any>(true, []);
  selectedSort: string = '';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private paginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit() {
    this.initFilterForm();
    this.applyFiltersFromForm();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.updatePaginatorTranslation();
    this.paginator.page.subscribe(() => {
      this.applyFiltersFromForm();
    });
  }

  updatePaginatorTranslation() {
    this.translate
      .get([
        'ITEMS_PER_PAGE',
        'NEXT_PAGE',
        'PREVIOUS_PAGE',
        'FIRST_PAGE',
        'LAST_PAGE',
      ])
      .subscribe((translations) => {
        this.paginator._intl.itemsPerPageLabel = translations['ITEMS_PER_PAGE'];
        this.paginatorIntl.nextPageLabel = translations['NEXT_PAGE'];
        this.paginatorIntl.previousPageLabel = translations['PREVIOUS_PAGE'];
        this.paginatorIntl.firstPageLabel = translations['FIRST_PAGE'];
        this.paginatorIntl.lastPageLabel = translations['LAST_PAGE'];
        this.paginatorIntl.changes.next();
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
      pageNumber: this.paginator ? this.paginator?.pageIndex + 1 : 1,
      pageSize: this.paginator?.pageSize ?? 5,
      sort: this.selectedSort,
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

  onDelete() {
    this.delete.emit(this.selectedIds);
  }

  onAdd() {
    this.router.navigate([this.editRoute]);
  }
  onRowDoubleClick(row: any) {
    this.router.navigate([this.editRoute, row.id]);
  }

  onSort(sort: Sort) {
    this.selectedSort = toSnakeCase(`${sort.active}_${sort.direction}`);
    this.applyFiltersFromForm();
  }
}
