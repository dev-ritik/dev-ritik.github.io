---
title: "Income Tax Filing for Foreign Assets"
date: 2023-07-27
layout: post
medium: https://ritikk.medium.com/income-tax-filing-for-foreign-assets-a98d77a5895e
time: 8
---
Filing for Income Tax in India is cumbersome. It's intimidating and confusing. To add to that, the laws keep changing. For a new individual who just started earning, the more things he touches, the more difficult it becomes to file for taxes. You know about 80C deductions! Great! Do you know what conversion rates to take when investing abroad? Ultimately, you would probably ignore foreign assets altogether with reasons like, “I didn’t sell, why bother”, or shrug it off to a CA. Let me tell you. Most CAs I have talked to don't know it correctly, either.

Not filing Foreign Assets or incorrectly filing can get you notices from the department. It may bring you under the purview of the Black Money Act. There are huge penalties, and individuals can also face jail time. Remember India and US have [agreements](https://incometaxindia.gov.in/DTAA/FATCA.htm) through which they get details for the assets of their residents.
<!--break-->

People around have been getting away with not disclosing foreign assets. The luck factor may be in play here, and you may be living on borrowed time. The department can issue notices anytime, and there is no time limitation.

> There’s not much information on the internet available on how to fill details regarding foreign assets. This blog is my efforts on consolidating on whatever I could find from the internet and some CAs around.

## Disclaimer
> **The following Medium blog is my perspective, and I might be wrong. The discussion is focused on stocks held in United States by Indian Residents. Things may change if you hold stocks elsewhere. Things may also change drastically with time and the details here can turn outright incorrect for that time period.**
>
> **Please do your due diligence before using any information here. Your case might be different than what I discuss. Consulting your tax advisor is highly recommended.**

## Concept
Before we start, let's clear a few things:
- **Conversion rate**: We should use RBI’s reference rate or SBI’s telegraphic transfer buying rate (**TTBR**) for any USD-INR conversion. I am referring to [this rule](https://incometaxindia.gov.in/Rules/Income-Tax%2520Rules/103120000000007546.htm) I found on income tax. If it is a holiday, we should take the TTBR of the immediately preceding working day. Pick the table from the TTBR pdf with “to be used as a reference” mentioned. However, SBI doesn’t provide historical data, so we may use these sources to get that:

  [sbi_forex_rates/csv_files/SBI_REFERENCE_RATES_USD.csv](https://github.com/sahilgupta/sbi_forex_rates/blob/main/csv_files/SBI_REFERENCE_RATES_USD.csv?source=post_page-----a98d77a5895e--------------------------------)
  > This project downloads and stores the daily SBI forex rates in a CSV file enabling you to access historical rates…

  [skbly7/sbi-tt-rates-historical](https://github.com/skbly7/sbi-tt-rates-historical?source=post_page-----a98d77a5895e--------------------------------)
  > Historical SBI TT rates since 02 July 2020. These are one of important rates required for ITR purposes and not made…

  [Forex Card Rates](https://mksco.in/forexrate/?source=post_page-----a98d77a5895e--------------------------------)
  > All the content on this site is published in good faith and for general information purpose only. Mksco does not make…

- For filing Foreign Asset-related schedules, you can opt for ITR2 or ITR3. Choose ITR3 if you have some business income.
- Rounding errors: Please use all the required decimals for the calculations. Round up the final number while filing.

Relevant Schedules when having Foreign Assets are:

# Schedule Foreign Assets (FA)
The department expects any Indian resident to declare whatever foreign asset one might have. The following excuses will not work:

- It is RSU, and the company has already deducted the required tax and declared it in Form 16.
- I didn’t sell anything.
- I didn’t move the money to India.

This schedule is only for declaration and bookkeeping by the department. United States issues proofs in **January to December** cycle (current year). Hence, we should declare assets till December.

This schedule has a lot of tables for declaring the different kinds of assets. I will only discuss cases when we have bought stocks or have RSUs from the company.

## Stock declaration
> _Use Table A3 for Schedule FA. Some people use Table D (which is simple) as well but Table A3 is recommended._

In Table A3, we should fill each individual holding separately. It must be acceptable to club all the buy trade for a day in a single entry but across multiple days should have its separate entry. Currently, we will have to enter the details manually every time. This is cumbersome, but it's good to do it this way. For RSUs, what this means is that all unsold/ partially sold vesting should be added separately.

Sample Table A3 will have the below essential fields, which I have explained using this example.

`I bought 100 units on 21 Dec 2021 @ $200 and sold 40 units from Jan 2022 to Dec 2022 @ $300`. For FY 2022–2023, in foreign assets, I should fill the following:

- **Date of acquiring**: Date of purchase (or vesting date): 21st Dec 2021
- **Initial value of the investment**: Amount paid on the purchase. = `100 * 200 * TTBR conversion rate on the date of investment`. If you have these units at a discount via ESPP (Employee Stock Purchase Program), you should probably add the undiscounted fair market value here.
- **Peak value**: Max value of the investment during the holding period between Jan to Dec = `100 * max value of the stock during the period * TTBR of the date when that stock has max value`. In practice, people likely take the peak value for the entire year (not just the holding period maximum).
- **Closing value**: The closing value of investment till 31st Dec = `60 * closing value of stock on 31st Dec * TTBR`
- **Total gross amount paid/credited with respect to the holding during the period**: Calculate the total dividend and interest for this particular unit from Jan to Dec. The conversion rate probably will be calculated based on the dividend payment date. Take the TTBR of the last date of the immediately preceding month. _This is the most computational work of the entire process_.
- **Total gross proceeds from sale or redemption of investment during the period**: Total value of stock sold during the Jan to Dec period from that lot = `40 * 300 * TTBR on the date of selling of stocks`

Every data should be proportionally reduced for the next year to match 60 unit holding.

## Broker balance declaration
The broker balance (presumably because of the dividends and interest accumulated) is also a foreign asset that must be declared. Choose **Table A2** for filing the details. For the closing balance, use the dollar balance as of 31st December and multiply with the TTBR on that day to find the amount in INR. Report details of deposits transferred into the account directly or through dividends. If we sold some units during the current year, please consider that too for peak and closing balance calculation.

Even if the account has no balance, it's good to declare it as such.

# Schedule Foreign Source Income (FSI)
Unlike Schedule FA, all details here should be according to Financial Year in India, i.e., from April to March. Add details for any income received or receivable even if the money is yet to move to India. **Also, do consider advance tax in mind**. If you don't pay the taxes appropriately in the time frame of advance taxes, the advance tax penalty may also be levied.

## Tax treatment of dividends
Ordinarily, Indian dividends are subject to be taxed on the hands of the receiver based on his slab. The same applies to any foreign dividends received. However, the United States government already deducts 25% of the dividend as tax before distributing it. In essence, there could be a case of double taxation on the same income.

The Indian and US governments signed the Double Taxation Avoidance Agreement (**DTAA**) to help taxpayers with this issue. Effectively, we are still taxed the same in India. However, we request the Indian government to give us relief for the 25% already paid which is added as a credit in the final tax liability calculation.

So effectively, if you are in the 30% slab, you still need to pay 5% more.

Relevant fields here:
- **Income from outside India (included in Part B-Ti)**: Total dividend pre-tax calculated using TTBR of the last date of the previous month.
- **Tax paid outside India**: 25% of the total dividend withheld.
- **Tax payable on such income under normal provision in India**: Manually calculate and add the tax based on the slab.
- **Relevant article of DTAA if relief claimed u/s 90 or 90A**: 10, 25.

## Stock Capital Gains
For the stocks, the capital gains are the `(sell value in $ — buy value in $) * TTBR on the last date of the preceding month to the sell date`.

## Interest on broker balance
Similarly, fill interest received on broker balance here.

# Schedule Tax Relief (TR)
Put the summary of tax relief claimed for taxes paid outside India here. Add the same relief amount (calculated above) again in this section.

For the Tax Relief Claimed under section (specify 90, 90A or 91), for RSUs, stocks and dividends in the US add section 90.

# Form 67
Form 67 is a statutory form used by resident taxpayers in India to claim credit for foreign tax paid outside India.

> _Add the exact details here as well. The numbers across Form 67, Schedule FSI and Schedule TR should match. It is also advised to submit form 67 before submitting the ITR._

As understandable, this section should also be filled according to the Indian financial year.

**Proof is required** to be uploaded when submitting this form. We should get Form 1042-S from the broker for the dividends and interests. Form 1042-S is an information return filed by withholding agents to report amounts paid to foreign persons from the US. However, this document is only issued in the current year, January to December. (You can probably submit the broker statements for the period Jan to March)

# Schedule Income from other sources (OS)
This is the schedule for adding all the additional interest and dividends received from foreign shares during the financial year: April to June.

Ideally, for all individual dividends received, you should convert the pre-tax amount to INR using TTBR of the last date of the immediately preceding month. Add the cumulative INR in the dividend section. You should give the division among various advanced tax periods for the dividend received.

Do the same thing for interest on the broker balance and add it under the “Others” row in the interest section.

# Schedule Capital Gains
All capital gains (including those relating to foreign assets) should be reported here. For foreign assets, taxation is a bit different.

## Capital gains on foreign assets
Any holding for more the 2 years (from vesting/ purchase date) qualifies for special tax treatment under long-term capital gains. These are taxed at 20% after indexation.

Indexation means that you will only be taxed for the gains above inflation. So, if you sold your holding in 3 years making 50% profit, and assuming inflation to be 5% annually, the inflation will be 5 * 3 = 15% (well it is more than that as the number will be compounded). So, you actually pay only `20% of (50%–15%)` as tax (plus cess and surcharge 🥲)

The loss can also be adjusted with other profits as well (check the rules for that). Any charges directly linked to the transfer can also be claimed. Technically, the transfer of foreign currency-related charges should not be claimed under capital gains as it's not linked to the transfer of assets. But it probably will not be questioned if we do.

Divide the earnings into timeframes based on advanced tax periods similar to what we did in dividends.

---
In addition, if your annual income exceeds 50 lakhs, you should also fill out Schedule Assets and Liabilities.

Please comment below if you feel something is incorrect or if I missed something. This blog has been an effort to consolidate the data on the internet. I will be more than happy to modify the content.

# References
- [https://indcdn.indmoney.com/public/images/itr_filling_video.mp4](https://indcdn.indmoney.com/public/images/itr_filling_video.mp4)
- [How to report your foreign income, share investment while filing ITR form?](https://economictimes.indiatimes.com/wealth/tax/how-to-report-your-foreign-income-share-investment-while-filing-itr-form/articleshow/102070142.cms?source=post_page-----a98d77a5895e--------------------------------)
  > Many individuals having investments in foreign shares, or having bank account in foreign country are required to report…

- [RSU of MNC, perquisite, tax, Capital gains, ITR](https://bemoneyaware.com/rsu-tax-perquisite-capital-gains/?source=post_page-----a98d77a5895e--------------------------------)
  > What are RSUs or Restricted Stock Units? What is vesting date? When are RSU taxed? What is the capital gain from…

- [e-Filing Form 67 in New Income Tax Portal](https://medium.com/@chintanr97/e-filing-form-67-in-new-income-tax-portal-9449f1fa089c?source=post_page-----a98d77a5895e--------------------------------)
  > DISCLAIMER: The following Medium Article is only for knowledge purpose and to allow taxpayers to gain more insight into…
