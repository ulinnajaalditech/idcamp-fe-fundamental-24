import './components/index.js'
import Toastify from 'toastify-js'

export const BASE_URL = 'https://notes-api.dicoding.dev/v2'

const main = () => {
  const cardListElement = document.querySelector('card-list')
  const cardListArchiveElement = document.querySelector('card-list-archive')
  const formElement = document.querySelector('#form_add')
  const judulElement = document.querySelector('#judul')
  const bodyElement = document.querySelector('#body')
  const formLoader = document.querySelector('#loader-submit')
  const listLoader = document.querySelector('#loader-get')
  const listContent = document.querySelector('#list-note')

  const fetchNotes = async () => {
    try {
      listContent.classList.add('hidden')
      listLoader.classList.remove('hidden')
      // BISA PAKE PROMISE ALL
      const response = await fetch(`${BASE_URL}/notes`)
      const responseArchive = await fetch(`${BASE_URL}/notes/archived`)
      const results = await response.json()
      const resultsArchive = await responseArchive.json()

      cardListElement.setBlogList(results?.data)
      cardListArchiveElement.setBlogList(resultsArchive?.data)
    } catch (error) {
      console.log(error)
    } finally {
      listContent.classList.remove('hidden')
      listLoader.classList.add('hidden')
    }
  }

  fetchNotes()

  formElement.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
      formLoader.classList.remove('hidden')

      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: judulElement.value,
          body: bodyElement.value,
        }),
      })

      const results = await response.json()

      Toastify({
        text: `${results?.message}`,
        duration: 3000,
      }).showToast()

      if (results.status === 'success') {
        judulElement.value = ''
        bodyElement.value = ''

        window.location.reload()
      }
    } catch (error) {
      Toastify({
        text: `${results?.message}`,
        duration: 3000,
      }).showToast()
    } finally {
      formLoader.classList.add('hidden')
    }
  })

  const customValidationTitleHandler = (e) => {
    e.target.setCustomValidity('')
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Judul wajib diisi')
      judulElement.classList.add('border-red')
      return
    }
    if (e.target.validity.tooShort) {
      e.target.setCustomValidity('Judul harus lebih dari 3 kalimat')
      judulElement.classList.add('border-red')
      return
    }
    if (e.target.validity.valid) {
      judulElement.classList.remove('border-red')
      return
    }
  }

  const customValidationBodyHandler = (e) => {
    e.target.setCustomValidity('')
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Body wajib diisi')
      bodyElement.classList.add('border-red')
      return
    }
    if (e.target.validity.tooShort) {
      e.target.setCustomValidity('Body harus lebih dari 3 kalimat')
      bodyElement.classList.add('border-red')
      return
    }
    if (e.target.validity.valid) {
      bodyElement.classList.remove('border-red')
      return
    }
  }

  const errorMessageRender = (e) => {
    const isValid = e.target.validity.valid
    const errorMessage = e.target.validationMessage

    const connectedErrorElement = e.target.getAttribute('aria-describedby')

    const connectedErrorElementValue = connectedErrorElement
      ? document.getElementById(connectedErrorElement)
      : null

    if (connectedErrorElementValue && errorMessage && !isValid) {
      connectedErrorElementValue.innerText = errorMessage
    } else {
      connectedErrorElementValue.innerText = ''
    }
  }

  judulElement.addEventListener('change', customValidationTitleHandler)
  judulElement.addEventListener('invalid', customValidationTitleHandler)
  judulElement.addEventListener('blur', errorMessageRender)

  bodyElement.addEventListener('change', customValidationBodyHandler)
  bodyElement.addEventListener('invalid', customValidationBodyHandler)
  bodyElement.addEventListener('blur', errorMessageRender)
}

export default main
