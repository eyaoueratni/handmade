package com.example.website_2.Controllers;


import com.example.website_2.DTO.LoginRequest;
import com.example.website_2.DTO.Response;
import com.example.website_2.DTO.UserDto;
import com.example.website_2.service.Interface.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> registerUser(@RequestBody UserDto registrationRequest){
        System.out.println(registrationRequest);
        return ResponseEntity.ok(userService.registerUser(registrationRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(userService.loginUser(loginRequest));
    }
    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllUsers(){

        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/my-info")
    public ResponseEntity<Response> getUserInfoAndOrderHistory(){
        return ResponseEntity.ok(userService.getUserInfoAndOrderHistory());
    }
    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<Response> getUSerByID(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<Response> updateUser(@PathVariable Long userId, @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.editUser(userId, userDto));
    }
/*
    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<Response> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Response response = userService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }*/

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<Response> deleteUSer(@PathVariable long userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

}