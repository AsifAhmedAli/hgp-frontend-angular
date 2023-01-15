import {OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HelpersService} from '../../shared/services/helpers.service';
import {Select2Model} from '../../shared/models/select2.model';

export class TemplateCompComponent implements OnInit {

  title: string;
  sample = [
    new Select2Model('1', 'Sample 1'),
    new Select2Model('2', 'Sample 2'),
    new Select2Model('3', 'Sample 3'),
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private helpersService: HelpersService
  ) { }

  ngOnInit(): void {
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
  }
}
