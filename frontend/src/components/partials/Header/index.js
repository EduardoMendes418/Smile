import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/logo-smile.png';

//AuthHandler Cookie
import {isLogged} from '../../../helpers/AuthHandler';

const Header = () => {
    //chamando cookie
    let logged = isLogged();

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
                                    <Link to="/logout"> Sair </Link>
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