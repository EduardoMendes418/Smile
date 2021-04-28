import React from 'react';
//conecao redux
import { connect } from 'react-redux';
//Rota
import { BrowserRouter } from 'react-router-dom';//browesers
import Routes from './Routes';
//Components
import { Template } from './components/templatecomponents';
//Componets Parcial
import Header  from './components/partials/Header';
import Footer from './components/partials/Footer'; 
// App.css
import './App.css';

const Page = (props) => {
  return(

    <BrowserRouter>
        <Template>
          <Header/>
          <Routes/>
          <Footer/>
        </Template>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) =>{
  return {
    user:state.user
  };
}

const  mapDispatchToProps = (dispath) => {
  return{

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);