import './globals.css'

export const metadata = {
  title: '로또 번호 생성기 - AI 기반 스마트 추출',
  description: '동행복권 로또 6/45 번호를 스마트하게 생성하는 AI 기반 서비스',
  keywords: '로또, 번호생성기, 동행복권, 로또645, 당첨번호',
  openGraph: {
    title: '로또 번호 생성기',
    description: 'AI 기반 스마트 로또 번호 추출 서비스',
    type: 'website',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}