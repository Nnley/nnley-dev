import { create } from 'zustand'

interface State {
	videoSrc: string
	isLoadingVideo: boolean
	setVideoSrc: (src: string) => void
	setIsLoadingVideo: (isLoading: boolean) => void
}

export const useVideoSourceStore = create<State>(set => ({
	videoSrc: '/videos/Von-dutch-480p.webm',
	isLoadingVideo: true,
	setVideoSrc: src => set({ videoSrc: src }),
	setIsLoadingVideo: (isLoading: boolean) => set({ isLoadingVideo: isLoading }),
}))
