import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonRange, NavController } from '@ionic/angular';
import { Artist } from 'src/app/models/artist.model';
import { Song } from 'src/app/models/song.model';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { SongService } from 'src/app/services/song/song.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.page.html',
  styleUrls: ['./artist-details.page.scss'],
})
export class ArtistDetailsPage implements OnInit {

  @ViewChild("range", { static: false }) range: IonRange;

  id: any;
  artist = {} as Artist;
  songs: Song[] = [];
  searchCategory!: any;
  // songs: Song[] = [];

  // current song details
  currId;
  currDuration;
  currTitle;
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

  constructor(
    private activateRoute: ActivatedRoute,
    private navCtrl: NavController,
    private artistService: ArtistService,
    private songService: SongService,
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    console.log('checking0id: ', id);
    if (!id) {
      this.navCtrl.back();
      return;
    } else {
      this.searchCategory = id;
    }
    this.id = id;
    console.log('id: ', this.id);
    this._getSongByArtist();
    this.getMusicDetails();
  }

  private _getSongByArtist() {
    this.songService.getSongByArtist(this.searchCategory).subscribe({
      next: (songData: any) => {
        this.songs = songData;
        console.log('songs: ', songData);
      },
      error: (err: any) => {
        console.log('Failed');
      }
    });
  }

  getMusicDetails() {
    this.artistService.getSingleArtist(this.id).subscribe((artist = {} as Artist) => {
      this.globalService.showLoader();
      this.artist = artist;
      console.log('single-artist: ', artist);
      // console.log('single-song: ', artist[0].songs);
      this.globalService.hideLoader();
    });
  }

  // play song
  playSong(title, img, song) {
    // if a song playes, stop that
    if (this.currSong != null) {
      this.currSong.pause();
    }

    // open full palyer view
    document.getElementById("fullPlayer").style.bottom = "0px";
    // set current song details
    this.currTitle = title;
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
        this.upNextImg = this.songs[0].image;
        this.upNextTitle = this.songs[0].title;
      } else {
        // set the next song info for upnext songs
        this.upNextImg = this.songs[index + 1].image;
        this.upNextTitle = this.songs[index + 1].title;
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
      this.playSong(this.songs[0].title, this.songs[0].image, this.songs[0].audio);
    } else {
      // playe the next song
      var nextIndex = index + 1;
      this.playSong(this.songs[nextIndex].title, this.songs[nextIndex].image, this.songs[nextIndex].audio);
    }
  }

  // play prev song
  playPrev() {
    // get current song index
    var index = this.songs.findIndex(x => x.title === this.currTitle);
    // if current song is the first one, then play last song
    if (index === 0) {
      var lastIndex = this.songs.length - 1;
      this.playSong(this.songs[lastIndex].title, this.songs[lastIndex].image, this.songs[lastIndex].audio);
    } else {
      // playe the next song
      var prevIndex = index - 1;
      this.playSong(this.songs[prevIndex].title, this.songs[prevIndex].image, this.songs[prevIndex].audio);
    }
  }

  // minimize full player view
  minimize() {
    document.getElementById("fullPlayer").style.bottom = "-1000px";
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
    this.songs = null;
    this.progress = 0;
    this.currSong.pause();
    this.isPlaying = false;
  }

  cancelSong() {
    document.getElementById("miniPlayer").style.bottom = "-100px";
    this.currImage = "";
    this.currTitle = "";
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
