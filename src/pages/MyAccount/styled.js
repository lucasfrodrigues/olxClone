import styled from 'styled-components';

export const PageArea = styled.div`

form {
    background-color:#FFF;
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
            font-weight:bold;
            font-size:14px;
        }
        .area--input {
            flex:1;

            input {
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

            
            button {
                background-color:#0089FF;
                border:0;
                outline:0;
                padding:5px 10px;
                border-radius:4px;
                color:#FFF;
                font-size:15px;
                cursor:pointer;

                &:hover {
                    background-color:#006FCE;
                }
            }
        }
    }
}

`;

export const OthersArea = styled.div`
    text-align:center;
    h2{
       font-size:20px; 
    }

    .list{
        display:flex;
        flex-wrap:wrap;
       
        
        .aditem{
            width:25%;
        }
    }

`;


export const ModalBackground = styled.div`
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index:90;
    background-color: rgba(0, 0, 0, 0.7);
    display:flex;
    justify-content:center;
    align-items:center;
    form {
        background-color:#FFF;
        border-radius:3px;
        padding:10px;
        box-shadow:0px 0px 3px #999;
        max-height: 500px;
        overflow-y:auto;

    
        .area {
            display:flex;
            align-items:center;
            padding:10px;
            max-width:500px;
    
            .area--title {
                width:200px;
                text-align:right;
                padding-right:20px;
                font-weight:bold;
                font-size:14px;
            }
            .area--input {
                flex:1;
    
                input, select, textarea {
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

                &.images{

                    padding:5px;
                    background-color:#EEE;
                }

                img{
                    width:90px;
                    height:90px;
                    margin: 5px;
                    border-radius:5px;
                    cursor:pointer;
                    
                    &:hover{
                        width:100px;
                        height:100px;
                    }

                    &.delete{
                        filter: brightness(60%);
                    }
                }
    
                textarea{
                    height:150px;
                    resize:none;
                }        
            }

            button {
                background-color:#0089FF;
                border:0;
                outline:0;
                padding:5px 10px;
                border-radius:4px;
                color:#FFF;
                font-size:15px;
                cursor:pointer;
                margin-right:30px;
                margin:0 auto;

                &:hover {
                    background-color:#006FCE;
                }

                &.cancelar{
                    background-color:#DD0000;

                    &:hover{
                        background-color:#EE0000;  
                    }
                }

            }
        }
    }
    
    
`;

export const ModalArea = styled.div`
    background-color:#FFF;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:50px;

    
`;