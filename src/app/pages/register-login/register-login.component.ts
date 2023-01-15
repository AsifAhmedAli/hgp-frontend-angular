import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  title: string;
  fragment: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService
  ) { }

  ngOnInit(): void {
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.activatedRoute.fragment.subscribe(
      fragment => {
        if (fragment) {
          this.fragment = fragment;
        } else {
          this.fragment = 'tab-1';
        }
      }
    );
  }
}
