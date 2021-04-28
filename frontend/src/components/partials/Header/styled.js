import styled from 'styled-components';

export const HeaderArea = styled.div`
    height: 70px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .container{
        max-width: 1000px;
        margin: auto;
        display: flex;
    }

    .logo img{
        width: 120px;
        flex: 1;
        display: flex;
        align-items: center;
        height: 60px;
    }

    a{
       text-decoration: none; 
    }

`;