class CardItem extends HTMLElement {
  constructor() {
    super()

    this._blog = {
      id: 0,
      title: 'Title',
      body: 'Content',
      createdAt: '2022-07-28T10:03:12.594Z',
    }

    this._style = document.createElement('style')
  }

  setBlog(value) {
    this._blog['id'] = value.id
    this._blog['title'] = value.title
    this._blog['body'] = value.body
    this._blog['createdAt'] = value.createdAt

    this.render()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.setAttribute('data-id', this._blog.id)

    this.innerHTML = `
       ${this._style.outerHTML}
         <div class="card_item">
          <div>
            <h3>${this._blog.title}</h3>
            <p>${this._blog.body}</p>
          </div>
          <p>${new Date(this._blog.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}</p>
        </div>
          `
  }
}

customElements.define('card-item', CardItem)
