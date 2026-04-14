package org.example.be.repository;

import org.example.be.entity.Application;
import org.example.be.entity.Project;
import org.example.be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByProjectId(Integer projectId);

    long countByProjectIdAndStatus(Integer projectId, String status);

    Optional<Application> findByUserAndProject(User user, Project project);

    List<Application> findByUserId(Long userId);
    @Modifying
    @Transactional
    void deleteByProjectId(Integer projectId);
}