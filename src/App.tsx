import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import VerifyCode from "./pages/auth/VerifyCode";
import VerifyCodeEmail from "./pages/auth/VerifyCodeEmail";
import VerifyPhone from "./pages/auth/VerifyPhone";
import Password from "./pages/auth/Password";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import Auth from "./pages/auth/intermediaria";
// **Importação do Logo Adicionada (ajuste o caminho conforme necessário)**
import Logo from "@/components/Logo"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
 
        <header className="border-b border-border p-4">
          <Logo />
        </header>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/auth/verify-code-email" element={<VerifyCodeEmail />} />
          <Route path="/auth/verify-code" element={<VerifyCode />} />
          <Route path="/auth/verify-phone" element={<VerifyPhone />} />
          <Route path="/auth/password" element={<Password />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;