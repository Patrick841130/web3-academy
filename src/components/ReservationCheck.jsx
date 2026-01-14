import React, { useState } from 'react';
import { ReservationService } from '../lib/supabase';
import { Shield, Trash2 } from 'lucide-react';

import Toast from './Toast';

const ReservationCheck = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [myReservations, setMyReservations] = useState([]);
    const [searched, setSearched] = useState(false);

    // Toast State
    const [toast, setToast] = useState({ show: false, message: '', type: 'success', onConfirm: null });

    const showToast = (message, type = 'success', onConfirm = null) => {
        setToast({ show: true, message, type, onConfirm });
    };

    const handleCheck = async (e) => {
        e.preventDefault();
        try {
            const data = await ReservationService.find(name, phone);
            setMyReservations(data);
            setSearched(true);
        } catch (e) {
            showToast('조회 중 오류가 발생했습니다.', 'error');
        }
    };

    const requestCancel = (id) => {
        showToast('정말로 예약을 취소하시겠습니까?', 'confirm', () => confirmCancel(id));
    };

    const confirmCancel = async (id) => {
        try {
            // Close confirm toast first (optional, but cleaner transitions)
            setToast({ ...toast, show: false });

            await ReservationService.cancel(id);
            // Show success toast with slight delay or immediate
            setTimeout(() => showToast('예약이 성공적으로 취소되었습니다.'), 100);

            window.dispatchEvent(new Event('reservationChange'));
            setMyReservations(prev => prev.filter(r => r.id !== id));
        } catch (e) {
            showToast('취소 중 오류가 발생했습니다.', 'error');
        }
    };

    return (
        <div className="py-12 bg-black border-t border-white/10 text-center relative">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onConfirm={toast.onConfirm}
                    onClose={() => setToast({ ...toast, show: false })}
                    duration={3000}
                />
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-white underline text-sm transition-colors"
            >
                예약 확인 및 취소
            </button>

            {isOpen && (
                <div className="max-w-md mx-auto mt-8 p-6 glass rounded-xl text-left">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brand-blue" /> 내 예약 조회
                    </h4>

                    <form onSubmit={handleCheck} className="flex gap-2 mb-6">
                        <input
                            type="text" placeholder="이름" value={name} onChange={e => setName(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm w-1/3 outline-none focus:border-brand-blue"
                            required
                        />
                        <input
                            type="text" placeholder="전화번호" value={phone} onChange={e => setPhone(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white text-sm w-1/3 outline-none focus:border-brand-blue"
                            required
                        />
                        <button type="submit" className="bg-brand-blue text-white text-sm px-4 rounded hover:bg-brand-blue/80">조회</button>
                    </form>

                    {searched && (
                        <div className="space-y-3">
                            {myReservations.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center py-4">예약 내역이 없습니다.</p>
                            ) : (
                                myReservations.map(res => (
                                    <div key={res.id} className="bg-white/5 p-3 rounded border border-white/5 flex justify-between items-center">
                                        <div>
                                            <p className="text-white text-sm font-bold">{res.reservation_date}</p>
                                            <p className="text-gray-500 text-xs font-mono">{res.reservation_code}</p>
                                        </div>
                                        <button
                                            onClick={() => requestCancel(res.id)}
                                            className="text-red-400 hover:text-red-300 p-2"
                                            title="예약 취소"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReservationCheck;
