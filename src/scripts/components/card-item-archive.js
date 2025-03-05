import { BASE_URL } from '../main.js'
import Toastify from 'toastify-js'

class CardItemArchive extends HTMLElement {
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
          <div>

           <button id="action-unarchive">
            <img 
                src='unarchive.svg'
                alt='unarchive-icon'
            />
          </button>
          
          <button id="action-delete">
            <img 
                src='trash.svg'
                alt='trash-icon'
            />
          </button>

          </div>
        </div>
          `

    this.querySelector('#action-delete').addEventListener('click', async () => {
      try {
        const response = await fetch(`${BASE_URL}/notes/${this._blog.id}`, {
          method: 'DELETE',
        })
        const results = await response.json()

        Toastify({
          text: `${results?.message}`,
          duration: 3000,
        }).showToast()
      } catch (error) {
        console.log(error)
      } finally {
        window.location.reload()
      }
    })

    this.querySelector('#action-unarchive').addEventListener(
      'click',
      async () => {
        try {
          const response = await fetch(
            `${BASE_URL}/notes/${this._blog.id}/unarchive`,
            {
              method: 'POST',
            }
          )
          const results = await response.json()

          Toastify({
            text: `${results?.message}`,
            duration: 3000,
          }).showToast()
        } catch (error) {
          console.log(error)
        } finally {
          window.location.reload()
        }
      }
    )
  }
}

customElements.define('card-item-archive', CardItemArchive)
