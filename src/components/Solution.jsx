import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Users } from 'lucide-react';

const Solution = () => {
    return (
        <section className="py-20 px-4 relative bg-brand-dark">
            {/* Background Gradient */}
            <div className="absolute top-[20%] left-[-20%] w-[60%] h-[60%] bg-brand-blue/10 rounded-full blur-[100px]" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                            유일한 해답,<br />
                            <span className="text-gradient-primary">천복 웹3 사관학교</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            우리는 단순한 지식 전달을 넘어,
                            웹3 시대를 리드할 실전 투자자와 리더를 양성합니다.
                            변화의 파도에 휩쓸리지 말고, 파도 위에 올라타십시오.
                        </p>

                        <ul className="space-y-6">
                            {[
                                { icon: CheckCircle, text: "웹3 핵심 개념 및 블록체인 원리 완벽 마스터" },
                                { icon: TrendingUp, text: "실전 데이터 주권 확보 및 자산 증식 노하우 전수" },
                                { icon: Users, text: "상위 1% 웹3 리더들과의 독점적 네트워킹" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="mt-1 bg-brand-purple/20 p-2 rounded-full">
                                        <item.icon className="w-5 h-5 text-brand-purple" />
                                    </div>
                                    <span className="text-lg text-gray-200">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 w-full"
                    >
                        <div className="glass-strong p-1 rounded-2xl relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-neon to-brand-purple opacity-20 blur-xl"></div>
                            <div className="relative bg-brand-dark/90 rounded-xl p-8 border border-white/10">
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">Curriculum Preview</h3>
                                <div className="space-y-4">
                                    {['Session 1: 부의 대이동과 웹3', 'Session 2: 지갑 만들기 & 보안 실습', 'Session 3: De-Fi 실전 투자 101', 'Session 4: NFT와 커뮤니티 경제'].map((session, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                            <span className="text-gray-300 font-medium">{session}</span>
                                            <span className="text-xs text-brand-neon font-bold px-2 py-1 bg-brand-neon/10 rounded">실습 포함</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Solution;
