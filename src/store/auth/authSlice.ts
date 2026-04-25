import type { StateCreator } from 'zustand'

export interface AuthState {
    login: string
    password: string
    authStatus: 'idle' | 'authenticated' | 'unauthenticated'
}

export interface AuthActions {
    setLogin: (login: string) => void
    setPassword: (password: string) => void
    setAuthStatus: (status: AuthState['authStatus']) => void
    clearAuth: () => void
}

export interface AuthSlice extends AuthState, AuthActions {}

const initialState: AuthState = {
    login: '',
    password: '',
    authStatus: 'idle',
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
    ...initialState,
    setLogin: (login) => set({ login }),
    setPassword: (password) => set({ password }),
    setAuthStatus: (authStatus) => set({ authStatus }),
    clearAuth: () => set(initialState),
})
