package start.run.ci.exp;

/**
 * Created by ZhaoShulin on 2019/9/6 4:15 下午.
 * <br>
 * Desc:
 * <br>
 */
public interface BaseErrorInfoInterface {
    /**
     * 错误码
     */
    String getResultCode();

    /**
     * 错误描述
     */
    String getResultMsg();
}