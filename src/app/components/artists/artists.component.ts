import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';
// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Pagination, Autoplay, EffectCoverflow, Keyboard } from 'swiper';
SwiperCore.use([Pagination, Keyboard]); // pass Autoplay here & above if in use

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit, AfterContentChecked {

  @Input() artists: Artist[];
  artistConfig: SwiperOptions;

  constructor() { }

  ngOnInit() { }

  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ngAfterContentChecked() {
    this.artistConfig = {
      slidesPerView: 3.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.artists?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 4000
      },
      pagination: { clickable: true },
      // effect: 'coverflow'
    };
  }

}
