import styled from 'styled-components';

export const Fake = styled.div`
     background-color: #DDD;
     height:${props=>props.height || 20}px;
`;


export const PageArea = styled.div`
    display:flex;
    margin-top:20px;
    .box {
        background-color: #FFF;
        border-radius:5px;
        box-shadow:0px 0px 0px 3px #999;
        margin-bottom: 20px;
    }
    .box{
        display:flex;
    }
    .box--padding{
        padding: 10px;
    }
    .leftSide {
        flex:1;
        margin-right:20px;
        .adImage {
            width:300px;
            height:320px;
            margin-right:20px;
            .each-slide img{
                display:flex;
                align-items:center;
                justify-content:center;
                background-size:cover;
                height:320px;
            }
        }
        .adInfo{
            flex:1;

            .adName{
                margin-bottom:20px;
                h2{
                    margin: 0;
                    margin-top: 20px;
                }
                small{
                    color:#999;
                }
            }

            .adDescription {
                small{
                    color:#999;
                }
            }
        }
    }
    .rightSide {
        width: 250px;
        .price span{
            color: #000;
            display:block;
            font-size:27px;
            font-weight:bold;
        }
        .contactSellerLink{
            background-color: #00e658;
            color: #000;
            height:30px;
            border-radius: 5px;
            box-shadow:0px 0px 4px #999;
            display:flex;
            justify-content:center;
            align-items:center;
            text-decoration:none;
            margin-bottom:20px;
        }
        .createdBy{
            display: flow-root;
        }
        .createdBy strong{
            display:block;
        }
        .createdBy small{
            display:block;
            color:#999;
            margin-top:10px;
        }
    }

//RESPONSIVO    
@media (max-width:700px){
    &{
        flex-direction:column;
    }

    .leftSide {
        margin:0;

        .box{
            width:320px;
            flex-direction:column;
            margin: auto ;

        }

        .adInfo{
            padding:10px;
        }
    }

    .rightSide {
        width:auto;
        margin-top:20px;

        .box{
           width: 320px !important;
           margin: auto !important;
        }

        .contactSellerLink{
            width:320px;
            margin: 20px auto;
        }

    }

}

`;


export const OthersArea = styled.div`
    h2 {
        font-size:20px;
    }
    .list {
        display:flex;
        flex-wrap:wrap;


      .aditem {        
        width:25%;
    }
} 

//RESPONSIVO
@media(max-width:700px){

    &{
        margin:10px;
    }

    .list .adItem{
        width:50%;
    }



}
   

`;

export const BreadChumb = styled.div`
    font-size:18px;
    margin-top:20px;
    
    a{
        display:inline-block;
        margin: 0px 5px;
        text-decoration:underline;
        color: #000;
    }

//RESPONSIVE
@media(max-width:600px){
    &{
        margin:20px;
    }
}



`;