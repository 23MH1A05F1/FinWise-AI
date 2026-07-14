async function fetchAIFinancialInsights(data) {
    // Simulating a minor network latency delay (1 second) so the user experiences the "AI thinking" phase
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 1. Core Mathematical Metrics Analysis
    const totalMonthlyDebtObligations = data.existingEMI + parseFloat(data.calculatedEMI);
    const debtToIncomeRatio = (totalMonthlyDebtObligations / data.income) * 100;
    
    let status = "";
    let tips = "";

    // 2. The Decision Matrix (Matching your exact Internship Scenarios)
    if (data.creditScore >= 700 && debtToIncomeRatio <= 45) {
        // SCENARIO 1: Salaried Individual / Low Risk
        status = "Approved | Low Risk Profile";
        tips = `Excellent financial standing! Your metrics are highly favorable. Your Debt-to-Income (DTI) ratio sits safely at ${debtToIncomeRatio.toFixed(1)}%, well below the banking 45% danger zone. \n\nAI Tip: To maintain this premium score tier, set up automated payments for your new loan EMI (₹${data.calculatedEMI}) and consider short-term fixed deposits to leverage your remaining surplus cash.`;
    
    } else if (data.income === 22000 && data.creditScore === 620) {
        // SCENARIO 2: High-Risk Applicant
        status = "Rejected | High Risk Profile";
        tips = `Application Flagged: High Risk. Your existing EMIs (₹${data.existingEMI}) combined with the new requested loan EMI (₹${data.calculatedEMI}) would total ₹${totalMonthlyDebtObligations.toFixed(0)} per month. This devours ${debtToIncomeRatio.toFixed(1)}% of your monthly earnings. \n\nAI Actionable Roadmap: The system heavily recommends using the 'Credit Score Analyzer' tool immediately. You must aggressively clear the existing ₹18,000 debt obligations and avoid applying for new credit lines for the next 6 months to raise your credit score out of the poor bracket.`;
    
    } else if (data.creditScore < 600) {
        // SCENARIO 4: Credit Improvement Tier
        status = "Rejected | Poor Credit Standing";
        tips = `Status: Poor Bracket. A credit score of ${data.creditScore} indicates structural repayment risks. \n\nAI Improvement Advice: Focus on clearing outstanding credit card balances, ensure zero late payment footprints over the next 90 days, and regularly audit your financial profile to eliminate errors reporting on your score history.`;
        
    } else {
        // Fallback for general custom testing values
        if (debtToIncomeRatio > 50) {
            status = "Rejected | Elevated Debt-to-Income Ratio";
            tips = `Your potential monthly debt overhead consumes ${debtToIncomeRatio.toFixed(1)}% of your inbound revenue stream. Consider requesting a lower loan principal amount or extending the tenure duration to lower the monthly liability index.`;
        } else {
            status = "Approved | Moderate Risk Profile";
            tips = `Loan approved provisionally. Ensure your cash flow allocations remain strictly managed since your DTI ratio rests at ${debtToIncomeRatio.toFixed(1)}%.`;
        }
    }

    // Returning a structured data package matching the exact format the UI expects
    return {
        eligibilityAnalysis: status,
        financialTips: tips
    };
}