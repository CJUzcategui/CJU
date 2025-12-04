import React, { useState } from 'react';
import { Mic, Search, ChevronDown, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  isGlobal: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isGlobal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = isGlobal ? 'es-ES' : 'en-US'; // Switch language based on toggle
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };

      recognition.start();
    } else {
      alert("Voice search is not supported in this browser.");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900 pt-10 md:pt-0">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-center md:text-left pt-10 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/10">
                <Star className="text-gold-500 w-4 h-4 fill-current" />
                <span className="text-gold-400 font-bold uppercase tracking-widest text-xs">Premier Agent</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              {isGlobal ? (
                <>
                  Maestría Local.<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600 font-serif italic">Alcance Global.</span>
                </>
              ) : (
                <>
                  Local Mastery.<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600 font-serif italic">Global Reach.</span>
                </>
              )}
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
              {isGlobal 
                ? "Su puente directo entre las inversiones inmobiliarias de lujo en el sur de Florida y las oportunidades en Madrid." 
                : "Connecting South Florida's finest properties with qualified buyers from around the world."}
            </p>
          </motion.div>

          {/* Voice Search Bar */}
          <motion.div 
            className="relative max-w-xl mx-auto md:mx-0 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Glow Effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-gold-400 to-amber-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-500 ${isListening ? 'animate-pulse opacity-80' : ''}`}></div>
            
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
              <Search className="text-white/60 ml-4 w-6 h-6 flex-shrink-0" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isListening ? (isGlobal ? "Escuchando..." : "Listening...") : (isGlobal ? "Diga 'Apartamentos en Brickell'..." : "Say 'Homes in Weston under 800k'...")}
                className="w-full bg-transparent border-none text-white text-lg placeholder-white/50 px-4 py-4 focus:outline-none focus:ring-0"
              />
              <button 
                onClick={startListening}
                className={`p-4 rounded-xl transition-all duration-300 flex-shrink-0 ${isListening ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50' : 'bg-gradient-to-br from-gold-400 to-amber-600 hover:scale-105 shadow-lg shadow-gold-500/30'}`}
              >
                <Mic className={`w-6 h-6 text-white`} />
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400 flex items-center justify-center md:justify-start">
               <span className="w-2 h-2 bg-gold-500 rounded-full mr-2 animate-pulse"></span>
               AI-Powered Voice Search Active
            </p>
          </motion.div>
        </div>

        {/* Agent Image Cutout - IMPROVED with User Image */}
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hidden md:block relative h-full flex items-end justify-center pt-20"
        >
             {/* Background Halo/Glow */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>

             {/* Image Container with Double Border */}
             <div className="relative z-10 w-80 h-80 md:w-[32rem] md:h-[32rem] rounded-full p-2 border border-white/10 bg-white/5 backdrop-blur-sm">
                 <div className="w-full h-full rounded-full border-4 border-gold-500/50 overflow-hidden shadow-2xl bg-gradient-to-b from-slate-700 to-slate-900 relative">
                    {/* User Provided Agent Photo - using lh3 proxy link */}
                    <img 
                        src="https://lh3.googleusercontent.com/d/14ZG5_CylA1GfqQZlYMoT02quzvJqUS16"
                        alt="Carlos Uzcategui"
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                    />
                 </div>
             </div>

             {/* Experience Badge Floating */}
             <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute top-10 right-10 z-20 bg-gradient-to-br from-white to-slate-100 p-4 rounded-2xl shadow-2xl border border-white/50 text-center"
             >
                <div className="bg-gold-100 p-2 rounded-full inline-block mb-1">
                    <Award className="text-gold-600 w-6 h-6" />
                </div>
                <p className="text-navy-900 font-bold leading-none text-lg">Since</p>
                <p className="text-gold-600 font-black text-2xl">2001</p>
             </motion.div>

             {/* Status Badge */}
             <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 -left-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center space-x-3 border border-slate-100"
             >
                <div className="bg-green-100 p-2 rounded-full">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">Status</p>
                    <p className="text-sm font-bold text-slate-900">Accepting New Clients</p>
                </div>
             </motion.div>
        </motion.div>

      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};