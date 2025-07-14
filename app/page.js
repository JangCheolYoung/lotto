'use client';

import React, { useState, useEffect } from 'react';
import { Settings, RefreshCw, History, TrendingUp, Zap, Award, X, Check, RotateCcw } from 'lucide-react';

const LottoGenerator = () => {
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [numberHistory, setNumberHistory] = useState([]);
  const [excludedNumbers, setExcludedNumbers] = useState([]);
  const [advancedSettings, setAdvancedSettings] = useState({
    excludeConsecutive: false,
    excludeOddOnly: false,
    excludeEvenOnly: false,
    excludeSameColor: false,
    excludeRecentWinning: false,
    recentRounds: 5
  });

  // 최근 당첨번호 (실제 데이터)
  const recentWinningNumbers = [
    { round: 1180, numbers: [6, 12, 18, 37, 40, 41], bonus: 3 },
    { round: 1179, numbers: [3, 16, 18, 24, 40, 44], bonus: 21 },
    { round: 1178, numbers: [2, 8, 15, 17, 28, 44], bonus: 9 },
    { round: 1177, numbers: [5, 12, 14, 22, 25, 32], bonus: 11 },
    { round: 1176, numbers: [1, 7, 19, 23, 31, 43], bonus: 35 }
  ];

  // 로또 공 색상 매핑
  const getBallColor = (number) => {
    if (number >= 1 && number <= 10) return 'bg-yellow-400 text-black';
    if (number >= 11 && number <= 20) return 'bg-blue-500 text-white';
    if (number >= 21 && number <= 30) return 'bg-red-500 text-white';
    if (number >= 31 && number <= 40) return 'bg-gray-600 text-white';
    if (number >= 41 && number <= 45) return 'bg-green-500 text-white';
    return 'bg-gray-400 text-white';
  };

  // 패턴 검사 함수들
  const isConsecutive = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    let consecutiveCount = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i-1] + 1) {
        consecutiveCount++;
        if (consecutiveCount >= 4) return true;
      } else {
        consecutiveCount = 1;
      }
    }
    return false;
  };

  const isAllOdd = (numbers) => numbers.every(n => n % 2 === 1);
  const isAllEven = (numbers) => numbers.every(n => n % 2 === 0);
  
  const isSameColor = (numbers) => {
    const colors = numbers.map(n => {
      if (n <= 10) return 'yellow';
      if (n <= 20) return 'blue';
      if (n <= 30) return 'red';
      if (n <= 40) return 'gray';
      return 'green';
    });
    return new Set(colors).size <= 2;
  };

  const containsRecentWinning = (numbers) => {
    if (!advancedSettings.excludeRecentWinning) return false;
    
    const recentNumbers = recentWinningNumbers
      .slice(0, advancedSettings.recentRounds)
      .flatMap(draw => draw.numbers);
    
    return numbers.some(num => recentNumbers.includes(num));
  };

  // 번호 생성 함수
  const generateNumbers = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let attempts = 0;
      let validNumbers = [];
      
      while (attempts < 1000) {
        const availableNumbers = Array.from({length: 45}, (_, i) => i + 1)
          .filter(num => !excludedNumbers.includes(num));
        
        if (availableNumbers.length < 6) {
          alert('제외된 번호가 너무 많습니다. 최소 6개의 번호가 필요합니다.');
          setIsGenerating(false);
          return;
        }
        
        const shuffled = [...availableNumbers].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 6).sort((a, b) => a - b);
        
        // 고급 설정 검사
        if (advancedSettings.excludeConsecutive && isConsecutive(selected)) {
          attempts++;
          continue;
        }
        if (advancedSettings.excludeOddOnly && isAllOdd(selected)) {
          attempts++;
          continue;
        }
        if (advancedSettings.excludeEvenOnly && isAllEven(selected)) {
          attempts++;
          continue;
        }
        if (advancedSettings.excludeSameColor && isSameColor(selected)) {
          attempts++;
          continue;
        }
        if (containsRecentWinning(selected)) {
          attempts++;
          continue;
        }
        
        validNumbers = selected;
        break;
      }
      
      if (validNumbers.length === 0) {
        alert('설정된 조건으로는 번호를 생성할 수 없습니다. 조건을 완화해주세요.');
        setIsGenerating(false);
        return;
      }
      
      setGeneratedNumbers(validNumbers);
      
      // 히스토리에 추가
      const newEntry = {
        id: Date.now(),
        numbers: validNumbers,
        timestamp: new Date(),
        settings: { ...advancedSettings, excludedNumbers: [...excludedNumbers] }
      };
      setNumberHistory(prev => [newEntry, ...prev.slice(0, 9)]);
      
      setIsGenerating(false);
    }, 1500);
  };

  const toggleExcludeNumber = (number) => {
    setExcludedNumbers(prev => 
      prev.includes(number) 
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  const clearExcludedNumbers = () => {
    setExcludedNumbers([]);
  };

  const NumberBall = ({ number, size = 'large', isBonus = false }) => {
    const sizeClasses = {
      small: 'w-8 h-8 text-sm',
      medium: 'w-12 h-12 text-base',
      large: 'w-16 h-16 text-xl'
    };
    
    return (
      <div className={`
        ${getBallColor(number)} 
        ${sizeClasses[size]} 
        rounded-full flex items-center justify-center font-bold shadow-lg
        ${isBonus ? 'ring-4 ring-orange-400' : ''}
        transition-all duration-300 hover:scale-105
      `}>
        {number}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Award className="text-yellow-300" size={32} />
            동행복권 로또 6/45 번호 생성기
          </h1>
          <p className="mt-2 opacity-90">AI 기반 스마트 번호 추출 시스템</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* 메인 생성 영역 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">행운의 번호</h2>
            
            {generatedNumbers.length > 0 ? (
              <div className="flex justify-center gap-4 mb-6">
                {generatedNumbers.map((num, index) => (
                  <div key={index} className="animate-bounce" style={{animationDelay: `${index * 0.1}s`}}>
                    <NumberBall number={num} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center gap-4 mb-6">
                {Array.from({length: 6}, (_, i) => (
                  <div key={i} className="w-16 h-16 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400 font-bold">
                    ?
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button 
                onClick={generateNumbers}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    번호 생성
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setShowSettings(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Settings size={20} />
                고급설정
              </button>
            </div>
          </div>
        </div>

        {/* 최근 당첨번호 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={24} />
              최근 당첨번호
            </h3>
            <div className="space-y-3">
              {recentWinningNumbers.slice(0, 3).map(draw => (
                <div key={draw.round} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-600">{draw.round}회</span>
                  <div className="flex gap-1">
                    {draw.numbers.map(num => (
                      <NumberBall key={num} number={num} size="small" />
                    ))}
                    <span className="mx-1 text-gray-400">+</span>
                    <NumberBall number={draw.bonus} size="small" isBonus />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 번호 히스토리 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <History className="text-green-500" size={24} />
              생성 히스토리
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {numberHistory.length > 0 ? (
                numberHistory.map(entry => (
                  <div key={entry.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex gap-1">
                      {entry.numbers.map(num => (
                        <NumberBall key={num} number={num} size="small" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">아직 생성된 번호가 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* 고급설정 모달 */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">고급 설정</h3>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 제외 번호 선택 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-700">제외할 번호 선택</h4>
                  <button 
                    onClick={clearExcludedNumbers}
                    className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  >
                    <RotateCcw size={16} />
                    전체 해제
                  </button>
                </div>
                <div className="grid grid-cols-9 gap-2">
                  {Array.from({length: 45}, (_, i) => i + 1).map(num => (
                    <button
                      key={num}
                      onClick={() => toggleExcludeNumber(num)}
                      className={`
                        w-12 h-12 rounded-lg font-bold transition-all duration-200
                        ${excludedNumbers.includes(num) 
                          ? 'bg-red-500 text-white shadow-lg' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }
                      `}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  제외된 번호: {excludedNumbers.length}개
                </p>
              </div>

              {/* 패턴 제외 옵션 */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">패턴 제외 설정</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeConsecutive}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeConsecutive: e.target.checked}))}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">연속번호 제외</span>
                      <p className="text-sm text-gray-500">4개 이상 연속된 번호 조합 제외</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeOddOnly}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeOddOnly: e.target.checked}))}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">홀수만 제외</span>
                      <p className="text-sm text-gray-500">모든 번호가 홀수인 조합 제외</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeEvenOnly}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeEvenOnly: e.target.checked}))}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">짝수만 제외</span>
                      <p className="text-sm text-gray-500">모든 번호가 짝수인 조합 제외</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeSameColor}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeSameColor: e.target.checked}))}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">단일/2색상 조합 제외</span>
                      <p className="text-sm text-gray-500">같은 색상 또는 2가지 색상만 있는 조합 제외</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* 최근 당첨번호 제외 */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">최근 당첨번호 제외</h4>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 mb-4">
                  <input
                    type="checkbox"
                    checked={advancedSettings.excludeRecentWinning}
                    onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeRecentWinning: e.target.checked}))}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="font-medium">최근 당첨번호가 포함된 조합 제외</span>
                </label>
                
                {advancedSettings.excludeRecentWinning && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      최근 몇 회차까지 제외할까요?
                    </label>
                    <select
                      value={advancedSettings.recentRounds}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, recentRounds: parseInt(e.target.value)}))}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>최근 1회차</option>
                      <option value={3}>최근 3회차</option>
                      <option value={5}>최근 5회차</option>
                      <option value={10}>최근 10회차</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <Check size={20} />
                  적용
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LottoGenerator;