import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }
    
    if (!formData.email.includes("@")) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }
    
    toast.success("Conta criada com sucesso!");
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
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Criar sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Preencha seus dados para começar
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-normal text-foreground">
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="h-12 rounded-lg border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal text-foreground">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-12 rounded-lg border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-normal text-foreground">
                Telefone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="h-12 rounded-lg border-input"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-normal text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="h-12 rounded-lg border-input pr-10"
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

            <Button 
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal rounded-lg mt-6"
            >
              Cadastrar
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <button
                onClick={() => navigate("/auth")}
                className="text-accent hover:underline font-normal"
              >
                Fazer login
              </button>
            </p>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4">
            Ao se cadastrar, você concorda com os{" "}
            <a href="#" className="text-accent hover:underline">
              Termos de Uso
            </a>{" "}
            e a{" "}
            <a href="#" className="text-accent hover:underline">
              Política de Privacidade
            </a>{" "}
            da OLX
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
