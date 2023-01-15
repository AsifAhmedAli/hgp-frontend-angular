import { Component, Input, OnInit } from '@angular/core';

import { Testimonial } from '../../constants/config.constants';
import { Slick } from '../../constants/Slick.config';
import { Videos } from '../../interfaces/videos.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit {
  @Input() videos: Videos[];
  @Input() title = 'Video';
  activeIndex = 0;
  videoIframe: '';
  communitySlider = Slick.homeTestimonials;
  readonly slickSlider = Testimonial;
  constructor() {}

  ngOnInit(): void {}

  redirectTo(url: any): void {
    if (url) {
      window.location.href = url;
    }
  }
  openModal(link): void {
    this.videoIframe = link;
    document.getElementById('video_iframe').click();
  }
}
