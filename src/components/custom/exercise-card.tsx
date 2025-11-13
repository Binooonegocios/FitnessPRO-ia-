'use client';

import { Exercise } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, MapPin, TrendingUp, Dumbbell } from 'lucide-react';
import { getMuscleGroupLabel, getLocationLabel, getLevelLabel } from '@/lib/data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  onViewDetails: (exercise: Exercise) => void;
}

export default function ExerciseCard({ exercise, onViewDetails }: ExerciseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Image */}
      {exercise.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <img 
            src={exercise.imageUrl} 
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
          {exercise.isPremium && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
              <Crown className="w-3 h-3" />
              Premium
            </div>
          )}
        </div>
      )}

      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-start justify-between gap-2">
          <span>{exercise.name}</span>
          <Badge variant="outline" className="bg-gradient-to-r from-orange-100 to-pink-100 border-orange-300">
            {getMuscleGroupLabel(exercise.muscleGroup)}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{exercise.description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-gray-700">
            <Dumbbell className="w-4 h-4 text-orange-500" />
            <span className="font-medium">{exercise.sets} séries</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <TrendingUp className="w-4 h-4 text-pink-500" />
            <span className="font-medium">{exercise.reps} reps</span>
          </div>
          <div className="flex items-center gap-1 text-gray-700">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-xs">{getLocationLabel(exercise.location)}</span>
          </div>
          <div>
            <Badge variant="secondary" className="text-xs">
              {getLevelLabel(exercise.level)}
            </Badge>
          </div>
        </div>

        {/* Equipment */}
        <div className="flex flex-wrap gap-1">
          {exercise.equipment.slice(0, 3).map((eq, idx) => (
            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {eq}
            </span>
          ))}
          {exercise.equipment.length > 3 && (
            <span className="text-xs text-gray-500">+{exercise.equipment.length - 3}</span>
          )}
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onViewDetails(exercise)}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
        >
          Ver Detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
