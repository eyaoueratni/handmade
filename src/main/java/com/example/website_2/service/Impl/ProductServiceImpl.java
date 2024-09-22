package com.example.website_2.service.Impl;

import com.example.website_2.DTO.CreateProductRequest;
import com.example.website_2.DTO.ProductDto;
import com.example.website_2.DTO.Response;
import com.example.website_2.Entity.Category;
import com.example.website_2.Entity.OrderItem;
import com.example.website_2.Entity.Product;
import com.example.website_2.Exception.ImageProcessingException;
import com.example.website_2.Exception.NotFoundException;
import com.example.website_2.Mapper.EntityDtoMapper;
import com.example.website_2.Repository.CategoryRepo;
import com.example.website_2.Repository.OrderItemRepo;
import com.example.website_2.Repository.ProductRepo;
import com.example.website_2.service.Interface.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Transactional


    @Service
    @Slf4j
    @RequiredArgsConstructor
    public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final EntityDtoMapper entityDtoMapper;
    public Product createProduct(CreateProductRequest req) {
        // Find the category by ID using the categoryId from the request
        Category category = categoryRepo.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found"));

        Product p = new Product();

        // Set the image URL or path
        p.setImageUrl(req.getImageUrl());

        // Set other product details
        p.setDescription(req.getDescription());
        p.setName(req.getName());
        p.setPrice(req.getPrice());

        // Associate product with the found category
        p.setCategory(category);

        // Save the product to the repository
        return productRepo.save(p);
    }


    @Override
    public Product updateProduct(Long productId, Product req) {
        Product existingProduct = findProductById(productId);

        // Update product details
        existingProduct.setName(req.getName());
        existingProduct.setDescription(req.getDescription());
        existingProduct.setPrice(req.getPrice());
        existingProduct.setImageUrl(req.getImageUrl());

        // If category is being updated
        if (req.getCategory() != null) {
            Category category = categoryRepo.findById(req.getCategory().getId())
                    .orElseThrow(() -> new NotFoundException("Category not found"));
            existingProduct.setCategory(category);
        }

        return productRepo.save(existingProduct);
    }

    @Override
    public String deleteProduct(Long productId) {
        Product product = findProductById(productId);
        productRepo.delete(product);
        return "Product successfully deleted";
    }

    @Override
    public Response getProductById(Long productId) {
        Product product = findProductById(productId);
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(product);

        return Response.builder()
                .status(200)
                .product(productDto)
                .build();
    }

    @Override
    public Response getAllProducts() {
        List<ProductDto> productList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productList)
                .build();
    }


    @Override
    public Response getProductsByCategory(Long categoryId) {
        List<Product> products = productRepo.findByCategoryId(categoryId);
        if (products.isEmpty()) {
            throw new NotFoundException("No Products found for this category");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

    // Helper method to find a product by ID
    private Product findProductById(Long productId) {
        return productRepo.findById(productId)
                .orElseThrow(() -> new NotFoundException("Product not found"));
    }

   /* @Override
    public Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description, BigDecimal price) {
        try {
            Product product = productRepo.findById(productId)
                    .orElseThrow(() -> new NotFoundException("Product Not Found"));

            Category category = null;
            String encodedImage = null;

            if (categoryId != null) {
                category = categoryRepo.findById(categoryId)
                        .orElseThrow(() -> new NotFoundException("Category not found"));
            }
            if (image != null && !image.isEmpty()) {
                encodedImage = Base64.getEncoder().encodeToString(image.getBytes());
            }

            if (category != null) product.setCategory(category);
            if (name != null) product.setName(name);
            if (price != null) product.setPrice(price);
            if (description != null) product.setDescription(description);
            if (encodedImage != null) product.setImageUrl(encodedImage);

            productRepo.save(product);
            return Response.builder()
                    .status(200)
                    .message("Product updated successfully")
                    .build();

        } catch (IOException e) {
            return Response.builder()
                    .status(500)
                    .message("Failed to encode image: " + e.getMessage())
                    .build();
        } catch (Exception e) {
            return Response.builder()
                    .status(500)
                    .message("An error occurred: " + e.getMessage())
                    .build();
        }
    }

    @Override
    public Response deleteProduct(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(() -> new NotFoundException("Product Not Found"));
        productRepo.delete(product);

        return Response.builder()
                .status(200)
                .message("Product deleted successfully")
                .build();
    }


    @Override
    public Response getProductById(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(() -> new NotFoundException("Product Not Found"));
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(product);

        return Response.builder()
                .status(200)
                .product(productDto)
                .build();
    }

    @Override
    public Response getAllProducts() {
        List<ProductDto> productList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productList)
                .build();
    }

    @Override
    public Response getProductsByCategory(Long categoryId) {
        List<Product> products = productRepo.findByCategoryId(categoryId);
        if (products.isEmpty()) {
            throw new NotFoundException("No Products found for this category");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

*/
    @Override
    public Response searchProduct(String searchValue) {
        List<Product> products = productRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);

        if (products.isEmpty()) {
            throw new NotFoundException("No Products Found");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

}
