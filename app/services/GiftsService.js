import { AppState } from "../AppState.js";
import { Gift } from "../models/Gift.js";
import { GiphyGif } from "../models/GiphyGif.js";
import { api, giphyApi } from "./AxiosService.js";

class GiftsService {

  async getGifts() {
    const res = await api.get('/api/gifts')
    console.log('[GETTING GIFTS]', res.data);
    AppState.gifts = res.data.map(g => new Gift(g))
    console.log('[GIFTS IN APPSTATE]', AppState.gifts);
  }

  async giveGift(formData) {
    console.log('HERE IS THE FORMDATA', formData);
    const res = await api.post('api/gifts', formData)
    console.log('[HERE IS THE RES DATA]', res.data);
    AppState.gifts.unshift(new Gift(res.data))
    AppState.emit('gifts')
  }

  async openGift(giftId) {
    let foundGift = AppState.gifts.find(g => g.id == giftId)
    console.log('[FOUND GIFT]', foundGift);
    // @ts-ignore
    foundGift.opened = true
    const res = await api.put('api/gifts/' + giftId, foundGift)
    console.log('[HERE IS THE RES]', res.data);
    let index = AppState.gifts.findIndex(g => g.id == giftId)
    console.log('[HERE IS THE INDEX]', index);
    if (index >= 0) {
      AppState.gifts.splice(index, 1, new Gift(res.data))
    }
    AppState.emit('gifts')
  }

  async removeGift(giftId) {
    console.log('[REMOVING GIFT]', giftId);
    const res = await api.delete('api/gifts/' + giftId)
    console.log('[HERE IS THE RES]', res.data);
    AppState.gifts = AppState.gifts.filter(g => g.id != giftId)
  }

  async searchGiphy(query) {
    const res = await giphyApi.get('', { params: { q: query, limit: 10 } })
    // console.log(res.data);
    AppState.giphyGifs = res.data.data.map(g => new GiphyGif(g))
    console.log(AppState.giphyGifs);
  }
}

export const giftsService = new GiftsService();