import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor, insira seu e-mail");
      return;
    }
    
    if (!email.includes("@")) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }
    
    // Simulate email check and redirect to verification
    navigate("/auth/verify-code");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <Logo />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-8">
              Acessar sua conta
            </h1>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal text-foreground">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-lg border-input"
                placeholder=""
              />
            </div>

            <Button 
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal rounded-lg"
            >
              Continuar
            </Button>
          </form>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <button
                onClick={() => navigate("/auth/signup")}
                className="text-accent hover:underline font-normal"
              >
                Cadastre-se
              </button>
            </p>

            <button className="w-full py-3 bg-secondary hover:bg-secondary/80 text-muted-foreground rounded-lg text-sm font-normal flex items-center justify-center gap-2">
              Preciso de ajuda
              <span className="text-lg">›</span>
            </button>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4">
            Ao continuar, você concorda com os{" "}
            <a href="#" className="text-accent hover:underline">
              Termos de Uso
            </a>{" "}
            e a{" "}
            <a href="#" className="text-accent hover:underline">
              Política de Privacidade
            </a>{" "}
            da OLX e seus parceiros, e em receber...
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
