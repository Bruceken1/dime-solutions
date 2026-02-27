import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="overflow-hidden">
      <section className="hero-gradient pt-32 pb-16 section-padding">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
            <span className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 block">Contact Us</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-on-dark mb-6">Let's Grow Together</h1>
            <p className="text-on-dark-muted text-lg">Ready to take your digital marketing to the next level? Get in touch.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-dark section-padding">
        <div className="container-wide max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                  <Input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                </div>
                <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                <Textarea placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--navy-light)/0.3)] text-on-dark placeholder:text-on-dark-muted" />
                <Button type="submit" size="lg" className="gradient-cyan text-accent-foreground font-semibold w-full sm:w-auto px-8 glow-cyan">Send Message</Button>
              </form>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, label: "Mombasa Office", value: "Nyali Business Center, Mombasa" },
                { icon: MapPin, label: "Nairobi Office", value: "Westlands, The Oval Building" },
                { icon: Phone, label: "Phone", value: "+254 700 000 000" },
                { icon: Mail, label: "Email", value: "hello@dimesolutions.co.ke" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg gradient-cyan flex items-center justify-center flex-shrink-0"><item.icon className="w-5 h-5 text-accent-foreground" /></div>
                  <div><p className="font-heading font-semibold text-sm text-on-dark">{item.label}</p><p className="text-sm text-on-dark-muted">{item.value}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
