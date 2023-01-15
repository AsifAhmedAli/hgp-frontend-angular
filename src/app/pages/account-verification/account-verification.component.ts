import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../shared/services/api.service';
import {HelpersService} from '../../shared/services/helpers.service';
import {ToastrService} from 'ngx-toastr';
import {Messages} from '../../shared/constants/constants';
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

  token: any;
  email: any;
  linkExpired = false;
  messages = Messages;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private helpersService: HelpersService,
    @Inject(PLATFORM_ID) private platformId
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.email && params.token) {
        this.token = params.token;
        this.email = params.email;
        if (isPlatformBrowser(this.platformId)) {
          this.verifyAccount();
        }
      } else {
        this.linkExpired = true;
      }
    });
  }

  verifyAccount(): void {
    this.apiService.accountVerify({email: this.email, token: this.token}).subscribe(
      response => {
        this.toastr.success(response.message);
        this.router.navigateByUrl('/login');
      }, error => {
        this.linkExpired = true;
      }
    );
  }

}
