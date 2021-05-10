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

    .logo{
        flex: 1;
        display: flex;
        align-items: center;
    }

    .logo img{
        margin-top: 5px;
        width: 120px;
    }

    a{
       text-decoration: none; 
    }

    nav{
        padding-top: 15px;
        padding-bottom: 10px;

        ul, li {
            margin: 0 ;
            padding: 0;
            list-style: none;
        }
        
        ul{
            display: flex;
            align-items: center !important;
            height: 40px;
        }

        li{
            margin-left: 20px;
            maegin-right: 20px;

            a, button {
                border:0;
                background:none;
                color: #000;
                font-size: 20px;
                text-decoration: none;
                font-family: 'Open Sans', sans-serif;
                outline:0;

                &:hover{
                    color: #999;
                }

                &.button{
                    background-color:#00e658;
                    border-radius: 4px;
                    color: #fff;
                    padding: 5px 15px;
                }

                &.button:hover{
                    background-color: #00e608;
                    color: #000;
                }

            }

        }

    }



`;