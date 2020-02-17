package fm.bgm.index_page.utils

import fm.bgm.index_page.dao.entity.Category
import fm.bgm.index_page.dao.entity.UserWebData
import java.util.*


/**
 * Created by ZhaoShulin on 2019/9/9 3:34 下午.
 * <br>
 * Desc:
 * <br>
 */
object ListUtil {
    fun splitList(webList: ArrayList<UserWebData>): ArrayList<Category> {
        // 创建Value比较器
//        val valueComparator = ValueComparator(hashMap)
        // 创建TreeMap
        val linkMap = createMap()
        webList.forEach {
            linkMap[it.category]?.add(it)
        }
        val categories = arrayListOf<Category>()
        linkMap.forEach { (_, u) ->
            categories.add(createCategory(u))
        }
        return categories
    }

    private fun createMap(): LinkedHashMap<String, ArrayList<UserWebData>> {
        val linkMap = linkedMapOf<String, ArrayList<UserWebData>>()
        linkMap["常用·工作"] = arrayListOf<UserWebData>()
        linkMap["常用·社交"] = arrayListOf<UserWebData>()
        linkMap["常用·生活"] = arrayListOf<UserWebData>()
        linkMap["新闻"] = arrayListOf<UserWebData>()
        linkMap["视频"] = arrayListOf<UserWebData>()
        linkMap["购物"] = arrayListOf<UserWebData>()
        linkMap["发现"] = arrayListOf<UserWebData>()
        linkMap["商旅"] = arrayListOf<UserWebData>()
        linkMap["银行"] = arrayListOf<UserWebData>()
        return linkMap
    }

    /**
     * 分类列表
     * @param webData
     * @param list
     * @return
     */
    private fun createCategory(list: ArrayList<UserWebData>): Category {
        val webData = list[0]
        val category = Category()
        category.id = IdGen.get().nextId()
        category.name = webData.category
        category.webData = list
        return category
    }
}
