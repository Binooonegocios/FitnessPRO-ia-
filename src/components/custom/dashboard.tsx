'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Calendar, 
  Flame, 
  Target,
  Clock,
  Award,
  Crown
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Olá, Atleta! 💪</h1>
            <p className="text-white/90 text-lg">Pronto para treinar hoje?</p>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
            <Crown className="w-4 h-4 mr-2" />
            Premium
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Flame className="w-6 h-6 mb-1" />
            <p className="text-2xl font-bold">1,250</p>
            <p className="text-sm text-white/80">Calorias</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Dumbbell className="w-6 h-6 mb-1" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-white/80">Exercícios</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Clock className="w-6 h-6 mb-1" />
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-white/80">Minutos</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Award className="w-6 h-6 mb-1" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-white/80">Dias Ativos</p>
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-orange-500" />
            Treino de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">Treino de Peito e Tríceps</h3>
              <p className="text-sm text-gray-600">6 exercícios • 45 minutos</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-300">
              Iniciante
            </Badge>
          </div>

          {/* Exercise Preview */}
          <div className="space-y-2">
            {[
              { name: 'Supino Reto', sets: '3x12', done: true },
              { name: 'Flexão de Braço', sets: '3x15', done: true },
              { name: 'Crucifixo', sets: '3x12', done: false },
              { name: 'Tríceps Testa', sets: '3x12', done: false }
            ].map((ex, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  ex.done ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {ex.done && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${ex.done ? 'line-through text-gray-500' : ''}`}>
                    {ex.name}
                  </p>
                  <p className="text-xs text-gray-600">{ex.sets}</p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
            <Dumbbell className="w-5 h-5 mr-2" />
            Iniciar Treino
          </Button>
        </CardContent>
      </Card>

      {/* Progress & Nutrition Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-pink-500" />
              Progresso Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Meta Semanal</span>
                <span className="text-sm font-bold text-orange-600">4/5 dias</span>
              </div>
              <Progress value={80} className="h-3" />
            </div>

            <div className="grid grid-cols-7 gap-2">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold ${
                    idx < 4 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg border border-orange-200">
              <p className="text-sm font-medium text-gray-700 mb-1">🎯 Objetivo Atual</p>
              <p className="text-lg font-bold text-orange-600">Ganho de Massa Muscular</p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Today */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="w-6 h-6 text-green-500" />
              Nutrição de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Calorias</span>
                <span className="text-sm font-bold">1,250 / 2,000 kcal</span>
              </div>
              <Progress value={62.5} className="h-3" />
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-600 mb-1">Proteínas</p>
                <p className="text-lg font-bold text-blue-600">85g</p>
                <p className="text-xs text-gray-500">de 150g</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <p className="text-xs text-gray-600 mb-1">Carboidratos</p>
                <p className="text-lg font-bold text-orange-600">120g</p>
                <p className="text-xs text-gray-500">de 250g</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                <p className="text-xs text-gray-600 mb-1">Gorduras</p>
                <p className="text-lg font-bold text-pink-600">45g</p>
                <p className="text-xs text-gray-500">de 70g</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Apple className="w-5 h-5 mr-2" />
              Registrar Refeição
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Premium CTA */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-6 h-6" />
                <h3 className="text-xl font-bold">Desbloqueie o Premium</h3>
              </div>
              <p className="text-gray-800 mb-3">
                Acesso total a vídeos, planos personalizados e muito mais!
              </p>
              <ul className="space-y-1 text-sm text-gray-800">
                <li>✓ Todos os exercícios com vídeos</li>
                <li>✓ Planos de treino personalizados</li>
                <li>✓ Acompanhamento nutricional completo</li>
                <li>✓ Lembretes automáticos</li>
              </ul>
            </div>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              Assinar Agora
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${className}`}>
      {children}
    </span>
  );
}
