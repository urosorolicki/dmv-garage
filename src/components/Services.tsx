import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import serviceLed from "@/assets/service-led.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceDiagnostics from "@/assets/service-diagnostics.jpg";
import serviceChiptuning from "@/assets/service-chiptuning.jpg";

const services = [
  {
    num: "01",
    title: "LED Svetla & Oprema",
    description:
      "Profesionalna ugradnja premium LED svetala i dodatne opreme. Povećajte vidljivost i dajte svom vozilu agresivan, moderan izgled.",
    image: serviceLed,
  },
  {
    num: "02",
    title: "Promena Boje Enterijera",
    description:
      "Kompletna transformacija unutrašnjosti — tabla, prekidači, dekorativne lajsne i trim elementi. Carbon fiber, piano black, mat ili sjajni finiš po vašoj želji.",
    image: serviceInterior,
  },
  {
    num: "03",
    title: "Auto Elektronika & Dijagnostika",
    description:
      "Napredna dijagnostika i rešavanje svih elektronskih problema. Kodiranje, aktivacija skrivenih opcija i precizna analiza sistema.",
    image: serviceDiagnostics,
  },
  {
    num: "04",
    title: "Custom Chiptuning",
    description:
      "Povećanje performansi kroz profesionalno podešavanje ECU-a. Više snage, bolji odziv, optimizovana potrošnja — rešenja prilagođena vašem vozilu.",
    image: serviceChiptuning,
  },
];

const ServiceRow = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px] ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1 }}
        className={`service-image-wrapper h-[300px] lg:h-auto ${isReversed ? "lg:order-2" : ""}`}
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Text */}
      <div
        className={`flex flex-col justify-center px-6 md:px-16 lg:px-20 py-12 lg:py-0 ${
          isReversed ? "lg:order-1 lg:text-right lg:items-end" : ""
        }`}
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-7xl md:text-8xl text-accent/20 mb-4"
        >
          {service.num}
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-3xl md:text-5xl text-foreground mb-6 uppercase"
        >
          {service.title}
        </motion.h3>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`line-accent mb-6 ${isReversed ? "lg:origin-right" : "origin-left"}`}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-md"
        >
          {service.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section id="usluge" className="section-spacing">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-20">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block">
            Naše Usluge
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground uppercase">
            Šta <span className="text-accent-gradient">Radimo</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-1">
        {services.map((service, i) => (
          <ServiceRow key={service.num} service={service} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Services;
