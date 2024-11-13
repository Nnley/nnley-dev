'use client'

import { usePleaseStay } from 'react-use-please-stay'

export const useAnimatedTitle = () => {
	return usePleaseStay({
		titles: ['⠀', 'N', 'NN', 'NNL', 'NNLE', 'NNLEY', 'NNLE', 'NNL', 'NN', 'N'],
		interval: 1000,
		alwaysRunAnimations: true,
	})
}
