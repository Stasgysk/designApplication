package sk.student.tuke.sk.applikacia.entities;

import lombok.Getter;

@Getter
public class UserAuthResponse {

    private final String jwt;

    private final User userInfo;

    public UserAuthResponse(String jwt, User userInfo) {
        this.jwt = jwt;
        this.userInfo = userInfo;
    }

    @Override
    public String toString() {
        return "UserAuthResponse{" +
                "jwt='" + jwt + '\'' +
                ", userInfo=" + userInfo +
                '}';
    }
}
