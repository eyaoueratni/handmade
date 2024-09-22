package com.example.website_2.service.Interface;


import com.example.website_2.DTO.LoginRequest;
import com.example.website_2.DTO.Response;
import com.example.website_2.DTO.UserDto;
import com.example.website_2.Entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
    Response editUser(Long userId, UserDto userDto);
    Response deleteUser(Long userId);
    Response getUserById(Long userId);
}