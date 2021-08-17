const fetch = require("node-fetch");

const name = 'doki8'
const username = process.env.USERNAME
const password = process.env.PASSWORD
const SCKEY = process.env.SCKEY
const TG_TOKEN = process.env.TG_TOKEN
const TG_ID = process.env.TG_ID

const checkin = async callback => {

    try {
        if (!username || !password) throw Error('username or pwd not found')

        const response = await fetch("http://www.doki8.com/wp-login.php", {
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "redirect": "manual",
            "referrer": "http://www.doki8.com/",
            "body": `log=${username}&pwd=${password}&rememberme=forever&wp-submit=%E7%99%BB%E5%BD%95`,
            "method": "POST",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
        });

        if (!response.status === 302) {
            throw Error('login error')
        }
        const cookies = response.headers.raw()['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ')

        const loginResponse = await fetch("http://www.doki8.com/", {
            "headers": {
                "accept": "*/*",
                "accept-language": "ja-JP,ja;q=0.9,zh-CN;q=0.8,zh;q=0.7,en-US;q=0.6,en;q=0.5",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "cookie": cookies
            },
            "referrer": "http://www.doki8.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        });

        const text = await loginResponse.text()
        const ponits = text.match(/积分: (\d+) 心动豆/)[0]

        callback && await callback(name + ' 签到成功 ' + ponits)
    } catch (e) {
        callback && await callback(name + ' 签到失败')
        throw Error(e.message + ' 签到失败')
    }
};

const notification = async (text) => {
    if (SCKEY) {
        await fetch(`https://sc.ftqq.com/${SCKEY}.send?text=${encodeURIComponent(text)}`)
    }
    if (TG_ID && TG_TOKEN) {
        await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?chat_id=${TG_ID}&text=${encodeURIComponent(text)}`)
    }
    console.log('notification: ', text)
}


checkin(notification)
    .then(() => process.exit())
    .catch(e => {
        console.error(e.message)
        process.exit(1)
    });