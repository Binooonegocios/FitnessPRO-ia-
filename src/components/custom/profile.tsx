'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Target, TrendingUp, Crown, Edit2, Save } from 'lucide-react';

interface ProfileProps {
  onPremiumClick: () => void;
}

export default function Profile({ onPremiumClick }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    level: ''
  });

  useEffect(() => {
    // Carregar dados do perfil
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setFormData(JSON.parse(profile));
    }

    // Carregar plano do usuário
    const plan = localStorage.getItem('userPlan') || 'free';
    setUserPlan(plan as 'free' | 'premium');
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getGoalLabel = (goal: string) => {
    const goals: Record<string, string> = {
      gain: 'Ganho de Massa 💪',
      loss: 'Perda de Peso 🔥',
      maintain: 'Manutenção ⚖️'
    };
    return goals[goal] || goal;
  };

  const getLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado'
    };
    return levels[level] || level;
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100;
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return '0';
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-600' };
    if (bmi < 25) return { label: 'Peso normal', color: 'text-green-600' };
    if (bmi < 30) return { label: 'Sobrepeso', color: 'text-yellow-600' };
    return { label: 'Obesidade', color: 'text-red-600' };
  };

  const bmi = parseFloat(calculateBMI());
  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <User className="w-10 h-10 text-blue-500" />
          Meu Perfil
        </h1>
        <p className="text-gray-600">
          Gerencie suas informações e acompanhe seu progresso
        </p>
      </div>

      {/* Account Status Card */}
      <Card className={`p-6 ${userPlan === 'premium' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300' : 'bg-gray-50 border-2 border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Status da Conta</h3>
            <div className="flex items-center gap-2">
              {userPlan === 'premium' ? (
                <>
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span className="text-xl font-bold text-yellow-600">Premium</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-xl font-bold text-gray-600">Gratuita</span>
                </>
              )}
            </div>
          </div>
          <Button
            onClick={onPremiumClick}
            className={userPlan === 'premium' ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900' : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white'}
          >
            <Crown className="w-5 h-5 mr-2" />
            {userPlan === 'premium' ? 'Gerenciar Assinatura' : 'Assinar Premium'}
          </Button>
        </div>
        {userPlan === 'free' && (
          <div className="mt-4 p-4 bg-orange-100 rounded-lg border border-orange-300">
            <p className="text-sm text-orange-800 font-medium">
              ⚠️ Atualize para Premium e tenha acesso completo a todos os exercícios, planos de nutrição e funcionalidades exclusivas!
            </p>
          </div>
        )}
      </Card>

      {/* BMI Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Índice de Massa Corporal (IMC)</h3>
        <div className="flex items-center gap-6">
          <div>
            <div className="text-4xl font-bold text-blue-600">{calculateBMI()}</div>
            <div className={`text-sm font-medium ${bmiCategory.color}`}>{bmiCategory.label}</div>
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Informações Pessoais</h3>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">Nome Completo</Label>
            {isEditing ? (
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="h-12 text-lg border-2 focus:border-orange-500"
              />
            ) : (
              <div className="h-12 flex items-center px-4 bg-gray-50 rounded-lg text-lg">
                {formData.name}
              </div>
            )}
          </div>

          {/* Idade e Peso */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-700 font-medium">Idade</Label>
              {isEditing ? (
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="h-12 text-lg border-2 focus:border-orange-500"
                />
              ) : (
                <div className="h-12 flex items-center px-4 bg-gray-50 rounded-lg text-lg">
                  {formData.age} anos
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-gray-700 font-medium">Peso</Label>
              {isEditing ? (
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  className="h-12 text-lg border-2 focus:border-orange-500"
                />
              ) : (
                <div className="h-12 flex items-center px-4 bg-gray-50 rounded-lg text-lg">
                  {formData.weight} kg
                </div>
              )}
            </div>
          </div>

          {/* Altura */}
          <div className="space-y-2">
            <Label htmlFor="height" className="text-gray-700 font-medium">Altura</Label>
            {isEditing ? (
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                className="h-12 text-lg border-2 focus:border-orange-500"
              />
            ) : (
              <div className="h-12 flex items-center px-4 bg-gray-50 rounded-lg text-lg">
                {formData.height} cm
              </div>
            )}
          </div>

          {/* Objetivo */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-pink-500" />
              Objetivo
            </Label>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'gain', label: 'Ganho de Massa', icon: '💪' },
                  { value: 'loss', label: 'Perda de Peso', icon: '🔥' },
                  { value: 'maintain', label: 'Manutenção', icon: '⚖️' }
                ].map((goal) => (
                  <button
                    key={goal.value}
                    type="button"
                    onClick={() => handleChange('goal', goal.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      formData.goal === goal.value
                        ? 'border-orange-500 bg-orange-50 shadow-lg'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{goal.icon}</div>
                    <div className="font-medium text-gray-800">{goal.label}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-12 flex items-center px-4 bg-gray-50 rounded-lg text-lg">
                {getGoalLabel(formData.goal)}
              </div>
            )}
          </div>

          {/* Nível */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Nível de Treino
            </Label>
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'beginner', label: 'Iniciante', desc: '0-6 meses' },
                  { value: 'intermediate', label: 'Intermediário', desc: '6-24 meses' },
                  { value: 'advanced', label: 'Avançado', desc: '2+ anos' }
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => handleChange('level', level.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.level === level.value
                        ? 'border-pink-500 bg-pink-50 shadow-lg'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <div className="font-medium text-gray-800 mb-1">{level.label}</div>
                    <div className="text-xs text-gray-600">{level.desc}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-12 flex items-center px-4 bg-gray-50 rounded-lg text-lg">
                {getLevelLabel(formData.level)}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
