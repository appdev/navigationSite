package start.run.ci.utils;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

/**
 * Created by ZhaoShulin on 2019/9/9 10:38 上午.
 * <br>
 * Desc:
 * <br>
 */

public class PasswordUtil {
    private static String algorithmName = "md5";   //指定散列算法为MD5,还有别的算法如：SHA256、SHA1、SHA512
    private static int hashIterations = 2;     //散列迭代次数 md5(md5(pwd)): new Md5Hash(pwd, salt, 2).toString()
    private static String salt = "zoB6smwdkCEJhmGb7PDPuAQGsNvNUuvssgxfAGQv2Gk3eXuDuXrrgPGtjhjLaLx6";
    private static String categoryCode = "abRnyVNb7djEht37CTP29wQjNN97eQv4bHPiGZHsNjnVK9dqYBVbk7WVGnfFatNU";

    public static void setAlgorithmName(String algorithmName) {
        PasswordUtil.algorithmName = algorithmName;
    }

    public static void setHashIterations(int hashIterations) {
        PasswordUtil.hashIterations = hashIterations;
    }

    //加密：输入明文得到密文
    public static String encodePassword(String pwd) {
        //user.setSalt(randomNumberGenerator.nextBytes().toHex());
        return new SimpleHash(
                algorithmName,
                pwd,
                ByteSource.Util.bytes(salt),
                hashIterations).toHex();
    }

    //加密：输入明文得到密文
    public static String encodeString(String category) {
        //user.setSalt(randomNumberGenerator.nextBytes().toHex());
        return new SimpleHash(
                algorithmName,
                category,
                ByteSource.Util.bytes(categoryCode),
                1).toHex();
    }

    public static boolean verifyPassword(String targetPassword, String pwd) {
        String newPassword = encodePassword(targetPassword);
        return newPassword.equals(pwd);
    }

}