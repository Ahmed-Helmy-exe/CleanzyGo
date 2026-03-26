import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Welcome back!" });
      navigate("/");
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Account created!", description: "You can now log in." });
    }, 800);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <section className="flex items-center justify-center py-20">
        <div className="mx-auto w-full max-w-md px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">Welcome to CleanzyGo</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your bookings</p>
          </div>

          <Tabs defaultValue="login" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="mt-4 space-y-4">
                <div><Label>Email</Label><Input type="email" placeholder="you@example.com" required /></div>
                <div><Label>Password</Label><Input type="password" placeholder="••••••••" required /></div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-hero text-primary-foreground">
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="mt-4 space-y-4">
                <div><Label>Full Name</Label><Input placeholder="Your name" required /></div>
                <div><Label>Email</Label><Input type="email" placeholder="you@example.com" required /></div>
                <div><Label>Phone</Label><Input type="tel" placeholder="+971 50 XXX XXXX" required /></div>
                <div><Label>Password</Label><Input type="password" placeholder="••••••••" required /></div>
                <Button type="submit" disabled={loading} className="w-full bg-gradient-hero text-primary-foreground">
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
}
