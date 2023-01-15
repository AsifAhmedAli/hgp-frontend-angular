import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  Constants,
  Messages,
  ValidationMessages,
} from "../shared/constants/constants";
import { ApiService } from "../shared/services/api.service";
import { HelpersService } from "../shared/services/helpers.service";
declare const FloatLabel: any;

@Component({
  selector: "app-give-away",
  templateUrl: "./give-away.component.html",
  styleUrls: ["./give-away.component.css"],
})
export class GiveAwayComponent implements OnInit {
  form: FormGroup;
  readonly MESSAGES = ValidationMessages;
  isSubmitting: boolean;
  submitted: boolean;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private helpersService: HelpersService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    FloatLabel.init();
    this.form = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(Constants.contactUsNameMaxLength),
        ],
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(Constants.generalMaxLength),
        ],
      ],
      instagramHandle: ["", [Validators.required]],
      state: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.min(21)]],
      interest: ["", [Validators.required]],
      describe: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = false;
    if (this.form.valid) {
      this.isSubmitting = true;
      this.subscription = this.apiService
        .postGiveUsForm(this.form.value)
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            this.form.reset();
            this.helpersService.success(
              "Your request has been submitted successfully.",
              "Thank You!"
            );
            this.submitted = true;
          },
          (error) => {
            this.submitted = false;
            this.isSubmitting = false;
            this.helpersService.showResponseErrorMessage(error);
          }
        );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
