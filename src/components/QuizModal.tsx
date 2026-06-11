import React, { useState } from 'react';
import { usePanda } from '../context/PandaContext';
import { LessonModule } from '../types';
import { Heart, Star, Sparkles, CheckCircle2, AlertCircle, ArrowRight, XCircle, Award, X } from 'lucide-react';
import StealerCat from './StealerCat';

interface QuizModalProps {
  module: LessonModule;
  onClose: () => void;
}

export default function QuizModal({ module, onClose }: QuizModalProps) {
  const {
    completeModule,
    addCoins,
    addXP,
    hearts,
    refillHearts
  } = usePanda();

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Health/Hearts safety
  const [localHearts, setLocalHearts] = useState<number>(hearts);

  const currentQuestion = module.questions[currentQuestionIndex];
  const totalQuestions = module.questions.length;

  const handleOptionSelect = (idx: number) => {
    if (hasChecked) return;
    setSelectedOptionIndex(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOptionIndex === null) return;

    const correct = selectedOptionIndex === currentQuestion.correctAnswerIndex;
    setIsAnswerCorrect(correct);
    setHasChecked(true);

    if (!correct) {
      // Deplete lives
      setLocalHearts((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNextOrFinish = () => {
    // Check if player exhausted all lives mid-quiz
    if (localHearts <= 0) {
      setIsQuizFinished(true);
      return;
    }

    if (currentQuestionIndex + 1 < totalQuestions) {
      // Go to next question
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setHasChecked(false);
    } else {
      // Complete quiz entirely
      setIsQuizFinished(true);
      completeModule(module.id);
      addXP(module.rewardXP);
      addCoins(module.rewardCoins);
    }
  };

  // Determine active responsive cat expression inside quiz
  let activeExpression: 'normal' | 'happy' | 'sad' = 'normal';
  if (hasChecked) {
    activeExpression = isAnswerCorrect ? 'happy' : 'sad';
  } else if (isQuizFinished) {
    activeExpression = localHearts > 0 ? 'happy' : 'sad';
  }

  // Sizing percentage helper
  const progressPercent = Math.round(((currentQuestionIndex + (hasChecked ? 1 : 0)) / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#37332b]/40 backdrop-blur-md flex items-center justify-center p-3 select-none">
      
      {/* Outer panel box container */}
      <div className="w-full max-w-2xl bg-white border border-brand-gray/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative text-brand-dark">
        
        {/* TOP STATUS ROW */}
        <div className="p-5 border-b border-brand-gray/60 flex items-center justify-between gap-4 bg-brand-cream/40">
          <div className="flex items-center gap-1.5 text-xs text-brand-dark/50 font-bold">
            <span className="font-black text-brand-pink">STEALER Quiz</span>
            <span>•</span>
            <span className="truncate max-w-[200px]">{module.title}</span>
          </div>

          {/* Core Info Bar */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-brand-coral bg-brand-coral/15 px-2.5 py-1 rounded-full border border-brand-coral/30">
              <Heart className={`w-4 h-4 fill-current ${localHearts === 0 ? 'animate-ping' : ''}`} />
              <span className="font-mono text-sm">{localHearts}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-brand-gray/20 hover:bg-brand-coral/15 text-brand-dark/60 hover:text-brand-coral border border-brand-gray/40 hover:border-brand-coral/30 transition-all cursor-pointer flex items-center justify-center shadow-sm"
              title="Cerrar entrenamiento"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PROGRESS METERS */}
        <div className="w-full h-1 bg-brand-gray/40 relative">
          <div
            className="h-full bg-gradient-to-r from-brand-pink to-brand-yellow transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* --- MAIN INTERACTIVE SLATE BODY --- */}
        {!isQuizFinished ? (
          <div className="p-6 md:p-8 flex flex-col gap-6 md:min-h-[380px]">
            
            {/* Header prompt question */}
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider text-brand-pink block mb-1">
                Pregunta {currentQuestionIndex + 1} de {totalQuestions}
              </span>
              <h2 className="text-base md:text-xl font-black font-sans text-brand-dark leading-tight">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Layout Grid: Left Panda mascot reactions, Right Options options */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              
              {/* Mascot Bubble feedback */}
              <div className="col-span-1 md:col-span-4 flex flex-col items-center text-center">
                <div className="w-28 md:w-36 h-28 md:h-36 flex items-center justify-center">
                  <StealerCat size="100%" expression={activeExpression} className="animate-float" />
                </div>
                
                <span className="text-[9px] text-brand-pink font-black uppercase mt-1 tracking-wider block">
                  {hasChecked ? (isAnswerCorrect ? '¡Bien hecho!' : '¡Oh, no!') : '¡Tú puedes!'}
                </span>
              </div>

              {/* Multiple Choice interactive list */}
              <div className="col-span-1 md:col-span-8 flex flex-col gap-2.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIndex === oIdx;
                  const isCorrectAnswer = oIdx === currentQuestion.correctAnswerIndex;
                  
                  let optionClass = 'bg-brand-cream/50 border-brand-gray/60 text-brand-dark/95 hover:bg-brand-yellow/20 hover:border-brand-orange/40';
                  if (isSelected) {
                    optionClass = 'bg-brand-pink/15 border-brand-pink text-brand-pink ring-2 ring-brand-pink/20 font-bold';
                  }
                  
                  if (hasChecked) {
                    if (isCorrectAnswer) {
                      optionClass = 'bg-brand-green/15 border-brand-green text-brand-green font-bold';
                    } else if (isSelected) {
                      optionClass = 'bg-brand-coral/15 border-brand-coral text-brand-coral line-through font-bold';
                    } else {
                      optionClass = 'bg-brand-cream/30 border-transparent opacity-40 text-brand-dark/40';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`quiz-opt-${oIdx}`}
                      onClick={() => handleOptionSelect(oIdx)}
                      disabled={hasChecked}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs leading-normal transition-all flex items-start gap-3 cursor-pointer ${optionClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold font-mono text-[10px] flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* --- FOOTER FEEDBACK BAR --- */}
            <div className="pt-4 border-t border-brand-gray/60 mt-auto">
              {!hasChecked ? (
                <button
                  id="btn-quiz-check"
                  onClick={handleCheckAnswer}
                  disabled={selectedOptionIndex === null}
                  className={`w-full py-4 text-brand-dark border-b-2 font-black text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    selectedOptionIndex === null
                      ? 'bg-brand-gray/20 border-brand-gray/40 text-brand-dark/30 cursor-not-allowed'
                      : 'bg-brand-yellow hover:bg-brand-yellow/95 border-brand-orange shadow-md shadow-brand-yellow/15 active:scale-98 cursor-pointer'
                  }`}
                >
                  Confirmar Respuesta
                </button>
              ) : (
                <div className="space-y-3">
                  <div className={`p-4 rounded-2xl border text-xs flex gap-3 ${isAnswerCorrect ? 'bg-brand-green/10 border-brand-green/30 text-brand-green' : 'bg-brand-coral/10 border-brand-coral/30 text-brand-coral'}`}>
                    <div className="flex-shrink-0 mt-0.5">
                      {isAnswerCorrect ? <CheckCircle2 className="w-5 h-5 text-brand-green" /> : <XCircle className="w-5 h-5 text-brand-coral" />}
                    </div>
                    <div>
                      <p className="font-black">{isAnswerCorrect ? '¡Excelente Razonamiento!' : '¡Oops! Incorrecto'}</p>
                      <p className="opacity-90 leading-relaxed mt-1 font-medium">{currentQuestion.explanation}</p>
                    </div>
                  </div>

                  <button
                    id="btn-quiz-next"
                    onClick={handleNextOrFinish}
                    className="w-full py-3.5 bg-brand-pink hover:bg-brand-pink/90 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-brand-coral/20"
                  >
                    <span>{currentQuestionIndex + 1 < totalQuestions ? 'Siguiente Pregunta' : 'Finalizar Lección'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* --- CONCLUDING PODIUM OVERLAY --- */
          <div className="p-8 flex flex-col items-center justify-center text-center gap-6 md:min-h-[380px] max-w-md mx-auto">
            {localHearts > 0 ? (
              <>
                <div className="bg-brand-yellow/20 p-4 rounded-3xl border border-brand-orange/30 text-brand-orange animate-bounce">
                  <Award className="w-12 h-12" />
                </div>
                
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-brand-dark">¡Módulo Completado!</h2>
                  <p className="text-xs text-brand-dark/70 mt-1 font-medium">
                    Felicidades, has resuelto el nivel <span className="font-bold text-brand-dark">"{module.title}"</span> de manera sobresaliente.
                  </p>
                </div>

                {/* Rewards recap block */}
                <div className="grid grid-cols-2 gap-4 w-full bg-brand-cream border border-brand-gray/80 p-4 rounded-2xl shadow-sm">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] text-brand-dark/50 uppercase font-mono block font-bold">Recibes</span>
                    <span className="font-mono font-black text-brand-pink text-lg">+{module.rewardXP} XP</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[10px] text-brand-dark/50 uppercase font-mono block font-bold">Recibes</span>
                    <span className="font-mono font-black text-brand-orange text-lg">+{module.rewardCoins} Monedas</span>
                  </div>
                </div>

                <div className="flex gap-2 items-center text-xs text-brand-green font-black bg-brand-green/10 px-3.5 py-1.5 rounded-full border border-brand-green/35 shadow-sm">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                  <span>Siguiente Nivel de la ruta Desbloqueado!</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-brand-coral/15 p-4 rounded-3xl border border-brand-coral/30 text-brand-coral animate-bounce">
                  <Heart className="w-12 h-12" />
                </div>
                
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-brand-coral">¡Te quedaste sin vidas!</h2>
                  <p className="text-xs text-brand-dark/70 mt-1 font-semibold leading-relaxed">
                    Has cometido demasiados desaciertos seguidos. No te rindas, repasar los libros de STEALER te guiará al éxito.
                  </p>
                </div>

                <button
                  onClick={() => {
                    refillHearts();
                    setLocalHearts(5);
                  }}
                  className="w-full py-3 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark border-b-2 border-brand-orange font-black rounded-xl text-xs uppercase shadow-sm"
                >
                  Recargar 5 corazones (Gratis / Monedas)
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="w-full py-3 bg-brand-pink hover:bg-brand-pink/90 text-white font-black text-xs uppercase rounded-xl transition-all border-b-2 border-brand-coral shadow-md"
            >
              Regresar a la ruta
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
