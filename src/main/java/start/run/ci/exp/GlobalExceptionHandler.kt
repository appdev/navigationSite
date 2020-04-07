package start.run.ci.exp

import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import javax.servlet.http.HttpServletRequest


/**
 * Created by ZhaoShulin on 2019/9/6 4:05 下午.
 * <br>
 * Desc:
 * <br>
 */
@ControllerAdvice
internal class GlobalExceptionHandler {

    private val logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    /**
     * 处理自定义的业务异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = [BizException::class])
    @ResponseBody
    fun bizExceptionHandler(req: HttpServletRequest, e: BizException): ResultBody {
        logger.error("发生业务异常！原因是：{}", e.getErrorMsg())
        return ResultBody.error(e.getErrorCode(), e.getErrorMsg())
    }

    /**
     * 处理空指针的异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = [NullPointerException::class])
    @ResponseBody
    fun nullexceptionHandler(req: HttpServletRequest, e: NullPointerException): ResultBody {
        logger.error("发生空指针异常！原因是:", e)
        return ResultBody.error(CommonEnum.BODY_NOT_MATCH)
    }


    /**
     * 处理其他异常
     * @param req
     * @param e
     * @return
     */
    @ExceptionHandler(value = [Exception::class])
    @ResponseBody
    fun exceptionHandler(req: HttpServletRequest, e: Exception): ResultBody {
        logger.error("未知异常！原因是:", e)
        return ResultBody.error(CommonEnum.INTERNAL_SERVER_ERROR)
    }
}