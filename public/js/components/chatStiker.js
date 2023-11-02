export default (DataModule = {})=>{
 
    const auth      = ls('auth').data({}).push(true, true)
    const api = (uri = '') => ls('api').get() + uri

    let Stiker    = []

    const ElementComponent = createHTML(`
        <div class="div_H8m7YkD">
            <div class="div_9w65NCd scroll-x">
                <div class="div_G533kHG">
                    <span class="focus" data-collection="favorite">favoritos</span>
                    <span data-collection="all">todos</span>
                </div>
            </div>
            <div class="div_JnZWjLM scroll-y">
                <div class="contenedor_loader"><span class="loader"></span></div>
                <div class="div_8dh8A1c"><h2>no hay stikers</h2></div>
                <div class="div_K23c15w"></div>
            </div>
        </div>
    `)
    
    const query = new findElement(ElementComponent)

    const elementItem       = query.get('.div_JnZWjLM')
    const elementItemLoad   = query.get('.contenedor_loader')
    const elementItemEmpty  = query.get('.div_8dh8A1c')
    const elementItemData   = query.get('.div_K23c15w')

    const elementcollection = query.get('.div_G533kHG')

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

    elementItemData.addEventListener('click', e => {
        const item = e.target.closest('.div_6dnYWBn')
        if(item) {

            dispatchEvent(new CustomEvent(DataModule.dispatch, { detail : {
                message : {
                        message : item.dataset.data,
                        type    : 'stiker'
                    }
            }}))
            
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

        elementItemLoad.remove() 

        if(first) {
            if(!Data.length) {
                elementItemData.remove() 
                elementItem.append(elementItemEmpty)
                return 
            }
        }

        const elementTemp = document.createDocumentFragment()
        
        Data.splice(0, 30).forEach(data => {

            const element = createHTML(`
                <div class="div_6dnYWBn" data-data="${ data }">
                    <img src="${ api(`/stream/storage/stiker/${ data }`) }"> 
                </div>
            `)

            elementTemp.append(element)

        })
        
        elementItemEmpty.remove()
        elementItemData.append(elementTemp)
        elementItem.append(elementItemData)
        const element = elementItemData.children[elementItemData.children.length - 1]
        if(element) observer.observe(element)
    }

    const dataLoad = collection =>{
        elementItemData.innerHTML = ''
        elementItemEmpty.remove()
        elementItemData.remove()
        elementItem.append(elementItemLoad)

        datapi.get(api(`/stream/app/trigger/stiker.php?collection=${ collection }&token=${ auth.token }`))
                .then(data => {
                    Stiker = data.stiker
                    
                    if(collection == 'favorite') {
                        ls('stiker-favorite').data(data).put(true)
                    } 

                    dataRender(Stiker, true)
                })
    }

    
    dataLoad('favorite')

    return ElementComponent
}
