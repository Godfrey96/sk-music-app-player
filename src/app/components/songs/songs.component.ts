import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { SwiperOptions, Autoplay, EffectCoverflow, Keyboard } from 'swiper';
SwiperCore.use([Keyboard]); // pass Autoplay here & above if in use

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
})
export class SongsComponent implements OnInit, AfterContentChecked {

  @Input() newSongs: any[];
  songConfig: SwiperOptions;

  constructor() { }

  ngOnInit() { }

  onSwiper([swiper]) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  ngAfterContentChecked() {
    this.songConfig = {
      slidesPerView: 3.2,
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: this.newSongs?.length > 1 ? 1 : 0,
      autoplay: {
        delay: 4000
      },
      pagination: { clickable: true },
      // effect: 'coverflow'
    };
  }

}
