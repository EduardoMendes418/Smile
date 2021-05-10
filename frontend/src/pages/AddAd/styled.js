import styled from 'styled-components';

export const PageArea = styled.div`

    form {
        background-color:#fff;
        border-radius:3px;
        padding:10px;
        box-shadow:0px 0px 3px #999; 

        .area {
            display:flex;
            align-items:center;
            padding:10px;
            max-width:500px;

            .area--title {
            width:200px;
            text-align:right;
            padding-right:20px;
            font-weight:700;
            font-size:20px;
         }
        .area--input {
            flex:1;
            input , select , textarea {
                width:100%;
                font-size:14px;
                padding:5px;
                border:1px solid #DDD;
                border-radius:3px;
                outline:0;
                transition:all ease .4s;

                &:focus {
                    border:1px solid #333;
                    color:#333;
                }

            }

            textarea {
                height: 150px;
                resize: none;   
            }

            button {
                background-color: #00e658;
                border:0;
                outline:0;
                padding: 5px 15px;
                border-radius: 4px;
                color:#000;
                font-size: 18px;
                cursor: pointer;
                font-family: 'Open Sans', sans-serif;
            }

            }
            
        }

    }

`;