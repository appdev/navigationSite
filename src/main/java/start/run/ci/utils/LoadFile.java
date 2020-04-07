package start.run.ci.utils;

import com.google.gson.reflect.TypeToken;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;
import start.run.ci.dao.entity.UserWebData;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

/**
 * Created by ZhaoShulin on 2019/9/9 12:56 下午.
 * <br>
 * Desc:
 * <br>
 */
public class LoadFile {
    public static ArrayList<UserWebData> loadJsonFileToList(String fileName) throws IOException {
        ClassPathResource cpr = new ClassPathResource("static/" + fileName);
        byte[] bdata = FileCopyUtils.copyToByteArray(cpr.getInputStream());
        String content = new String(bdata, StandardCharsets.UTF_8);
        return Util.INSTANCE.getGson().fromJson(content, new
                TypeToken<ArrayList<UserWebData>>() {
                }.getType());
    }

    public static void main(String[] args) {
        try {
            ArrayList<UserWebData> linkedHashMap = loadJsonFileToList("websitetips.json");
            System.out.print(linkedHashMap);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
