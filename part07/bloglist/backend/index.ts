import app from './app'
import config from './utils/config'
import logger from './utils/logger'

const PORT = config.PORT
app.listen(PORT || 3001, () => {
	logger.info(`Server running on port ${PORT || 3001}`)
})
