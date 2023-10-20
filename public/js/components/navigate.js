export default ()=>{

    const Icon  = new iconSVG() 

    const Route = [
        { name : 'home', path : ['', 'inicio'] },
        { name : 'setting', path : ['setting', 'config', 'user'] }
    ]

    const RouteShow = ['']

    const ElementComponent = createHTML(`
        <div class="div_r59RR7t">
            <div class="div_xo0lE74">
                <a href="#/" class="a_8ka039d focus" data-name="home">${ Icon.get('fi fi-rr-house-blank') }</a>
                <a href="#/user" class="a_8ka039d" data-name="setting">${ Icon.get('fi fi-rr-user') }</a>
            </div>
        </div>
    `)

    const root  = document.getElementById('root')

    const def_setFocus =()=>{
        const path = location.hash.split('/')[1] ?? ''

        if(!RouteShow.includes(path)){
            setTimeout(()=> ElementComponent.remove())
            return
        }

        root.append(ElementComponent)
            
        const route = Route.find(route => route.path.includes(path)) ?? {}
        const elementFocus = ElementComponent.querySelector(`a[ data-name = ${ route.name ?? 'element-not-found' } ]`)
        const elementPreviousFocus = ElementComponent.querySelector(`a.focus`)

        if(elementPreviousFocus) elementPreviousFocus.classList.remove('focus')
        if(elementFocus) elementFocus.classList.add('focus')
    }

    def_setFocus()
    addEventListener('hashchange', def_setFocus)

    return ElementComponent
}