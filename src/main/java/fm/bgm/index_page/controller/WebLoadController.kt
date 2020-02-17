package fm.bgm.index_page.controller

import fm.bgm.index_page.dao.entity.UserWebData
import fm.bgm.index_page.exp.ResultBody
import fm.bgm.index_page.service.UserService
import fm.bgm.index_page.service.UserWebServiceImpl
import fm.bgm.index_page.utils.CookieUtil
import fm.bgm.index_page.utils.DesUtils
import fm.bgm.index_page.utils.ListUtil
import fm.bgm.index_page.utils.LoadFile.loadJsonFileToList
import fm.bgm.index_page.utils.notEmpty
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


/**
 * Created by ZhaoShulin on 2019/9/2 12:42 下午.
 * <br>
 * Desc:
 * <br>
 */
@RestController
public class WebLoadController {
    //    @Autowired
//    private val webService: WebServiceImpl? = null
    @Autowired
    private val service: UserService? = null
    @Autowired
    private val userWebService: UserWebServiceImpl? = null

    companion object {
        const val cookieKry = "login"
        const val pageData = "PageData"
        const val allData = "AllData"
    }

    @RequestMapping(value = ["/load"], method = [RequestMethod.GET], produces = ["application/json;charset=UTF-8"])
    @ResponseBody
    fun selectByCategory(@RequestParam(value = "category", required = false, defaultValue = "") category: String): List<UserWebData>? {
        return if (category.notEmpty()) {
            userWebService?.selectByCategory(category)
        } else userWebService?.selectAll()
    }

    /**
     * 首页
     */
    @RequestMapping(value = ["/"], method = [RequestMethod.GET])
    fun index(response: HttpServletResponse, request: HttpServletRequest, model: ModelAndView): ModelAndView {
        val cookie = CookieUtil.getCookieByName(request, cookieKry)
        if (cookie != null && cookie.value.isNotEmpty()) {
            //查找用户
            val data = service?.findByUser(DesUtils().decrypt(cookie.value), "")
            if (data != null) {
                val userList = userWebService?.findListByUserIDWithGroup(data.id)
                //这个用户还没有自己的数据
                if (userList.isNullOrEmpty()) {
                    //查找默认数据
                    val allList = ListUtil.splitList(loadJsonFileToList("userweb.json"))
                    userWebService?.saveList(allList, data.id)
                    model.addObject(pageData, userWebService?.findListByUserIDWithGroup(data.id))
                } else model.addObject(pageData, userList)
            } else {
                cleanCookie(response)
                model.addObject(pageData, ListUtil.splitList(loadJsonFileToList("userweb.json")))
            }
        } else model.addObject(pageData, ListUtil.splitList(loadJsonFileToList("userweb.json")))

        model.addObject(allData, loadJsonFileToList("websitetips.json"))
        model.viewName = "index"
        return model
    }

    private fun cleanCookie(response: HttpServletResponse) {
        val cookie = Cookie(UserController.cookieKry, null)
        cookie.maxAge = 0
        cookie.path = "/"
        response.addCookie(cookie)
    }

    /**
     * 替换网站
     */
    @RequestMapping(value = ["/replace"], method = [RequestMethod.POST])
    fun replaceWeb(response: HttpServletResponse, request: HttpServletRequest): ResultBody? {
        val cookie = CookieUtil.getCookieByName(request, cookieKry)
        return if (cookie != null && cookie.value.isNotEmpty()) {
            //查找用户
            val data = service?.findByUser(DesUtils().decrypt(cookie.value), "")
            return if (data != null) {
                val id = request.getParameter("id")
                val name = request.getParameter("name")
                val url = request.getParameter("url")
                userWebService?.updateWeb(id.toLong(), name, url)
                //这个用户还没有自己的数据
                ResultBody.success()
            } else {
                ResultBody.error("请先登录")
            }
        } else ResultBody.error("请先登录")
    }

    /**
     * 替换网站分类
     */
    @RequestMapping(value = ["/replace/category"], method = [RequestMethod.POST])
    fun replaceCategory(response: HttpServletResponse, request: HttpServletRequest): ResultBody? {
        val cookie = CookieUtil.getCookieByName(request, cookieKry)
        return if (cookie != null && cookie.value.isNotEmpty()) {
            //查找用户
            val data = service?.findByUser(DesUtils().decrypt(cookie.value), "")
            return if (data != null) {
                val id = request.getParameter("id")
                val name = request.getParameter("name")
                userWebService?.updateCategory(id, name)
                //这个用户还没有自己的数据
                ResultBody.success()
            } else {
                ResultBody.error("请先登录")
            }
        } else ResultBody.error("请先登录")
    }


}