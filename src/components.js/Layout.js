import React from 'react'
import FoodServiceHeader from './FoodServiceHeader'
import { Outlet } from 'react-router-dom'
export default function Layout({register, setRegister, pwReset, setpwReset}) {
  return (
    <>
    <FoodServiceHeader register={register} setRegister={setRegister} pwReset={pwReset} setpwReset={setpwReset}/>
        <Outlet/>
    </>
  )
}
