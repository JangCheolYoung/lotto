/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 빌드 최적화
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // 정적 최적화
  output: 'standalone',
  
  // 이미지 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 압축 설정
  compress: true,
  
  // 파워 추적 비활성화 (빌드 성능 향상)
  experimental: {
    ...nextConfig.experimental,
    turbotrace: {
      logLevel: 'error'
    }
  },
  
  // Webpack 설정 최적화
  webpack: (config, { isServer }) => {
    // 불필요한 파일 제외
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // 빌드 성능 최적화
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig