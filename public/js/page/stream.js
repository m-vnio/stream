import formStream from "../components/formStream.js"

export default (params)=>{
    const api = (uri = '') => ls('api').get() + '/stream/app/trigger/stream_user.php' + uri

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
    const elementformStream = formStream()

    const contenedorItem = query.get('.div_VV5Wk2L')
    const contenedorLoader = query.get('.contenedor_loader')
    const contenedorListEmpty = query.get('.div_Hu171ix')
    const contenedorListItem = query.get('.div_Z3l5me3')
    const btnFormStream = query.get('.div_ckiK8W2 button')

    btnFormStream.addEventListener('click', e => {
        root.append(elementformStream)
    })

    const defElementHTML =(data)=>{
        const data_data = {
            datetime_update : data.datetime_update
        }

        return createHTML(`
            <a id="div-${ data.id }" href="#/stream/${ data.id }" class="a_eBF5R8K" data-data='${ JSON.stringify(data_data) }'>
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
        datapi.get(api(`?uid=${ auth.uid }`)).then(dataRender)
    }

    contenedorListEmpty.remove()
    contenedorListItem.remove()
    dataLoad()
    addEventListener('dispatchEventLoadStrem', dataLoad)

    
    document.getElementById('main').append(ElementComponent)
}
 

/*

<div class="div_L5jgPxN">
    <header class="header_225VF53">
        <div class="div_lD7mjkb">
            <a href="#/user"><i class="fi fi-rr-arrow-small-left"></i></a>
            <h3>Apariencia</h3>
        </div>
        <div class="div_Xs7U5Y6">
            <label class="label_5kB8k1C">
                <input data-type="apariencia" type="checkbox" ${ theme == 'dark' ? 'checked' : '' }>
                <span></span>
            </label>
        </div>
    </header>
    <div class="div_VV5Wk2L scroll-y">
            <div class="contenedor_loader"><span class="loader"></span></div>
        <div class="div_Hu171ix"><h3>~ lista vacia ~</h3></div>
        <div class="div_Z3l5me3"></div>
        <div class="div_ckiK8W2"><button class="pointer">${ Icon.get('fi fi-rr-plus') }</button></div>
    </div>
</div>

*/