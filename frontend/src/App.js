import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesOverview from './components/ServicesOverview';
import ServiceCards from './components/ServiceCard';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header/>
      <HeroSection/>
      <ServicesOverview/>
      <ServiceCards/>
      <Footer/>
    </>
  );
}

export default App;
