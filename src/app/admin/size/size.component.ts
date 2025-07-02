import { Component, ViewChild } from '@angular/core';
import { DynamicColumn } from 'src/app/shared/models/common/dynamicColumn';
import { Pagination } from 'src/app/shared/models/common/pagination';
import { Size } from 'src/app/shared/models/sizes/size';
import { SizePaginationParams } from 'src/app/shared/params/sizePaginationParams';
import { SizeService } from 'src/app/shared/services/size-service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent {
  paginationData?: Pagination<Size>;
  title: string = 'SIZE.MANAGEMENT';
  addRoute: string = '/admin/size/add';
  editRoute: string = '/admin/size/edit';
  columns: DynamicColumn[] = [
    {
      key: 'name',
      label: 'SIZE.NAME',
      type: 'text',
      visible: true,
      sortable: true,
      filterable: true,
    },
    {
      key: 'sizeType',
      label: 'SIZE.TYPE',
      type: 'options',
      visible: true,
      sortable: true,
      filterable: true,
      options: [{ viewValue: 'CHARACTER', value: 'Character' }, { viewValue: 'NUMBER', value: 'Number' }]
    },
    {
      key: 'sortOrder',
      label: 'SIZE.SORT_ORDER',
      type: 'number',
      visible: true,
      sortable: true,
      filterable: true,
    },
  ];

  constructor(private sizeService: SizeService) { }

  ngOnInit() {
  }

  getAll(params: SizePaginationParams) {
    this.sizeService.getAll(params).subscribe((data) => {
      this.paginationData = data;
    });
  }
}