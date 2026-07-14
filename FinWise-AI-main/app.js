// Grab Slider Elements
const interestSlider = document.getElementById('interestSlider');
const tenureSlider = document.getElementById('tenureSlider');
const interestVal = document.getElementById('interestVal');
const tenureVal = document.getElementById('tenureVal');

// Real-time value syncing markers
interestSlider.addEventListener('input', (e) => {
    interestVal.innerText = `${e.target.value}%`;
    triggerLiveCalculation();
});

tenureSlider.addEventListener('input', (e) => {
    tenureVal.innerText = `${e.target.value} Months`;
    triggerLiveCalculation();
});

// Primary terminal run execution
document.getElementById('loanForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear dynamic placeholder typography indicators
    document.getElementById('eligibilityResult').classList.remove('placeholder-text');
    document.getElementById('aiTips').classList.remove('placeholder-text');

    try {
        const income = parseFloat(document.getElementById('income').value) || 0;
        const creditScore = parseInt(document.getElementById('creditScore').value) || 0;
        const existingEMI = parseFloat(document.getElementById('existingEMI').value) || 0;
        const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;

        const annualInterestRate = parseFloat(interestSlider.value);
        const loanTenureMonths = parseInt(tenureSlider.value);
        
        const monthlyEMI = calculateLocalEMI(loanAmount, annualInterestRate, loanTenureMonths);
        
        document.getElementById('emiResult').innerText = `₹${monthlyEMI} / month (For ${loanTenureMonths} Months @ ${annualInterestRate}%)`;

        const clientData = {
            income: income,
            creditScore: creditScore,
            existingEMI: existingEMI,
            requestedLoan: loanAmount,
            calculatedEMI: monthlyEMI
        };

        const aiResponse = await fetchAIFinancialInsights(clientData);
        
        const statusBlock = document.getElementById('eligibilityResult').parentElement;
        statusBlock.classList.remove('status-approved', 'status-rejected');

        if (aiResponse.eligibilityAnalysis.includes("Approved")) {
            statusBlock.classList.add('status-approved');
        } else {
            statusBlock.classList.add('status-rejected');
        }

        document.getElementById('eligibilityResult').innerText = aiResponse.eligibilityAnalysis;
        document.getElementById('aiTips').innerText = aiResponse.financialTips;

    } catch (error) {
        console.error("Execution Failure:", error);
        document.getElementById('eligibilityResult').innerText = "System Analysis Process Error.";
    }
});

// Real-time numerical display updating math trigger logic
function triggerLiveCalculation() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    if (loanAmount > 0) {
        const annualInterestRate = parseFloat(interestSlider.value);
        const loanTenureMonths = parseInt(tenureSlider.value);
        const monthlyEMI = calculateLocalEMI(loanAmount, annualInterestRate, loanTenureMonths);
        document.getElementById('emiResult').innerText = `₹${monthlyEMI} / month (For ${loanTenureMonths} Months @ ${annualInterestRate}%)`;
    }
}

function calculateLocalEMI(principal, annualRate, months) {
    let monthlyRate = annualRate / 12 / 100;
    let emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return emi.toFixed(2);
}