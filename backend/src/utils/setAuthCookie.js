const setAuthCookies = (res, token) => {
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 15 * 24 * 60 * 60 * 1000
    })
}
export default setAuthCookies