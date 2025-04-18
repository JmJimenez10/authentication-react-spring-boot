package dev.jmjimenez.authentication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import dev.jmjimenez.authentication.entity.OurUser;
import dev.jmjimenez.authentication.enums.Roles;

public interface UserRepository extends JpaRepository<OurUser, Long>, JpaSpecificationExecutor<OurUser> {
	
	Optional<OurUser> findByEmail(String email);
	
	Optional<OurUser> findByTelephone(String telephone);

	int countByRole(Roles admin);

	boolean existsByEmail(String email);
}
