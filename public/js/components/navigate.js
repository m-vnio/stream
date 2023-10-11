export default ()=>{

    const Route = [
        { name : 'home', path : ['', 'inicio'] },
        { name : 'setting', path : ['setting', 'config', 'user'] }
    ]

    const RouteHide = ['stream', 'login', 'register']

    const ElementComponent = createHTML(`
        <div class="div_r59RR7t">
            <div class="div_xo0lE74">
                <a href="#/" data-name="home"><img src="public/img/icons/svg/icon-home.svg" alt="icon-svg"></a>
                <a href="#/user" data-name="setting"><img src="public/img/icons/svg/icon-user.svg" alt="icon-svg"></a>
            </div>
        </div>
    `)

    const root  = document.getElementById('root')

    const def_setFocus =()=>{
        const path = location.hash.split('/')[1] ?? ''

        if(RouteHide.includes(path)){
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