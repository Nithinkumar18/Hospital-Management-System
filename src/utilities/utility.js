
const  connectionTime = () => {
    return new Date().toLocaleTimeString('en-GB',{hour: '2-digit', minute: '2-digit',second: '2-digit'});
}

module.exports = { connectionTime}