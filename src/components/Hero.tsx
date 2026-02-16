import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import carProfile from "@/assets/car-profile.png";

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex flex-col justify-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroBg}
          alt="DMV Garage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
      </div>

      {/* Car animation strip */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none">
        <div className="car-slide">
          <img src={carProfile} alt="" className="h-24 md:h-40 w-auto opacity-30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mb-6"
        >
          <span className="line-accent reveal-line origin-left" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] text-foreground"
          >
            PRECIZNOST
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.85] text-accent-gradient"
          >
            PERFORMANSE
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-body text-sm md:text-base font-light text-muted-foreground mt-8 max-w-md tracking-wide leading-relaxed"
        >
          Premium auto servis — LED svetla, enterijer, dijagnostika i chiptuning.
          Vaš automobil zaslužuje najviši standard.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          whileHover={{ x: 8 }}
          onClick={() => document.querySelector("#usluge")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 font-body text-xs tracking-[0.3em] uppercase text-foreground flex items-center gap-4 group"
        >
          <span className="w-8 h-px bg-accent group-hover:w-14 transition-all duration-300" />
          Otkrijte više
        </motion.button>
      </div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute right-6 md:right-10 bottom-16 flex flex-col items-center gap-3"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.div
          animate={{ height: [16, 32, 16] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px bg-accent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
