import styled from 'styled-components';


export const SeachArea = styled.div`
    background-color: #DDD;
    border-bottom: 1px solid #CCC;
    padding: 20px 0;

    .searchBox{
        background-color: #ffc70b;
        padding:20px 15px;
        border-radius:5px;
        box-shadow:1px 1px 1px 0.3 rgb(0,0,0,0,0.2);
        display:flex;

        form {
            flex:1;
            display:flex;

            input , select {
                height:40px;
                border:0;
                border-radius: 5px;
                outline:0;
                font-size:15px;
                color:#000;
                margin-right:20px;
                font-family: 'Open Sans', sans-serif;
            }    

            input{
                flex:1 !important;
                padding-left:0 10px;
               
            }

            select{
                width: 100px; 
            }

            button{
                background-color: #f4f4f4;
                font-size:15px;
                border:0;
                border-radius:5px;
                color: #000;
                height: 40px;
                padding: 0 20px;
                cursor:pointer;
                font-family: 'Open Sans', sans-serif;
                font-weight: 700;
            }
        }
    }

    .categoryList{
        display:flex;
        flex-wrap:wrap;
        margin-top:20px;

        .categoryItem{
            width:25%;
            display:flex;
            align-items:center;
            color:#000;
            text-decoration:none;
            height:50px;
            margin-bottom:10px;
            font-size:18px;
            font-weight:bold;

            &:hover{
                color:#9999;
            }

            img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
            }
        }
    }


//RESPONSIVO 
@media (max-width:700px){
    .searchBox form {
        flex-direction:column;

        input {
            padding:10px;
            margin-right:0;
            margin-bottom:10px;
        }

        select {
            width:100%;
            margin-bottom:10px;
        }

        .categoryList .categoryItem{
            width:50%;
            padding:10px;
        }
    }
}
`;

export const PageArea = styled.div`
    h2 {
        font-size: 20px
    }

    .list{
        display:flex !important;
        flex-wrap:wrap !important;

        .aditem{
            width: 25%;
        }
    }
    
    .seeAllLink{
        color:#000;
        text-decoration:none;
        font-weight:bold;
        display:inline-block;
        margin-top: 10px;
    }


    //RESPONSIVO    
    @media (max-width:700px){
        &{
            margin:10px;
        }
        .list .aditem {
            width:50%;
        }
    }

`;