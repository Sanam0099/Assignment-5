const donationButton = document.getElementById('donation-tab');
const historyButton = document.getElementById('history-tab');
const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('historySection');

const donationCauses = [
  'Famine-2024 at Feni',
  'Flood Relief in Feni',
  'Aid for Injured in Quota Movement'
];

let balance = 5500;
const balanceDisplay = document.getElementById('account-balance');
balanceDisplay.textContent = `${balance} BDT`;

function toggleSections(showDonation) {
  donationSection.style.display = showDonation ? 'block' : 'none';
  historySection.style.display = showDonation ? 'none' : 'block';

  donationButton.classList.toggle('bg-lime-400', showDonation);
  donationButton.classList.toggle('text-black', showDonation);
  donationButton.classList.toggle('bg-white', !showDonation);
  donationButton.classList.toggle('border-black', !showDonation);
  donationButton.classList.toggle('text-slate-500', !showDonation);

  historyButton.classList.toggle('bg-lime-400', !showDonation);
  historyButton.classList.toggle('text-black', !showDonation);
  historyButton.classList.toggle('bg-white', showDonation);
  historyButton.classList.toggle('border-black', showDonation);
  historyButton.classList.toggle('text-slate-500', showDonation);
}

donationButton.addEventListener('click', () => toggleSections(true));
historyButton.addEventListener('click', () => toggleSections(false));

function handleDonation(card, index) {
  const input = card.querySelector('input');
  const donateButton = card.querySelector('.donate-button');
  const donationAmountDisplay = card.querySelector('.donation-amount');

  donateButton.addEventListener('click', () => {
    const donationInput = input.value.trim();

    // Manual validation: check if the input is a number and not empty
    if (donationInput === '' || isNaN(donationInput)) {
      alert('Please enter a valid donation amount.');
      return;
    }

    const donationAmount = parseFloat(donationInput);

    if (donationAmount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    if (donationAmount > balance) {
      alert('You do not have enough balance for this donation.');
      return;
    }

    // Update balance and donation amount
    balance -= donationAmount;
    balanceDisplay.textContent = `${balance} BDT`;

    const currentCardAmount = parseFloat(donationAmountDisplay.textContent) || 0;
    donationAmountDisplay.textContent = `${currentCardAmount + donationAmount} BDT`;

    // Add the donation to the history
    addHistoryEntry(donationAmount, donationCauses[index]);

    // Clear the input field
    input.value = '';

    // Show a confirmation message
    showConfirmation();
  });
}


function addHistoryEntry(donationAmount, cause) {
  const historyEntry = document.createElement('div');
  const now = new Date();
  
  const options = {
    weekday: 'short',    
    year: 'numeric',   
    month: 'short',      
    day: 'numeric',      
    hour: '2-digit',    
    minute: '2-digit',   
    second: '2-digit',  
    timeZone: 'Asia/Dhaka',
  };
  
  const currentDate = `Date: ${now.toLocaleDateString('en-US', options)} `;
  const gmtString = "GMT+0600 (Bangladesh Standard Time)";  // GMT string

  historyEntry.className = "text-xl font-bold bg-white rounded-lg shadow-lg border border-l-white overflow-hidden mb-6 w-3/4 h-28 mx-auto items-center donation-card";
  historyEntry.innerHTML = `
  <p>${donationAmount} Taka is Donated for ${cause}, Bangladesh</p>
  <span style="font-size: small; color: gray;">${currentDate}  ${gmtString}</span>
`;


  historySection.appendChild(historyEntry);
}


const donationCards = document.querySelectorAll('.donation-card');
donationCards.forEach((card, index) => handleDonation(card, index));

historySection.className += " bg-white p-6 shadow-lg rounded-lg mt-6";

function showConfirmation() {
  const confirmationModal = document.getElementById('confirmation-modal');
  confirmationModal.style.display = 'flex'; 

  // Automatically hide modal after 2 seconds
  const autoHideTimeout = setTimeout(() => {
    confirmationModal.style.display = 'none';
  }, 2000);

  // Allow manual dismissal by clicking the modal
  confirmationModal.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    clearTimeout(autoHideTimeout); // Stop the auto-hide if the user clicks manually
  });
}
