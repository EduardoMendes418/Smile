import Cookies from 'js-cookie';

//Cookie verificar 
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

//Logout 
export const doLogout = () => {
    Cookies.remove('token');
}






//suporte@b7web.com.br
//senha:12345