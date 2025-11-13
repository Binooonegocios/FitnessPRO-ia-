'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/custom/navbar';
import Dashboard from '@/components/custom/dashboard';
import ExerciseList from '@/components/custom/exercise-list';
import Nutrition from '@/components/custom/nutrition';
import Profile from '@/components/custom/profile';
import Onboarding from '@/components/custom/onboarding';
import Premium from '@/components/custom/premium';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, BookOpen, Apple, User } from 'lucide-react';

type Screen = 'onboarding' | 'dashboard' | 'premium';

export default function FitnessPro() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Verificar se usuário já completou o onboarding
    const hasCompleted = localStorage.getItem('hasCompletedOnboarding');
    if (hasCompleted === 'true') {
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleOnboardingComplete = () => {
    setCurrentScreen('dashboard');
  };

  const handlePremiumClick = () => {
    setCurrentScreen('premium');
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
    setCurrentScreen('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  // Renderizar tela de onboarding
  if (currentScreen === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Renderizar tela de premium
  if (currentScreen === 'premium') {
    return <Premium onBack={handleBackToDashboard} />;
  }

  // Renderizar dashboard principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        onPremiumClick={handlePremiumClick}
        onProfileClick={handleProfileClick}
      />
      
      {/* Main Content */}
      <main className="pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-4 mb-8 bg-white shadow-lg h-14">
            <TabsTrigger value="home" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Home className="w-5 h-5 mr-2" />
              Início
            </TabsTrigger>
            <TabsTrigger value="exercises" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <BookOpen className="w-5 h-5 mr-2" />
              Exercícios
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Apple className="w-5 h-5 mr-2" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <User className="w-5 h-5 mr-2" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="home" className="mt-0">
            <Dashboard />
          </TabsContent>

          <TabsContent value="exercises" className="mt-0">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Banco de Exercícios
              </h1>
              <p className="text-gray-600">
                Explore nossa biblioteca completa com exercícios para todos os grupos musculares
              </p>
            </div>
            <ExerciseList onPremiumClick={handlePremiumClick} />
          </TabsContent>

          <TabsContent value="nutrition" className="mt-0">
            <Nutrition onPremiumClick={handlePremiumClick} />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <Profile onPremiumClick={handlePremiumClick} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'home' 
                ? 'text-orange-600 bg-orange-50' 
                : 'text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'exercises' 
                ? 'text-orange-600 bg-orange-50' 
                : 'text-gray-600'
            }`}
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs font-medium">Exercícios</span>
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'nutrition' 
                ? 'text-orange-600 bg-orange-50' 
                : 'text-gray-600'
            }`}
          >
            <Apple className="w-6 h-6" />
            <span className="text-xs font-medium">Nutrição</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'profile' 
                ? 'text-orange-600 bg-orange-50' 
                : 'text-gray-600'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
