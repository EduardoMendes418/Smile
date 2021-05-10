import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/logo-smile.png';

//AuthHandler Cookie
import { isLogged, doLogout} from '../../../helpers/AuthHandler';


const Header = () => {
    //chamando cookie
    let logged = isLogged();

    //Logout  redirecionamento da pagina 
    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    return (
        <HeaderArea>
            <div className="container">
                {/*logo */}
                <div className="logo">
                    <Link to="/">
                        <img src={logoImg} alt="logoImg"/>
                    </Link>
                </div>
                {/*Menu*/}
                <nav>
                    <ul>
                          {/*CONDICAO SE CARA TIVER LOGADO OU NAO */}
                        {logged &&
                            <>
                                <li>
                                    <Link to="/my-account"> Minha Conta </Link>    
                                </li>  
                                <li>
                                    <button onClick={handleLogout}> Sair </button>
                                </li>
                                <li>
                                    <Link to="/post-an-and" className="button"> Poste um anúncio </Link>
                                </li>
                            </>
                        }
                        {!logged && 
                            <>
                                <li>
                                    <Link to="/signin"> Login </Link>    
                                </li>  
                                <li>
                                    <Link to="/signup"> Cadastrar </Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="button"> Poste um anúncio </Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;