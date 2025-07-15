import { NextResponse } from 'next/server';

// 캐시된 당첨번호 데이터
let cachedData = null;
let lastUpdateTime = null;

// 캐시 유효시간 (1시간)
const CACHE_DURATION = 60 * 60 * 1000;

// 동행복권 당첨번호 스크래핑 함수 (예시)
async function fetchLotteryData() {
  try {
    // 실제 구현에서는 동행복권 사이트를 스크래핑하거나
    // 다른 로또 API를 사용할 수 있습니다
    
    // 현재는 예시 데이터를 반환합니다
    // 실제 구현 시에는 아래와 같이 스크래핑하거나 API 호출
    /*
    const response = await fetch('https://www.dhlottery.co.kr/gameResult.do?method=byWin');
    const html = await response.text();
    // HTML 파싱 로직...
    */
    
    // 예시 데이터 (실제로는 스크래핑해서 가져온 데이터)
    const mockData = [
      { round: 1180, numbers: [6, 12, 18, 37, 40, 41], bonus: 3, date: '2025-07-12' },
      { round: 1179, numbers: [3, 16, 18, 24, 40, 44], bonus: 21, date: '2025-07-05' },
      { round: 1178, numbers: [2, 8, 15, 17, 28, 44], bonus: 9, date: '2025-06-28' },
      { round: 1177, numbers: [5, 12, 14, 22, 25, 32], bonus: 11, date: '2025-06-21' },
      { round: 1176, numbers: [1, 7, 19, 23, 31, 43], bonus: 35, date: '2025-06-14' }
    ];
    
    return mockData;
  } catch (error) {
    console.error('당첨번호 조회 실패:', error);
    // 에러 시 기본 데이터 반환
    return [
      { round: 1180, numbers: [6, 12, 18, 37, 40, 41], bonus: 3, date: '2025-07-12' },
      { round: 1179, numbers: [3, 16, 18, 24, 40, 44], bonus: 21, date: '2025-07-05' },
      { round: 1178, numbers: [2, 8, 15, 17, 28, 44], bonus: 9, date: '2025-06-28' },
      { round: 1177, numbers: [5, 12, 14, 22, 25, 32], bonus: 11, date: '2025-06-21' },
      { round: 1176, numbers: [1, 7, 19, 23, 31, 43], bonus: 35, date: '2025-06-14' }
    ];
  }
}

// 실제 동행복권 스크래핑 함수 (고급 구현)
async function scrapeFromDhlottery() {
  try {
    // 동행복권 당첨번호 조회 URL
    const url = 'https://www.dhlottery.co.kr/gameResult.do?method=byWin';
    
    // 여러 회차의 당첨번호를 가져오기 위한 로직
    const results = [];
    
    // 최근 5회차 정보 가져오기
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(`${url}&drwNo=${getCurrentRound() - i}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // HTML 파싱 로직 (실제로는 cheerio 등을 사용)
        // 여기서는 간단한 정규표현식으로 예시
        const roundMatch = html.match(/<span class="num win"[^>]*>(\d+)<\/span>/g);
        const bonusMatch = html.match(/<span class="num bonus"[^>]*>(\d+)<\/span>/);
        
        if (roundMatch && bonusMatch) {
          const numbers = roundMatch.map(match => 
            parseInt(match.replace(/<[^>]*>/g, ''))
          ).slice(0, 6);
          
          const bonus = parseInt(bonusMatch[0].replace(/<[^>]*>/g, ''));
          
          results.push({
            round: getCurrentRound() - i,
            numbers: numbers.sort((a, b) => a - b),
            bonus: bonus,
            date: getDateForRound(getCurrentRound() - i)
          });
        }
      } catch (error) {
        console.error(`회차 ${getCurrentRound() - i} 조회 실패:`, error);
      }
    }
    
    return results.length > 0 ? results : await fetchLotteryData();
  } catch (error) {
    console.error('스크래핑 실패:', error);
    return await fetchLotteryData();
  }
}

// 현재 회차 계산 (대략적인 계산)
function getCurrentRound() {
  const startDate = new Date('2002-12-07'); // 로또 시작일
  const now = new Date();
  const weeksDiff = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000));
  return weeksDiff + 1;
}

// 회차별 날짜 계산
function getDateForRound(round) {
  const startDate = new Date('2002-12-07');
  const roundDate = new Date(startDate.getTime() + (round - 1) * 7 * 24 * 60 * 60 * 1000);
  return roundDate.toISOString().split('T')[0];
}

// 토요일 밤 10시 체크 (자동 업데이트용)
function shouldUpdateData() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0: 일요일, 6: 토요일
  const hour = now.getHours();
  
  // 토요일 밤 10시 이후 또는 일요일이면 업데이트
  return (dayOfWeek === 6 && hour >= 21) || dayOfWeek === 0;
}

// GET 요청 처리
export async function GET(request) {
  try {
    const now = Date.now();
    
    // 캐시 확인
    if (cachedData && lastUpdateTime && (now - lastUpdateTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }
    
    // 데이터 업데이트
    console.log('당첨번호 데이터 업데이트 중...');
    
    // 실제 스크래핑 시도 (개발 환경에서는 mock 데이터 사용)
    const isDevelopment = process.env.NODE_ENV === 'development';
    const lotteryData = isDevelopment 
      ? await fetchLotteryData() 
      : await scrapeFromDhlottery();
    
    // 캐시 업데이트
    cachedData = lotteryData;
    lastUpdateTime = now;
    
    return NextResponse.json(lotteryData);
    
  } catch (error) {
    console.error('API 에러:', error);
    
    // 에러 시 캐시된 데이터 또는 기본 데이터 반환
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    
    return NextResponse.json(
      await fetchLotteryData(),
      { status: 500 }
    );
  }
}

// POST 요청 처리 (수동 업데이트)
export async function POST(request) {
  try {
    console.log('수동 당첨번호 업데이트 요청');
    
    const lotteryData = await scrapeFromDhlottery();
    
    // 캐시 업데이트
    cachedData = lotteryData;
    lastUpdateTime = Date.now();
    
    return NextResponse.json({
      success: true,
      data: lotteryData,
      updatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('수동 업데이트 에러:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// 주기적 업데이트를 위한 cron job 설정 (Vercel Cron Jobs 사용)
export async function PATCH(request) {
  try {
    // 토요일 밤 10시 체크
    if (!shouldUpdateData()) {
      return NextResponse.json({
        success: false,
        message: '아직 업데이트 시간이 아닙니다.'
      });
    }
    
    console.log('자동 당첨번호 업데이트 (토요일 밤 10시)');
    
    const lotteryData = await scrapeFromDhlottery();
    
    // 캐시 업데이트
    cachedData = lotteryData;
    lastUpdateTime = Date.now();
    
    return NextResponse.json({
      success: true,
      data: lotteryData,
      updatedAt: new Date().toISOString(),
      type: 'automatic'
    });
    
  } catch (error) {
    console.error('자동 업데이트 에러:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}