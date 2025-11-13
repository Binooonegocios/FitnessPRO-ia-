'use client';

import { Dumbbell, Crown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onPremiumClick: () => void;
  onProfileClick: () => void;
}

export default function Navbar({ onPremiumClick, onProfileClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-pink-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">FitnessPro</span>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={onProfileClick}
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <User className="w-5 h-5 mr-2" />
              Meu Perfil
            </Button>
            <Button
              onClick={onPremiumClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar Premium
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              onClick={onProfileClick}
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              onClick={onPremiumClick}
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
            >
              <Crown className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
