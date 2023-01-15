import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../models/Homepage.model';

import {Slick} from '../../constants/Slick.config';
import {Testimonial} from '../../constants/config.constants';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  @Input() teams: Team[];
  @Input() title = 'Team';
  @Input() ctaText: string;
  @Input() ctaUrl: string;
  activeIndex = 0;
  communitySlider = Slick.homeTestimonials;
  readonly slickSlider = Testimonial;
  constructor() { }

  ngOnInit(): void {
  }

  redirectTo(url: any): void {
    if (url) {
      window.location.href = url;
    }
  }

}
