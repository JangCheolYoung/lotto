/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Vercel 배포를 위한 기본 설정
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // 정적 export 제거 (Vercel에서는 필요없음)
  // output: 'export', // 제거
  
  // 이미지 최적화 활성화 (Vercel에서 지원)
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 압축 설정
  compress: true,
  
  // 환경변수 설정
  env: {
    CUSTOM_KEY: 'lotto-app',
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig