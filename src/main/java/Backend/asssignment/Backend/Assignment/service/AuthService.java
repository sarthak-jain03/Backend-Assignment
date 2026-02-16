package Backend.asssignment.Backend.Assignment.service;


import Backend.asssignment.Backend.Assignment.dto.LoginRequestDTO;
import Backend.asssignment.Backend.Assignment.dto.LoginResponseDTO;
import Backend.asssignment.Backend.Assignment.dto.SignupResponseDTO;
import Backend.asssignment.Backend.Assignment.entity.Role;
import Backend.asssignment.Backend.Assignment.entity.User;
import Backend.asssignment.Backend.Assignment.repository.UserRepository;
import Backend.asssignment.Backend.Assignment.security.AuthUtil;
import Backend.asssignment.Backend.Assignment.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getUsername(),
                        loginRequestDTO.getPassword()
                )
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = authUtil.generateAccessToken(principal);

        return new LoginResponseDTO(
                token,
                principal.getUsername(),
                principal.getId()
        );
    }


    public User signupInternal(LoginRequestDTO signupRequestDTO) {
        User user = userRepository.findByUsername(signupRequestDTO.getUsername()).orElse(null);

        if (user != null) {
            throw new IllegalArgumentException("User already exists!");
        }

        Role selectedRole = Role.USER;
        if (signupRequestDTO.getRole() != null && !signupRequestDTO.getRole().isEmpty()) {
            try {
                selectedRole = Role.valueOf(signupRequestDTO.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                selectedRole = Role.USER;
            }
        }

        return userRepository.save(User.builder()
                .username(signupRequestDTO.getUsername())
                .password(passwordEncoder.encode(signupRequestDTO.getPassword()))
                .role(selectedRole)
                .build()
        );
    }


    public SignupResponseDTO signup(LoginRequestDTO signupRequestDTO) {
        User user = signupInternal(signupRequestDTO);
        return new SignupResponseDTO(
                user.getId(),
                user.getUsername()
        );
    }
}
