import videoUser from "./videoUser.js"

export default ()=>{

    const Icon  = new iconSVG()

    const stream = {
        id : '1',
        id_user : '1695101156748',
        name : 'NIVI ~ V♥N'
    }

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

/*
    <div class="div_9vVlk">
                <div class="div_6y9bH">
                    <a href="#/" class="a_Ma0S6"><i class="fa-solid fa-caret-left"></i></a>
                    <h3 class="h3_X0B6J text-ellipsis">${ stream.name ?? 'hola' }</h3>
                </div>
                <div class="div_6y9bH">
                    <button class="button_Ma0S6 icon">${ Icon.get('icon-user-group') }</button>
                </div>
            </div>
*/