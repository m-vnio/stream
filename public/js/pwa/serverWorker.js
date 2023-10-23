export default ()=>{

    if( navigator.serviceWorker ) {
        navigator.serviceWorker.register( './sw.js' )
    }

    // const apiURI = uri => 'http://localhost:3000' + uri

    // let serverWorkerRegister = null

    // const verifyNotification = status =>{
    //     console.log(status);
    // }

    // const cancelSuscription =()=>{
    //     serverWorkerRegister.pushManager.getSubscription().then( subs => {
    //         if(subs)
    //             subs.unsubscribe().then(()=> verifyNotification(false))
    //     })
    // }

    // const getPublicKey = async ()=>{
    //     return fetch( apiURI('/key') )
    //         .then( res => res.arrayBuffer() )
    //         .then( key => new Uint8Array(key) )
    // }

    // if( !navigator.serviceWorker ) return
    
    // navigator.serviceWorker.register( './sw.js' ).then( reg => {

    //     serverWorkerRegister = reg
    //     serverWorkerRegister.pushManager.getSubscription().then( verifyNotification )

    // })
    
}