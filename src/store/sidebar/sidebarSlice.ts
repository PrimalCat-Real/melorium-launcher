import type { StateCreator } from 'zustand'

export interface SidebarState {
	isCollapsed: boolean
	activeGroup: string
}

export interface SidebarActions {
    setIsCollapsed: (isCollapsed: boolean) => void
    setActiveGroup: (group: string) => void
}

export interface SidebarSlice extends SidebarState, SidebarActions {}

export const createSidebarSlice: StateCreator<SidebarSlice> = (
	set
) => ({
    isCollapsed: false,
    activeGroup: 'server',
    setIsCollapsed: (isCollapsed) => {
        set((state) => ({
            isCollapsed: isCollapsed
        })
        )
    },
    setActiveGroup: (group) => {
        set((state) => ({
            activeGroup: group
        }))
    }
})
