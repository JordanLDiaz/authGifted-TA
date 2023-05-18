import { AppState } from "../AppState.js"

export class Gift {
  constructor(data) {
    this.id = data.id
    this.tag = data.tag
    this.url = data.url
    this.opened = data.opened
    this.creatorId = data.creatorId
  }

  get GiftTemplate() {
    return `
    <div class="col-12 col-md-4">
      <div class="card m-2">
        <img
          src="${this.url}"
          class="img-fluid" alt="gift image" />
          <div class="d-flex justify-content-between align-items-end">
            <h5>${this.tag}</h5>
            <span id="delete-button">${this.DeleteButton}</span>
          </div>
     
      </div>
    </div>
    `
  }

  get WrappedGift() {
    return `
    <div class="col-12 col-md-4">
    <div class="card m-2">
      <img onclick="app.GiftsController.openGift('${this.id}')"
        src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z2lmdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
        class="img-fluid" alt="gift image" />
      <h5>${this.tag}</h5>
    </div>
  </div>
    `
  }

  get DeleteButton() {
    if (this.creatorId != AppState.account?.id) {
      return ''
    }
    return `
    <button class="m-1 btn btn-danger" onclick="app.GiftsController.removeGift('${this.id}')"><span class="mdi mdi-delete-circle"></span></button>
    `
  }
}