
package com.Eduplus.cms.controller;

import com.Eduplus.cms.dto.ApiResponse;
import com.Eduplus.cms.dto.RiskPredictionDTO;
import com.Eduplus.cms.service.MLPredictorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ml")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MLPredictorController {

    private final MLPredictorService mlPredictorService;

    @GetMapping("/predict/{regNo}")
    public ResponseEntity<ApiResponse<RiskPredictionDTO>> getStudentRiskPrediction(@PathVariable String regNo) {
        return ResponseEntity.ok(ApiResponse.success(mlPredictorService.getStudentRiskPrediction(regNo), "Achilles 1.0 At-Risk analytics prediction computed successfully"));
    }
}
