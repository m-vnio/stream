import formLogin from "../components/formLogin.js"

export default ()=>{
    const ElementComponent = createHTML(`
        <div class="div_TGskMqH scroll-y">
            <div class="div_bk3v9ra">
                <button class="pointer dark" data-status="true">login</button>
                <button class="pointer" data-status="false">register</button>
            </div>
        </div>
    `)

    const query = new findElement(ElementComponent)
    const root  = document.getElementById('root')

    const Form  = { login : formLogin(true), register : formLogin(false) }

    query.get('.div_bk3v9ra').addEventListener('click', e => {
        const button = e.target.closest('button')
        if(button) root.append( JSON.parse(button.dataset.status) ? Form.login : Form.register) 
    })

    //document.getElementById('root').append()
    document.getElementById('main').append(ElementComponent)
}