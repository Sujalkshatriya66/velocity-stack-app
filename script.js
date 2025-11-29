// --- Global State ---
let userPurpose = "";
let userHHG = "";
const adviceData = {
    "Purpose": {
        title: "Your Infinite Horizon",
        // UPDATED to use <strong> HTML tags
        advice: (p) => `<strong>Focus:</strong> Why are you doing this? Your purpose is: <strong>${p}</strong>. Every goal below must serve this purpose.`
    },
    "HHG": {
        title: "The High Hard Goal (1-5 Years)",
        // UPDATED to use <strong> HTML tags
        advice: (g) => `<strong>Goal:</strong> ${g}. This is the 'airplane' you are trying to eat. It must be broken down into manageable chunks. Click on the layers below to start chunking!`
    },
    "Yearly": {
        title: "Yearly Action: Annual Goals",
        // UPDATED to use <strong> HTML tags
        advice: (g) => `<strong>Advice:</strong> Divide your HHG (<strong>${g}</strong>) into <strong>3-5 major milestones</strong> achievable in the next 12 months. These milestones must be non-negotiable success indicators.`
    },
    "Quarterly": {
        title: "Quarterly Action: 90-Day Outcome",
        // UPDATED to use <strong> and <em> HTML tags
        advice: (g) => `<strong>Advice:</strong> Define <strong>one critical, measurable outcome (OKR)</strong> achievable in the next 90 days. This quarter's success should directly impact your Annual Goal. What is the biggest domino to push over <em>now</em>?`
    },
    "Monthly": {
        title: "Monthly Action: Critical Project",
        // UPDATED to use <strong> HTML tags
        advice: (g) => `<strong>Advice:</strong> Determine the <strong>1-2 primary projects</strong> that <em>must</em> be completed this month to hit your Quarterly Goal. Prioritize depth over breadth.`
    },
    "Weekly": {
        title: "Weekly Action: Goal-Directed Actions (GDAs)",
        // UPDATED to use <strong> HTML tags
        advice: (g) => `<strong>Advice:</strong> Identify the <strong>3 maximum, highest-leverage actions</strong> (GDAs) this week that will propel you toward your Monthly Goal. Focus on creating a domino effect, not just busywork. Schedule these in your peak focus hours.`
    },
    "Daily": {
        title: "Daily Action: Clear Goals",
        // UPDATED to use <strong> and <em> HTML tags
        advice: (g) => `<strong>Advice:</strong> Break each of your Weekly GDAs into <strong>1-3 highly specific, clear goals</strong> for today. Goal clarity is essential for triggering Flow State. Example: Don't write 'Work on Proposal,' write 'Complete Section 1.A of Proposal and send for review by 11 AM.'`
    }
};

// --- Initialization ---

// Add click listeners to the visual stack layers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stack-layer').forEach(layer => {
        layer.addEventListener('click', handleLayerClick);
    });
});

// --- Functions ---

/**
 * Handles the click event on a stack layer, updates advice panel, and highlights the layer.
 * @param {Event} event 
 */
function handleLayerClick(event) {
    const layer = event.currentTarget;
    const timeframe = layer.dataset.timeframe;

    // 1. Update active styling
    document.querySelectorAll('.stack-layer').forEach(l => l.classList.remove('active'));
    layer.classList.add('active');

    // 2. Update the advice panel
    const content = adviceData[timeframe];
    const advicePanel = document.getElementById('advice-content');
    const instruction = document.querySelector('.instruction-text');
    
    // Determine the relevant goal for advice
    let relevantGoal = "";
    if (timeframe === 'Purpose') {
        relevantGoal = userPurpose || "Please define your purpose.";
    } else {
        relevantGoal = userHHG || "Please define your High Hard Goal (HHG).";
    }

    // Replace the introductory instruction text
    if (instruction) instruction.style.display = 'none';

    advicePanel.innerHTML = `
        <h3>${timeframe} - ${content.title}</h3>
        <p>${content.advice(relevantGoal)}</p>
    `;
}

/**
 * Grabs user input and updates the visual stack labels.
 */
function generateGoalStack() {
    userPurpose = document.getElementById('purpose').value.trim();
    userHHG = document.getElementById('hhg').value.trim();

    if (!userPurpose || !userHHG) {
        alert("Please enter both your Purpose and your High Hard Goal.");
        return;
    }

    // Update the visual stack layers with user input
    document.getElementById('layer-purpose').innerHTML = `<strong>Purpose:</strong> ${userPurpose}`;
    document.getElementById('layer-hhg').innerHTML = `<strong>HHG:</strong> ${userHHG}`;

    // Automatically click the HHG layer to show the first piece of advice
    document.getElementById('layer-hhg').click();

    // Reset instruction text if present
    const instruction = document.querySelector('.instruction-text');
    if (instruction) instruction.style.display = 'none';
}
