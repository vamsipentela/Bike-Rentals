import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, ChevronRight, Zap } from 'lucide-react';

const HeroImg = "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=2000";
const ContextImg1 = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1000";
const ContextImg2 = "https://images.unsplash.com/photo-1502744691670-61a1e04d4b3c?auto=format&fit=crop&q=80&w=1000";

const OurStory = () => {
   return (
      <div style={{ backgroundColor: 'var(--white)', minHeight: '100vh' }}>

         {/* 1. EDITORIAL HERO SECTION */}
         <section style={{ paddingTop: '100px', paddingBottom: '64px' }}>
            <div className="container">
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '900px', margin: '0 auto', gap: '24px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-gray)' }}>Our Genesis</span>
                  <h1 style={{ fontSize: '72px', fontWeight: '800', letterSpacing: '-2px', color: 'var(--black)', lineHeight: 1.05 }}>
                     Moving modern India,<br />one ride at a time.
                  </h1>
                  <p style={{ fontSize: '22px', color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.5, maxWidth: '700px', marginTop: '16px' }}>
                     We set out to build the infrastructure for the next generation of urban and intercity travel. Clean, fast, and instantly accessible.
                  </p>
               </div>
            </div>
         </section>

         {/* 2. HERO IMAGE BANNER */}
         <section style={{ padding: '0 32px 100px 32px' }}>
            <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', height: '600px', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
               <img src={HeroImg} alt="Rider taking off" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
         </section>

         {/* 3. SPLIT NARRATIVE SECTION */}
         <section style={{ padding: '80px 0 120px 0', backgroundColor: 'var(--white)' }}>
            <div className="container flex mobile-col" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>

               <div style={{ flex: 1, position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <h2 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1px', lineHeight: 1.1 }}>
                     The problem with urban commuting.
                  </h2>
                  <div style={{ width: '64px', height: '4px', backgroundColor: 'var(--black)' }} />
                  <p style={{ fontSize: '18px', color: 'var(--text-gray)', lineHeight: 1.7, fontWeight: '500' }}>
                     Traffic congestion costs Indian cities billions of hours every year. Traditional public transport is rigid, and buying a personal vehicle is an escalating financial burden coupled with brutal maintenance costs.
                     <br /><br />
                     We recognized that the future of mobility isn't ownership—it's access. RideOn was engineered to bridge that exact gap, providing high-quality petrol vehicles precisely when and where you need them.
                  </p>
               </div>

               <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  <img src={ContextImg1} alt="City traffic" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', height: '400px' }} />
                  <img src={ContextImg2} alt="Parked bike" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', height: '300px' }} />
               </div>

            </div>
         </section>

         {/* 4. HIGH-IMPACT METRICS */}
         <section style={{ backgroundColor: 'var(--black)', color: 'var(--white)', padding: '120px 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '48px' }}>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minWidth: '200px' }}>
                  <span style={{ fontSize: '64px', fontWeight: '800', letterSpacing: '-2px', lineHeight: 1 }}>1M+</span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#9ca3af' }}>Kilometers safely navigated across major metropolitan areas.</span>
               </div>

               <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} className="lg:block" />

               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minWidth: '200px' }}>
                  <span style={{ fontSize: '64px', fontWeight: '800', letterSpacing: '-2px', lineHeight: 1 }}>24/7</span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#9ca3af' }}>Uninterrupted station access and roadside recovery support.</span>
               </div>

               <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} className="lg:block" />

               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, minWidth: '200px' }}>
                  <span style={{ fontSize: '64px', fontWeight: '800', letterSpacing: '-2px', lineHeight: 1 }}>100%</span>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#9ca3af' }}>Digitized booking flow. No paperwork, no hidden deposits.</span>
               </div>

            </div>
         </section>

         {/* 5. ENGINEERED CORE VALUES */}
         <section style={{ backgroundColor: 'var(--light-gray)', padding: '120px 0' }}>
            <div className="container">
               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '64px', maxWidth: '600px' }}>
                  <h2 style={{ fontSize: '40px', fontWeight: '800', letterSpacing: '-1px' }}>Engineered for trust.</h2>
                  <p style={{ fontSize: '18px', color: 'var(--text-gray)', marginTop: '16px', fontWeight: '500' }}>Our framework relies on absolute transparency and rigorous mechanical standards.</p>
               </div>

               <div className="grid-3" style={{ gap: '32px' }}>

                  {/* Value 1 */}
                  <div style={{ padding: '40px', backgroundColor: 'var(--white)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--border)' }} className="card-hover">
                     <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--light-gray)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={24} color="var(--black)" />
                     </div>
                     <h3 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.3px' }}>Frictionless Access</h3>
                     <p style={{ color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.6, fontSize: '15px' }}>KYC takes seconds. Scan, unlock, and ride within two minutes of opening the platform.</p>
                  </div>

                  {/* Value 2 */}
                  <div style={{ padding: '40px', backgroundColor: 'var(--white)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--border)' }} className="card-hover">
                     <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--light-gray)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={24} color="var(--black)" />
                     </div>
                     <h3 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.3px' }}>Mechanical Integrity</h3>
                     <p style={{ color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.6, fontSize: '15px' }}>Every unit is subjected to a comprehensive bi-weekly diagnostic pipeline.</p>
                  </div>

                  {/* Value 3 */}
                  <div style={{ padding: '40px', backgroundColor: 'var(--white)', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--border)' }} className="card-hover">
                     <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--light-gray)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MapPin size={24} color="var(--black)" />
                     </div>
                     <h3 style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.3px' }}>Ubiquitous Hubs</h3>
                     <p style={{ color: 'var(--text-gray)', fontWeight: '500', lineHeight: 1.6, fontSize: '15px' }}>Hyper-local drop nodes positioned perfectly alongside essential transit lines.</p>
                  </div>

               </div>
            </div>
         </section>

         {/* 6. CALL TO ACTION */}
         <section style={{ textAlign: 'center', padding: '120px 32px' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '32px', letterSpacing: '-1px' }}>Ready to move?</h2>
            <Link to="/bikes" className="btn btn-black" style={{ padding: '16px 40px', fontSize: '18px', display: 'inline-flex', alignItems: 'center', gap: '12px', borderRadius: '8px' }}>
               Explore the Fleet <ChevronRight size={20} />
            </Link>
         </section>

      </div>
   );
};

export default OurStory;
