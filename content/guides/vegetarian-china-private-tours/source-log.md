# Source log — vegetarian-china-private-tours

- Checked at: 2026-10-10 (KST).
- Canonical boundary: the commercial page for "vegetarian china tour / china tour for vegetarians": what Homeground includes when a private tour is booked with the vegetarian meal plan, which published routes suit, the limits, and how booking works. `vegetarian-vegan-china-travel` owns the informational intent. Tour pages keep itineraries and prices.

## Evidence and exact use

1. Owner's instruction, 2026-10-10: the service is a private tour with the meals included; the customer buys it and Homeground handles the eating. It follows a real enquiry that day (a 17-day route, six to eight travellers, most of them vegetarian).
2. Product facts from `lib/privateTourProducts.ts` and `lib/privateTourLongHaulProducts.ts`: route names and lengths; hotel breakfast included; the 17-day route includes three nights on a Yangtze ship with onboard meals; the Chengdu tour is four nights in one city; private tours carry only the traveller's group with no shopping stops.
3. MICHELIN Guide: Mi Xun Teahouse in Chengdu, one star, cuisine "Vegetarian".

## Company statements that need the owner's sign-off

- Breakfast scope clarification: hotel breakfast is included only with a hotel-included option, within the written confirmation. The five-city 13-day route in `lib/privateTourFiveCityProduct.ts` also has a without-hotels option that excludes hotel breakfasts; the included list and FAQ reflect that distinction.

- Lunch and dinner on touring days are included when the meal plan is chosen, at vegetarian restaurants where a city has them and at ordinary restaurants briefed in advance elsewhere; the price per person is in the written quote (no price is published here).
- Each traveller's standard is recorded before the trip and carried by the guide in Chinese.
- Mixed groups are handled at the same restaurants.
- Yangtze ship meals are requested in advance and confirmed in writing before payment.
- Indian vegetarian meals on request in cities that have Indian restaurants.
- Vegan, no-onion-garlic and Jain standards are planned, with places that cannot do it named in advance.
- Homeground does not certify food and cannot rule out shared woks in ordinary restaurants.

## Deliberately unclaimed

- No meal-plan price, no restaurant names beyond the Michelin listing, no promise about any specific cruise company.
