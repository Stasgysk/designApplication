package sk.student.tuke.sk.applikacia.exceptions;

public class DatabaseError extends Exception{
    public DatabaseError(String message) {
        super(message);
    }

    public DatabaseError(String message, Throwable cause) {
        super(message, cause);
    }
}
