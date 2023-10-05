import { streamRealtime } from "../firebase/data.js";

export default ()=>{

    const ElementComponent = createHTML(`
        <div class="div_ue0FY7z">
            <div class="contenedor_loader"><span class="loader"></span></div>
            <div class="div_kzd5iN4 scroll-y"><div class="div_h35b0gG"></div></div>
        </div>
    `)

    const contenedorLoader = ElementComponent.querySelector('.contenedor_loader')
    const contenedorListItem = ElementComponent.querySelector('.div_h35b0gG')

    const def_createHTML =(data)=>{
        const data_data = {
            datetime_update : data.datetime_update
        }

        return createHTML(`
            <a class="a_Fcy4PwW" id="div-${ data.id }" href="#/stream/${ data.id }" data-data='${ JSON.stringify(data_data) }'>
                <span class="text-ellipsis">${ data.name }</span>
                <i class="fa-solid fa-caret-right"></i>
            </a>
        `)
    }

    const renderHTML =(onSnapshot)=>{ 

        const Data = []
        onSnapshot.forEach(doc => Data.push({ id : doc.id, ...doc.data() }));

        if(Data.length == 0) {
            ElementComponent.innerHTML = '<div>lista vacia</div>'
            return 
        }
 
        if(contenedorListItem.children.length == 0) {
            const elementTemp = document.createDocumentFragment()
            Data.map(data => elementTemp.append(def_createHTML(data)))
            contenedorLoader.remove()
            contenedorListItem.append(elementTemp)
            ElementComponent.append(contenedorListItem.parentElement)
            return
        }

        Data.map(data => {
            const query     = `#div-${ data.id }`
            const element   = contenedorListItem.querySelector(query)

            if(element) {
                const data_data = JSON.parse(element.dataset.data)
                if(parseInt(data.datetime_update) > parseInt(data_data.datetime_update)){
                    element.replaceWith(def_createHTML(data));
                }
                return
            }

            contenedorListItem.append(def_createHTML(data))
        })

    }
    
    const unsubscribe = streamRealtime(renderHTML)
    addRemoveEventListener(window, 'hashchange', unsubscribe)
    
    contenedorListItem.parentElement.remove()
    document.getElementById('main').append(ElementComponent)
}