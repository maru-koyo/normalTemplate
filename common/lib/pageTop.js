gsap.registerPlugin(ScrollToPlugin)
export default class PageTop {
  constructor({ pageTopEl, appear, footer }) {
    this.pageTopEl = document.getElementById(pageTopEl)
    appear && ((this.appClass = appear.class), (this.appearPos = document.querySelector(appear.pos)))
    footer && (this.footer = footer)
    this.footer = footer
    window.addEventListener('load', this.init())
  }
  init() {
    if (this.footer) {
      this.bodyHeight = document.body.offsetHeight
      this.windowHeight = window.innerHeight
      this.footerHeight = document.querySelector(this.footer.footerEl).offsetHeight
    }
    window.addEventListener('scroll', this.scrollApp.bind(this))
    window.addEventListener('resize', this.resize.bind(this))
    this.pageTopEl.addEventListener('click', this.smoothTop.bind(this))
  }
  resize() {
    if (this.footer) {
      this.bodyHeight = document.body.offsetHeight
      this.windowHeight = window.innerHeight
      this.footerHeight = document.querySelector(this.footer.footerEl).offsetHeight
    }
  }
  scrollApp() {
    const scrollAmount = window.pageYOffset
    if (this.footer) {
      if (scrollAmount + this.windowHeight >= this.bodyHeight - this.footerHeight) {
        this.pageTopEl.classList.add(this.footer.abs)
        document.body.style.setProperty(this.footer.varName, this.footerHeight + this.footer.bottomSpace + 'px')
      } else {
        this.pageTopEl.classList.remove(this.footer.abs)
      }
    }
    if (this.appClass) {
      const appElHeight = this.appearPos.offsetHeight
      if (scrollAmount >= appElHeight) {
        this.pageTopEl.classList.add(this.appClass)
      } else {
        this.pageTopEl.classList.remove(this.appClass)
      }
    }
  }
  smoothTop(e) {
    e.preventDefault()
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power4.inOut' })
  }
}

// pageTopEl*: string//トップボタン
// appear: { pos:string//表示する位置のクラス名 , class:string//追加クラス名}
// footer:{ abs:string//absに変えるクラス名 , varName:string//変数名(自由) , footerEl:string//フッターエレメント , bottomSpace:number//フッター手前何pxで止めるか }
