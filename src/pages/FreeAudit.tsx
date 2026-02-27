import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

const FreeAudit = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", website: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Audit requested!", description: "Our team will analyze your website and get back to you within 48 hours." });
    setForm({ name: "", email: "", website: "", phone: "" });
  };

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-screen flex items-center hero-gradient">
        <div className="absolute inset-0 z-0"><img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-b from-[hsl(213,80%,5%)] via-transparent to-[hsl(213,80%,5%)]" /></div>
        <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">Free Offer</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-dark mb-6">Get Your Free SEO & Marketing Audit</h1>
              <p className="text-on-dark-muted text-lg mb-8">Discover exactly what's holding your website back and get a custom roadmap to 10x your online growth.</p>
              <ul className="space-y-3">
                {["Complete website SEO analysis", "Competitor benchmarking", "Content gap analysis", "Technical performance review", "Custom growth recommendations"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-on-dark"><Check className="w-5 h-5 text-cyan" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[hsl(var(--navy)/0.7)] border border-[hsl(var(--navy-light)/0.3)] backdrop-blur-sm space-y-4">
                <h3 className="font-heading font-bold text-xl text-on-dark mb-2">Claim Your Free Audit</h3>
                <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                <Input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                <Input placeholder="Website URL" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} required className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                <Input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                <Button type="submit" size="lg" className="w-full gradient-cyan text-accent-foreground font-semibold glow-cyan">Get Free Audit <ArrowRight className="ml-2 w-4 h-4" /></Button>
                <p className="text-xs text-on-dark-muted text-center">No spam. We respect your privacy.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeAudit;
