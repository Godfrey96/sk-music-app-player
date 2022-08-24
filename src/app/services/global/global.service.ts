import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLoading: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  setLoader() {
    this.isLoading = !this.isLoading;
  }

  async showToast(msg, color, position, duration = 3000) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      color: color,
      position: position
    });
    toast.present();
  }

  errorToast(msg?, duration = 4000) {
    this.showToast(msg ? msg : 'No Internet Connection', 'danger', 'bottom', duration);
  }

  successToast(msg) {
    this.showToast(msg, 'success', 'bottom');
  }

  showLoader(msg?, spinner?) {
    if (!this.isLoading) this.setLoader();
    return this.loadingCtrl.create({
      message: msg ? msg : '',
      spinner: spinner ? spinner : 'bubbles',
    }).then(res => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      });
    });
  }

  hideLoader() {
    if (this.isLoading) this.setLoader();
    return this.loadingCtrl.dismiss()
      .then(() => console.log('dismissed'))
      .catch(e => console.log('error hide loader: ', e));
  }

  // async customStatusbar(primaryColor?: boolean) {
  //   await StatusBar.setStyle({ style: primaryColor ? Style.Light : Style.Light });
  //   if (isPlatform('android')) StatusBar.setBackgroundColor({ color: primaryColor ? '#de0f17' : '#ffffff' });
  // }

}
