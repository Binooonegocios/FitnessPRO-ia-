'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, User, Target, TrendingUp } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    level: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salvar dados no localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('hasCompletedOnboarding', 'true');
    
    // Redirecionar para dashboard
    onComplete();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name && formData.age && formData.weight && 
                      formData.height && formData.goal && formData.level;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-8 text-white text-center">
          <Dumbbell className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Bem-vindo ao FitnessPro!</h1>
          <p className="text-white/90 text-lg">Vamos personalizar sua experiência</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" />
              Nome Completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="h-12 text-lg border-2 focus:border-orange-500"
              required
            />
          </div>

          {/* Idade e Peso */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-700 font-medium">
                Idade
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Ex: 25"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="h-12 text-lg border-2 focus:border-orange-500"
                min="10"
                max="120"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-gray-700 font-medium">
                Peso (kg)
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder="Ex: 70"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                className="h-12 text-lg border-2 focus:border-orange-500"
                min="30"
                max="300"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Altura */}
          <div className="space-y-2">
            <Label htmlFor="height" className="text-gray-700 font-medium">
              Altura (cm)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="Ex: 175"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              className="h-12 text-lg border-2 focus:border-orange-500"
              min="100"
              max="250"
              required
            />
          </div>

          {/* Objetivo */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-pink-500" />
              Objetivo
            </Label>
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
          </div>

          {/* Nível de Treino */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              Nível de Treino
            </Label>
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
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
}
