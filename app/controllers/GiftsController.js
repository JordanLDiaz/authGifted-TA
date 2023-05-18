import { AppState } from "../AppState.js";
// import { Gift } from "../models/Gift.js";
import { giftsService } from "../services/GiftsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawGift() {
  let gifts = AppState.gifts
  let template = ''
  gifts.forEach(g => {
    if (g.opened == false) {
      template += g.WrappedGift
    } else {
      template += g.GiftTemplate
    }
  })
  setHTML('gifts', template)
}

function _drawGiphys() {
  let template = ''
  AppState.giphyGifs.forEach(g => {
    template += g.GiphyTemplate
  })
  setHTML('giphy-img-spot', template)
}


export class GiftsController {
  constructor() {
    console.log('Hello from the gifts controller!');
    this.getGifts()
    _drawGift()
    AppState.on('gifts', _drawGift)
    AppState.on('account', _drawGift)
    AppState.on('giphyGifs', _drawGiphys)
  }

  async getGifts() {
    try {
      await giftsService.getGifts()
    } catch (error) {
      Pop.error(error)
    }
  }

  async giveGift(event) {
    try {
      event.preventDefault()
      const form = event.target
      const formData = getFormData(form)
      console.log('[HERE IS THE FORMDATA]', formData);
      await giftsService.giveGift(formData)
      Pop.toast('Gift given!', 'success')
      form.reset()
      // @ts-ignore
      bootstrap.Offcanvas.getOrCreateInstance('#giftFormOffcanvas').hide()
    } catch (error) {
      Pop.error(error)
    }
  }

  async openGift(giftId) {
    try {
      await giftsService.openGift(giftId)
    } catch (error) {
      Pop.error(error)
    }
  }

  async removeGift(giftId) {
    try {
      const yes = await Pop.confirm('Are you sure you want to delete this gift?')
      if (!yes) {
        return
      }
      await giftsService.removeGift(giftId)
    } catch (error) {
      Pop.error(error)
    }
  }

  async searchGiphy(event) {
    try {
      event.preventDefault()
      // console.log(event.target);
      let form = event.target;
      // console.log(new FormData(form));
      let formData = getFormData(form);
      // console.log(formData);
      await giftsService.searchGiphy(formData.query)
      form.reset()
    } catch (error) {
      Pop.error(error)
    }
  }

  setImgUrl(url) {
    let inputElm = document.getElementById('imgUrl');
    inputElm.value = url;
  }
}
