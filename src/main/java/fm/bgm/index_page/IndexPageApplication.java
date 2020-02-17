package fm.bgm.index_page;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@MapperScan("fm.bgm.index_page.dao.mapper")
@SpringBootApplication
public class IndexPageApplication {

    public static void main(String[] args) {
        SpringApplication.run(IndexPageApplication.class, args);
    }
}
