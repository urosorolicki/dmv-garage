import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import serviceLed from "@/assets/service-led.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceDiagnostics from "@/assets/service-diagnostics.jpg";
import serviceChiptuning from "@/assets/service-chiptuning.jpg";

const services = [
  {
    title: "LED Svetla & Oprema",
    icon: "💡",
    description:
      "Profesionalna ugradnja premium LED svetala i dodatne opreme. Povećajte vidljivost i dajte svom vozilu moderan izgled.",
    image: serviceLed,
  },
  {
    title: "Enterijer — Zamena Boje",
    icon: "🔹",
    description:
      "Kompletna transformacija enterijera vašeg vozila. Kožni elementi, presvlake i detalji po vašoj meri.",
    image: serviceInterior,
  },
  {
    title: "Auto Elektronika & Dijagnostika",
    icon: "💻",
    description:
      "Napredna dijagnostika i rešavanje svih elektronskih problema. Precizna analiza i brzo otklanjanje kvarova.",
    image: serviceDiagnostics,
  },
  {
    title: "Custom Chiptuning",
    icon: "🚀",
    description:
      "Povećanje performansi motora kroz profesionalno podešavanje ECU-a. Više snage, bolji odziv, optimizovana potrošnja.",
    image: serviceChiptuning,
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="card-luxury group"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />
        <span className="absolute top-4 right-4 text-3xl">{service.icon}</span>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
          {service.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="usluge" className="section-padding bg-background relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Šta radimo
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Naše <span className="text-gradient">Usluge</span>
          </h2>
          <div className="divider-luxury max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
