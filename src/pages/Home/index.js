import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled';
import useApi from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useApi();

    const [ statelist , setStateList] = useState([]);
    const [ categories ,setCategores] = useState ([]);
    const [ adList, setAdList] = useState([]);

    useEffect(()=>{
        const getStates = async ()=>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);
    

    
    useEffect(()=>{
        const getCategories= async ()=>{
            const cats = await api.getCategories();
            setCategores(cats);
        }
        getCategories();
    },[]);

    useEffect(()=>{
        const getRecentAds = async ()=>{
            const json = await api.getAds({
                sort:'desc',
                limit: 8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    },[]);

    return (
        <>
        <SearchArea>
            <PageContainer>
                <div className='searchBox'> 
                    <form method='GET' action='/ads'>
                        <input type='text' name='q' placeholder ='O que você procura'/>
                        <select name ='state'>
                            {statelist.map((i, k)=>
                                <option key ={k} value={i.name}>{i.name}</option>
                            )}

                        </select>
                        <button>Pesquisar</button>

                    </form>
                </div>
                <div className='categoryList'>
                    {categories.map((i,k)=>
                        <Link key ={k} to={`/ads?cat=${i.slug}`} className='categoryItem'>
                            <img src={i.img} alt=''/>
                            <span>{i.name}</span>
                        </Link>)}


                </div>
            </PageContainer>
        </SearchArea>
        
        
        <PageContainer>
            
            <PageArea>
               <h2>Anuncios Recentes</h2>
               <div className='list'>
                    {adList.map((i,k)=>
                        <AdItem key={k} data={i}/>
                    )}
               </div>
               <Link to='/ads' className='seeAllLink'>Ver todos</Link>

               <hr/>

               It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.

            </PageArea>
        </PageContainer>
        
        </>

        
    );
}

export default Page;