import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function FreeAudit() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    auditNotes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit request");
      }

      toast({
        title: "Request received",
        description: "Thank you! We'll review your site and get back shortly.",
      });

      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        industry: "",
        auditNotes: "",
      });
    } catch (err: any) {
      console.error("Audit form error:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Failed to submit request. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Free Audit Request</CardTitle>
          <CardDescription>
            Provide some basic information and we'll perform a complimentary audit of your current setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <Input
              placeholder="Contact Name"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              placeholder="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Additional notes or specific areas of concern"
              name="auditNotes"
              rows={4}
              value={formData.auditNotes}
              onChange={handleChange}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Request Free Audit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
