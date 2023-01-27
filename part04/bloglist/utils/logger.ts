/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params: any[]) => {
	console.log(...params)
}

const error = (...params: any[]) => {
	console.error(...params)
}

export default { info, error } as const
