package fm.bgm.index_page.dao.entity

import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import com.google.gson.annotations.SerializedName
import javax.persistence.*

@Entity(name = "user_webdata")
@TableName(value = "user_webdata")
data class UserWebData(
        @SerializedName("id")
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(unique = true, nullable = false)
        @TableId
        var id: Long?,
        @Column
        var category: String? = "",
        @Column
        var name: String? = "",
        @Column
        var url: String? = "",
        @Column
        @GeneratedValue(strategy = GenerationType.AUTO)
        var weight: Int?,
        @Column(nullable = false)
        @TableField("userID")
        var userID: Long?,
        @Column(nullable = false)
        @TableField("categoryID")
        var categoryID: Long?,
        @Column(nullable = false)
        @TableField("sort")
        var sort: Int?
) {

    companion object {
        fun createUserWeb(web: UserWebData, userID: Long, id: Long, sort: Int): UserWebData {
            return UserWebData(web.id, web.category, web.name, web.url, web.weight, userID, id, sort)
        }

        fun createData(id: Long, name: String?, url: String?): UserWebData {
            return UserWebData(id, null, name, url, null, null, null, null)
        }

    }

    override fun toString(): String {
        return "UserWebData(id=$id, category=$category, name=$name, url=$url, weight=$weight, userID=$userID, sort=$sort)"
    }
}