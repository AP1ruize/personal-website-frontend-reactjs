import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom';
import './ImgPage.css'

function ImgPage(props){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // State to track any errors during the API call
  const [error, setError] = useState(null);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [toHome, setToHome] = useState(false);

  const {id}=useParams()

  const apiURL='http://localhost:3000/api/v2/gallery/public/'+id;
  useEffect(()=>{
    const fetchData = async () => {
      try{
        setLoading(true);
        const response=await axios.get(apiURL);
        setData(response.data);
        // console.log(response)
      } catch (err) {
        setError(err.response.data);
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    if(!toHome)
    {fetchData();}
  }, []);

  const handleDelete = ()=>{
    setDisplayDelete(true);
    // window.location.reload();
  };
  const handleComfirmDelete = ()=>{
    axios.delete("http://localhost:3000/api/v2/gallery/public/"+data._id,{
      headers: {
        'authorization': 'Bearer '+props.userInfo.token,
      },
    }).then(response => {
      if(response.status===200){
        alert("Delete successfully!");
        setToHome(true);
      }
      if(response.status===401){
        props.toLogOut();
        setToHome(true);
    }
    })
    .catch(error=>{
      console.log(error.response.status);
      if(error.response.status===401){
          props.toLogOut();
          setToHome(true);
      } else{
          setError("Fail to delete the image.")
          // window.location.reload();
      }
    })
  };

  const handleCancelDelete = ()=>{
    setDisplayDelete(false);
    // window.location.reload();
  };


  if(loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  if(toHome) {
    return <Navigate to={"/gallery"} />
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <div className='ImgFrame'>
        <img src={"http://localhost:3000/"+data.img} alt={data.name} width='1024px' />
      </div>
      
        <div className='ImgInfo'>
            <p>date of create: {new Date(data.date).toString()}</p>
            <p>date of upload: {new Date(data.uploadDate).toString()}</p>
            <p>description: {data.desc}</p>
            { 
              props.userInfo!=null ? 
              (props.userInfo.id===data.uploaderId ? 
              <p>This image is uploaded by you. <button onClick={handleDelete}>Delete</button></p>: 
              <></>):
              <></>
            }
            {
              displayDelete ?
              (<p>Do you really want to delete this photo? <button onClick={handleCancelDelete}>No</button><button onClick={handleComfirmDelete}>Yes</button></p>):
              <></>
            }
        </div>
    </div>
  )
}

export default ImgPage;
