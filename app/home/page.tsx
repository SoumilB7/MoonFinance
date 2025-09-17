import React from 'react';
import Home from '../components/Home';
import Faq from '@/app/components/Faq';
import Recognitions from '@/app/components/Recognitions';
import Solutions from '@/app/components/Solutions';
import GetInTouch from '@/app/components/GetInTouch';
import Footer from '@/app/components/Footer';
// import LoginButton from '@/app/components/LoginButton';
const HomePage: React.FC = () => {
  return (
    <div>
      {/* <LoginButton /> */}
      <Home />
      {/* <Solutions />
      <Recognitions />
      <Faq />
      <GetInTouch />
      <Footer /> */}
    </div>
  );
};

export default HomePage;
