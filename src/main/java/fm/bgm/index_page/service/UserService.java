package fm.bgm.index_page.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import org.springframework.stereotype.Service;

import java.util.List;

import javax.annotation.Resource;

import fm.bgm.index_page.dao.entity.UserData;
import fm.bgm.index_page.dao.mapper.UserMapper;
import fm.bgm.index_page.utils.StringUtilKt;

/**
 * Created by ZhaoShulin on 2019/9/6 10:22 上午.
 * <br>
 * Desc:
 * <br>
 */
@Service
public class UserService {
    @Resource
    private UserMapper userMapper;

    public UserData findById(long id) {
        return userMapper.selectById(id);
    }

    public UserData findByUser(String name, String pwd) {
        QueryWrapper<UserData> queryWrapper = new QueryWrapper<>();
        if (StringUtilKt.notEmpty(name))
            queryWrapper.eq("name", name);
        if (StringUtilKt.notEmpty(pwd))
            queryWrapper.eq("password", pwd);
        return userMapper.selectOne(queryWrapper);
    }

    public void insertUser(UserData userData) {
        userMapper.insert(userData);
    }

    public void updateUser(UserData userData) {
        userMapper.updateById(userData);
    }


    public int deleteUser(int id) {
        return userMapper.deleteById(id);
    }

    public List<UserData> selectAll() {
        return userMapper.selectList(null);
    }


}
