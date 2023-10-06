
export default ()=>{

    const version = '18958597504015'
    
    if(!localStorage.getItem('version')){
        localStorage.clear()
        localStorage.setItem('version', version)
    }

    localStorage.setItem('click', 'false')

    const styleID = 'style-style'
    const style = getElement(`#${ styleID }`)

    if(!localStorage.getItem('theme')){
        localStorage.setItem('theme', 'light')
    }

    if(!localStorage.getItem('theme_chat')){
        localStorage.setItem('theme_chat', '#7C4DFF')
    }

    if(!localStorage.getItem('fontFamily')){
        localStorage.setItem('fontFamily', JSON.stringify({ name : "predeterminado", font : "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'" }))
    }

    const theme = localStorage.getItem('theme')

    const themeLight = {
        'color-background' : '#EDF3FB',   
        'color-item' : '#ffffff',   
        'color-letter' : '#1c1c1e',
        'filter-img'   : 'initial'
    }

    const themeDark  = {
        'color-background' : '#1c1c1e',   
        'color-item' : '#2C2C2E',   
        'color-letter' : '#EDF3FB',
        'filter-img'   :'invert(82%) sepia(99%) saturate(0%) hue-rotate(102deg) brightness(111%) contrast(100%)'
    }

    const themeSetting = theme == 'light' ? themeLight : themeDark

    const Style = [
        ['color-background', themeSetting['color-background']],
        ['color-item', themeSetting['color-item']],
        ['color-letter', themeSetting['color-letter']], 
        ['filter-img', themeSetting['filter-img']], 
        ['color-chat', localStorage.getItem('theme_chat')],
        ['fontFamily-letter', json(localStorage.getItem('fontFamily')).font]
    ]

    style.innerHTML = ':root {' + ArrayToString(Style, style => { return `--${ style[0] } : ${ style[1] };\n` }) + '}'           
}