package start.run.ci;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("start.run.ci.dao.mapper")
@SpringBootApplication
public class IndexPageApplication {

    public static void main(String[] args) {
        SpringApplication.run(IndexPageApplication.class, args);
    }
}
