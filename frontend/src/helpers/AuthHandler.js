import Cookies from 'js-cookie';

//Cookie
export const isLogged = () => {
    let token  = Cookies.get('token');
    return (token) ? true : false;
}

//Login
export const doLogin = (token, rememberPassword =  false ) => {
    if(rememberPassword){
        Cookies.set('token', token, {expires:999}); //expira 999 dias
    }else{
        Cookies.set('token', token); //assim q fechar navegador limpa cookie
    }

}