'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Apple, Lock, Crown, Coffee, Utensils, Moon } from 'lucide-react';

interface NutritionProps {
  onPremiumClick: () => void;
}

export default function Nutrition({ onPremiumClick }: NutritionProps) {
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [userGoal, setUserGoal] = useState<string>('');
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    // Carregar plano do usuário
    const plan = localStorage.getItem('userPlan') || 'free';
    setUserPlan(plan as 'free' | 'premium');

    // Carregar objetivo do usuário
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      const data = JSON.parse(profile);
      setUserGoal(data.goal);
    }
  }, []);

  const getGoalName = (goal: string) => {
    const goals: Record<string, string> = {
      gain: 'Ganho de Massa',
      loss: 'Perda de Peso',
      maintain: 'Manutenção'
    };
    return goals[goal] || 'Seu Objetivo';
  };

  const getCalorieTarget = (goal: string) => {
    const calories: Record<string, string> = {
      gain: '2800-3200 kcal/dia',
      loss: '1600-2000 kcal/dia',
      maintain: '2200-2500 kcal/dia'
    };
    return calories[goal] || '2000-2500 kcal/dia';
  };

  const getMacros = (goal: string) => {
    const macros: Record<string, { protein: string; carbs: string; fats: string }> = {
      gain: { protein: '180-200g', carbs: '350-400g', fats: '70-90g' },
      loss: { protein: '150-180g', carbs: '120-150g', fats: '50-70g' },
      maintain: { protein: '150-170g', carbs: '250-300g', fats: '60-80g' }
    };
    return macros[goal] || macros.maintain;
  };

  const basicMeals = {
    gain: {
      breakfast: ['Ovos mexidos (4 unidades)', 'Pão integral (2 fatias)', 'Abacate (1/2)', 'Suco de laranja'],
      lunch: ['Arroz integral (2 xícaras)', 'Frango grelhado (200g)', 'Feijão (1 concha)', 'Salada verde'],
      dinner: ['Batata doce (300g)', 'Carne vermelha magra (200g)', 'Brócolis no vapor', 'Azeite'],
      snacks: ['Whey protein', 'Banana com aveia', 'Mix de castanhas', 'Iogurte grego']
    },
    loss: {
      breakfast: ['Omelete (2 ovos)', 'Pão integral (1 fatia)', 'Café sem açúcar', 'Frutas vermelhas'],
      lunch: ['Arroz integral (1 xícara)', 'Peixe grelhado (150g)', 'Salada completa', 'Legumes'],
      dinner: ['Frango grelhado (150g)', 'Salada verde', 'Legumes assados', 'Chá verde'],
      snacks: ['Frutas', 'Iogurte natural', 'Castanhas (porção pequena)', 'Cenoura baby']
    },
    maintain: {
      breakfast: ['Ovos mexidos (3 unidades)', 'Pão integral (2 fatias)', 'Café com leite', 'Frutas'],
      lunch: ['Arroz integral (1,5 xícara)', 'Frango (150g)', 'Feijão', 'Salada'],
      dinner: ['Batata doce (200g)', 'Peixe (150g)', 'Legumes', 'Salada'],
      snacks: ['Frutas', 'Iogurte', 'Mix de castanhas', 'Vitamina']
    }
  };

  const currentMeals = basicMeals[userGoal as keyof typeof basicMeals] || basicMeals.maintain;
  const macros = getMacros(userGoal);

  const handlePremiumFeatureClick = () => {
    setShowPremiumModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <Apple className="w-10 h-10 text-green-500" />
          Nutrição
        </h1>
        <p className="text-gray-600">
          Plano alimentar personalizado para {getGoalName(userGoal)}
        </p>
      </div>

      {/* Calorie Target Card */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Meta Calórica Diária</h2>
        <div className="text-4xl font-bold text-green-600 mb-2">
          {getCalorieTarget(userGoal)}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{macros.protein}</div>
            <div className="text-sm text-gray-600">Proteínas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{macros.carbs}</div>
            <div className="text-sm text-gray-600">Carboidratos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{macros.fats}</div>
            <div className="text-sm text-gray-600">Gorduras</div>
          </div>
        </div>
      </Card>

      {/* Meal Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Café da Manhã */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-bold text-gray-800">Café da Manhã</h3>
          </div>
          <ul className="space-y-2">
            {currentMeals.breakfast.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Almoço */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Utensils className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-800">Almoço</h3>
          </div>
          <ul className="space-y-2">
            {currentMeals.lunch.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Jantar */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-bold text-gray-800">Jantar</h3>
          </div>
          <ul className="space-y-2">
            {currentMeals.dinner.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Lanches */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Apple className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-bold text-gray-800">Lanches</h3>
          </div>
          <ul className="space-y-2">
            {currentMeals.snacks.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Premium Feature Card */}
      <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
        <div className="flex items-start gap-4">
          <div className="bg-yellow-400 p-3 rounded-full">
            <Crown className="w-8 h-8 text-gray-900" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Plano de Nutrição Premium
            </h3>
            <p className="text-gray-700 mb-4">
              Desbloqueie receitas detalhadas, planos alimentares personalizados, lista de compras automática e muito mais!
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                📋 Receitas Completas
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                🛒 Lista de Compras
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                📊 Contador de Macros
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                🍽️ Substituições Inteligentes
              </span>
            </div>
            {userPlan === 'free' ? (
              <Button
                onClick={handlePremiumFeatureClick}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold"
              >
                <Lock className="w-5 h-5 mr-2" />
                Desbloquear Premium
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-600 font-bold">
                <Crown className="w-5 h-5" />
                Você tem acesso Premium!
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6 bg-white">
            <div className="text-center mb-6">
              <Lock className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Função Premium!
              </h3>
              <p className="text-gray-600">
                Esta funcionalidade está disponível apenas para membros Premium. Assine para desbloquear!
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setShowPremiumModal(false);
                  onPremiumClick();
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold"
              >
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos Premium
              </Button>
              <Button
                onClick={() => setShowPremiumModal(false)}
                variant="outline"
                className="w-full"
              >
                Voltar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
