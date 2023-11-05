import stikerOption from "../components/stikerOption.js"

export default ()=>{

    const Icon  = new iconSVG() 
    const auth      = ls('auth').data({}).push(true, true)

    const api = (uri = '') => ls('api').get() + uri
    
    let Stiker = []

    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/user">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>Stiker</h3>
                </div>
            </header>
            <div class="div_VV5Wk2L scroll-y">
                <div class="div_qG017oA">
                    <div class="div_M5Bblpr">
                        <div class="div_Rhx70NY">
                            <span class="focus" data-collection="favorite">favoritos</span>
                            <span data-collection="all">todos</span> 
                        </div>
                    </div> 
                    <div class="div_nob5pQr scroll-y">
                        <div class="contenedor_loader"><span class="loader"></span></div>
                        <div class="div_8dh8A1c"><h2>no hay stikers</h2></div>
                        <div class="div_jr45I15"></div>
                    </div>
                </div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const root = document.getElementById('root')

    const elementLoad = query.get('.contenedor_loader')
    const elementItem = query.get('.div_jr45I15')
    const elementEmpty= query.get('.div_8dh8A1c')
    const elementParent = query.get('.div_nob5pQr')

    const elementcollection = query.get('.div_Rhx70NY')

    elementcollection.addEventListener('click', e => {
        const span = e.target.closest('span')

        if(span){
            const spanFocus = elementcollection.querySelector('span.focus')
            if(span == spanFocus) return
            if(spanFocus) spanFocus.classList.remove('focus')
            span.classList.add('focus')

            const collection = span.dataset.collection
            dataLoad(collection)
        }
    })

    const handleIntersection =(entries, observer)=>{
        entries.forEach((entry) => {
            if (entry.isIntersecting) { 
              dataRender(Stiker, false)
              observer.unobserve(entry.target); 
            }
        });
    }

    const options = {
        root: null, 
        rootMargin: '0px', 
        threshold: 0.5, 
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const dataRender = (Data = [], first = true) =>{

        elementLoad.remove() 

        if(first) {
            if(!Data.length) {
                elementItem.remove() 
                elementParent.append(elementEmpty)
                return 
            }
        }

        const elementTemp = document.createDocumentFragment()
        
        Data.splice(0, 30).forEach(data => {

            const element = createHTML(`
                <div class="div_80VEr3d" data-data="${ data }">
                    <img src="${ api(`/stream/storage/stiker/${ data }`) }"> 
                </div>
            `)

            elementTemp.append(element)

        })
        
        elementEmpty.remove()
        elementItem.append(elementTemp)
        elementParent.append(elementItem)

        const element = elementItem.children[elementItem.children.length - 1]
        if(element) observer.observe(element)
    }

    const dataLoad = collection =>{
        elementItem.innerHTML = ''
        
        datapi.get(api(`/stream/api/stiker?collection=${ collection }&token=${ auth.token }`))
                .then(data => {
                    Stiker = data.stiker
                    
                    if(collection == 'favorite') {
                        ls('stiker-favorite').data(data).put(true)
                    } 

                    dataRender(Stiker, true)
                })
        
    }

    dataLoad('favorite')

    elementItem.addEventListener('click', e => {
        const item = e.target.closest('.div_80VEr3d')

        if(item) {
            const data = item.dataset.data
            root.append(stikerOption(data))
        }
    })

    elementItem.remove() 
    elementEmpty.remove() 
    document.getElementById('main').append(ElementComponent)
}
