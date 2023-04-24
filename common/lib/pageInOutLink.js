gsap.registerPlugin(ScrollToPlugin)
class SmoothScroll {
  constructor({ inPages, targetEl, headerLinks }) {
    inPages && (this.inPages = document.querySelectorAll(inPages))
    targetEl && (this.targetEl = document.querySelectorAll(targetEl))
    headerLinks && (this.headerLinks = document.querySelectorAll(headerLinks))
    this.urlHash = location.hash
    window.addEventListener('load', this.outPage.bind(this))
    if (this.inPages) {
      this.inPages.forEach((inPage, index) => {
        inPage.addEventListener('click', this.inPage.bind(this, index))
      })
    }
    if (this.headerLinks) {
      this.headerLinks.forEach((headerLink, index) => {
        headerLink.addEventListener('click', this.absInPage.bind(this, index))
      })
    }
  }
  absInPage(_, e) {
    if (this.targetEl) {
      e.preventDefault()
      const targetEl = e.target
      const attr = targetEl.getAttribute('href')
      const cut = attr.substr(attr.indexOf('#') + 1)
      const target = document.getElementById(cut)
      const rect = target.getBoundingClientRect().top
      const offset = window.pageYOffset
      const position = rect + offset
      gsap.to(window, { duration: 1, scrollTo: position, ease: 'power4.inOut' })
    }
  }
  outPage() {
    if (this.urlHash) {
      gsap.to(window, { duration: 0, scrollTo: 0 })
      setTimeout(() => {
        const target = document.getElementById(this.urlHash.replace('#', ''))
        const rect = target.getBoundingClientRect().top
        const offset = window.pageYOffset
        const position = rect + offset
        gsap.to(window, { duration: 1, scrollTo: position, ease: 'power4.inOut' })
      }, 0)
    }
  }
  inPage(index, e) {
    e.preventDefault()
    const attr = this.inPages[index].getAttribute('href')
    const target = document.getElementById(attr.replace('#', ''))
    const rect = target.getBoundingClientRect().top
    const offset = window.pageYOffset
    const position = rect + offset
    gsap.to(window, { duration: 1, scrollTo: position, ease: 'power4.inOut' })
  }
}

// inPages: string　//ページ内リンククリックする要素
// targetEl*: string　//リンク先の飛ばす所
// absLinks: string//絶対パスのページ内外リンク
new SmoothScroll({ inPages: '.inPage', targetEl: '.sec', headerLinks: '.headerLink' })
