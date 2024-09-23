function appendHistoryCards(donationHistory, historyCardContainer) {
  historyCardContainer.innerHTML = "";

  donationHistory.forEach(function (donation) {
    let historyCard = document.createElement("div");
    historyCard.className =
      "history-card p-8 border border-[#1111111A] rounded-[16px] mb-4";
    historyCard.innerHTML = `
        <h3 class="text-[#111111] text-xl font-bold leading-[30px] mb-4">
          <span>${donation.amount}</span> Taka is Donated for
          <span>${donation.destination}</span>
        </h3>
        <p>Date: ${donation.date}</p>
      `;
    historyCardContainer.appendChild(historyCard);
  });
}
