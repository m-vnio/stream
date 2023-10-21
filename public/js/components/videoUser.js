import { dbFirebase } from "../firebase/data.js"

export default ()=>{

    const dbUser = new dbFirebase('user_data')
    const dbStreamUser = new dbFirebase('stream_user')
    const params = JSON.parse(sessionStorage.getItem('params'))

    const hostURL  = uri => 'https://apimanagestorage.000webhostapp.com' + uri

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2" style="padding:0">
            <div class="div_hS7SImh"></div>
            <div class="div_oy1VxlI">
                <div class="div_wcyPU0Y"></div>
            </div>
        </div>    
    `)

    const query = new findElement(ElementComponent)
    const elementList = query.get('.div_wcyPU0Y')

    query.get('.div_hS7SImh').addEventListener('click', () => ElementComponent.remove())

    const renderData =(Data)=>{
        elementList.innerHTML = ArrayToString(Data, (data, i) => { 

            return `
                ${ i == 0 ? '' : '<span class="span_line"></span>' }
                <div class="div_753wTS9">
                    <img src="${ hostURL(`/upload-files/storage/avatar/${ data.avatar }`) }">
                    <div class="div_tfe1dZh">
                        <h4>${ data.username }</h4>
                        <p>${ data.descripcion }</p>
                    </div>
                </div>
            `
        })

    }

    const loadData = async ()=>{
        const Data = []
        const DataUser = await dbUser.getAll()
        DataUser.forEach( doc => Data.push(doc.data()))

        const Data2 = []
        const DataStreamUser = await dbStreamUser.getAll({ where : [['id_stream', '==', params.id]]})
        DataStreamUser.forEach( doc => Data2.push(doc.data()))

        const Data3 = Data.filter(user => Data2.find(streamUser => streamUser.id_user == user.uid))
        renderData(Data3)
    }

    loadData()

    addEventListener('updateVideoHistory', renderData)
    addEventListener('hashchange', ()=> ElementComponent.remove())

    return ElementComponent
}
