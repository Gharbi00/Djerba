/* package com.example.BackEnd;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.Test;

@SpringBootTest
class BackEndApplicationTests {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void testConnection() {
        String result = jdbcTemplate.queryForObject("SELECT 1", String.class);
        System.out.println("Connection test result: " + result);
    }

}
 */