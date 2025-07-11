import React from 'react';
import Header from '../components/Header';
import Products from './Products';
import Connect from './Connect';
import Price from '../components/Price';
import Testimonial from '../components/Testimonial';
import About from './About';
import { Element } from 'react-scroll'; 
import ScrollIndicator from '../components/ScrollIndicator';
import OurProjects from '../components/OurProjects';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <div>
      <Element name="home">
        <Header />
      </Element>

      <Element name="services">
        <Products />
      </Element>

      <Element name="packages">
        <Price />
      </Element>

      <Element name="connect">
        <Connect />
      </Element>

      <Element name="testimonials">
        <Testimonial />
      </Element>
       {/* <Eleme
        */}

      <Element name="about">
        <About />
      </Element>
            <ScrollIndicator />

            <FAQ />

    </div>
  );
};

export default Home;
