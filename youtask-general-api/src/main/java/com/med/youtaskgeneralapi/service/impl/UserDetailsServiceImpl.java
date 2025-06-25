package com.med.youtaskgeneralapi.service.impl;

import com.med.youtaskgeneralapi.model.entity.User;
import com.med.youtaskgeneralapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<User> user = userRepository.findByUsernameOrEmail(email, email);

        if (user.isPresent()) {
            return userRepository.findByUsernameOrEmail(email, email).orElseThrow(() -> new UsernameNotFoundException("No User Found with This given credentials"));
        }

        throw new UsernameNotFoundException("User not found with this credentials: " + email);
    }
}
