import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);
  useEffect(()=>{
    user&&GetResumeList()
  },[user])
  const GetResumeList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp=>{
      setResumeList(resp.data.data);
    })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl '>My Resume</h2>
      <p>Create your Resume for your next job</p>
      <div className='grid gird-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume/>
        {resumeList.length>0 && resumeList.map((resume,index)=>(
          <ResumeCardItem resume={resume} key={index} refreshData={GetResumeList}/>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
