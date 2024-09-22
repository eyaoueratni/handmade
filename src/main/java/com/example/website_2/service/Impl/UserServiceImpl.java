package com.example.website_2.service.Impl;

import com.example.website_2.DTO.AddressDto;
import com.example.website_2.DTO.LoginRequest;
import com.example.website_2.DTO.Response;
import com.example.website_2.DTO.UserDto;
import com.example.website_2.Entity.Address;
import com.example.website_2.Entity.User;
import com.example.website_2.Enum.UserRole;
import com.example.website_2.Exception.InvalidCredentialsException;
import com.example.website_2.Exception.NotFoundException;
import com.example.website_2.Mapper.EntityDtoMapper;
import com.example.website_2.Repository.UserRepo;
import com.example.website_2.Security.JwtUtils;
import com.example.website_2.service.Interface.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityDtoMapper entityDtoMapper;


    @Override
    public Response registerUser(UserDto registrationRequest) {
        UserRole role = UserRole.USER; // Default role

        // Convert role to uppercase and handle accordingly
        if (registrationRequest.getRole() != null) {
            String roleStr = registrationRequest.getRole().toUpperCase();
            if (roleStr.equals("ADMIN")) {
                role = UserRole.ADMIN;
            } else if (roleStr.equals("ARTISAN")) {
                role = UserRole.ARTISAN;
            } else if (roleStr.equals("CUSTOMER")) {
                role = UserRole.CUSTOMER;
            }
        }

        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .role(role)
                .address(convertDtoToAddress(registrationRequest.getAddress())) // Handle address
                .build();

        User savedUser = userRepo.save(user);
        System.out.println(savedUser);

        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
        return Response.builder()
                .status(200)
                .message("User Successfully Added")
                .user(userDto)
                .build();
    }

    private Address convertDtoToAddress(AddressDto addressDto) {
        if (addressDto == null) {
            return null;
        }
        Address address = new Address();
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipCode(addressDto.getZipCode());
        return address;
    }



    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(()-> new NotFoundException("Email not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Password does not match");
        }
        String token = jwtUtils.generateToken(user);

        return Response.builder()
                .status(200)
                .message("User Successfully Logged In")
                .token(token)
                .expirationTime("6 Month")
                .role(user.getRole().name())
                .build();
    }


    @Override
    public Response getAllUsers() {

        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasic)
                .toList();

        return Response.builder()
                .status(200)
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String  email = authentication.getName();
        log.info("User Email is: " + email);
        return userRepo.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User Not found"));
    }

    @Override
    public Response getUserInfoAndOrderHistory() {
        User user = getLoginUser();
        UserDto userDto = entityDtoMapper.mapUserToDtoPlusAddressAndOrderHistory(user);

        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }
    @Override
    public Response deleteUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));
        userRepo.delete(user);

        return Response.builder()
                .status(200)
                .message("User Successfully Deleted")
                .build();
    }

    @Override
    public Response editUser(Long userId, UserDto userDto) {
        User existingUser = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));

        existingUser.setName(userDto.getName());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setPhoneNumber(userDto.getPhoneNumber());
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        if (userDto.getRole() != null) {
            existingUser.setRole(UserRole.valueOf(userDto.getRole().toUpperCase()));
        }

        User updatedUser = userRepo.save(existingUser);
        UserDto updatedUserDto = entityDtoMapper.mapUserToDtoBasic(updatedUser);

        return Response.builder()
                .status(200)
                .message("User Successfully Updated")
                .user(updatedUserDto)
                .build();
    }

    @Override
    public Response getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + userId));

        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(user);
        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }

}