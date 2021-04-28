import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/logo-smile.png';

const Header = () => {
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
                        <li>
                            <Link to=""> Login </Link>    
                        </li>  
                        <li>
                            <Link to=""> Cadastrar </Link>
                        </li>
                        <li>
                            <Link to="" className="button"> Poste um anúncio </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;