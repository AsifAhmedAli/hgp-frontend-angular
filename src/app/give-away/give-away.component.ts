import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Constants, ValidationMessages } from "../shared/constants/constants";
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
  showTermsCondition: boolean;

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
      number: ["", [Validators.required]],
      state: ["", [Validators.required]],
      age: ["", [Validators.required, Validators.min(21)]],
      interest: ["", [Validators.required]],
      describe: ["", [Validators.required]],
      hear: ["", [Validators.required]],
      follow: ["", [Validators.required, Validators.requiredTrue]],
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
            setTimeout(() => {
              window.location.href =
                "https://www.instagram.com/homegrownpros.io/";
            }, 4000);
            this.helpersService.success(
              "Redirecting to instagram, please follow and share giveaway post to complete registration."
            );
          },
          (error) => {
            this.submitted = false;
            this.isSubmitting = false;
            error.error.message = "Duplicate Email Address";
            this.helpersService.showResponseErrorMessage(error);
          }
        );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
