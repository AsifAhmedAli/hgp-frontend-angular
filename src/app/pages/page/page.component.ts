import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {optional, optionalString} from '../../shared/types/types';

export class PageComponent implements OnInit {
  slug: string;
  title: optionalString;
  content: optional;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.slug = params.slug;
        this.resolvePage();
      }
    );
  }

  resolvePage(): void {
    if (this.slug) {
      this.helpersService.scrollToTop();
      this.helpersService.resolvePage(this.slug, (title: optionalString, content: optional, errorMessage: optionalString) => {
        if (!errorMessage) {
          this.title = title;
          this.helpersService.setTitle(this.title);
          this.content = content;
        } else {
          this.helpersService.error(errorMessage);
          this.helpersService.redirectTo404();
        }
      });
    }
  }

}
