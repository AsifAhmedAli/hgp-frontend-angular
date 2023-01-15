import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {ApiService} from '../../shared/services/api.service';
import {ServiceCenter} from '../../shared/interfaces/service-center.response';
import {BrandInterface} from '../../shared/interfaces/pages/static-page.response';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../shared/services/forms.service';
import {ValidationMessages} from '../../shared/constants/constants';
import {exists, showFormError} from '../../shared/functions/core.function';

@Component({
  selector: 'app-service-center',
  templateUrl: './service-center.component.html',
  styleUrls: ['./service-center.component.css']
})
export class ServiceCenterComponent implements OnInit {

  title: string;
  serviceCenter: ServiceCenter;
  brands: Array<BrandInterface> = [];
  serviceForm: FormGroup;
  isSubmitting = false;
  readonly MESSAGES = ValidationMessages;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService,
    private apiService: ApiService,
    private formsService: FormsService
  ) { }

  ngOnInit(): void {
    this.serviceForm = this.formsService.buildServiceCenterForm();
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.resolvePage();
  }
  resolvePage(): void {
    this.apiService.getServiceCenterPage().subscribe(
      response => {
        this.serviceCenter = response.page;
        this.brands = response.brands;
      },
      error => this.helpersService.showResponseErrorMessage(error)
    );
  }
  onSubmit(): void {
    if (this.serviceForm.valid) {
      this.isSubmitting = true;
      this.apiService.submitServiceCenterForm(this.serviceForm.value).subscribe(
        response => {
          this.isSubmitting = false;
          this.serviceForm.reset();
          this.helpersService.success(response.message);
        },
        error => {
          this.isSubmitting = false;
          this.helpersService.showResponseErrorMessage(error);
        }
      );
    } else {
      this.serviceForm.markAllAsTouched();
      showFormError();
    }
  }

}
