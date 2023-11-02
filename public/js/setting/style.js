export default ()=>{

    //return
    const styleSettingBase = {
        theme : {
            global : 'light',
            chat   : '#7C4DFF'
        },
        font  : {
            global : '',
            letter : {
                name : 'predeterminado',
                font : "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'"
            }
        }
    }

    const styleSetting = ls('style-setting').data(styleSettingBase).push(true, true)

    const theme = {
        light : {
            'color-background'  : '#F7F7F7',
            'color-item'        : '#ffffff',
            'color-letter'      : '#1c1c1e',
            'filter-img'        : 'initial'
        },
        dark  :  {
            'color-background' : '#1c1c1e',   
            'color-item' : '#2C2C2E',   
            'color-letter' : '#F7F7F7',
            'filter-img'   :'invert(82%) sepia(99%) saturate(0%) hue-rotate(102deg) brightness(111%) contrast(100%)'
        }
    }

    const styleRoot = {
        'color-background'  : '#F7F7F7',
        'color-item'        : '#ffffff',
        'color-letter'      : '#1c1c1e',
        'filter-img'        : 'initial',

        // styleSetting.
        'color-chat'        : 'initial',
        'fontFamily-letter' : ''
    }

    console.log(document.getElementById('style-setting'));

    styleSetting.innerHTML = `:root {${ ArrayToString(Object.keys(theme), key => `--${ key } : ${ theme[key] };\n`) }}`

    // if(!localStorage.getItem('theme'))
    //     localStorage.setItem('theme', 'light')

    // const themeLight = {
    //     'color-background' : '#F7F7F7',
    //     'color-item'    : '#ffffff',
    //     'color-letter'  : '#1c1c1e',
    //     'filter-img'    : 'initial'
    // }
  
    // const themeDark  = {
    //     'color-background' : '#1c1c1e',   
    //     'color-item' : '#2C2C2E',   
    //     'color-letter' : '#F7F7F7',
    //     'filter-img'   :'invert(82%) sepia(99%) saturate(0%) hue-rotate(102deg) brightness(111%) contrast(100%)'
    // }

    // const theme = localStorage.getItem('theme') == 'light' ? themeLight : themeDark

    // const styleSetting = getElement('#style-setting')
    // styleSetting.innerHTML = `:root {${ ArrayToString(Object.keys(theme), key => `--${ key } : ${ theme[key] };\n`) }}`
    
}