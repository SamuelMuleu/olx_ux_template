import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { Phone } from "lucide-react";
import { toast } from "sonner";

const VerifyPhone = () => {
  const navigate = useNavigate();
  const [phone] = useState("(**) ****-****");

  const handleSendCode = () => {
    toast.success("Código enviado para seu telefone!");
    // In a real app, this would send SMS
    setTimeout(() => {
      navigate("/auth/verify-code");
    }, 1500);
  };

  const handleBack = () => {
    navigate("/auth/verify-code");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <Logo />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Verificação de Telefone
            </h1>
            <p className="text-sm text-muted-foreground">
              Enviaremos um código por SMS para seu número.
              <br />
              Em caso de telefone fixo, ligaremos
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-4 flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <span className="text-foreground">{phone}</span>
          </div>

          <div className="text-center">
            <button className="text-accent hover:underline text-sm">
              Não tem mais acesso ao telefone?
            </button>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleSendCode}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal rounded-lg"
            >
              Enviar código
            </Button>

            <Button 
            onClick={() => navigate("/auth")}
              variant="outline"
              className="w-full h-12 border-primary text-primary hover:bg-primary/5 font-normal rounded-lg"
            >
              Voltar
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyPhone;
