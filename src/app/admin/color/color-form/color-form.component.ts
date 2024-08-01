// src/app/color-form/color-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateColor } from 'src/app/shared/models/color';
import { ColorService } from 'src/app/shared/services/color-service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
 
@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.scss'],
})
export class ColorFormComponent implements OnInit {
  colorForm!: FormGroup;
  isEditMode: boolean = false;
  colorId?: number;

  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.colorForm = this.fb.group({
      name: ['', Validators.required],
      hexCode: ['', [Validators.required]],
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.colorId = +params['id'];
        this.loadColor();
      }
    });
  }

  loadColor(): void {
    this.colorService.getColor(this.colorId!).subscribe(color => {
      this.colorForm.patchValue(color);
    });
  }

  onSubmit(): void {
    if (this.colorForm.valid) {
      const colorData: CreateColor = this.colorForm.value;
      if (this.isEditMode) {
        this.colorService.updateColor(this.colorId!, colorData).subscribe(() => {
          this.sweetAlertService.success('Color updated successfully');
          this.router.navigate(['/admin/color']);
        });
      } else {
        this.colorService.createColor(colorData).subscribe(() => {
          this.sweetAlertService.success('Color created successfully');
          this.router.navigate(['/admin/color']);
        });
      }
    }
  }
}
