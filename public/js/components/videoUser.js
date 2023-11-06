import socket from "../pwa/socket.js";

export default ()=>{

    const Icon  = new iconSVG()

    const auth = ls('auth').data({}).push(true, true) 
    const stream = ls('stream').data({}).push(true, true) 

    const params = JSON.parse(sessionStorage.getItem('params'))

    const api  = uri => ls('api').get() + uri

    const ElementComponent = createHTML(`
        <div class="div_KEVYWu2" style="padding:0">
            <div class="div_hS7SImh"></div>
            <div class="div_oy1VxlI">
                <div class="div_FI9Xaxa">
                    <div class="div_wcyPU0Y"></div>
                </div>
                ${ auth.uid == stream.id_user ? `
                    <div class="div_sDVCNZ5">
                        <h4 style="user-select: initial">---</h4>
                        <div class="div_agfcT72">
                            <button class="pointer" data-action="copy-id">${ Icon.get('fi fi-rr-copy') }</button>
                            <button class="pointer" data-action="add-user">${ Icon.get('fi fi-rr-user-add') }</button>
                        </div> 
                    </div>
                ` : '' }
            </div>
        </div>    
    `)
    
    const query = new findElement(ElementComponent)
    const addUser = query.get('button[data-action="add-user"]', true)
    const elementItem = query.get('.div_oy1VxlI', true)
    const elementList = query.get('.div_wcyPU0Y')
    const elementCopy = query.get('.div_sDVCNZ5')

    query.get('.div_hS7SImh').addEventListener('click', () => ElementComponent.remove())

    const generateLink =()=>{

        const data = {
            id_user : auth.uid,
            id_stream : params.id
        }

        datapi.post(api(`/stream/api/stream_link?token=${ auth.token }`), data)
            .then(data => {
                elementCopy.children[0].textContent = data.id
                elementItem.append(elementCopy)
                
                const clipboard = navigator.clipboard
                if(clipboard) clipboard.writeText(data.id)
                else copyToClipboard(data.id)
            })
 
    }

    addUser.addEventListener('click', generateLink)

    const dataRender =(Data)=>{
        sessionStorage.setItem('stream_user', JSON.stringify(Data))

        elementList.innerHTML = ArrayToString(Data, (data, i) => { 
            return `
                ${ i == 0 ? '' : '<span class="span_line"></span>' }
                <div class="div_753wTS9" data-id-user="${ data.uid }">
                    <div class="div_3N6X658">
                        <img src="${ api(`/stream/storage/avatar/${ data.avatar || 'avatar.png' }`) }">   
                        <span style="display:none"></span>
                    </div>
                    <div class="div_tfe1dZh">
                        <h4>${ data.username }</h4>
                        <p>${ data.biography }</p>
                    </div>
                    <div class="div_agfcT72">
                    ${ data.owned ? `<button class="pointer" style="pointer-events:none">${ Icon.get('fi fi-rr-crown') }</button> ` : `
                        ${ '' /* auth.uid == stream.id_user ? `<button class="pointer">${ Icon.get('fi fi-rr-delete-user') }</button> ` : '' */ }
                    `}
                    
                    </div>
                </div>
            `
        })

        socket.emit('user-list', JSON.stringify({
            id_stream : params.id,
            id_user : auth.uid,
            status : 1
        }))
        
    }


    const dataLoad =()=>{
        datapi.get(api(`/stream/api/stream_user?token=${ auth.token }&id_stream=${ params.id }&type=users`)).then(dataRender) 
    }

    dataLoad()
 
    const statusUserRender = (User = []) =>{
        User.forEach(data => {
            if(data.id_stream != params.id) return
            const element = elementList.querySelector(`div[data-id-user="${ data.id_user }"] .div_3N6X658 span`)
            if(element) element.style.display = data.status ? 'block' : 'none';
        })
    }

    socket.on('user-list', data => {
        statusUserRender(JSON.parse(data))
    })

    const hashchangeEventListener =()=>{
        ElementComponent.remove()

        socket.emit('user-list', JSON.stringify({
            id_stream : params.id,
            id_user : auth.uid,
            status : 0
        })) 

        removeEventListener('hashchange', hashchangeEventListener)
    }
     
    addEventListener('hashchange', hashchangeEventListener)

    return ElementComponent
}
