package start.run.ci.dao.entity;

import java.util.ArrayList;

/**
 * Created by ZhaoShulin on 2019/9/12 10:24 上午.
 * <br>
 * Desc: 分类
 * <br>
 */
public class Category {
    private ArrayList<UserWebData> webData;
    private long id;
    private String name;

    public Category() {
    }

    public Category(ArrayList<UserWebData> webData, long id, String name) {
        this.webData = webData;
        this.id = id;
        this.name = name;
    }

    public ArrayList<UserWebData> getWebData() {
        return webData;
    }

    public void setWebData(ArrayList<UserWebData> webData) {
        this.webData = webData;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
