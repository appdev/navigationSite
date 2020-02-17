package fm.bgm.index_page.utils

/**
 * Created by ZhaoShulin on 2019/9/6 3:58 下午.
 * <br>
 * Desc:
 * <br>
 */

fun String?.notEmpty(): Boolean {
    return this != null && this.trim().isNotEmpty() && this != "null"
}