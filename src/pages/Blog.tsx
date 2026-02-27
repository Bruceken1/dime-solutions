import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const posts = [
  { title: "10 SEO Strategies That Actually Work in 2025", cat: "SEO", date: "Feb 20, 2025", excerpt: "Discover the latest SEO tactics that are driving results for businesses in East Africa." },
  { title: "How to Create a Social Media Strategy That Converts", cat: "Social Media", date: "Feb 15, 2025", excerpt: "A step-by-step guide to building a social media presence that drives real business results." },
  { title: "Google Ads vs. Meta Ads: Which Is Right for You?", cat: "PPC", date: "Feb 10, 2025", excerpt: "Comparing the two biggest advertising platforms to help you decide where to invest." },
  { title: "Email Marketing Automation: A Complete Guide", cat: "Email Marketing", date: "Feb 5, 2025", excerpt: "Learn how to set up automated email flows that nurture leads while you sleep." },
  { title: "The Rise of Short-Form Video in Kenya", cat: "Trends", date: "Jan 30, 2025", excerpt: "How TikTok and Instagram Reels are reshaping digital marketing in East Africa." },
  { title: "Content Marketing ROI: How to Measure What Matters", cat: "Content", date: "Jan 25, 2025", excerpt: "The key metrics you should be tracking to prove your content marketing is working." },
];

const Blog = () => (
  <div className="overflow-hidden">
    <section className="hero-gradient pt-32 pb-16 section-padding">
      <div className="container-wide">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
          <span className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">Blog & Resources</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-dark mb-6">Insights & Strategies</h1>
          <p className="text-on-dark-muted text-lg">Expert tips, industry insights, and actionable strategies to grow your business online.</p>
        </motion.div>
      </div>
    </section>
    <section className="section-dark section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-[hsl(var(--navy)/0.5)] border border-[hsl(var(--navy-light)/0.3)] card-hover group cursor-pointer">
              <span className="text-cyan text-xs font-semibold uppercase tracking-wider">{post.cat}</span>
              <h3 className="font-heading font-semibold text-on-dark mt-2 mb-3 group-hover:text-cyan transition-colors">{post.title}</h3>
              <p className="text-sm text-on-dark-muted leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-xs text-on-dark-muted">{post.date}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
