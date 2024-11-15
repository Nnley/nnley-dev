import { create } from 'zustand'

interface State {
	isMobile: boolean
	updateIsMobile: () => void
}

export const useDeviceInfoStore = create<State>(set => ({
	isMobile: false,
	updateIsMobile: () => {
		const mobile = window.innerWidth <= 768
		set({ isMobile: mobile })
	},
}))
