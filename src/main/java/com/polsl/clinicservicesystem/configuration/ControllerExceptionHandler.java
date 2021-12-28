package com.polsl.clinicservicesystem.configuration;

import com.polsl.clinicservicesystem.dto.ApiBasicResponse;
import com.polsl.clinicservicesystem.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler
  @ResponseBody
  ApiBasicResponse handleAppException(Exception e) {
    boolean hasPrivilegesToGetMessage = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getAuthorities()
        .stream()
        .anyMatch((authority) -> authority.getAuthority().equals("CAN_SEE_EXCEPTION_MESSAGES"));

    if (hasPrivilegesToGetMessage) {
      return new ApiBasicResponse(false, String.format("Internal server error: %s", e.getMessage()));
    }
    return new ApiBasicResponse(false, "An unexpected server error has occurred");
  }

  @ResponseStatus(HttpStatus.FORBIDDEN)
  @ExceptionHandler(AccessDeniedException.class)
  @ResponseBody
  ApiBasicResponse handleForbiddenException(AccessDeniedException e) {
    return new ApiBasicResponse(false, e.getMessage());
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(BadRequestException.class)
  @ResponseBody
  ApiBasicResponse handleBadRequestException(BadRequestException e) {
    return new ApiBasicResponse(false, e.getMessage());
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseBody
  ApiBasicResponse handleConstraintViolationException() {
    return new ApiBasicResponse(false, "Invalid request parameter.");
  }
}
