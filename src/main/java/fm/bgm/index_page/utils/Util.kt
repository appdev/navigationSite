package fm.bgm.index_page.utils

import com.google.gson.GsonBuilder
import org.slf4j.LoggerFactory

/**
 * Created by ZhaoShulin on 2019/9/2 2:36 下午.
 * <br>
 * Desc:
 * <br>
 */
object Util {
    val gson by lazy {
        GsonBuilder()
                .create()
    }
    val log by lazy { LoggerFactory.getLogger(Util::class.java) }

}