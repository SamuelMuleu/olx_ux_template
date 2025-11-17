import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border p-4">
        <Logo />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-4xl font-bold text-foreground">
            Bem-vindo ao OLX
          </h1>
          <p className="text-lg text-muted-foreground">
            Compre e venda com facilidade
          </p>
          
          <div className="space-y-3 pt-8">
            <Button 
              onClick={() => navigate("/auth")}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-normal rounded-lg"
            >
              Entrar
            </Button>
            
            <Button 
              onClick={() => navigate("/auth/signup")}
              variant="outline"
              className="w-full h-12 border-primary text-primary hover:bg-primary/5 font-normal rounded-lg"
            >
              Criar conta
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
