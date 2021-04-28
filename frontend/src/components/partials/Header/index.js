import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/logo-smile.png';

const Header = () => {
    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={logoImg} alt="logoImg"/>
                    </Link>
                </div>
            </div>
        </HeaderArea>
    );
}

export default Header;