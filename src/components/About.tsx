import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { target: 500, suffix: "+", label: "Zadovoljnih Klijenata" },
  { target: 10, suffix: "+", label: "Godina Iskustva" },
  { target: 1000, suffix: "+", label: "Završenih Projekata" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return (
    <span ref={ref} className="font-display text-5xl md:text-7xl text-foreground">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="o-nama" className="section-spacing relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block">
            O Nama
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <h2 className="font-display text-5xl md:text-7xl text-foreground uppercase leading-[0.9]">
              Strast Za<br />
              <span className="text-accent-gradient">Savršenstvom</span>
            </h2>
            <div className="flex flex-col justify-end">
              <p className="font-body text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-lg">
                DMV Garage je specijalizovani auto servis gde se strast prema automobilima
                spaja sa najnovijim tehnologijama. Od ugradnje LED svetala, preko transformacije
                enterijera, do naprednog chiptuninga — svaki projekat završavamo sa
                istim ciljem: da vaše vozilo bude savršeno.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="counter-box bg-background"
            >
              <Counter target={stat.target} suffix={stat.suffix} />
              <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-4">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
