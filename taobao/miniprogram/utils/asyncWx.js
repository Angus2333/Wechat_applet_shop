//promise形式的getsetting
export const getSetting = () => {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: (result) => {
                    resolve(result)
                },
                fail: (err) => {
                    reject(err)
                },
                complete: () => {}
            });
        })
    }
    //promise形式的getsetting
export const chooseAddress = () => {
        return new Promise((resolve, reject) => {
            wx.chooseAddress({
                success: (result) => {
                    resolve(result)
                },
                fail: (err) => {
                    reject(err)
                },
                complete: () => {}
            });
        })
    }
    //promise形式的getsetting
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {}
        });
    })
}