import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpersService } from '../../shared/services/helpers.service';
import { KitCompare } from '../../shared/interfaces/kits.interface';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent implements OnInit {
  constructor(
    private helpersService: HelpersService,
    private activatedRoute: ActivatedRoute
  ) {}
  title: string;
  kitCompare: KitCompare;

  ngOnInit(): void {
    this.helpersService.dataService.setShowFooter(false);
    this.title = this.helpersService.resolveTitle(this.activatedRoute);
    this.resolvePage();
  }
  resolvePage(): void {
    this.helpersService.scrollToTop();
    this.helpersService.apiService.kitCompare().subscribe(
      (response) => {
        this.kitCompare = response.compare;
        console.log(this.kitCompare);
        this.helpersService.dataService.setShowFooter(true);
      },
      (error) => {
        this.helpersService.showResponseErrorMessage(error);
        this.helpersService.dataService.setShowFooter(true);
      }
    );
  }
}
