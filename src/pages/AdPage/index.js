import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageArea, Fake, OthersArea,BreadChumb } from './styled';
import useApi from '../../helpers/OlxAPI';
import {Slide} from 'react-slideshow-image'
import "react-slideshow-image/dist/styles.css";

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem'

const Page = () => {
    const api = useApi();

    const {id} = useParams();

    const formatDate = (date)=>{
        let cDate = new Date(date);
        let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    useEffect(()=>{
        const getAdInfo = async(id)=>{
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    },[]);

    return (
        <PageContainer>
            {adInfo.category &&
                <BreadChumb>
                    Você está aqui:
                    <Link to=''>Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}

                </BreadChumb>
            }
            <PageArea>
                
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImage'>
                        {loading && <Fake height={300}/>}
                        {adInfo.images &&
                            <Slide>
                                {adInfo.images.map((img,k)=>
                                <div key={k} className='each-slide'>
                                    <img src={img} alt=''/>
                                </div>)}
                            </Slide>}
                        
                                
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={20}/>}
                                {adInfo.title &&
                                <h2>{adInfo.title}</h2>}

                                {adInfo.dateCreated &&
                                <small>Criado em: {formatDate(adInfo.dateCreated)}</small>
                                }
                        
                            </div>
                            <div className='adDescription'>
                                 {loading && <Fake height={100}/>}
                                 {adInfo.description}
                                 <hr/>
                                 {adInfo.views &&
                                 <small>visualizações: {adInfo.views} </small>}
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className='rightSide'>
                    <div className='box box--padding'>
                        {loading && <Fake height={20}/>}
                        {adInfo.priceNegotiable &&
                            'Preço Negociavel'
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className='price'> Preço: <span>R$ {adInfo.price}</span></div>
                        }

                    </div>
                   
                    {loading && <Fake height={50}/>}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target='blank' className='contactSellerLink'>Fale com o Vendedor</a>
                           
                            <div className='createdBy box box--padding'>
                                
                                <strong>{adInfo.userInfo.name}</strong>    
                                <small> E-mail:{adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        
                        </>
                        }
                </div>

               
            </PageArea>

            <OthersArea>           
                {adInfo.others &&
                    <>
                    <div className='list'>
                        {adInfo.others.map((i,k)=>
                        <AdItem key={k} data={i}/>)}
                    </div>
                    </>
                    }
            </OthersArea>        
               
        </PageContainer>
    );
}

export default Page;