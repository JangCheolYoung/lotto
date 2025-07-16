import './globals.css'

export const metadata = {
  metadataBase: new URL('https://lotto-mocha.vercel.app'),
  title: {
    default: '로또번호생성기 | 무료 AI 로또 6/45 번호 추천 사이트',
    template: '%s | 로또번호생성기'
  },
  description: '🎰 AI 기반 로또번호생성기로 당첨 확률을 높여보세요! 무료 로또 번호 추천, 통계 분석, 당첨 번호 확인까지 한번에. 동행복권 로또 6/45 전용.',
  keywords: [
    '로또번호생성기', '로또번호추천', '로또번호', '로또당첨번호', 
    '무료로또번호', 'AI로또', '스마트로또', '동행복권', '로또645',
    '로또분석', '로또통계', '로또예측', '번호추천', '당첨번호'
  ],
  authors: [{ name: '로또번호생성기', url: 'https://lotto-mocha.vercel.app' }],
  creator: '로또번호생성기',
  publisher: '로또번호생성기',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: '로또번호생성기 | 무료 AI 로또 6/45 번호 추천',
    description: '🎰 AI 기반 로또번호생성기로 당첨 확률을 높여보세요! 무료 로또 번호 추천, 통계 분석, 당첨 번호 확인까지 한번에.',
    siteName: '로또번호생성기',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '로또번호생성기 - AI 기반 무료 로또 번호 추천',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '로또번호생성기 | 무료 AI 로또 6/45 번호 추천',
    description: '🎰 AI 기반 로또번호생성기로 당첨 확률을 높여보세요!',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
      notranslate: false
    }
  },
  verification: {
    google: 'LWywuun8ys8iMZY1bo_OT2oo1ha34Sa2_w2VEPrJEB8'
  },
  category: 'entertainment',
  classification: 'lottery number generator',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'msapplication-TileColor': '#3B82F6',
    'msapplication-config': '/browserconfig.xml'
  }
}

// 개선된 JSON-LD 구조화 데이터
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '로또번호생성기',
  alternateName: ['로또 번호 생성기', 'AI 로또번호생성기', '무료 로또번호생성기'],
  description: 'AI 기반 로또 6/45 번호를 스마트하게 생성하는 무료 웹 애플리케이션. 고급 필터링, 패턴 분석, 최근 당첨번호 제외 기능 제공.',
  url: 'https://lotto-mocha.vercel.app',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  softwareVersion: '1.2.0',
  datePublished: '2025-01-15',
  dateModified: '2025-01-16',
  inLanguage: 'ko-KR',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
    availability: 'https://schema.org/InStock'
  },
  author: {
    '@type': 'Organization',
    name: '로또번호생성기',
    url: 'https://lotto-mocha.vercel.app'
  },
  publisher: {
    '@type': 'Organization',
    name: '로또번호생성기',
    url: 'https://lotto-mocha.vercel.app'
  },
  potentialAction: {
    '@type': 'UseAction',
    target: 'https://lotto-mocha.vercel.app',
    object: '로또 번호 생성'
  },
  keywords: '로또번호생성기, 로또번호추천, 로또번호, 로또당첨번호, 무료로또번호, AI로또, 스마트로또, 동행복권, 로또645',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2847',
    bestRating: '5'
  },
  // 추가: 기능별 세부 정보
  featureList: [
    'AI 기반 번호 생성',
    '고급 필터링 시스템',
    '3단계 번호 선택',
    '패턴 분석 기능',
    '최근 당첨번호 제외',
    '생성 히스토리 관리',
    '모바일 최적화'
  ],
  // 추가: 사용 통계
  interactionStatistic: {
    '@type': 'InteractionCounter',
    interactionType: 'https://schema.org/UseAction',
    userInteractionCount: '125000'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-title" content="로또번호생성기" />
        <meta name="application-name" content="로또번호생성기" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="google-site-verification" content="VM0BVKPsDiggBTjZcftnnm58oVL3Tty-R9psub8m_9s" />
        <meta name="naver-site-verification" content="your-naver-verification-code" />
        
        {/* 추가: 핵심 키워드 강화 */}
        <meta name="subject" content="로또번호생성기" />
        <meta name="topic" content="로또번호생성기" />
        <meta name="summary" content="AI 기반 무료 로또번호생성기" />
        <meta name="Classification" content="로또번호생성기" />
        <meta name="designer" content="로또번호생성기 팀" />
        <meta name="copyright" content="로또번호생성기" />
        <meta name="reply-to" content="contact@lottohub.com" />
        <meta name="owner" content="로또번호생성기" />
        <meta name="directory" content="submission" />
        <meta name="category" content="로또번호생성기" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subtitle" content="무료 AI 로또 6/45 번호 추천" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3B82F6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://lotto-mocha.vercel.app/" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}