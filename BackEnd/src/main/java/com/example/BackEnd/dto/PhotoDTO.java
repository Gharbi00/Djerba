package com.example.BackEnd.dto;

import java.util.Base64;

import com.example.BackEnd.entity.Photo;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;


@Getter
@Setter
@NoArgsConstructor
public class PhotoDTO {
    private Long id;
    private String fileName;
    private String fileType;
    private String base64Data;

    @JsonCreator
    public PhotoDTO(
            @JsonProperty("id") Long id,
            @JsonProperty("fileName") String fileName,
            @JsonProperty("fileType") String fileType,
            @JsonProperty("base64Data") String base64Data) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.base64Data = base64Data;
    }

    public PhotoDTO(Photo photo) {
        this.id = photo.getId();
        this.fileName = photo.getFileName();
        this.fileType = photo.getFileType();
        this.base64Data = Base64.getEncoder().encodeToString(photo.getData());
    }
}