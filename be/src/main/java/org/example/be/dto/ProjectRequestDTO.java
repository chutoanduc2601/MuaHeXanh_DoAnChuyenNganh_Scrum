package org.example.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ProjectRequestDTO {
    @JsonProperty("projectName")
    private String projectName;

    @JsonProperty("description")
    private String description;

    @JsonProperty("location")
    private String location;

    @JsonProperty("requiredStudents")
    private Integer requiredStudents;

    @JsonProperty("requiredSkills")
    private String requiredSkills;

    @JsonProperty("startDate")
    private LocalDate startDate;

    @JsonProperty("endDate")
    private LocalDate endDate;

}