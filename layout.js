import './globals.css'

export const metadata = {
  title: '로또 번호 생성기 - AI 기반 스마트 로또 6/45 번호 추출',
  description: '동행복권 로또 6/45 번호를 AI 기술로 스마트하게 생성합니다. 고급 필터링, 패턴 분석, 최근 당첨번호 제외 기능으로 더 나은 번호 조합을 만들어보세요.',
  keywords: '로또, 번호생성기, 동행복권, 로또645, 당첨번호, 로또번호추천, AI로또, 스마트로또, 로또분석, 로또예측, 로또통계',
  authors: [{ name: '로또 번호 생성기' }],
  creator: '로또 번호 생성기',
  publisher: '로또 번호 생성기',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lotto-mocha.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '로또 번호 생성기 - AI 기반 스마트 로또 6/45 번호 추출',
    description: '동행복권 로또 6/45 번호를 AI 기술로 스마트하게 생성합니다. 고급 필터링, 패턴 분석, 최근 당첨번호 제외 기능 제공.',
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: '로또 번호 생성기',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '로또 번호 생성기 - AI 기반 스마트 번호 추출',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '로또 번호 생성기 - AI 기반 스마트 로또 6/45 번호 추출',
    description: '동행복권 로또 6/45 번호를 AI 기술로 스마트하게 생성합니다.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '로또 번호 생성기',
  description: '동행복권 로또 6/45 번호를 AI 기술로 스마트하게 생성하는 웹 애플리케이션',
  url: 'https://lotto-mocha.vercel.app',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript. Requires HTML5.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
  },
  author: {
    '@type': 'Organization',
    name: '로또 번호 생성기',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lotto-mocha.vercel.app',
  },
  potentialAction: {
    '@type': 'UseAction',
    target: 'https://lotto-mocha.vercel.app',
    object: '로또 번호 생성',
  },
  sameAs: [
    'https://github.com/JangCheolYoung/lotto'
  ],
  keywords: '로또, 번호생성기, 동행복권, 로또645, AI, 스마트로또',
  inLanguage: 'ko-KR',
  copyrightYear: '2025',
  genre: 'Utility'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="로또 번호 생성기" />
        <meta name="application-name" content="로또 번호 생성기" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        
        {/* 아이콘들 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3B82F6" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* DNS 프리페치 및 프리로드 */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}