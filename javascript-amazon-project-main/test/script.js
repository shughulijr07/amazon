document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const network = document.getElementById('network').value;
    const phone = document.getElementById('phone').value;
    const amount = document.getElementById('amount').value;
  
    // Onyesha uthibitisho
    document.getElementById('confirmNetwork').textContent = network;
    document.getElementById('confirmPhone').textContent = phone;
    document.getElementById('confirmAmount').textContent = amount;
  
    document.getElementById('confirmation').classList.remove('hidden');
  });
  