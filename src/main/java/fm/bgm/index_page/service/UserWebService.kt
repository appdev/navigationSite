package fm.bgm.index_page.service

import com.baomidou.mybatisplus.extension.service.IService
import fm.bgm.index_page.dao.entity.Category
import fm.bgm.index_page.dao.entity.UserWebData
import java.util.*

/**
 * Created by ZhaoShulin on 2019/9/2 3:43 下午.
 * <br>
 * Desc: WebService 层
 * <br>
 */
interface UserWebService : IService<UserWebData> {
    fun findListByUserID(id: Long): List<UserWebData>
    fun findListByUserIDWithGroup(id: Long): ArrayList<Category>
    fun updateWeb(webID: Long, name: String, url: String)
    fun saveList(list: ArrayList<Category>, userID: Long)
    fun selectByCategory(category: String): List<UserWebData>
    fun selectAll(): List<UserWebData>

}