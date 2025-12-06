import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      plyr: (el:any, options = {}) => new Plyr(el, options)
    }
  }
})
