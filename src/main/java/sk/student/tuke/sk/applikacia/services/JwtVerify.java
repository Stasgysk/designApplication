package sk.student.tuke.sk.applikacia.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public class JwtVerify {

    private final String privateKey = "#{${api.private.key}}";

    private final String issuer;

    public JwtVerify(String issuer) {
        this.issuer = issuer;
    }

    public boolean verify(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(privateKey);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(this.issuer)
                    .build();

            DecodedJWT decoded = verifier.verify(token);
        } catch (JWTVerificationException exception){
            return false;
        }
        return true;
    }

    public String getToken(){
        Algorithm algorithm = Algorithm.HMAC256(privateKey);
        return JWT.create()
                .withIssuer(this.issuer)
                .sign(algorithm);
    }
}
