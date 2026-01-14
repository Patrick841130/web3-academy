import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Lock, EyeOff } from 'lucide-react';

const ProblemStatement = () => {
    const problems = [
        {
            icon: <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />,
            title: "개인정보 유출의 일상화",
            desc: "당신의 주민등록번호, 전화번호, 금융 정보는 이미 공공재입니다. 중앙화된 서버는 더 이상 안전하지 않습니다."
        },
        {
            icon: <Lock className="w-12 h-12 text-orange-500 mb-4" />,
            title: "데이터 소유권의 부재",
            desc: "내가 만든 콘텐츠와 데이터로 기업만 배불리는 구조. 정작 데이터의 주인인 당신에게는 아무런 보상이 없습니다."
        },
        {
            icon: <EyeOff className="w-12 h-12 text-yellow-500 mb-4" />,
            title: "금융 시스템의 불투명성",
            desc: "복잡한 수수료와 불투명한 운영. 내 돈이 어디서 어떻게 쓰이는지 알 수 없는 깜깜이 금융."
        }
    ];

    return (
        <section className="py-20 px-4 bg-brand-dark relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
                        <span className="text-red-500">Warning:</span> 당신의 자산은 안전하지 않습니다
                    </h2>
                    <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                        대한민국 성인 90%의 개인정보가 유출된 지금, 기존의 보안 방식으로는 당신의 자산을 지킬 수 없습니다.
                        <br />
                        웹3는 선택이 아닌 <span className="text-white font-bold underline decoration-brand-purple underline-offset-4">생존을 위한 필수 조건</span>입니다.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {problems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="glass p-8 rounded-2xl border-t border-white/10 hover:border-brand-purple/50 transition-colors duration-300"
                        >
                            <div className="flex flex-col items-center text-center">
                                {item.icon}
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
