'use client';

import { useState, useEffect } from 'react';
import { Exercise, MuscleGroup, Location, Level } from '@/lib/types';
import { exercises, getMuscleGroupLabel, getLocationLabel, getLevelLabel, hasAccessToExercise, hasAccessToMuscleGroup } from '@/lib/data/exercises';
import ExerciseCard from './exercise-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Search, Filter, Crown, Play, Lock, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ExerciseListProps {
  onPremiumClick: () => void;
}

export default function ExerciseList({ onPremiumClick }: ExerciseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | 'all'>('all');
  const [locationFilter, setLocationFilter] = useState<Location | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<Level | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [homeOnly, setHomeOnly] = useState(false);

  useEffect(() => {
    // Carregar plano do usuário
    const plan = localStorage.getItem('userPlan') || 'free';
    setUserPlan(plan as 'free' | 'premium');
  }, []);

  // Filter exercises
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ex.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = muscleFilter === 'all' || ex.muscleGroup === muscleFilter;
    const matchesLocation = locationFilter === 'all' || ex.location === locationFilter || ex.location === 'ambos';
    const matchesLevel = levelFilter === 'all' || ex.level === levelFilter;
    const matchesHome = !homeOnly || ex.location === 'casa' || ex.location === 'ambos';

    // Usuários gratuitos só veem exercícios de grupos liberados
    const hasAccess = hasAccessToExercise(ex, userPlan);

    return matchesSearch && matchesMuscle && matchesLocation && matchesLevel && matchesHome && hasAccess;
  });

  const handleViewDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const handleMuscleGroupClick = (group: MuscleGroup) => {
    if (!hasAccessToMuscleGroup(group, userPlan)) {
      setShowPremiumModal(true);
    } else {
      setMuscleFilter(group);
    }
  };

  return (
    <div className="space-y-6">
      {/* Premium Alert for Free Users */}
      {userPlan === 'free' && (
        <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">Acesso Limitado - Versão Gratuita</h3>
              <p className="text-sm text-gray-700 mb-3">
                Você tem acesso apenas aos grupos musculares: <strong>Peito</strong> e <strong>Abdômen</strong>. 
                Assine Premium para desbloquear todos os exercícios!
              </p>
              <Button
                onClick={onPremiumClick}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
              >
                <Crown className="w-4 h-4 mr-2" />
                Assinar Premium
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters Section */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Buscar exercício..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Home Only Toggle */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            <Label htmlFor="home-only" className="text-sm font-medium text-gray-700 cursor-pointer">
              Mostrar apenas exercícios caseiros
            </Label>
          </div>
          <Switch
            id="home-only"
            checked={homeOnly}
            onCheckedChange={setHomeOnly}
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select value={muscleFilter} onValueChange={(value) => {
            const group = value as MuscleGroup | 'all';
            if (group !== 'all' && !hasAccessToMuscleGroup(group, userPlan)) {
              setShowPremiumModal(true);
            } else {
              setMuscleFilter(group);
            }
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Grupo Muscular" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os músculos</SelectItem>
              <SelectItem value="peito">✅ Peito</SelectItem>
              <SelectItem value="abdomen">✅ Abdômen</SelectItem>
              <SelectItem value="costas" disabled={userPlan === 'free'}>
                {userPlan === 'free' ? '🔒 Costas (Premium)' : 'Costas'}
              </SelectItem>
              <SelectItem value="ombros" disabled={userPlan === 'free'}>
                {userPlan === 'free' ? '🔒 Ombros (Premium)' : 'Ombros'}
              </SelectItem>
              <SelectItem value="bracos" disabled={userPlan === 'free'}>
                {userPlan === 'free' ? '🔒 Braços (Premium)' : 'Braços'}
              </SelectItem>
              <SelectItem value="pernas" disabled={userPlan === 'free'}>
                {userPlan === 'free' ? '🔒 Pernas (Premium)' : 'Pernas'}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={(value) => setLocationFilter(value as Location | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Local" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os locais</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="academia">Academia</SelectItem>
              <SelectItem value="ambos">Casa e Academia</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={(value) => setLevelFilter(value as Level | 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              <SelectItem value="iniciante">Iniciante</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-orange-600">{filteredExercises.length}</span> exercícios disponíveis
            {userPlan === 'free' && <span className="text-yellow-600"> (acesso limitado)</span>}
          </p>
          {(muscleFilter !== 'all' || locationFilter !== 'all' || levelFilter !== 'all' || searchTerm || homeOnly) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setMuscleFilter('all');
                setLocationFilter('all');
                setLevelFilter('all');
                setSearchTerm('');
                setHomeOnly(false);
              }}
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(exercise => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <Lock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-2">Nenhum exercício disponível com esses filtros.</p>
          {userPlan === 'free' && (
            <div className="mt-4">
              <p className="text-gray-600 mb-4">Assine Premium para acessar todos os exercícios!</p>
              <Button 
                onClick={onPremiumClick}
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
              >
                <Crown className="w-5 h-5 mr-2" />
                Ver Planos Premium
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Exercise Detail Modal */}
      <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {selectedExercise.name}
                  {selectedExercise.isPremium && (
                    <Badge className="bg-yellow-400 text-gray-900">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  <Badge variant="outline" className="mt-2">
                    {getMuscleGroupLabel(selectedExercise.muscleGroup)}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {/* Image */}
                {selectedExercise.imageUrl && (
                  <div className="relative h-64 w-full overflow-hidden rounded-lg bg-gray-200">
                    <img 
                      src={selectedExercise.imageUrl} 
                      alt={selectedExercise.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Video (Premium) */}
                {selectedExercise.isPremium && selectedExercise.videoUrl && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-2 border-yellow-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-5 h-5 text-orange-600" />
                      <span className="font-bold text-orange-600">Vídeo Demonstrativo (Premium)</span>
                    </div>
                    <p className="text-sm text-gray-600">Assine o plano Premium para acessar vídeos demonstrativos de todos os exercícios!</p>
                    <Button 
                      onClick={() => {
                        setSelectedExercise(null);
                        onPremiumClick();
                      }}
                      className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Assinar Premium
                    </Button>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="font-bold text-lg mb-2">Como Executar</h3>
                  <p className="text-gray-700">{selectedExercise.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Séries</p>
                    <p className="font-bold text-lg text-orange-600">{selectedExercise.sets}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Repetições</p>
                    <p className="font-bold text-lg text-pink-600">{selectedExercise.reps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Local</p>
                    <p className="font-bold">{getLocationLabel(selectedExercise.location)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nível</p>
                    <p className="font-bold">{getLevelLabel(selectedExercise.level)}</p>
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <h3 className="font-bold text-lg mb-2">Equipamentos Necessários</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExercise.equipment.map((eq, idx) => (
                      <Badge key={idx} variant="secondary">{eq}</Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                    Adicionar ao Treino
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Salvar nos Favoritos
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
                Assine o plano mensal ou anual para ter acesso completo a todos os exercícios, vídeos e funcionalidades!
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
