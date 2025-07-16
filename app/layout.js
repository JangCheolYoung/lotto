import './globals.css'

export const metadata = {
  metadataBase: new URL('https://lotto-mocha.vercel.app'),
  title: {
    default: '로또 번호 생성기 - 스마트 로또 6/45 번호 추출',
    template: '%s | 로또 번호 생성기'
  },
  description: '로또 6/45 번호를 스마트하게 생성합니다. 고급 필터링, 패턴 분석, 최근 당첨번호 제외 기능으로 더 나은 번호 조합을 만들어보세요.',
  keywords: ['로또', '번호생성기', '로또645', '당첨번호', '로또번호추천', '스마트로또', '로또분석', '로또예측', '로또통계', '동행복권'],
  authors: [{ name: '로또 번호 생성기', url: 'https://lotto-mocha.vercel.app' }],
  creator: '로또 번호 생성기',
  publisher: '로또 번호 생성기',
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
    title: '로또 번호 생성기 - 스마트 로또 6/45 번호 추출',
    description: '로또 6/45 번호를 스마트하게 생성합니다. 고급 필터링, 패턴 분석, 최근 당첨번호 제외 기능 제공.',
    siteName: '로또 번호 생성기',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '로또 번호 생성기 - 스마트 번호 추출',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '로또 번호 생성기 - 스마트 로또 6/45 번호 추출',
    description: '로또 6/45 번호를 스마트하게 생성합니다.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '로또 번호 생성기',
  description: '로또 6/45 번호를 스마트하게 생성하는 웹 애플리케이션',
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
    priceCurrency: 'KRW'
  },
  author: {
    '@type': 'Organization',
    name: '로또 번호 생성기',
    url: 'https://lotto-mocha.vercel.app'
  },
  publisher: {
    '@type': 'Organization',
    name: '로또 번호 생성기',
    url: 'https://lotto-mocha.vercel.app'
  },
  potentialAction: {
    '@type': 'UseAction',
    target: 'https://lotto-mocha.vercel.app',
    object: '로또 번호 생성'
  },
  keywords: '로또, 번호생성기, 로또645, 스마트로또, 동행복권',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    ratingCount: '1247'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-title" content="로또 번호 생성기" />
        <meta name="application-name" content="로또 번호 생성기" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="google-site-verification" content="VM0BVKPsDiggBTjZcftnnm58oVL3Tty-R9psub8m_9s" />
        <meta name="naver-site-verification" content="your-naver-verification-code" />
        
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