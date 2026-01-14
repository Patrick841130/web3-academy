import React, { useEffect, useState } from 'react';
import { ReservationService } from '../lib/supabase';
import { Download, Trash2, RefreshCcw } from 'lucide-react';
import * as XLSX from 'xlsx';

const Admin = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = await ReservationService.getAll();
            setReservations(data.filter(r => r.status === 'active'));
        } catch (e) {
            alert("데이터 로드 실패");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(reservations);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reservations");
        XLSX.writeFile(wb, "cheonbok_reservations.xlsx");
    };

    const handleCancel = async (id) => {
        if (!confirm("정말 취소하시겠습니까?")) return;
        try {
            await ReservationService.cancel(id);
            loadData();
        } catch (e) {
            alert("취소 실패");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold font-heading">Cheonbok Web3 Admin</h1>
                    <div className="flex gap-2">
                        <button onClick={loadData} className="p-2 bg-gray-700 rounded hover:bg-gray-600">
                            <RefreshCcw className="w-5 h-5" />
                        </button>
                        <button onClick={handleExport} className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded hover:bg-green-500 font-bold">
                            <Download className="w-4 h-4" /> Excel Export
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-gray-700 text-gray-200 uppercase font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">Code</th>
                                        <th className="px-6 py-4">Created At</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {reservations.map((res) => (
                                        <tr key={res.id} className="hover:bg-gray-750">
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${res.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {res.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-white font-medium">{res.reservation_date}</td>
                                            <td className="px-6 py-4">{res.name}</td>
                                            <td className="px-6 py-4">{res.phone}</td>
                                            <td className="px-6 py-4 font-mono text-xs">{res.reservation_code}</td>
                                            <td className="px-6 py-4 text-xs">{new Date(res.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                {res.status === 'active' && (
                                                    <button
                                                        onClick={() => handleCancel(res.id)}
                                                        className="text-red-400 hover:text-white transition-colors"
                                                        title="Cancel Reservation"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {reservations.length === 0 && (
                                <div className="text-center py-10">No reservations found.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
