import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark px-4 py-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/30 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-brand-neon text-sm font-bold tracking-wider mb-6 backdrop-blur-md">
                        WEB3 ACADEMY 2026
                    </span>

                    <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 text-white">
                        3년 뒤 당신의 <br className="md:hidden" />
                        <span className="text-gradient-primary">데이터와 자산</span>은 <br />
                        안전합니까?
                    </h1>

                    <p className="text-xl md:text-2xl font-bold text-gray-200 mb-6 font-heading">
                        웹3 시대, 준비하지 않으면 도태됩니다.
                    </p>

                    <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed mb-4">
                        개인정보 해킹과 중앙화된 금융의 위기.<br className="hidden md:block" />
                        데이터 주권을 되찾고 자산 증식의 새로운 로드맵을 제시하는<br className="hidden md:block" />
                        <strong className="text-white">'웹3사관학교'</strong> 설명회에 초대합니다.
                    </p>
                    <p className="text-lg text-center leading-relaxed mb-8">
                    <strong className="text-white">서울시 강남구 논현로87길 19, 6층</strong>
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a href="#reservation" className="group relative px-8 py-4 bg-brand-purple hover:bg-brand-neon transition-all duration-300 rounded-lg text-white font-bold text-lg shadow-[0_0_20px_rgba(217,70,239,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] overflow-hidden">
                            <span className="relative z-10">설명회 신청하기</span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20"></div>
                        </a>
                        <p className="text-sm text-gray-500 font-medium animate-pulse">
                            매일 단 15명에게만 허락된 기회
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />
        </section>
    );
};

export default Hero;
