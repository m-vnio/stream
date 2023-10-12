import { dbFirebase } from "../firebase/data.js"

import header from "../components/header.js"
import video from "../components/video.js"
import chat from "../components/chat.js"

export default (params)=>{

    const user  = json(localStorage.getItem('user'))

    const db_1 = new dbFirebase('stream')
    const db_2 = new dbFirebase('stream_user')

    const imgIcon = icon => `<img src="public/img/icons/svg/${ icon }.svg" alt="icon-svg">`

    const ElementComponent = createHTML(`
        <div class="div_08H2LYs">
            <div class="contenedor_loader"><span class="loader"></span></div>
            <div class="div_Z3l5me3"></div>
        </div>
    `)

    const query = new findElement(ElementComponent)

    const contenedorLoader = query.get('.contenedor_loader')
    const contenedorListItem = query.get('.div_Z3l5me3')

    const def_createHTML =(data)=>{
        const data_data = {
            datetime_update : data.datetime_update
        }

        return createHTML(`
            <a id="div-${ data.id }" href="#/stream/${ data.id }" class="a_eBF5R8K" data-data='${ JSON.stringify(data_data) }'>
                <span class="text-ellipsis">${ data.name }</span>
                ${ imgIcon('icon-arrow-small-right') }
            </a>
        `)
    }

    const renderHTML =(Data)=>{ 

        // const Data = []
        // onSnapshot.forEach(doc => Data.push({ id : doc.id, ...doc.data() }));

        Data = Data.stream_user.map((stream_user)=> Data.stream.find(stream => stream.id  == stream_user.id_stream))
 
        if(Data.length == 0) {
            ElementComponent.innerHTML = '<div class="div_Hu171ix"><h3>~ lista vacia ~</h3></div>'
            return 
        }
 
        if(contenedorListItem.children.length == 0) {
            const elementTemp = document.createDocumentFragment()
            Data.map(data => elementTemp.append(def_createHTML(data)))
            contenedorLoader.remove()
            contenedorListItem.append(elementTemp)
            ElementComponent.append(contenedorListItem)
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

    const loadData = async ()=>{
        const Data_1 = await db_1.getAll({ limit : 20 })
        const Data_2 = await db_2.getAll({ where  : [[ "id_user", "==", user.uid ]], limit : 20})

        const DataJSON = {
            stream      : [],
            stream_user : []
        }

        Data_1.forEach(doc => DataJSON.stream.push(doc.data()))
        Data_2.forEach(doc => DataJSON.stream_user.push(doc.data()))
        renderHTML(DataJSON)
    }

    contenedorListItem.remove()
    loadData()


    document.getElementById('main').append(ElementComponent)
}
 