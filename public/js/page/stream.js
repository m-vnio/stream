import streamForm from "../components/streamForm.js"
import streamOption from "../components/streamOption.js"

export default ()=>{
    const api = (uri = '') => ls('api').get() + uri

    const Icon  = new iconSVG()
    const auth  = ls('auth').data({}).push(true, true) 
     
    const ElementComponent = createHTML(`
        <div class="div_L5jgPxN">
            <header class="header_225VF53">
                <div class="div_lD7mjkb">
                    <a href="#/">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3>video</h3>
                </div>
                <div class="div_lD7mjkb">
                    <a href="#/stream/link">${ Icon.get('fi fi-rr-portal-enter') }</a>
                </div>
            </header>
            <div class="div_VV5Wk2L scroll-y">
                <div class="contenedor_loader"><span class="loader"></span></div>
                <div class="div_Hu171ix"><h3>~ lista vacia ~</h3></div>
                <div class="div_Z3l5me3"></div>
                <div class="div_ckiK8W2"><button class="pointer">${ Icon.get('fi fi-rr-plus') }</button></div>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const root = document.getElementById('root')
    const elementstreamForm = streamForm('add', {})

    const contenedorItem = query.get('.div_VV5Wk2L')
    const contenedorLoader = query.get('.contenedor_loader')
    const contenedorListEmpty = query.get('.div_Hu171ix')
    const contenedorListItem = query.get('.div_Z3l5me3')
    const btnstreamForm = query.get('.div_ckiK8W2 button')

    btnstreamForm.addEventListener('click', e => {
        root.append(elementstreamForm)
    })

    contenedorListItem.addEventListener('contextmenu', e => {
        const a = e.target.closest('a')
        if(a) {
            const data = JSON.parse(a.dataset.data)
            root.append(streamOption(data))
        }
    })

    const defElementHTML =(data)=>{
        const data_data = {
            datetime_update : data.datetime_update
        }

        return createHTML(`
            <a id="div-${ data.id }" data-data='${ JSON.stringify(data) }' href="#/stream/${ data.id }" class="a_eBF5R8K" data-data='${ JSON.stringify(data_data) }'>
                <span class="text-ellipsis">${ data.name }</span>
                ${ Icon.get('fi fi-rr-arrow-small-right') }
            </a>
        `)
    }

    const dataRender =(Data)=>{ 
        contenedorLoader.remove()

        if(Data.length == 0) {
            contenedorListItem.remove()
            return contenedorItem.append(contenedorListEmpty)
        }

        if(contenedorListItem.children.length){
            Data.map(data => {
                const query     = `#div-${ data.id }`
                const element   = contenedorListItem.querySelector(query)
                const elementCurrent = defElementHTML(data)

                if(element) {
                    if(elementCurrent.outerHTML != element.outerHTML) element.replaceWith(defElementHTML(data));
                } else contenedorListItem.append(elementCurrent) 
                
            })
        } else {
            const elementTemp = document.createDocumentFragment()
            Data.map(data => elementTemp.append(defElementHTML(data)))
            contenedorListEmpty.remove()
            contenedorListItem.append(elementTemp)
            contenedorItem.append(contenedorListItem)
        }
        
    }

    const dataLoad = ()=>{  
        datapi.get(api(`/stream/api/stream_user?token=${ auth.token }&type=stream`)).then(dataRender)
    }

    contenedorListEmpty.remove()
    contenedorListItem.remove()
    dataLoad()
    addEventListener('dispatchEventLoadStream', dataLoad)

    //document.getElementById('root').append(streamOption())
    document.getElementById('main').append(ElementComponent)
}
 