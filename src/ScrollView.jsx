import React, { useEffect, useState } from 'react'

export default function ScrollView({url}) {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [scrollPercent,setScrollPercent]=useState(0);

    async function fetchData(getURL){
        try{
            setLoading(true);
            const res=await fetch(getURL);
            const ans=await res.json();

            
            // console.log(ans.products);
            if(ans && ans.products && ans.products.length>0){
                setData(ans.products);
                setLoading(false);
            }
            
        }catch(e){
            console.log(e.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData(url);
    },[url])


    function handleScrollPercentage(){
        const howMuchScrolled=document.body.scrollTop || document.documentElement.scrollTop;

        const height=document.documentElement.scrollHeight - document.documentElement.clientHeight;

        setScrollPercent((howMuchScrolled/height)*100);
    }


    useEffect(()=>{
        window.addEventListener('scroll',handleScrollPercentage);

        return ()=> {
            window.removeEventListener('scroll',()=>{});
        }
    },[])


  return (
    <div className='w-full flex flex-col relative items-center '>
        <div className='flex flex-col w-full sticky top-0 left-0 right-0'>
            <div className='  bg-green-500 text-white text-3xl flex justify-center items-center p-5'>Custom Scroll View</div>
            <div className='relative w-full h-4 bg-red-600'>
                <div className={`h-full absolute bg-purple-600`} style={{width:`${scrollPercent}%`}}></div>
            </div>
        </div>
        <div className='flex flex-col gap-5'>
            {
                data.map((item,index)=>(
                    <div key={index}>{item.title}</div>
                ))
            }
        </div>
    </div>
  )
}
