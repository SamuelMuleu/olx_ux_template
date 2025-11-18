import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { MessageSquare, Lock, Info, ChevronRight } from "lucide-react";
import msg from "../../assets/msg.png";
import senha from "../../assets/senha.png";

const Login = () => {
  const navigate = useNavigate();
  const [email] = useState("hahajshsga@genail.com");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <Logo />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-semibold text-foreground">
              Acesse sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Escolha um método de acesso para a conta
            </p>
            <div className="bg-muted/30 rounded-full px-4 py-2 inline-block">
              <span className="text-sm text-foreground">{email}</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* E-mail Option */}
            <button
              onClick={() => navigate("/auth/verify-code-email")}
              className="w-full p-4 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors flex items-center gap-4 group"
            >
              
             <img src={msg} alt="" />
          
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">E-mail</h3>
                <p className="text-sm text-muted-foreground">
                  Enviaremos um código para o seu e-mail
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            {/* Senha Option */}
            <button
              onClick={() => navigate("/auth/password")}
              className="w-full p-4 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors flex items-center gap-4 group"
            >
              
               <img src={senha} alt="" />
            
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">Senha</h3>
                <p className="text-sm text-muted-foreground">
                  Informe sua senha atual
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            {/* SMS Option - Disabled */}
            <button
              disabled
              className="w-full p-4 bg-card border border-border rounded-lg opacity-50 cursor-not-allowed flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-muted-foreground">SMS</h3>
                <p className="text-sm text-muted-foreground">
                  Enviaremos um código para o seu número cadastrado
                </p>
              </div>
              <Info className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          </div>

        <div className="pt-4 flex items-center justify-center ">
    <Button
    
      variant="ghost"
      onClick={() => navigate("/")}
     
      className="flex items-center justify-center text-[#5C307F] hover:text-[#5C307F]/80"
    >
      Voltar
    </Button>
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
            da OLX e seus parceiros, e em receber
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
