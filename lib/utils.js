module.exports = {
    Wait: ms => new Promise(resolve => setTimeout(resolve, ms)),
    NeverResolve: () => new Promise((resolve, reject) => {})
}