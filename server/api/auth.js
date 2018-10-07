const uuidv1 = require('uuid/v1')
const hash = require('password-hash')

const { sendResponse, modifyCache, find } = require('./common')

module.exports = {
    register: async (req, res, next) => {
        const result = modifyCache(oldCache => {
            return find(oldCache.users, user => user.userName === req.body.name,
                () => {
                    var newUser = {
                        userId: uuidv1(),
                        userName: req.body.name,
                        passwordHash: hash.generate(req.body.password)
                    }

                    return {
                        newCache: Object.assign({}, oldCache, {users: [...oldCache.users, newUser]}),
                        alreadyExists: false
                    }
                }, () => {
                    return {
                        alreadyExists: true,
                        newCache: oldCache
                    }
                })
        })

        if (result.alreadyExists){
            res.status(401).send('Username already in use.')
        } else {
            res.send(200)
        }
    },
    login: async (req, res, next) => {
        const result = modifyCache(oldCache => {
            return find(oldCache.users, user => user.userName === req.body.name,
                () => {return {userExists: false, newCache: oldCache}},
                user => {
                    if (hash.verify(req.body.password, user.passwordHash)){
                        const now = (new Date).getTime()

                        const session = { 
                            sessionId: uuidv1(),
                            userId: user.userId,
                            lastActive: now
                        }

                        const newCache = Object.assign({}, oldCache, { sessions: [...oldCache.sessions, session]})

                        return {
                            userExists: true,
                            correctPassword: true,
                            session,
                            userName: user.userName,
                            newCache
                        }
                    } else {
                        return {
                            userExists: true,
                            correctPassword: false,
                            newCache: oldCache
                        }
                    }
                })
        })

        if (!result.userExists){
            res.status(400).send('Invalid username.')
        } else {
            if (!result.correctPassword){
                res.status(401).send('Invalid password.')
            } else {
                sendResponse(res, {
                    sessionId: result.session.sessionId,
                    userName: result.userName,
                    lastActive: result.session.lastActive
                })
            }
        }
    }
}