package dev.jmjimenez.authentication.config;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import dev.jmjimenez.authentication.entity.OurUser;
import dev.jmjimenez.authentication.enums.Roles;
import dev.jmjimenez.authentication.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.countByRole(Roles.ADMIN) == 0) {
            OurUser admin = new OurUser();
            admin.setName("Admin");
            admin.setSurnames("Administrator");
            admin.setEmail("admin@example.com");
            admin.setTelephone("123456789");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole(Roles.ADMIN);
            admin.setCreationDate(LocalDateTime.now());
            admin.setLastModifiedDate(LocalDateTime.now());
            userRepository.save(admin);
        }
    }
}
