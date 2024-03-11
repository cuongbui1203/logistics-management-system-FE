import Footer from '@/components/Footer';
import Header from '@/components/header/Header';
import Hero from '@/components/Hero';
import Service from '@/components/service/Service';

export default function Home() {
  
  return (
    <div className='w-full h-screen scroll-smooth overflow-x-hidden scrollbar-none'>
      <Header />
        
      <Hero />

      <Service />

      <Footer />
    </div>
  )
}