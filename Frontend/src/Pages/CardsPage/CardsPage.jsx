import React from 'react'
import "./CardsPage.css"
import Card from "../../components/Card/Card"
const CardsPage = () => {
  return (
    <div className='main-container'>
        <div className='cards-container'>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>
        <Card data={{category:"since",name:"Michael",offer:"math", demand:"chemical"}}/>

        </div>
    </div>
    
  )
}

export default CardsPage;