export class GiphyGif {
    constructor(data) {
        this.id = data.id
        this.images = data.images
        this.title = data.title

    }

    get GiphyTemplate() {
        return `
        <div class="col-2">
              <img class="img-fluid" onclick="app.GiftsController.setImgUrl('${this.images.downsized.url}')"
                src="${this.images.downsized.url}"
                alt="${this.title}" />

            </div>
        `
    }
}