export default ()=>{
 

    const versionChange = '1696632403938'

    if(!localStorage.getItem('versionChange')){
        localStorage.clear()
        localStorage.setItem('versionChange', versionChange)
    }

    if(parseInt(versionChange) > parseInt(localStorage.getItem('versionChange'))){
        localStorage.clear()
        localStorage.setItem('versionChange', versionChange)
        console.log('hola');
    }

    localStorage.setItem('click', 'false')

    const style = document.getElementById('style-style')
    const metaThemeColor = document.getElementById('meta-theme-color')

    if(!localStorage.getItem('theme')){
        localStorage.setItem('theme', 'light')
    }

    if(!localStorage.getItem('theme_chat')){
        localStorage.setItem('theme_chat', '#7C4DFF')
    }

    if(!localStorage.getItem('fontFamily')){
        localStorage.setItem('fontFamily', JSON.stringify({ name : "predeterminado", font : "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'" }))
    }

    //
    //https://api-nivi.victor01sp.com
    localStorage.setItem('api', 'http://192.168.1.9/servidor-4')

    const theme = localStorage.getItem('theme')

    const themeLight = {
        'color-background' : '#F7F7F7',   
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
        ['fontFamily-letter', JSON.parse(localStorage.getItem('fontFamily')).font]
    ]

    metaThemeColor.setAttribute('content', themeSetting['color-background'])

    style.innerHTML = ':root {' + ArrayToString(Style, style => { return `--${ style[0] } : ${ style[1] };\n` }) + '}'           
}