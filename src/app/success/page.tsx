'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Crown, Sparkles } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Ativar plano premium no localStorage
    localStorage.setItem('userPlan', 'premium');

    // Countdown para redirecionar
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 sm:p-12 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          🎉 Pagamento Confirmado!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Bem-vindo ao <span className="font-bold text-orange-600">FitnessPro Premium</span>!
          <br />
          Agora você tem acesso completo a todos os recursos.
        </p>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-gray-800">Você desbloqueou:</h2>
          </div>
          <ul className="space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-center gap-2 text-gray-700">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Todos os exercícios e vídeos
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Planos de treino personalizados
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Planos de nutrição completos
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Suporte prioritário
            </li>
          </ul>
        </div>

        {/* Redirect Info */}
        <p className="text-gray-600 mb-6">
          Redirecionando para o app em <span className="font-bold text-orange-600">{countdown}</span> segundos...
        </p>

        {/* Button */}
        <Button
          onClick={() => router.push('/')}
          className="w-full sm:w-auto px-8 h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
        >
          <Crown className="w-5 h-5 mr-2" />
          Começar Agora
        </Button>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-8">
          Um email de confirmação foi enviado para você.
        </p>
      </Card>
    </div>
  );
}
