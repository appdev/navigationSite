package start.run.ci.dao.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.google.gson.annotations.SerializedName;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by ZhaoShulin on 2019/9/3 5:23 下午.
 * <br>
 * Desc:
 * <br>
 */
@Entity(name = "user")
@TableName(value = "user")
public class UserData {

    @SerializedName("id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true, nullable = false)
    @TableId
    public Long id;

    @Column(nullable = false, unique = true)
    @NotNull
    private String name;

    @Column(nullable = false)
    @NotNull
    private String password;

    public UserData() {
    }

    public UserData(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
