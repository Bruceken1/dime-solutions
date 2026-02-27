import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const projects = [
  { img: portfolio1, title: "TechHub Africa", cat: "Web Design", result: "+340% Traffic", desc: "Complete website redesign and SEO overhaul for Kenya's leading tech hub." },
  { img: portfolio2, title: "Fashion Forward", cat: "E-Commerce", result: "+280% Sales", desc: "End-to-end e-commerce strategy including PPC and social media." },
  { img: portfolio3, title: "FinTech Kenya", cat: "PPC Campaign", result: "12x ROAS", desc: "Google Ads campaign delivering exceptional return on ad spend." },
  { img: portfolio1, title: "Safari Tours Ltd", cat: "SEO", result: "#1 Rankings", desc: "Dominated search results for competitive tourism keywords." },
  { img: portfolio2, title: "Urban Eats", cat: "Social Media", result: "500K Followers", desc: "Built a massive social following for Nairobi's top food delivery app." },
  { img: portfolio3, title: "EduTech Plus", cat: "Content Marketing", result: "10K Leads/mo", desc: "Content strategy that generates thousands of qualified leads monthly." },
];

const Portfolio = () => (
  <div className="overflow-hidden">
    <section className="hero-gradient pt-32 pb-16 section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <span className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">Portfolio</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-on-dark mb-6">Our Work Speaks for Itself</h1>
          <p className="text-on-dark-muted text-lg">Real results for real businesses across East Africa.</p>
        </motion.div>
      </div>
    </section>
    <section className="section-dark section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div key={p.title + i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="group rounded-2xl overflow-hidden bg-[hsl(var(--navy)/0.5)] border border-[hsl(var(--navy-light)/0.3)] card-hover">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(213,80%,5%)] to-transparent opacity-80" />
                <div className="absolute top-4 right-4"><span className="px-3 py-1 rounded-full bg-cyan/20 text-cyan text-xs font-semibold">{p.result}</span></div>
              </div>
              <div className="p-5">
                <span className="text-cyan text-xs font-semibold uppercase tracking-wider">{p.cat}</span>
                <h3 className="font-heading font-semibold text-on-dark mt-1">{p.title}</h3>
                <p className="text-sm text-on-dark-muted mt-2">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Portfolio;
