/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 🚨 빌드 트레이스 관련 문제 해결
  experimental: {
    turbotrace: {
      logLevel: 'error',
      // 빌드 트레이스 비활성화
      memoryLimit: 4096,
    },
    optimizePackageImports: ['lucide-react'],
  },
  
  // 출력 설정 (standalone 제거 - 빌드 트레이스 문제 해결)
  output: 'export',
  distDir: '.next',
  trailingSlash: true,
  
  // 이미지 최적화 비활성화 (export 모드에서 필요)
  images: {
    unoptimized: true
  },
  
  // 압축 설정
  compress: true,
  
  // Webpack 설정 최적화
  webpack: (config, { isServer, webpack }) => {
    // 빌드 성능 최적화
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // 빌드 트레이스 관련 플러그인 비활성화
    config.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'TraceEntryPointsPlugin'
    );
    
    return config;
  },
}

module.exports = nextConfig