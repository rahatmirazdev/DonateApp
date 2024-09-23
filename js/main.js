document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the blog button
  document.getElementById("blog-button").addEventListener("click", function () {
    window.location.href = "../blog.html";
  });

  // Initial display setup
  let donationComponent = document.getElementById("donation-component");
  let historyComponent = document.getElementById("history-component");
  donationComponent.style.display = "block";
  historyComponent.style.display = "none";

  // Function to switch between components
  function switchComponent(isHistory) {
    let donateButton = document.getElementById("donation-button");
    let historyButton = document.getElementById("history-button");

    if (isHistory) {
      historyButton.classList.add("primary-button");
      donateButton.classList.remove("primary-button");
      donateButton.classList.add("outline-button");
      historyComponent.style.display = "block";
      donationComponent.style.display = "none";
      updateHistoryComponent();
    } else {
      donateButton.classList.add("primary-button");
      historyButton.classList.remove("primary-button");
      historyButton.classList.add("outline-button");
      donationComponent.style.display = "block";
      historyComponent.style.display = "none";
    }
  }

  // Add event listeners for buttons
  document.getElementById("donation-button").addEventListener("click", function () {
      switchComponent(false);
    });
  document
    .getElementById("history-button")
    .addEventListener("click", function () {
      switchComponent(true);
    });

  // Donation history array
  let donationHistory = [];

  // Handle donations
  let cards = document.querySelectorAll(".card");
  cards.forEach(function (card) {
    let donateButton = card.querySelector(".donate-button");
    let inputMoneyField = card.querySelector(".input-money");
    let donatedAmountField = card.querySelector(".donated-amount");
    let donationDestination = card.querySelector("h2").innerText;

    donateButton.addEventListener("click", function (e) {
      e.preventDefault();
      let inputMoney = parseFloat(inputMoneyField.value);
      let myMainAmountField = document.getElementById("my-main-ammount");

      if (isNaN(inputMoney) || inputMoney < 1) {
        alert("Please enter a valid amount greater than or equal to 1");
      } else if (inputMoney > parseFloat(myMainAmountField.innerText)) {
        alert("You don't have enough balance to donate that amount");
      } else {
        // Update the total donated amount and the main amount
        let newDonatedAmount =
          parseFloat(donatedAmountField.innerText) + inputMoney;
        donatedAmountField.innerText = newDonatedAmount;
        myMainAmountField.innerText =
          parseFloat(myMainAmountField.innerText) - inputMoney;

        // Record the donation
        donationHistory.push({
          amount: inputMoney, 
          destination: donationDestination,
          date: new Date().toLocaleString(), 
        });

        // Show modal with the input amount
        showModal(donationDestination, inputMoney);
        updateHistoryComponent();
      }
    });
  });

  // Show donation modal
  function showModal(donationDestination, inputAmount) {
    let modal = document.getElementById("donation-modal");
    let modalDestination = document.getElementById(
      "modal-donation-destination"
    );
    modalDestination.innerText =
      donationDestination + " (" + inputAmount + " BDT)";
    modal.classList.remove("hidden");

    let closeModalButton = document.getElementById("close-modal-button");
    closeModalButton.onclick = function () {
      modal.classList.add("hidden");
    };
  }

  // Update the history component
  function updateHistoryComponent() {
    let historyCardContainer = historyComponent.querySelector(
      ".history-card-container"
    );
    historyCardContainer.innerHTML = "";

    appendHistoryCards(donationHistory, historyCardContainer);

    // Show history component only if there are donations
    if (donationHistory.length > 0) {
      historyComponent.style.display = "block";
    } else {
      historyComponent.style.display = "none";
    }
  }
});