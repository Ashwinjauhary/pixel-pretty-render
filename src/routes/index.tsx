import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Video, Mic, Volume2, ShieldAlert, ArrowRight, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SignBridge — A live ISL interpreter in every video call" },
      {
        name: "description",
        content:
          "250 interpreters for 18 million Deaf Indians. SignBridge turns Indian Sign Language into live captions and speech inside video calls, and speech back into sign cues.",
      },
      {
        property: "og:title",
        content: "SignBridge — A live ISL interpreter in every video call",
      },
      {
        property: "og:description",
        content:
          "Real-time Indian Sign Language translation for online classes, interviews, and meetings. Working browser prototype.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <div className="relative min-h-[calc(100vh-73px)] bg-[#050906] overflow-hidden font-sans text-slate-200">
        
        {/* Background Layer: The GTA image with strong styling */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: "url('/gta_bg.jpg')" }}
        />
        
        {/* Cinematic Vignette & Gradient */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050906_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050906] via-[#050906]/60 to-transparent pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-24 min-h-[calc(100vh-73px)] flex flex-col justify-center">
          
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="flex-1 space-y-10 relative">
              <div className="absolute -inset-10 bg-green-500/10 blur-3xl rounded-full opacity-50 mix-blend-screen pointer-events-none" />
              
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#4CAF50]/30 bg-[#4CAF50]/10 backdrop-blur-md mb-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4CAF50] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4CAF50]"></span>
                  </span>
                  <span className="font-beckett font-medium tracking-[0.2em] text-lg text-[#4CAF50] uppercase">Grand Hack IPEC 2026</span>
                </div>
                
                <h1 className="text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 drop-shadow-2xl">
                  <span className="font-pricedown lowercase">The Silent</span> <br/>
                  <span className="font-diploma capitalize text-transparent bg-clip-text bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] drop-shadow-[0_0_25px_rgba(76,175,80,0.4)]">Gap in Tech</span>
                </h1>
                
                <p className="mt-8 text-xl lg:text-2xl text-gray-400 max-w-2xl font-light leading-relaxed border-l-4 border-[#4CAF50]/50 pl-6">
                  India has <span className="text-[#FFC107] font-semibold drop-shadow-[0_0_8px_rgba(255,193,7,0.3)]">63M</span> people with hearing impairment, and <span className="text-[#FFC107] font-semibold drop-shadow-[0_0_8px_rgba(255,193,7,0.3)]">18M</span> rely on ISL. 
                  Yet, we only have <span className="text-[#FFC107] font-semibold drop-shadow-[0_0_8px_rgba(255,193,7,0.3)]">250</span> certified interpreters nationwide. <br/>
                  <span className="block mt-4 text-white font-medium">Interpreter-to-Deaf ratio: <span className="text-[#FFC107] font-bold text-3xl ml-2 tracking-tight">1:72,000</span></span>
                </p>

                <div className="pt-12 flex gap-4">
                  <Link to="/call" className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#4CAF50] text-black font-bank text-2xl uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(76,175,80,0.6)] hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-3">
                      Start Translation <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Glass Cards Grid */}
            <div className="flex-1 w-full relative">
              
              <div className="grid gap-6">
                
                {/* Horizontal Card 1 */}
                <div className="group relative p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-[#4CAF50]/50 transition-all duration-500 overflow-hidden hover:bg-black/80 hover:scale-[1.02] shadow-2xl">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#4CAF50] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex gap-6 items-start">
                    <div className="p-5 rounded-2xl bg-[#4CAF50]/10 border border-[#4CAF50]/20 group-hover:bg-[#4CAF50]/20 group-hover:border-[#4CAF50]/40 transition-colors shrink-0 shadow-[0_0_20px_rgba(76,175,80,0.1)]">
                      <Volume2 className="w-8 h-8 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-bank text-3xl uppercase tracking-wider text-white mb-3">Sign to Speech</h3>
                      <p className="text-gray-400 leading-relaxed text-lg font-light">
                        Camera captures signing. The engine recognizes gestures in real-time and injects <strong className="text-gray-200">live captions</strong> plus <strong className="text-gray-200">synthesized speech</strong> into the call.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Horizontal Card 2 */}
                <div className="group relative p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-[#FFC107]/50 transition-all duration-500 overflow-hidden hover:bg-black/80 hover:scale-[1.02] shadow-2xl xl:-translate-x-12">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FFC107] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex gap-6 items-start">
                    <div className="p-5 rounded-2xl bg-[#FFC107]/10 border border-[#FFC107]/20 group-hover:bg-[#FFC107]/20 group-hover:border-[#FFC107]/40 transition-colors shrink-0 shadow-[0_0_20px_rgba(255,193,7,0.1)]">
                      <Mic className="w-8 h-8 text-[#FFC107]" />
                    </div>
                    <div>
                      <h3 className="font-bank text-3xl uppercase tracking-wider text-white mb-3">Speech to Sign</h3>
                      <p className="text-gray-400 leading-relaxed text-lg font-light">
                        Hearing participant's speech is transcribed via Web Speech API and presented as <strong className="text-gray-200">highly simplified text</strong> and <strong className="text-gray-200">icon cues</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Horizontal Card 3 */}
                <div className="group relative p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden hover:bg-black/80 hover:scale-[1.02] shadow-2xl">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="flex gap-6 items-start">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shrink-0">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bank text-3xl uppercase tracking-wider text-white mb-3 flex flex-wrap items-center gap-4">
                        Phase-1 MVP
                        <span className="font-sans text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full border border-red-500/20 tracking-widest font-semibold flex items-center gap-2">
                          <ShieldAlert className="w-3 h-3" /> HONEST SCOPING
                        </span>
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg font-light">
                        A closed vocabulary of <strong className="text-white">20-35 high-frequency signs</strong>. We avoid the unsolved research problem of open-vocab translation.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </SiteShell>
  );
}
