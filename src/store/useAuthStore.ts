import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createAuthSlice, type AuthSlice } from './auth/authSlice'

export const useAuthStore = create<AuthSlice>()(
    persist(
        (...args) => ({
            ...createAuthSlice(...args),
        }),
        { name: 'auth' },
    ),
)
