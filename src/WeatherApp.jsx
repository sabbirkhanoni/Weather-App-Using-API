import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WeatherApp() {
    let [cityName,setCityName] =useState('');
    let [weatherDetails,setWeatherDetails] = useState();
    let [isLoading,setIsLoading] = useState(false);
    let getData=(event)=>{
        setIsLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json()).then((finalRes)=>{
        if(finalRes.cod=="404" ){
            setWeatherDetails(undefined);   
        }else if(cityName.trim()===''){
            setWeatherDetails(undefined);
            toast.warn('Please Enter a Valid City Name...');
        }
        else{
            setWeatherDetails(finalRes);
        }

        setIsLoading(false);
    });
    event.preventDefault();
    setCityName('');
    }

  return (
    <div className='bg-[#222222] w-[100%] h-[105vh]'>
        <ToastContainer/>
        <div className='max-w-[100%] mx-auto'>
            <h1 className='text-[30px] text-center font-bold text-white py-[20px]'>Weather Application</h1>
            <form onSubmit = {getData} className= 'flex justify-center' action="">
                <input type="text" value = {cityName} onChange={(e)=>setCityName(e.target.value)}className='w-[70%] h-[35px] rounded-full items-center mt-3 pl-4' name="" id="" placeholder='Enter Your City Name' />
                <button className='text-white bg-blue-500 rounded-md px-4 h-[35px] mt-3 ml-4'>Enter</button>
            </form>

           


            <div className='w-[75%] bg-[#4f4f4f]  rounded-lg h-[75vh] shadow-lg text-white mt-10 mx-auto flex items-center justify-center flex-col'>
               <img src='https://i.gifer.com/ZKZg.gif' className={`w-28 ${(isLoading) ? '' : 'hidden'}`} alt="" />

                {
                
                weatherDetails!==undefined
                
                ?
                <>
                    <h1 className='font-bold text-[20px]'>{weatherDetails.name}<span className='ml-10'>{weatherDetails.sys.country}</span></h1>
                    <h3 className='font-bold text-[50px]'>{weatherDetails.main.temp}</h3>
                    <img className= '' src={`http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`} alt="" />
                    <p className='font-bold'>{weatherDetails.weather[0].description}</p>
                </>
                :
                <>
                    <h1 className='text-white font-bold text-center py-10 text-[30px]'>"No Data Found"</h1>
                   
                </>
                
                }
                
            </div>

        </div>
    </div>
  )
}
 