
function clickElement (element, callback){
    if(typeof callback == 'function') {
        element.addEventListener('click', e => e.target === e.currentTarget && callback(e))
    }
}

function clickElementclosest (element, queryElement, callback){
    if(typeof callback == 'function') {
        element.addEventListener('click', e => {
            const target = e.target.closest(queryElement)
            if(target) callback(target, e) 
        })
    }
}

function addRemoveEventListener (element, event, callback){
    const def_callback =()=>{
        if(typeof callback === 'function') callback()
        element.removeEventListener(event, def_callback)
    }

    element.addEventListener(event, def_callback)
}

function addRemoveEventListenerHashchange (element, type, callback){
    if(typeof callback === 'function') {
        element.addEventListener(type, callback)
        addRemoveEventListener(window, 'hashchange', ()=> element.removeEventListener(type, callback))
    }
}

function json(_var_, _json_ = true) {
    return _json_ ? JSON.parse(_var_) : JSON.stringify(_var_)
}
 
function trimString(text = '', symbol = '') {
    if(symbol != ''){
        text = text.startsWith(symbol) ? text.slice(1) : text
        text = text.endsWith(symbol) ? text.slice(0, -1) : text
    }
    return text
}

function rand(min, max = false){
    
    if(!max){
        max = min
        min = 0
    }

    return Math.floor(Math.random() * ((max + 1) - min) + min)

}

function ArrayToString (array, callback){
    if(Array.isArray(array)){
        return array.map((...data) => {
            if(typeof callback === 'function') {
                const out = callback(...data)
                return ['string', 'number'].includes(typeof out) ? out : ''
            }
            return ''
        }).join('')
    }
    return '' 
}

function genereteKey (include = {}){
    const permission = {
        upper   : include.upper ?? true,
        lower   : include.lower ?? true,
        number  : include.number ?? true,
        simbol  : include.simbol ?? false,
        length  : include.length ?? 10,
    }

    const contentKey = {}
    contentKey.upper    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    contentKey.lower    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLocaleLowerCase()
    contentKey.number   = '1234567890'
    contentKey.simbol   = '[{!¿$@#=~?¡}]'

    const contentUse = []
    if(permission.upper) contentUse.push(contentKey.upper)
    if(permission.lower) contentUse.push(contentKey.lower)
    if(permission.number) contentUse.push(contentKey.number)
    if(permission.simbol) contentUse.push(contentKey.simbol)

    return ArrayToString([...Array(permission.length)], key => {
        const firstOption   = contentUse[rand(contentUse.length - 1)]
        const secondOption  = firstOption[rand(firstOption.length - 1)]
        return secondOption
    })
}

function getElement(select, root = document) {
    return root.querySelector(select)
}

function getElementAll(select, root = document) {
    return root.querySelectorAll(select)
}

function appendElement(element, ...elements) {
    elements = elements.map(element => {
        if(typeof element == 'function') element = element()
        if (element instanceof Element) return element
        else return ''
    })

    element.append(...elements) 
}

function createHTML(html) {
    let elementHTML = document.createElement('div')
    elementHTML.innerHTML = html
    elementHTML = elementHTML.children[0]
    return elementHTML
}

class createCSS {
    constructor (id, root = document) {
        this._id        = id
        this._root      = root
        this._rootClass = ''
        this._rootClassAdd = true

        this._class = ''
        this._elements  = ''
        this._isStyle = false

        this._styleID       = `style-${ this._id }` 
        this._styleIsDOM    = document.getElementById(this._styleID)
        this._styleElement  = this._styleIsDOM ?? document.createElement('style')
        this._styleElement.innerHTML = ''

        // const styles = []
        // if(!sessionStorage.getItem('styles')){ 
        //     sessionStorage.setItem('styles', JSON.stringify(styles))
        // }

        if(!this._styleIsDOM){
            this._styleElement.setAttribute('id', this._styleID )
            document.head.append(this._styleElement)
        }

        if(root != document) {
            const id = genereteKey({ length : 18})
            this._rootClass = this._root.tagName + '-' + id
            this._root.classList.add(this._rootClass) 
        }
        
    }

    element(element){

        const code      =  genereteKey({ length : 15}) 
        const listClassName = []

        const dataCSS = element.split(',').map(element => {
            return `[data-css = ${ element }]`
        }).join(', ')

        this._elements  = getElementAll(dataCSS, this._root)

        this._elements.forEach(element => {
            const className = element.tagName + '-' + code
            element.setAttribute('data-css',className)
            element.classList.add(className)

            if(!this._isStyle){
                if(!listClassName.includes(className)) listClassName.push(className)
            }
        })

        // if(!this._isStyle) {
        //     styles.push({ id : code, name : element })
        //     sessionStorage.setItem('styles', JSON.stringify(styles))
        // }

        this._class = listClassName.map((className, index) => {
            return (index == 0 ? '' : '.') + className.trim()
        }).join(', ')

        this._rootClassAdd = false
        return this  
    }
 
    css(css){
        const one   = /&/g
        const two   = /\s+/g 
        const three = /[\;/\s]+?\;/g
        const four  = /[\;/\s]+?\}/g
        const five  = /\}/g
        const six   = /\)[/\s+]?\{/g

        css = css.replace(one   , '.' + (this._rootClassAdd ? this._rootClass : this._class))
        css = css.replace(two   , ' ') 
        css = css.replace(three , ';'); 
        css = css.replace(four  , ' }'); 
        css = css.replace(five  , '}\n')
        css = css.replace(six   , ') {\n');
        css = css.split('\n').map(css => css.trim()).join('\n')

        this._styleElement.innerHTML += css

        this._rootClassAdd = true
        const elements = [...this._elements].map(element => {

            const res = {
                element,
                className : element.dataset.css
            } 

            element.removeAttribute('data-css')

            return res

        })
        return elements.length == 1 ? elements[0] : elements
    }
}

class Hash {
    constructor(){
        this._params = []
        this._routes = []
        this._dispatch = true
    }

    param(route = '', callback = false){

        const dinamic = route.includes('/:')
        route = trimString(route, '/') 
        this._routes.push({route, callback, dinamic }) 

    }

    dispatch(callback){ 
        const change =()=>{
            if (typeof callback === 'function') callback()
            this.__change()
        }

        if(this._dispatch) {
            change()
            window.addEventListener('hashchange', change)
        } 

        this._dispatch = false
    }

    __change(){

        const params = {}
        this._params = trimString(location.hash.slice(1), '/')

        const findRoute = this._routes.find(route => {

            if(route.dinamic){

                const splitRoute = route.route.split('/')
                const splitParam = this._params.split('/')

                if(splitRoute.length == splitParam.length){
                    for (let i = 0; i < splitRoute.length; i++){
                        const textRoute = splitRoute[i].trim()
                        if(textRoute.startsWith(':')) params[ textRoute.slice(1) ] = splitParam[i]
                        else if(textRoute !== splitParam[i]) return false
                    }

                    return route
                }
 
            } else if(route.route == this._params) {
                return route
            }
            
            return false
        })

        if(findRoute){
            sessionStorage.setItem('params', JSON.stringify(params))
            if (typeof findRoute.callback === 'function') findRoute.callback(params)
        }

    }
}