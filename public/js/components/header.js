import videoUser from "./videoUser.js"

export default ()=>{

    const Icon  = new iconSVG()
    const stream = ls('stream').data({}).push(true, true) 

    const ElementComponent = createHTML(`
        <header class="header_M6Brg5j">
            <div class="div_x36B32A">
                <div class="div_7Q6poiU">
                    <a href="#/stream" class="a_8ka039d">${ Icon.get('fi fi-rr-arrow-small-left') }</a>
                    <h3 class="h3_X0B6J text-ellipsis">${ stream.name ?? 'hola' }</h3>
                </div>
                <div class="div_7Q6poiU">
                    <button href="#/" class="button_8ka039d">${ Icon.get('fi fi-rr-users') }</button>
                </div>
            </div>
        </header>
    `)

    const query = new findElement(ElementComponent)
    const root = document.getElementById('root')
    const elementVideoUser = videoUser()

    query.get('.button_8ka039d').addEventListener('click', ()=> {
        root.append(elementVideoUser)
    })

    return ElementComponent
}

 