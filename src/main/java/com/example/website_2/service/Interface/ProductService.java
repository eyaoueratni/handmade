package com.example.website_2.service.Interface;

import com.example.website_2.DTO.CreateProductRequest;
import com.example.website_2.DTO.ProductDto;
import com.example.website_2.DTO.Response;
import com.example.website_2.Entity.Product;
import org.springframework.security.core.parameters.P;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

public interface ProductService {
  public Product createProduct(CreateProductRequest req);
  public Product updateProduct(Long ProductId,Product product);
  public String deleteProduct(Long productId);
  Response getProductById(Long productId);
  Response getAllProducts();
  Response getProductsByCategory(Long categoryId);
  Response searchProduct(String searchValue);
}