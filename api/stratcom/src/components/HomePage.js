import React from 'react'
import Header from './Header'
import Section from './Section'
import Footer from './Footer'

const HomePage = ({msg,names}) => {
  return (
    <div>
        <Header />
        <Section msg={msg} names={names} />
        <Footer />
    </div>
  )
}

export default HomePage