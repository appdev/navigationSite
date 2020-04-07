package start.run.ci.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import start.run.ci.dao.entity.UserData
import start.run.ci.exp.CommonEnum
import start.run.ci.exp.ResultBody
import start.run.ci.service.UserService
import start.run.ci.utils.CookieUtil
import start.run.ci.utils.DesUtils
import start.run.ci.utils.PasswordUtil
import start.run.ci.utils.notEmpty
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


/**
 * Created by ZhaoShulin on 2019/9/6 10:21 上午.
 * <br></br>
 * Desc:
 * <br></br>
 */
@RestController
internal class UserController {
    @Autowired
    private val service: UserService? = null

    companion object {
        const val cookieKry = "login"
        const val message = "message"
    }


    @RequestMapping(value = ["/login"], method = [RequestMethod.GET, RequestMethod.POST])
    //登陆成功写入cookie
    fun login(response: HttpServletResponse, request: HttpServletRequest): ResultBody? {
        val cookie = CookieUtil.getCookieByName(request, cookieKry)
        return if (cookie != null && cookie.value.notEmpty()) {
            //如果登录
//            "redirect:/"
            ResultBody.success()
        } else if (request.method == "POST") {
            //没有登录
            val username = request.getParameter("username")
            val password = request.getParameter("password")
            val data = findUser(username, PasswordUtil.encodePassword(password))
            return if (data != null) {
                setCookie(username, response)
                ResultBody.success()
            } else {
                cleanCookie(response)
                ResultBody.error("用户名或密码不正确")
//                "用户名或密码不正确"
            }
        } else {
            cleanCookie(response)
            ResultBody.error("请先登录")
        }
    }

    /**
     * 为用户名加密一次
     */
    private fun setCookie(name: String, response: HttpServletResponse) {
        val loginCookie = Cookie(cookieKry, DesUtils().encrypt(name))
        loginCookie.maxAge = Int.MAX_VALUE
        response.addCookie(loginCookie)
    }

    private fun cleanCookie(response: HttpServletResponse) {
        val cookie = Cookie(cookieKry, null)
        cookie.maxAge = 0
        cookie.path = "/"
        response.addCookie(cookie)
    }

    private fun findUser(username: String?, password: String?): UserData? {
        return service?.findByUser(username, password)
    }


    @RequestMapping(value = ["/reg"], method = [RequestMethod.POST, RequestMethod.GET])
    fun regUser(response: HttpServletResponse, request: HttpServletRequest): ResultBody? {
        cleanCookie(response)
        return if (request.method == "POST") {
            //没有登录
            val username = request.getParameter("username")
            val password = request.getParameter("password")
            val data = findUser(username, "")
            return if (data != null) {
                ResultBody.error("用户名已存在，请更换或登录")
            } else {
                val user = UserData(username, PasswordUtil.encodePassword(password))
                service?.insertUser(user)
                setCookie(username, response)
                ResultBody.success("注册成功")
            }
        } else {
            ResultBody.error(CommonEnum.BODY_NOT_MATCH)
        }
    }

}
