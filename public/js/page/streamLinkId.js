export default (params)=>{

    const auth = ls('auth').data({}).push(true, true) 
    const api = (uri = '') => ls('api').get() + uri

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2">
            <div class="contenedor_loader">
                <span class="loader"></span>
            </div>
        </div>
    `)

    datapi.get(api(`/stream/api/stream_link?id=${ params.id }&token=${ auth.token }`))
        .then(status => {
            location.hash = status ? '#/stream' : '#/stream/link'
        })
 
    document.getElementById('main').append(ElementComponent)
}