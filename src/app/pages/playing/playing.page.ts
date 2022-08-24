import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.page.html',
  styleUrls: ['./playing.page.scss'],
})
export class PlayingPage implements OnInit {

  @ViewChild("range", { static: false }) range: IonRange;

  songs = [
    {
      title: "Abo Mvelo",
      subtitle: "Abo",
      img: "src/assets/images/dj-ktm-1/jpg",
      path: "https://musicaccountstorage.blob.core.windows.net/audiofiles/Daliwonga%20-%20Abo%20Mvelo%20%28Official%20Audio%29%20ft.%20Mellow%20%26%20Sleazy%2C%20MJ.mp4"
    },
    {
      title: "Mama",
      subtitle: "mamawee",
      img: "src/assets/images/makhadzi-1.jpg",
      path: "https://musicaccountstorage.blob.core.windows.net/audiofiles/Makhadzi%20-%20Mama%20%28Official%20Audio%20Visualizer%29.mp4"
    },
    {
      title: "mamam",
      subtitle: "rrrr",
      img: "src/assets/soa mattrix-1.jpg",
      path: "https://musicaccountstorage.blob.core.windows.net/audiofiles/Soa%20Mattrix%20x%20DJ%20Maphorisa%20-%20Dropline%20%28Official%20Audio%29.mp4"
    }
  ];

  // current song details
  currId;
  currDuration;
  currTitle;
  currSubtitle;
  currImage;

  // progress bar value
  progress = 0;

  // toggle for play/pause button
  isPlaying = false;

  // track of ion-range touch
  isTouched = false;

  // ion range texts
  currSecsText;
  durationText;

  // ion range value
  currRangeTime;
  maxRangeValue;

  // current song
  currSong: HTMLAudioElement;

  // upnext song details
  upNextImg;
  upNextTitle;
  upNextSubtitle;

  constructor() { }

  ngOnInit() {
  }

  // play song
  playSong(title, subtitle, img, song) {
    // if a song playes, stop that
    if (this.currSong != null) {
      this.currSong.pause();
    }

    // open full palyer view
    document.getElementById("fullPlayer").style.bottom = "0px";
    // set current song details
    this.currTitle = title;
    this.currSubtitle = subtitle;
    this.currImage = img;
    // Current song audio
    this.currSong = new Audio(song);

    this.currSong.play().then(() => {
      // total song duration
      this.durationText = this.sTotime(this.currSong.duration);
      // set max range value - import to show progress in ion-range
      this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));

      // set upnext song
      // get current song index
      var index = this.songs.findIndex(x => x.title === this.currTitle);
      // if current song is the last one then set first song info for the upnext song
      if ((index + 1) === this.songs.length) {
        this.upNextImg = this.songs[0].img;
        this.upNextImg = this.songs[0].title;
        this.upNextTitle = this.songs[0].subtitle;
      } else {
        // set the next song info for upnext songs
        this.upNextImg = this.songs[index + 1].img;
        this.upNextTitle = this.songs[index + 1].title;
        this.upNextTitle = this.songs[index + 1].subtitle;
      }
      this.isPlaying = true;
    });

    this.currSong.addEventListener("timeupdate", () => {
      // update some infos as song plays on

      // if ion-range not touched then do update
      if (!this.isTouched) {
        // update ion-range value
        this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
        // update current seconds text
        this.currSecsText = this.sTotime(this.currSong.currentTime);
        // update progree bar - in minimize vieew
        this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));

        // if song ends, play next song
        if (this.currSong.currentTime === this.currSong.duration) {
          this.playNext();
        }
      }
    });
  }

  // play next song
  playNext() {
    // get current song index
    var index = this.songs.findIndex(x => x.title === this.currTitle);
    // if current song is the last one then set first song info for the upnext song
    if ((index + 1) === this.songs.length) {
      this.playSong(this.songs[0].title, this.songs[0].subtitle, this.songs[0].img, this.songs[0].path);
    } else {
      // playe the next song
      var nextIndex = index + 1;
      this.playSong(this.songs[nextIndex].title, this.songs[nextIndex].subtitle, this.songs[nextIndex].img, this.songs[nextIndex].path);
    }
  }

  // play prev song
  playPrev() {
    // get current song index
    var index = this.songs.findIndex(x => x.title === this.currTitle);

    // if current song is the first one, then play last song
    if (index === 0) {
      var lastIndex = this.songs.length - 1;
      this.playSong(this.songs[lastIndex].title, this.songs[lastIndex].subtitle, this.songs[lastIndex].img, this.songs[lastIndex].path);
    } else {
      // playe the next song
      var prevIndex = index - 1;
      this.playSong(this.songs[prevIndex].title, this.songs[prevIndex].subtitle, this.songs[prevIndex].img, this.songs[prevIndex].path);
    }
  }

  // minimize full player view
  minimize() {
    document.getElementById("fullPlayer").style.bottom = "-10000px";
    document.getElementById("miniPlayer").style.bottom = "0px";
  }

  // maximize full player view
  maximize() {
    document.getElementById("fullPlayer").style.bottom = "0px";
    document.getElementById("miniPlayer").style.bottom = "-100px";
  }

  // pause current song
  pause() {
    this.currSong.pause();
    this.isPlaying = false;
  }

  // play currently pause song
  play() {
    this.currSong.play();
    this.isPlaying = true;
  }

  // cancel currenlty playing song and restart current song info
  cancel() {
    document.getElementById("miniPlayer").style.bottom = "-100px";
    this.currImage = "";
    this.currTitle = "";
    this.upNextSubtitle = "";
    this.progress = 0;
    this.currSong.pause();
    this.isPlaying = false;
  }

  // on touching ion-range
  touchStart() {
    this.isTouched = true;
    this.currRangeTime = Number(this.range.value);
  }

  // on moving ion-range
  // update current seconds text
  touchMove() {
    this.currSecsText = this.sTotime(this.range.value);
  }

  // on touch released/end
  touchEnd() {
    this.isTouched = false;
    this.currSong.currentTime = Number(this.range.value);
    this.currSecsText = this.sTotime(this.currSong.currentTime);
    this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
    if (this.isPlaying) {
      this.currSong.play();
    }
  }

  sTotime(t) {
    return this.padZero(parseInt(String((t / (60)) % 60))) + ":" + this.padZero(parseInt(String((t) % 60)));
  }

  padZero(v) {
    return (v < 10 ? "0" + v : v);
  }

}
