require('dotenv').config()

const { connect, disconnect } = require('mongoose')
const { createLogger } = require('./utils')
const logger = createLogger(module)
const cors = require('cors')
const { name, version } = require('../package.json')
const { env: { MONGO_URL, PORT } } = process


connect(MONGO_URL)
    .then(() => {
        logger.info('db connected')

        const express = require('express')
        
        const api = express()
        
        const { usersRouter, auctionRouter} = require('./routes')     
        
        api.use(cors())

        api.get('/', (req, res) => res.send('Postits API v1.0 ;)'))

        api.use('/api', usersRouter,auctionRouter )
        
        
        api.listen(PORT, () => logger.info(`${name} v${version} started and listening in port ${PORT}`))

        process.on('SIGINT', () => {
            if (!process.stopped) {
                process.stopped = true

                logger.info('\napi stopped')

                disconnect()
                    .then(() => {
                        logger.info('db disconnected')

                        process.exit(0)
                    })
            }
        })
    })
    .catch(error => {
        logger.error(error)
    })