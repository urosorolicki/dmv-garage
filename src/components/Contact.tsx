import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock, Instagram, ArrowUpRight } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Telefon", value: "+381 XX XXX XXXX", href: "tel:+381XXXXXXXX" },
  { icon: MapPin, label: "Lokacija", value: "Beograd, Srbija", href: "#" },
  { icon: Clock, label: "Radno Vreme", value: "Pon — Sub: 09–18h", href: "#" },
  { icon: Instagram, label: "Instagram", value: "@dmvgarage", href: "https://instagram.com/dmvgarage" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="kontakt" className="section-spacing border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-body text-[11px] tracking-[0.3em] uppercase text-accent mb-4 block">
            Kontakt
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground uppercase mb-16">
            Javite <span className="text-accent-gradient">Se</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="bg-background p-8 md:p-12 flex items-start gap-6 group hover:bg-card transition-colors duration-500 cursor-pointer"
            >
              <item.icon className="w-5 h-5 text-accent mt-1 shrink-0" />
              <div className="flex-1">
                <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {item.label}
                </p>
                <p className="font-body text-lg md:text-xl text-foreground font-light">
                  {item.value}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 mt-1" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-28 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-2xl tracking-wider text-foreground">
            DMV GARAGE
          </span>
          <p className="font-body text-[11px] text-muted-foreground tracking-wider">
            © 2025 DMV GARAGE — SVA PRAVA ZADRŽANA
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
