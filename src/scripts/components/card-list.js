class CardList extends HTMLElement {
  constructor() {
    super()

    this._blogList = []

    this._style = document.createElement('style')
  }

  setBlogList(value) {
    this._blogList = value

    this.render()
  }

  connectedCallback() {
    this.render()
  }

  updateStyle() {
    this._style.textContent = `
      card-list {
          display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        }
          `
  }
  render() {
    this.updateStyle()

    const blogItemElement = this._blogList.map((item) => {
      const blog = document.createElement('card-item')
      blog.setBlog(item)

      return blog
    })

    this.innerHTML = ''
    this.append(this._style, ...blogItemElement)
  }
}

customElements.define('card-list', CardList)
