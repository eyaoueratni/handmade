package com.example.website_2.Mapper;

import com.example.website_2.DTO.*;
import com.example.website_2.Entity.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class EntityDtoMapper {


    //user entity to user DTO

    public UserDto mapUserToDtoBasic(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().name());
        userDto.setName(user.getName());
        userDto.setAddress(convertAddressToDto(user.getAddress()));
        return userDto;

    }
    private AddressDto convertAddressToDto(Address address) {
        if (address == null) {
            return null;
        }
        AddressDto addressDto = new AddressDto();
        addressDto.setStreet(address.getStreet());
        addressDto.setCity(address.getCity());
        addressDto.setState(address.getState());
        addressDto.setZipCode(address.getZipCode());
        return addressDto;
    }

    //Address to DTO Basic
    public AddressDto mapAddressToDtoBasic(Address address){
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setCity(address.getCity());
        addressDto.setStreet(address.getStreet());
        addressDto.setState(address.getState());
        addressDto.setCountry(address.getCountry());
        addressDto.setZipCode(address.getZipCode());
        return addressDto;
    }

    //Category to DTO basic
    public CategoryDto mapCategoryToDtoBasic(Category category){
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        return categoryDto;
    }


    //OrderItem to DTO Basics
    public OrderItemDto mapOrderItemToDtoBasic(OrderItem orderItem){
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());
        orderItemDto.setStatus(orderItem.getStatus().name());
        orderItemDto.setCreatedAt(orderItem.getCreatedAt());
        return orderItemDto;
    }
    //Product to DTO Basic
    public ProductDto mapProductToDtoBasic(Product product){
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImage(product.getImageUrl());
        return productDto;
    }
    public UserDto mapUserToDtoPlusAddress(User user){

        System.out.println("mapUserToDtoPlusAddress is called");
        UserDto userDto = mapUserToDtoBasic(user);
        if (user.getAddress() != null){

            AddressDto addressDto = mapAddressToDtoBasic(user.getAddress());
            userDto.setAddress(addressDto);

        }
        return userDto;
    }


    //orderItem to DTO plus product
    public OrderItemDto mapOrderItemToDtoPlusProduct(OrderItem orderItem){
        OrderItemDto orderItemDto = mapOrderItemToDtoBasic(orderItem);

        if (orderItem.getProduct() != null) {
            ProductDto productDto = mapProductToDtoBasic(orderItem.getProduct());
            orderItemDto.setProduct(productDto);
        }
        return orderItemDto;
    }


    //OrderItem to DTO plus product and user
    public OrderItemDto mapOrderItemToDtoPlusProductAndUser(OrderItem orderItem){
        OrderItemDto orderItemDto = mapOrderItemToDtoPlusProduct(orderItem);

        if (orderItem.getUser() != null){
            UserDto userDto = mapUserToDtoPlusAddress(orderItem.getUser());
            orderItemDto.setUser(userDto);
        }
        return orderItemDto;
    }

    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addDeserializer(AddressDto.class, new AddressDtoDeserializer());
        mapper.registerModule(module);
        return mapper;
    }
    //USer to DTO with Address and Order Items History
    public UserDto mapUserToDtoPlusAddressAndOrderHistory(User user) {
        UserDto userDto = mapUserToDtoPlusAddress(user);

        if (user.getOrderItemList() != null && !user.getOrderItemList().isEmpty()) {
            userDto.setOrderItemList(user.getOrderItemList()
                    .stream()
                    .map(this::mapOrderItemToDtoPlusProduct)
                    .collect(Collectors.toList()));
        }
        return userDto;

    }





}