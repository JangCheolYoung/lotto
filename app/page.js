'use client';

import React, { useState, useEffect } from 'react';
import { Settings, RefreshCw, History, TrendingUp, Zap, Award, X, Check, RotateCcw, Info, Download, Share } from 'lucide-react';

const LottoGenerator = () => {
  const [generatedGames, setGeneratedGames] = useState([]); // 5게임 저장
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [numberStates, setNumberStates] = useState({}); // 0: 기본, 1: 포함, 2: 제외
  const [advancedSettings, setAdvancedSettings] = useState({
    excludeConsecutive: false,
    excludeOddOnly: false,
    excludeEvenOnly: false,
    excludeSameColor: false,
    excludeRecentWinning: false,
    recentRounds: 5
  });

  // 최근 당첨번호 (API에서 업데이트)
  const [recentWinningNumbers, setRecentWinningNumbers] = useState([
    { round: 1180, numbers: [6, 12, 18, 37, 40, 41], bonus: 3, date: '2025-07-12' },
    { round: 1179, numbers: [3, 16, 18, 24, 40, 44], bonus: 21, date: '2025-07-05' },
    { round: 1178, numbers: [2, 8, 15, 17, 28, 44], bonus: 9, date: '2025-06-28' },
    { round: 1177, numbers: [5, 12, 14, 22, 25, 32], bonus: 11, date: '2025-06-21' },
    { round: 1176, numbers: [1, 7, 19, 23, 31, 43], bonus: 35, date: '2025-06-14' }
  ]);

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedHistory = localStorage.getItem('lottoHistory');
    const savedStates = localStorage.getItem('numberStates');
    const savedSettings = localStorage.getItem('advancedSettings');
    
    if (savedHistory) {
      try {
        setGameHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('히스토리 로드 실패:', e);
      }
    }
    
    if (savedStates) {
      try {
        setNumberStates(JSON.parse(savedStates));
      } catch (e) {
        console.error('번호 상태 로드 실패:', e);
      }
    }
    
    if (savedSettings) {
      try {
        setAdvancedSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('설정 로드 실패:', e);
      }
    }

    // 앱 시작 시 최신 당첨번호 가져오기
    fetchLatestWinningNumbers();
  }, []);

  // 최신 당첨번호 가져오기
  const fetchLatestWinningNumbers = async () => {
    try {
      const response = await fetch('/api/lottery');
      if (response.ok) {
        const data = await response.json();
        setRecentWinningNumbers(data);
      }
    } catch (error) {
      console.error('당첨번호 가져오기 실패:', error);
    }
  };

  // 데이터 저장
  useEffect(() => {
    localStorage.setItem('lottoHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    localStorage.setItem('numberStates', JSON.stringify(numberStates));
  }, [numberStates]);

  useEffect(() => {
    localStorage.setItem('advancedSettings', JSON.stringify(advancedSettings));
  }, [advancedSettings]);

  // 번호 상태별 필터링
  const getIncludedNumbers = () => {
    return Object.entries(numberStates)
      .filter(([_, state]) => state === 1)
      .map(([num, _]) => parseInt(num));
  };

  const getExcludedNumbers = () => {
    return Object.entries(numberStates)
      .filter(([_, state]) => state === 2)
      .map(([num, _]) => parseInt(num));
  };

  // 로또 공 색상 매핑
  const getBallColor = (number) => {
    if (number >= 1 && number <= 10) return 'bg-yellow-400 text-black';
    if (number >= 11 && number <= 20) return 'bg-blue-500 text-white';
    if (number >= 21 && number <= 30) return 'bg-red-500 text-white';
    if (number >= 31 && number <= 40) return 'bg-gray-600 text-white';
    if (number >= 41 && number <= 45) return 'bg-green-500 text-white';
    return 'bg-gray-400 text-white';
  };

  // 번호 상태에 따른 스타일
  const getNumberButtonStyle = (number) => {
    const state = numberStates[number] || 0;
    const baseStyle = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg font-bold transition-all duration-200 text-sm sm:text-base cursor-pointer select-none";
    
    switch(state) {
      case 1: // 포함
        return `${baseStyle} bg-green-500 text-white shadow-lg ring-2 ring-green-300 scale-105`;
      case 2: // 제외
        return `${baseStyle} bg-red-500 text-white shadow-lg ring-2 ring-red-300 scale-105`;
      default: // 기본
        return `${baseStyle} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:scale-105`;
    }
  };

  // 번호 클릭 핸들러 (3단계 순환)
  const handleNumberClick = (number) => {
    setNumberStates(prev => {
      const currentState = prev[number] || 0;
      const newState = (currentState + 1) % 3;
      
      if (newState === 0) {
        const { [number]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [number]: newState };
    });
  };

  // 번호 상태 초기화
  const clearNumberStates = () => {
    setNumberStates({});
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

  // 단일 게임 번호 생성 (더 안정적으로 수정)
  const generateSingleGame = () => {
    const includedNumbers = getIncludedNumbers();
    const excludedNumbers = getExcludedNumbers();
    
    let attempts = 0;
    let validNumbers = [];
    
    // 최대 10000번 시도해서 반드시 생성
    while (attempts < 10000) {
      // 포함 번호부터 시작
      let selected = [...includedNumbers];
      
      // 남은 자리 수 계산
      const remainingSlots = 6 - selected.length;
      
      if (remainingSlots > 0) {
        // 사용 가능한 번호 (포함 번호와 제외 번호 제외)
        const availableNumbers = Array.from({length: 45}, (_, i) => i + 1)
          .filter(num => !includedNumbers.includes(num) && !excludedNumbers.includes(num));
        
        if (availableNumbers.length < remainingSlots) {
          // 불가능한 조건이면 제외 번호 일부 무시하고 생성
          const allNumbers = Array.from({length: 45}, (_, i) => i + 1)
            .filter(num => !includedNumbers.includes(num));
          
          if (allNumbers.length >= remainingSlots) {
            const shuffled = [...allNumbers].sort(() => Math.random() - 0.5);
            selected = [...selected, ...shuffled.slice(0, remainingSlots)];
          }
        } else {
          // 랜덤하게 남은 번호 선택
          const shuffled = [...availableNumbers].sort(() => Math.random() - 0.5);
          selected = [...selected, ...shuffled.slice(0, remainingSlots)];
        }
      }
      
      // 정렬
      selected.sort((a, b) => a - b);
      
      // 6개 숫자가 있는지 확인
      if (selected.length !== 6) {
        attempts++;
        continue;
      }
      
      // 고급 설정 검사 (조건을 완화)
      let passesFilters = true;
      
      if (advancedSettings.excludeConsecutive && isConsecutive(selected)) {
        passesFilters = false;
      }
      if (advancedSettings.excludeOddOnly && isAllOdd(selected)) {
        passesFilters = false;
      }
      if (advancedSettings.excludeEvenOnly && isAllEven(selected)) {
        passesFilters = false;
      }
      if (advancedSettings.excludeSameColor && isSameColor(selected)) {
        passesFilters = false;
      }
      if (containsRecentWinning(selected)) {
        passesFilters = false;
      }
      
      // 처음 1000번 시도는 모든 필터 적용
      // 그 이후는 필터를 점진적으로 완화
      if (attempts < 1000 && !passesFilters) {
        attempts++;
        continue;
      } else if (attempts < 5000 && advancedSettings.excludeConsecutive && isConsecutive(selected)) {
        attempts++;
        continue;
      } else if (attempts < 8000 && (advancedSettings.excludeOddOnly && isAllOdd(selected)) || (advancedSettings.excludeEvenOnly && isAllEven(selected))) {
        attempts++;
        continue;
      }
      
      validNumbers = selected;
      break;
    }
    
    // 최종적으로 6개 번호가 없으면 강제로 생성
    if (validNumbers.length !== 6) {
      const allNumbers = Array.from({length: 45}, (_, i) => i + 1);
      const shuffled = [...allNumbers].sort(() => Math.random() - 0.5);
      validNumbers = shuffled.slice(0, 6).sort((a, b) => a - b);
    }
    
    return validNumbers;
  };

  // 5게임 번호 생성 (항상 5게임 보장)
  const generateGames = () => {
    const includedNumbers = getIncludedNumbers();
    
    // 포함 번호가 6개 이상이면 경고
    if (includedNumbers.length > 6) {
      alert('포함할 번호는 최대 6개까지만 선택할 수 있습니다.');
      return;
    }
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const games = [];
      
      // 반드시 5게임 생성
      for (let i = 0; i < 5; i++) {
        const game = generateSingleGame();
        games.push(game);
      }
      
      setGeneratedGames(games);
      
      // 히스토리에 추가
      const newEntry = {
        id: Date.now(),
        games: games,
        timestamp: new Date(),
        settings: { ...advancedSettings, numberStates: { ...numberStates } }
      };
      setGameHistory(prev => [newEntry, ...prev.slice(0, 19)]);
      
      setIsGenerating(false);
    }, 1500);
  };

  // 번호 공유 기능 (수정된 게임 번호 표시)
  const shareGames = async () => {
    const gamesText = generatedGames.map((game, index) => 
      `${index + 1}게임: ${game.join(', ')}`
    ).join('\n');
    
    const shareText = `🎰 로또 번호 생성기로 만든 행운의 번호들:\n\n${gamesText}\n\n🔗 https://lotto-mocha.vercel.app`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '로또 번호 생성기',
          text: shareText,
          url: 'https://lotto-mocha.vercel.app'
        });
      } catch (err) {
        console.log('공유 취소:', err);
      }
    } else {
      // 클립보드에 복사
      try {
        await navigator.clipboard.writeText(shareText);
        alert('번호가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        alert('공유 기능을 지원하지 않는 브라우저입니다.');
      }
    }
  };

  // 히스토리 삭제
  const clearHistory = () => {
    if (confirm('모든 히스토리를 삭제하시겠습니까?')) {
      setGameHistory([]);
    }
  };

  const NumberBall = ({ number, size = 'large', isBonus = false }) => {
    const sizeClasses = {
      small: 'w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm',
      medium: 'w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base',
      large: 'w-12 h-12 sm:w-16 sm:h-16 text-lg sm:text-xl'
    };
    
    return (
      <div className={`
        ${getBallColor(number)} 
        ${sizeClasses[size]} 
        rounded-full flex items-center justify-center font-bold shadow-lg
        ${isBonus ? 'ring-2 sm:ring-4 ring-orange-400' : ''}
        transition-all duration-300 hover:scale-105
      `}>
        {number}
      </div>
    );
  };

  // 통계 계산
  const getNumberStats = () => {
    const included = getIncludedNumbers().length;
    const excluded = getExcludedNumbers().length;
    const available = 45 - excluded;
    
    return { included, excluded, available };
  };

  const stats = getNumberStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* 헤더 */}
      <header className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-4 sm:p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3">
            <Award className="text-yellow-300" size={24} />
            로또 6/45 번호 생성기
          </h1>
          <p className="mt-2 opacity-90 text-sm sm:text-base">스마트 번호 추출 시스템</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* 메인 생성 영역 */}
        <section className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">행운의 번호 (5게임)</h2>
            
            {generatedGames.length > 0 ? (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="space-y-3">
                  {generatedGames.map((game, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
                      <div className="text-sm font-semibold text-gray-600 min-w-[60px]">
                        {index + 1}게임
                      </div>
                      <div className="flex gap-2 sm:gap-3 flex-wrap justify-center flex-1">
                        {game.map((num, numIndex) => (
                          <div key={numIndex} className="animate-bounce" style={{animationDelay: `${numIndex * 0.1}s`}}>
                            <NumberBall number={num} size="medium" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="text-sm font-semibold text-gray-600 mb-3">5게임이 생성됩니다</div>
                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                  {Array.from({length: 6}, (_, i) => (
                    <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-400 font-bold text-sm sm:text-base">
                      ?
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button 
                onClick={generateGames}
                disabled={isGenerating}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2 order-2 sm:order-1"
                aria-label="로또 번호 생성"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={20} />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    5게임 생성
                  </>
                )}
              </button>
              
              <button 
                onClick={() => setShowSettings(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 sm:px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 order-1 sm:order-2"
                aria-label="고급 설정 열기"
              >
                <Settings size={20} />
                고급설정
              </button>

              {generatedGames.length > 0 && (
                <button 
                  onClick={shareGames}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 order-3"
                  aria-label="번호 공유하기"
                >
                  <Share size={20} />
                  공유
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 최근 당첨번호 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-500" size={20} />
              최근 당첨번호
            </h3>
            <div className="space-y-3">
              {recentWinningNumbers.slice(0, 3).map(draw => (
                <div key={draw.round} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="min-w-[70px]">
                    <span className="text-sm font-semibold text-gray-600">{draw.round}회</span>
                    <p className="text-xs text-gray-500">{draw.date}</p>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {draw.numbers.map(num => (
                      <NumberBall key={num} number={num} size="small" />
                    ))}
                    <span className="mx-1 text-gray-400">+</span>
                    <NumberBall number={draw.bonus} size="small" isBonus />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 게임 히스토리 */}
          <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                <History className="text-green-500" size={20} />
                생성 히스토리
              </h3>
              {gameHistory.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  aria-label="히스토리 삭제"
                >
                  <X size={16} />
                  삭제
                </button>
              )}
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {gameHistory.length > 0 ? (
                gameHistory.map(entry => (
                  <div key={entry.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-2">
                      {entry.timestamp.toLocaleString()} - {entry.games.length}게임
                    </div>
                    <div className="space-y-2">
                      {entry.games.map((game, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-xs text-gray-600 font-medium w-8">{index + 1}</span>
                          <div className="flex gap-1 flex-wrap">
                            {game.map(num => (
                              <NumberBall key={num} number={num} size="small" />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4 text-sm">아직 생성된 번호가 없습니다.</p>
              )}
            </div>
          </section>
        </div>

        {/* 고급설정 모달 */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="settings-title">
            <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 id="settings-title" className="text-xl sm:text-2xl font-bold text-gray-800">고급 설정</h3>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="설정 창 닫기"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 번호 선택 섹션 */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-semibold text-gray-700">번호 선택</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Info size={16} />
                      <span className="hidden sm:inline">클릭: 포함(초록) → 제외(빨강) → 기본</span>
                      <span className="sm:hidden">클릭: 포함→제외→기본</span>
                    </div>
                  </div>
                  <button 
                    onClick={clearNumberStates}
                    className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 self-start sm:self-center"
                    aria-label="번호 선택 초기화"
                  >
                    <RotateCcw size={16} />
                    전체 초기화
                  </button>
                </div>

                {/* 범례 */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>포함 ({stats.included}개)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>제외 ({stats.excluded}개)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
                    <span>사용가능 ({stats.available}개)</span>
                  </div>
                </div>

                {/* 번호 그리드 */}
                <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-15 gap-1 sm:gap-2 mb-4">
                  {Array.from({length: 45}, (_, i) => i + 1).map(num => (
                    <button
                      key={num}
                      onClick={() => handleNumberClick(num)}
                      className={getNumberButtonStyle(num)}
                      aria-label={`번호 ${num} ${numberStates[num] === 1 ? '포함됨' : numberStates[num] === 2 ? '제외됨' : '기본'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>• 포함 번호: 반드시 생성될 번호 (최대 6개)</p>
                  <p>• 제외 번호: 생성에서 제외할 번호</p>
                  <p>• 현재 설정: 포함 {stats.included}개, 제외 {stats.excluded}개</p>
                </div>
              </div>

              {/* 패턴 제외 옵션 */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">패턴 제외 설정</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeConsecutive}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeConsecutive: e.target.checked}))}
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      aria-describedby="consecutive-desc"
                    />
                    <div>
                      <span className="font-medium">연속번호 제외</span>
                      <p id="consecutive-desc" className="text-sm text-gray-500">4개 이상 연속된 번호 조합 제외</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeOddOnly}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeOddOnly: e.target.checked}))}
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      aria-describedby="odd-desc"
                    />
                    <div>
                      <span className="font-medium">홀수만 제외</span>
                      <p id="odd-desc" className="text-sm text-gray-500">모든 번호가 홀수인 조합 제외</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeEvenOnly}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeEvenOnly: e.target.checked}))}
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      aria-describedby="even-desc"
                    />
                    <div>
                      <span className="font-medium">짝수만 제외</span>
                      <p id="even-desc" className="text-sm text-gray-500">모든 번호가 짝수인 조합 제외</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <input
                      type="checkbox"
                      checked={advancedSettings.excludeSameColor}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeSameColor: e.target.checked}))}
                      className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                      aria-describedby="color-desc"
                    />
                    <div>
                      <span className="font-medium">단일/2색상 조합 제외</span>
                      <p id="color-desc" className="text-sm text-gray-500">같은 색상 또는 2가지 색상만 있는 조합 제외</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* 최근 당첨번호 제외 */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">최근 당첨번호 제외</h4>
                <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 mb-4">
                  <input
                    type="checkbox"
                    checked={advancedSettings.excludeRecentWinning}
                    onChange={(e) => setAdvancedSettings(prev => ({...prev, excludeRecentWinning: e.target.checked}))}
                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                    aria-describedby="recent-desc"
                  />
                  <span className="font-medium">최근 당첨번호가 포함된 조합 제외</span>
                </label>
                
                {advancedSettings.excludeRecentWinning && (
                  <div>
                    <label htmlFor="recent-rounds" className="block text-sm font-medium text-gray-700 mb-2">
                      최근 몇 회차까지 제외할까요?
                    </label>
                    <select
                      id="recent-rounds"
                      value={advancedSettings.recentRounds}
                      onChange={(e) => setAdvancedSettings(prev => ({...prev, recentRounds: parseInt(e.target.value)}))}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                    >
                      <option value={1}>최근 1회차</option>
                      <option value={3}>최근 3회차</option>
                      <option value={5}>최근 5회차</option>
                      <option value={10}>최근 10회차</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <button 
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors order-2 sm:order-1"
                >
                  취소
                </button>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  <Check size={20} />
                  적용
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LottoGenerator;