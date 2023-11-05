import streamForm from "./streamForm.js"

export default ( data )=>{

    const api = ( uri = '' ) => ls('api').get() + uri
    const auth = ls('auth').data({}).push(true, true) 
    const Icon  = new iconSVG()

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2">
            <div class="div_hS7SImh"></div>
            <div class="div_615A3JR">
                <button class="button_shHYc7J pointer" data-action="update">
                    ${ Icon.get('fi fi-rr-pencil') }
                    <span>editar</span>
                </button>
                <button class="button_shHYc7J pointer" data-action="delete">
                    ${ Icon.get('fi fi-rr-trash') }
                    <span>eliminar</span>
                </button>
            </div>  
        </div>
    `)

    const query = new findElement(ElementComponent)
    const root  = document.getElementById('root')

    query.get('.div_hS7SImh').addEventListener('click', () => ElementComponent.remove())
    query.get('.div_615A3JR').addEventListener('click', e => {
        const button = e.target.closest('button')

        if( button ) {
            const action = button.dataset.action

            if( action == 'update' ) {
                root.append(streamForm('edit', data))
            } else if( action == 'delete' ) {
                datapi.delete(api(`/stream/api/stream?id=${ data.id }&token=${ auth.token }`))
                    .then((data) => {
                        dispatchEvent(new CustomEvent('dispatchEventLoadStream'))
                    })
            }

            ElementComponent.remove()
        }
    })

    return ElementComponent
}