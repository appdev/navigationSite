package start.run.ci.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import start.run.ci.dao.entity.Category;
import start.run.ci.dao.entity.UserWebData;
import start.run.ci.dao.mapper.UserWebMapper;
import start.run.ci.utils.LoadFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by ZhaoShulin on 2019/9/6 10:22 上午.
 * <br>
 * Desc:
 * <br>
 */
@Service
public class UserWebServiceImpl extends ServiceImpl<BaseMapper<UserWebData>, UserWebData> implements UserWebService {
    @Resource
    private UserWebMapper userWebMapper;
    private int position = 0;

    @NotNull
    @Override
    public List<UserWebData> findListByUserID(long id) {
        QueryWrapper<UserWebData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userID", id);
        return userWebMapper.selectList(queryWrapper);
    }

    @NotNull
    @Override
    public ArrayList<Category> findListByUserIDWithGroup(long id) {
        QueryWrapper<UserWebData> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userID", id).orderByAsc("sort").orderByAsc("weight");
        List<UserWebData> webData = userWebMapper.selectList(queryWrapper);
        ArrayList<Category> categories = new ArrayList<>();
        if (webData != null && !webData.isEmpty()) {
            //1
            categories.add(createCategory(webData.get(0), createList(webData, 0, 9)));
            //2
            categories.add(createCategory(webData.get(9), createList(webData, 9, 18)));
            //3
            categories.add(createCategory(webData.get(18), createList(webData, 18, 27)));
            //4
            categories.add(createCategory(webData.get(27), createList(webData, 27, 36)));
            //5
            categories.add(createCategory(webData.get(36), createList(webData, 36, 45)));
            //6
            categories.add(createCategory(webData.get(45), createList(webData, 45, 54)));
            //7
            categories.add(createCategory(webData.get(54), createList(webData, 54, 63)));
            //8
            categories.add(createCategory(webData.get(63), createList(webData, 63, 72)));
            //9
            categories.add(createCategory(webData.get(72), createList(webData, 72, 81)));
        }
        return categories;
    }

    @Override
    public void updateWeb(long webID, String name, String url) {
        userWebMapper.updateById(UserWebData.Companion.createData(webID, name, url));
    }

    public void updateCategory(String id, String name) {
        //分类信息更新
        UpdateWrapper<UserWebData> updateWrapper = new UpdateWrapper<>();
        updateWrapper.eq("categoryID", id).set("category", name);
        update(updateWrapper);
    }

    /**
     * 保存用户列表
     *
     * @param list
     * @param userID
     */
    @Override
    public void saveList(ArrayList<Category> list, long userID) {
        position = 0;
        list.forEach(webData -> {
            webData.getWebData().forEach(webData1 ->
                    userWebMapper.insert(UserWebData.Companion.createUserWeb(webData1, userID, webData.getId(), position)));
            position++;
        });
    }

    /**
     * 用户列表
     *
     * @param data
     * @param start
     * @param end
     * @return
     */
    private ArrayList<UserWebData> createList(List<UserWebData> data, int start, int end) {
        ArrayList<UserWebData> list = new ArrayList<>();
        for (int i = start; i < end; i++) {
            list.add(data.get(i));
        }
        return list;
    }

    /**
     * 分类列表
     *
     * @param webData
     * @param list
     * @return
     */
    private Category createCategory(UserWebData webData, ArrayList<UserWebData> list) {
        Category category = new Category();
        category.setId(webData.getCategoryID());
        category.setWebData(list);
        category.setName(webData.getCategory());
        return category;
    }


    @NotNull
    @Override
    public List<UserWebData> selectByCategory(@NotNull String category) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("category", category);
        return baseMapper.selectByMap(map);
    }

    @NotNull
    @Override
    public List<UserWebData> selectAll() {
        ArrayList<UserWebData> originalData = new ArrayList<>(list());
        if (originalData.isEmpty()) {
            try {
                saveBatch(LoadFile.loadJsonFileToList("websitetips.json"));
                originalData.addAll(list());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return originalData;
    }

}
