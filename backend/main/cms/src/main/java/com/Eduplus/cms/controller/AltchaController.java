package com.Eduplus.cms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AltchaController {

    private static final SecureRandom RANDOM = new SecureRandom();

    @GetMapping("/altcha-challenge")
    public ResponseEntity<Map<String, Object>> getAltchaChallenge() {
        try {
            // Generate random salt and secret target number (1 to 500)
            String salt = Long.toHexString(RANDOM.nextLong()) + Long.toHexString(RANDOM.nextLong());
            int targetNum = RANDOM.nextInt(500) + 1;
            
            // Compute SHA-256 hash of (salt + targetNum)
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest((salt + targetNum).getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("algorithm", "SHA-256");
            response.put("challenge", hexString.toString());
            response.put("maxnumber", 1000);
            response.put("salt", salt);
            response.put("signature", "");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("algorithm", "SHA-256");
            fallback.put("challenge", "6a9d4f5b12628201d4d301dd7da347dcaf17359218eb9226ebdf0df19593357f");
            fallback.put("maxnumber", 1000);
            fallback.put("salt", "eduplus_salt_9876");
            fallback.put("signature", "");
            return ResponseEntity.ok(fallback);
        }
    }
}
