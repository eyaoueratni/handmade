package com.example.website_2.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Allow requests from your React app
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed HTTP methods
                        .allowedHeaders("*") // Allow any headers
                        .allowCredentials(true); // Allow credentials (cookies, authorization headers, etc.)
            }
        };
    }
}