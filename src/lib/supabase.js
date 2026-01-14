import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isMock = !supabaseUrl || !supabaseAnonKey;

export const supabase = isMock
    ? null
    : createClient(supabaseUrl, supabaseAnonKey);

// --- MOCK DATA STORE (Local Storage for persistence during tests) ---
const getMockData = () => {
    const stored = localStorage.getItem('mock_reservations');
    return stored ? JSON.parse(stored) : [];
};

const setMockData = (data) => {
    localStorage.setItem('mock_reservations', JSON.stringify(data));
};

export const ReservationService = {
    // Get counts per date
    getCounts: async () => {
        if (isMock) {
            const data = getMockData();
            const counts = {};
            data.filter(r => r.status === 'active').forEach(r => {
                counts[r.reservation_date] = (counts[r.reservation_date] || 0) + 1;
            });
            return counts;
        }

        const { data, error } = await supabase
            .from('reservations')
            .select('reservation_date, status');

        if (error) throw error;

        const counts = {};
        data.filter(r => r.status === 'active').forEach(r => {
            counts[r.reservation_date] = (counts[r.reservation_date] || 0) + 1;
        });
        return counts;
    },

    // Create Reservation
    create: async ({ name, phone, reservation_date }) => {
        const code = '0x' + uuidv4().replace(/-/g, '').substring(0, 16).toUpperCase();

        if (isMock) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
            const data = getMockData();

            // Check limit
            const count = data.filter(r => r.reservation_date === reservation_date && r.status === 'active').length;
            if (count >= 15) throw new Error("해당 날짜는 매진되었습니다.");

            const newRes = {
                id: uuidv4(),
                name,
                phone,
                reservation_date,
                status: 'active',
                reservation_code: code,
                created_at: new Date().toISOString()
            };
            setMockData([...data, newRes]);
            return newRes;
        }

        // Check limit (Real DB transaction ideal, but client-side check for MVP)
        const { count } = await supabase
            .from('reservations')
            .select('*', { count: 'exact', head: true })
            .eq('reservation_date', reservation_date)
            .eq('status', 'active');

        if (count >= 15) throw new Error("죄송합니다. 방금 정원이 마감되었습니다.");

        const { data, error } = await supabase
            .from('reservations')
            .insert([{ name, phone, reservation_date, reservation_code: code }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Find My Reservation
    find: async (name, phone) => {
        if (isMock) {
            const data = getMockData();
            return data.filter(r => r.name === name && r.phone === phone && r.status === 'active');
        }

        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('name', name)
            .eq('phone', phone)
            .eq('status', 'active');

        if (error) throw error;
        return data;
    },

    // Cancel Reservation
    cancel: async (id) => {
        if (isMock) {
            const data = getMockData();
            const updated = data.map(r => r.id === id ? { ...r, status: 'canceled' } : r);
            setMockData(updated);
            return true;
        }

        const { error } = await supabase
            .from('reservations')
            .update({ status: 'canceled' })
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    // Admin: Get All
    getAll: async () => {
        if (isMock) {
            return getMockData().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }
};
