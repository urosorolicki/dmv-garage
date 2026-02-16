import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock, Instagram } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Telefon", value: "+381 XX XXX XXXX" },
  { icon: MapPin, label: "Lokacija", value: "Beograd, Srbija" },
  { icon: Clock, label: "Radno vreme", value: "Pon - Sub: 09:00 - 18:00" },
  { icon: Instagram, label: "Instagram", value: "@dmvgarage" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="kontakt" className="section-padding bg-card relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Kontakt
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Javite Nam <span className="text-gradient">Se</span>
          </h2>
          <div className="divider-luxury max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-luxury p-8 text-center group"
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                {item.label}
              </p>
              <p className="font-body text-sm text-foreground">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-xl font-bold text-foreground">
            DMV <span className="text-gradient">Garage</span>
          </p>
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © 2025 DMV Garage. Sva prava zadržana.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
