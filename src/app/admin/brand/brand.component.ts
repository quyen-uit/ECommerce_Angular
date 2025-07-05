import { Component, ViewChild } from '@angular/core';
import { DynamicColumn } from 'src/app/shared/models/common/dynamicColumn';
import { Pagination } from 'src/app/shared/models/common/pagination';
import { Brand } from 'src/app/shared/models/brands/brand';
import { BrandPaginationParams } from 'src/app/shared/params/brandPaginationParams';
import { Router } from '@angular/router';
import { DynamicTableComponent } from 'src/app/shared/components/dynamic-table/dynamic-table.component';
import { BrandService } from 'src/app/shared/services/brand-service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent {
  paginationData?: Pagination<Brand>;
  title: string = 'BRAND.MANAGEMENT';
  editRoute: string = '/admin/brand';
  columns: DynamicColumn[] = [
    {
      key: 'name',
      label: 'BRAND.NAME',
      type: 'text',
      visible: true,
      sortable: true,
      filterable: true,
    },
    {
      key: 'description',
      label: 'BRAND.DESCRIPTION',
      type: 'text',
      visible: true,
      sortable: true,
      filterable: true,
    }
  ];

  @ViewChild('dynamicTable') dynamicTable!: DynamicTableComponent;
  constructor(private brandService: BrandService, private router: Router, private translate: TranslateService, private toast: ToastrService) { }

  ngOnInit() { }

  // Updated to use the new BrandPaginationParams type
  onGetAll(params: BrandPaginationParams) {
    this.brandService.getAll(params).subscribe((data) => {
      this.paginationData = data;
    });
  }

  onDelete(ids: number[]) {
    this.brandService.deleteMany(ids).subscribe((res) => {
      this.dynamicTable.applyFiltersFromForm();
      this.translate.get('BRAND.DELETE_SUCCESS').subscribe((res: string) => {
        this.toast.success(res);
      });
    });
  }
}