'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Crown, Check, ArrowLeft, Sparkles } from 'lucide-react';

interface PremiumProps {
  onBack: () => void;
}

export default function Premium({ onBack }: PremiumProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    // Links diretos do Stripe Checkout
    const checkoutLinks = {
      monthly: 'https://buy.stripe.com/3cI28t51h8CY6D49x9c3m00',
      annual: 'https://buy.stripe.com/14A7sNdxN3iE4uW10Dc3m01'
    };

    // Redirecionar diretamente para o checkout do Stripe
    window.location.href = checkoutLinks[plan];
  };

  const benefits = [
    'Acesso completo a todos os exercícios',
    'Vídeos demonstrativos de alta qualidade',
    'Planos de treino personalizados',
    'Planos de nutrição detalhados',
    'Receitas e cardápios completos',
    'Contador de macros e calorias',
    'Lista de compras automática',
    'Suporte prioritário',
    'Atualizações exclusivas',
    'Sem anúncios'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/20 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-4">
            <Crown className="w-12 h-12 text-gray-900" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            FitnessPro Premium
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Desbloqueie todo o potencial do seu treino com acesso ilimitado a todos os recursos
          </p>
        </div>

        {/* Benefits Grid */}
        <Card className="p-6 sm:p-8 mb-8 bg-white/95 backdrop-blur">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Benefícios Premium
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Plan */}
          <Card className={`p-8 transition-all cursor-pointer ${
            selectedPlan === 'monthly' 
              ? 'ring-4 ring-yellow-400 shadow-2xl scale-105' 
              : 'hover:shadow-xl hover:scale-102'
          }`}
          onClick={() => setSelectedPlan('monthly')}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Plano Mensal</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-orange-600">R$ 59</span>
                <span className="text-gray-600">,90/mês</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                Acesso total por 30 dias
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                Renovação automática
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                Cancele quando quiser
              </li>
            </ul>
            <Button
              onClick={() => handleSubscribe('monthly')}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar Mensal
            </Button>
          </Card>

          {/* Annual Plan */}
          <Card className={`p-8 transition-all cursor-pointer relative ${
            selectedPlan === 'annual' 
              ? 'ring-4 ring-yellow-400 shadow-2xl scale-105' 
              : 'hover:shadow-xl hover:scale-102'
          }`}
          onClick={() => setSelectedPlan('annual')}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🎉 Melhor Valor - Economize 30%
              </div>
            </div>

            <div className="text-center mb-6 mt-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Plano Anual</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-green-600">R$ 499</span>
                <span className="text-gray-600">,90/ano</span>
              </div>
              <p className="text-sm text-green-600 font-medium mt-2">
                Apenas R$ 41,66/mês
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                Acesso total por 12 meses
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                Economize R$ 218,90
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <Check className="w-5 h-5 text-green-500" />
                Melhor custo-benefício
              </li>
            </ul>
            <Button
              onClick={() => handleSubscribe('annual')}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar Anual
            </Button>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            💳 Pagamento seguro via Stripe • 🔒 Dados criptografados • ✅ Garantia de 7 dias
          </p>
        </div>
      </div>
    </div>
  );
}
