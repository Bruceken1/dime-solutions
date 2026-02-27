import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Target, Share2, PenTool, Mail, Globe, BarChart3, Video, TrendingUp, Palette, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const allServices = [
  { icon: Search, title: "Search Engine Optimization", desc: "Dominate organic search results with technical SEO, content optimization, and link building strategies.", path: "/services/seo" },
  { icon: Target, title: "Google Ads & PPC", desc: "High-ROI paid advertising campaigns across Google, YouTube, and Display networks.", path: "/services/ppc" },
  { icon: Share2, title: "Social Media Marketing", desc: "Build your brand and engage audiences on Instagram, Facebook, LinkedIn, TikTok, and X.", path: "/services/social-media" },
  { icon: PenTool, title: "Content Marketing", desc: "Strategic content creation including blogs, whitepapers, infographics, and copywriting.", path: "/services/content" },
  { icon: Mail, title: "Email Marketing", desc: "Automated email sequences, newsletters, and drip campaigns that convert.", path: "/services/email" },
  { icon: Globe, title: "Web Design & Development", desc: "Beautiful, fast, conversion-optimized websites and landing pages.", path: "/services/web-design" },
  { icon: BarChart3, title: "Analytics & CRO", desc: "GA4 setup, conversion tracking, A/B testing, and data-driven optimization.", path: "/services/analytics" },
  { icon: Video, title: "Video & YouTube Marketing", desc: "Professional video production, YouTube strategy, and short-form video content.", path: "/services/video" },
  { icon: TrendingUp, title: "Influencer Marketing", desc: "Connect with relevant influencers to amplify your brand reach.", path: "/services/influencer" },
  { icon: Palette, title: "Brand Strategy & Identity", desc: "Logo design, brand guidelines, messaging frameworks, and visual identity.", path: "/services/brand-strategy" },
];

const Services = () => (
  <div className="overflow-hidden">
    <section className="hero-gradient pt-32 pb-16 section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <span className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">Our Services</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-on-dark mb-6">Full-Stack Digital Marketing Solutions</h1>
          <p className="text-on-dark-muted text-lg">Everything you need to dominate your market online. From SEO to social media, we've got you covered.</p>
        </motion.div>
      </div>
    </section>

    <section className="section-dark section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allServices.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={service.path} className="flex gap-5 p-6 rounded-2xl bg-[hsl(var(--navy)/0.5)] border border-[hsl(var(--navy-light)/0.3)] card-hover group">
                <div className="w-14 h-14 rounded-xl gradient-cyan flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-on-dark mb-2 group-hover:text-cyan transition-colors">{service.title}</h3>
                  <p className="text-sm text-on-dark-muted leading-relaxed">{service.desc}</p>
                  <span className="inline-flex items-center gap-1 text-cyan text-sm font-medium mt-3">Learn more <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
