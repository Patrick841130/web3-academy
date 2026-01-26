import React, { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import { Calendar, Check, X, Shield, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReservationService } from '../lib/supabase';

const ReservationSection = () => {
    const [dates, setDates] = useState([
        { id: 1, date: '2월 02일 (월)', value: '2026-02-02', time: '14:00 ~ 16:00', seats: 15 },
        { id: 2, date: '2월 03일 (화)', value: '2026-02-03', time: '14:00 ~ 16:00', seats: 15 },
        { id: 3, date: '2월 04일 (수)', value: '2026-02-04', time: '14:00 ~ 16:00', seats: 15 },
        { id: 4, date: '2월 05일 (목)', value: '2026-02-05', time: '14:00 ~ 16:00', seats: 15 },
        { id: 5, date: '2월 06일 (금)', value: '2026-02-06', time: '14:00 ~ 16:00', seats: 15 },
    ]);

    const [selectedDate, setSelectedDate] = useState(null); // stores date value e.g. '2026-01-26'
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', agree: false });
    const [loading, setLoading] = useState(false);
    const [successInfo, setSuccessInfo] = useState(null); // { code: '...' }

    // Load counts on mount and listen for changes
    useEffect(() => {
        loadCounts();

        const handleReservationChange = () => loadCounts();
        window.addEventListener('reservationChange', handleReservationChange);

        return () => window.removeEventListener('reservationChange', handleReservationChange);
    }, []);

    const loadCounts = async () => {
        try {
            const counts = await ReservationService.getCounts();
            setDates(prev => prev.map(d => ({
                ...d,
                seats: Math.max(0, 15 - (counts[d.value] || 0))
            })));
        } catch (e) {
            console.error("Failed to load counts", e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate) {
            alert("날짜를 선택해주세요.");
            return;
        }

        setLoading(true);
        try {
            const result = await ReservationService.create({
                name: formData.name,
                phone: formData.phone,
                reservation_date: selectedDate
            });

            setSuccessInfo({ code: result.reservation_code });
            setShowModal(true);
            loadCounts(); // Refresh counts
            setFormData({ name: '', phone: '', agree: false });
            setSelectedDate(null);
        } catch (error) {
            // "죄송합니다..." 메시지는 그대로 띄우고, 그 외에는 친절한 안내 메시지
            if (error.message.includes("마감")) {
                alert(error.message);
            } else {
                alert("잠시 후 다시 시도해주세요.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="reservation" className="py-20 px-4 bg-gradient-to-b from-brand-dark to-[#02040a] relative">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">지금 바로 예약하세요</h2>
                    <p className="text-gray-400">당신의 미래를 바꿀 2시간. 망설이면 늦습니다.</p>
                </div>

                <CountdownTimer />

                <div className="glass-strong rounded-2xl p-6 md:p-10 border border-brand-purple/20 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-purple/20 rounded-full blur-[80px]"></div>

                    <div className="flex flex-col lg:flex-row gap-10 relative z-10">
                        {/* Schedule Selection */}
                        <div className="lg:w-1/2">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-brand-neon" /> 일정 선택
                            </h3>
                            <div className="space-y-3">
                                {dates.map((item) => {
                                    const isSoldOut = item.seats === 0;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => !isSoldOut && setSelectedDate(item.value)}
                                            disabled={isSoldOut}
                                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center group ${selectedDate === item.value
                                                ? 'bg-brand-purple/20 border-brand-purple shadow-[0_0_15px_rgba(217,70,239,0.3)]'
                                                : isSoldOut
                                                    ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            <div>
                                                <div className={`font-bold ${selectedDate === item.value ? 'text-white' : 'text-gray-300'}`}>
                                                    {item.date} {isSoldOut && <span className="text-red-500 ml-2">(매진)</span>}
                                                </div>
                                                <div className="text-xs text-gray-500">{item.time}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`font-bold text-sm ${isSoldOut ? 'text-gray-500' : 'text-brand-neon'}`}>
                                                    {isSoldOut ? '매진 (정원 초과)' : `잔여 ${item.seats}석`}
                                                </div>
                                                {!isSoldOut && <div className="text-xs text-red-400 animate-pulse">마감 임박</div>}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:w-1/2">
                            <h3 className="text-xl font-bold text-white mb-2">참가자 정보</h3>
                            {selectedDate && (
                                <p className="text-brand-neon font-bold text-sm mb-4">
                                    현재 잔여 좌석: {dates.find(d => d.value === selectedDate)?.seats}석
                                </p>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">이름</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-brand-dark/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                                        placeholder="홍길동"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">전화번호</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-brand-dark/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                                        placeholder="010-1234-5678"
                                    />
                                </div>

                                <div className="flex items-start gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        id="privacy"
                                        required
                                        checked={formData.agree}
                                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                                        className="mt-1 w-4 h-4 rounded border-gray-600 bg-brand-dark text-brand-purple focus:ring-brand-purple"
                                    />
                                    <label htmlFor="privacy" className="text-xs text-gray-400 leading-snug cursor-pointer">
                                        [필수] 개인정보 수집 및 이용에 동의합니다.
                                    </label>
                                </div>

                                <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-lg p-3 flex items-center gap-3">
                                    <Lock className="w-4 h-4 text-brand-blue" />
                                    <p className="text-[11px] text-gray-400">당신의 정보는 암호화되어 안전하게 관리됩니다. <br /> 데이터 주권을 존중합니다.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedDate || loading}
                                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${selectedDate && !loading
                                        ? 'bg-gradient-to-r from-brand-purple to-brand-neon text-white shadow-lg hover:shadow-brand-purple/40 hover:scale-[1.02]'
                                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {loading ? '처리중...' : (selectedDate ? '예약 확정하기' : '일정을 선택해주세요')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-brand-dark border border-white/10 p-8 rounded-2xl max-w-sm w-full relative shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-neon to-brand-purple"></div>
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mb-6">
                                    <Check className="w-8 h-8 text-brand-purple" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">예약 완료!</h3>
                                <p className="text-gray-400 mb-6 text-sm">
                                    성공적으로 예약되었습니다.<br />
                                    아래의 <strong>예약 코드</strong>를 보관해주세요.
                                </p>

                                <div className="w-full bg-black/40 border border-white/10 rounded-lg p-3 mb-6 relative group cursor-pointer" onClick={() => { navigator.clipboard.writeText(successInfo?.code); alert('복사되었습니다.') }}>
                                    <p className="text-xs text-brand-neon uppercase tracking-wider mb-1">Encryption Code</p>
                                    <p className="text-white font-mono font-bold text-sm truncate">{successInfo?.code}</p>
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                        <span className="text-xs text-white">Click to Copy</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 bg-white text-brand-dark font-bold rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    확인
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default ReservationSection;
