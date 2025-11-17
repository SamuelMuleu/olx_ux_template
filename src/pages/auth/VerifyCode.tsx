import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import { toast } from "sonner";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all 6 digits are filled
    if (newCode.every(digit => digit !== "") && index === 5) {
      setTimeout(() => {
        toast.success("Código verificado!");
        navigate("/auth/verify-phone");
      }, 500);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    toast.success("Código reenviado!");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
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
              Código de verificação
            </h1>
            <p className="text-sm text-muted-foreground">
              Insira o código recebido no número (**) ***-****
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-14 text-center text-xl font-semibold rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent ${
                  digit ? "border-accent" : "border-input"
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Não recebeu?{" "}
              <button
                onClick={handleResend}
                className="text-accent hover:underline font-normal"
              >
                Reenviar código
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyCode;
